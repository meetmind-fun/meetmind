// ReAct-style agent loop using Pollinations.ai (free, no API key).
import { TOOLS, runTool, ToolName } from "./tools";

export type StepKind = "thought" | "tool_call" | "tool_result" | "final" | "error";

export interface AgentStep {
  kind: StepKind;
  content: string;
  tool?: string;
  toolInput?: Record<string, unknown>;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  steps?: AgentStep[];
}

const SYSTEM_PROMPT = `You are Atlas, a helpful, concise AI agent that can use tools to answer questions and accomplish tasks for the user.

You operate in a strict reasoning loop. On EACH turn you must output ONLY a single JSON object (no prose, no markdown fences) with one of these two shapes:

1. Call a tool:
{"thought": "<short reasoning>", "action": "<tool_name>", "action_input": { ...args... }}

2. Give the final answer to the user:
{"thought": "<short reasoning>", "final_answer": "<your reply to the user, in natural language>"}

Rules:
- Output MUST be a single valid JSON object and nothing else. No prose before or after. No \`\`\` fences.
- Use a tool when it gives you more accurate or current information than guessing.
- Do not call a tool more than necessary. For simple chat / opinions / writing tasks, go straight to final_answer.
- For multi-step goals (planning, breaking down a project), use final_answer with a numbered plan — you don't need a tool for that.
- After a tool returns an "Observation", decide whether you need another tool call or are ready to give final_answer.
- Be concise. Keep final_answer focused and useful.

Available tools:
${TOOLS.map(
  (t) => `- ${t.name}${t.schema === "{}" ? "" : ` ${t.schema}`}: ${t.description}`
).join("\n")}

Examples of valid outputs:
${TOOLS.slice(0, 3)
  .map((t) => t.example)
  .join("\n")}
{"thought":"User just wants a friendly hello","final_answer":"Hi! I'm Atlas. What can I help you with today?"}
`;

const MAX_STEPS = 6;

// Pollinations OpenAI-compatible endpoint. No API key required.
async function callLLM(
  messages: { role: string; content: string }[]
): Promise<string> {
  const res = await fetch("https://text.pollinations.ai/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "openai",
      messages,
      temperature: 0.3,
      seed: Math.floor(Math.random() * 1_000_000),
    }),
  });
  if (!res.ok) {
    throw new Error(`LLM request failed: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  const content =
    data?.choices?.[0]?.message?.content ??
    data?.choices?.[0]?.text ??
    "";
  return String(content).trim();
}

function extractJSON(text: string): any {
  // Try direct parse first.
  try {
    return JSON.parse(text);
  } catch {
    /* fall through */
  }
  // Strip markdown fences.
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) {
    try {
      return JSON.parse(fenced[1].trim());
    } catch {
      /* fall through */
    }
  }
  // Find first { ... } balanced block.
  const start = text.indexOf("{");
  if (start === -1) throw new Error("No JSON object found in model output.");
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === '"') inStr = false;
    } else {
      if (c === '"') inStr = true;
      else if (c === "{") depth++;
      else if (c === "}") {
        depth--;
        if (depth === 0) {
          const slice = text.slice(start, i + 1);
          return JSON.parse(slice);
        }
      }
    }
  }
  throw new Error("Could not parse JSON from model output.");
}

/**
 * Run the agent loop. `history` is the prior chat (user/assistant turns).
 * `userInput` is the new user message. Emits intermediate steps via onStep,
 * and returns the final assistant message text + step trace.
 */
export async function runAgent(
  history: ChatMessage[],
  userInput: string,
  onStep: (step: AgentStep) => void
): Promise<{ final: string; steps: AgentStep[] }> {
  const steps: AgentStep[] = [];
  const emit = (s: AgentStep) => {
    steps.push(s);
    onStep(s);
  };

  // Build conversation messages for the LLM.
  const messages: { role: string; content: string }[] = [
    { role: "system", content: SYSTEM_PROMPT },
  ];
  for (const m of history) {
    messages.push({ role: m.role, content: m.content });
  }
  messages.push({ role: "user", content: userInput });

  for (let step = 0; step < MAX_STEPS; step++) {
    let raw: string;
    try {
      raw = await callLLM(messages);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      emit({ kind: "error", content: `LLM error: ${msg}` });
      return {
        final:
          "I couldn't reach the language model. Please check your connection and try again.",
        steps,
      };
    }

    let parsed: any;
    try {
      parsed = extractJSON(raw);
    } catch {
      // Treat unparseable output as a final answer.
      emit({ kind: "final", content: raw });
      return { final: raw, steps };
    }

    const thought = String(parsed.thought ?? "").trim();
    if (thought) emit({ kind: "thought", content: thought });

    if (typeof parsed.final_answer === "string") {
      const fa = parsed.final_answer.trim();
      emit({ kind: "final", content: fa });
      return { final: fa, steps };
    }

    const action = String(parsed.action ?? "").trim() as ToolName;
    const actionInput =
      parsed.action_input && typeof parsed.action_input === "object"
        ? parsed.action_input
        : {};

    if (!action) {
      emit({ kind: "final", content: raw });
      return { final: raw, steps };
    }

    emit({
      kind: "tool_call",
      content: `${action}(${JSON.stringify(actionInput)})`,
      tool: action,
      toolInput: actionInput,
    });

    let observation: string;
    try {
      observation = await runTool(action, actionInput);
    } catch (err) {
      observation =
        "ERROR: " + (err instanceof Error ? err.message : String(err));
    }
    emit({ kind: "tool_result", content: observation, tool: action });

    // Feed the assistant's own JSON output and the observation back into the conversation
    // so the model has full context for the next step.
    messages.push({ role: "assistant", content: raw });
    messages.push({
      role: "user",
      content: `Observation from ${action}:\n${observation}\n\nContinue. Respond with another JSON object (either another tool call or a final_answer).`,
    });
  }

  const fallback =
    "I reached the maximum number of reasoning steps without a final answer. Try rephrasing or breaking your request into smaller parts.";
  emit({ kind: "error", content: fallback });
  return { final: fallback, steps };
}
