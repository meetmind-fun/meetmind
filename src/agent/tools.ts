// Tool definitions and executors for the agent.
// All tools are pure JS / browser-friendly (CORS-safe).

export type ToolName =
  | "calculator"
  | "current_datetime"
  | "wikipedia_search"
  | "unit_convert"
  | "save_note"
  | "list_notes"
  | "clear_notes";

export interface ToolSpec {
  name: ToolName;
  description: string;
  schema: string; // JSON schema (compact, for the prompt)
  example: string;
}

export const TOOLS: ToolSpec[] = [
  {
    name: "calculator",
    description:
      "Evaluate a math expression. Supports +, -, *, /, %, **, parentheses, and common functions (sqrt, sin, cos, tan, log, ln, abs, pow, pi, e).",
    schema: '{"expression": "string"}',
    example: '{"action":"calculator","action_input":{"expression":"(45*12)/3 + sqrt(81)"}}',
  },
  {
    name: "current_datetime",
    description: "Returns the current date, time, and timezone of the user.",
    schema: "{}",
    example: '{"action":"current_datetime","action_input":{}}',
  },
  {
    name: "wikipedia_search",
    description:
      "Search Wikipedia and return a concise summary of the top matching article. Use this for facts, people, places, history, science.",
    schema: '{"query": "string"}',
    example: '{"action":"wikipedia_search","action_input":{"query":"Ada Lovelace"}}',
  },
  {
    name: "unit_convert",
    description:
      "Convert between common units. Supported: length (m, km, mi, ft, in, cm, mm), weight (kg, g, lb, oz), temperature (c, f, k), time (s, min, hr, day).",
    schema: '{"value": "number", "from": "string", "to": "string"}',
    example: '{"action":"unit_convert","action_input":{"value":100,"from":"km","to":"mi"}}',
  },
  {
    name: "save_note",
    description:
      "Save a short text note for the user (persists in their browser). Use when the user asks to remember something.",
    schema: '{"text": "string"}',
    example: '{"action":"save_note","action_input":{"text":"Buy milk on Friday"}}',
  },
  {
    name: "list_notes",
    description: "List all saved notes for the user.",
    schema: "{}",
    example: '{"action":"list_notes","action_input":{}}',
  },
  {
    name: "clear_notes",
    description: "Delete all saved notes (only when the user explicitly asks).",
    schema: "{}",
    example: '{"action":"clear_notes","action_input":{}}',
  },
];

// ── Calculator: recursive descent parser (no eval / new Function) ─────────────
//
// Grammar:
//   expr    = term   (('+' | '-') term)*
//   term    = factor (('*' | '/' | '%') factor)*
//   factor  = base ('**' factor)*          ← right-associative exponent
//   base    = '-' base | '(' expr ')' | func '(' arglist ')' | number
//   arglist = expr (',' expr)*
//   number  = [0-9]+ ('.' [0-9]+)?

interface Tokens {
  src: string;
  pos: number;
}

function peek(t: Tokens): string {
  // Skip whitespace
  while (t.pos < t.src.length && t.src[t.pos] === " ") t.pos++;
  return t.pos < t.src.length ? t.src[t.pos] : "";
}

function consume(t: Tokens, s: string): void {
  if (t.src.slice(t.pos, t.pos + s.length) !== s) {
    throw new Error(`Expected "${s}" at position ${t.pos}`);
  }
  t.pos += s.length;
}

function parseNumber(t: Tokens): number {
  while (t.pos < t.src.length && t.src[t.pos] === " ") t.pos++;
  const start = t.pos;
  if (t.src[t.pos] === ".") t.pos++; // leading dot
  while (t.pos < t.src.length && /[0-9.]/.test(t.src[t.pos])) t.pos++;
  const raw = t.src.slice(start, t.pos);
  const n = parseFloat(raw);
  if (isNaN(n)) throw new Error(`Invalid number at position ${start}: "${raw}"`);
  return n;
}

// Named constants and functions
const MATH_CONSTS: Record<string, number> = {
  pi: Math.PI,
  e: Math.E,
};

const MATH_FUNCS: Record<string, (...args: number[]) => number> = {
  sqrt:  (x) => Math.sqrt(x),
  sin:   (x) => Math.sin(x),
  cos:   (x) => Math.cos(x),
  tan:   (x) => Math.tan(x),
  asin:  (x) => Math.asin(x),
  acos:  (x) => Math.acos(x),
  atan:  (x) => Math.atan(x),
  atan2: (y, x) => Math.atan2(y, x),
  log:   (x) => Math.log10(x),
  ln:    (x) => Math.log(x),
  log2:  (x) => Math.log2(x),
  abs:   (x) => Math.abs(x),
  ceil:  (x) => Math.ceil(x),
  floor: (x) => Math.floor(x),
  round: (x) => Math.round(x),
  pow:   (x, y) => Math.pow(x, y),
  min:   (...a) => Math.min(...a),
  max:   (...a) => Math.max(...a),
};

function parseExpr(t: Tokens): number {
  let left = parseTerm(t);
  while (true) {
    const c = peek(t);
    if (c === "+") { t.pos++; left += parseTerm(t); }
    else if (c === "-") { t.pos++; left -= parseTerm(t); }
    else break;
  }
  return left;
}

function parseTerm(t: Tokens): number {
  let left = parseFactor(t);
  while (true) {
    const c = peek(t);
    if (c === "*" && t.src[t.pos + 1] !== "*") { t.pos++; left *= parseFactor(t); }
    else if (c === "/") { t.pos++; left /= parseFactor(t); }
    else if (c === "%") { t.pos++; left %= parseFactor(t); }
    else break;
  }
  return left;
}

function parseFactor(t: Tokens): number {
  const base = parseBase(t);
  while (t.src.slice(t.pos, t.pos + 2) === "**") {
    t.pos += 2;
    // Right-associative: recurse into parseFactor
    return Math.pow(base, parseFactor(t));
  }
  return base;
}

function parseBase(t: Tokens): number {
  while (t.pos < t.src.length && t.src[t.pos] === " ") t.pos++;

  // Unary minus
  if (t.src[t.pos] === "-") {
    t.pos++;
    return -parseBase(t);
  }

  // Unary plus
  if (t.src[t.pos] === "+") {
    t.pos++;
    return parseBase(t);
  }

  // Parenthesised expression
  if (t.src[t.pos] === "(") {
    t.pos++;
    const v = parseExpr(t);
    while (t.pos < t.src.length && t.src[t.pos] === " ") t.pos++;
    consume(t, ")");
    return v;
  }

  // Named identifier (function or constant)
  if (/[a-zA-Z_]/.test(t.src[t.pos] ?? "")) {
    const start = t.pos;
    while (t.pos < t.src.length && /[a-zA-Z0-9_]/.test(t.src[t.pos])) t.pos++;
    const name = t.src.slice(start, t.pos).toLowerCase();

    // Check if it's a function call
    while (t.pos < t.src.length && t.src[t.pos] === " ") t.pos++;
    if (t.src[t.pos] === "(") {
      const fn = MATH_FUNCS[name];
      if (!fn) throw new Error(`Unknown function: ${name}`);
      t.pos++; // consume "("
      const args: number[] = [];
      while (true) {
        args.push(parseExpr(t));
        while (t.pos < t.src.length && t.src[t.pos] === " ") t.pos++;
        if (t.src[t.pos] === ",") { t.pos++; continue; }
        break;
      }
      while (t.pos < t.src.length && t.src[t.pos] === " ") t.pos++;
      consume(t, ")");
      return fn(...args);
    }

    // Otherwise it must be a constant
    if (name in MATH_CONSTS) return MATH_CONSTS[name];
    throw new Error(`Unknown identifier: ${name}`);
  }

  // Number literal
  if (/[0-9.]/.test(t.src[t.pos] ?? "")) return parseNumber(t);

  throw new Error(`Unexpected character "${t.src[t.pos]}" at position ${t.pos}`);
}

function safeMathEval(expr: string): number {
  const t: Tokens = { src: expr.trim(), pos: 0 };
  const result = parseExpr(t);
  // Ensure we consumed the whole expression
  while (t.pos < t.src.length && t.src[t.pos] === " ") t.pos++;
  if (t.pos !== t.src.length) {
    throw new Error(`Unexpected token at position ${t.pos}: "${t.src[t.pos]}"`);
  }
  if (!isFinite(result)) throw new Error("Expression did not evaluate to a finite number.");
  return result;
}

// ── Wikipedia ─────────────────────────────────────────────────────────────────

async function wikipediaSearch(query: string): Promise<string> {
  const searchUrl =
    "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=1&srsearch=" +
    encodeURIComponent(query);
  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();
  const hit = searchData?.query?.search?.[0];
  if (!hit) return `No Wikipedia results found for "${query}".`;

  const title = hit.title as string;
  const sumUrl =
    "https://en.wikipedia.org/api/rest_v1/page/summary/" +
    encodeURIComponent(title);
  const sumRes = await fetch(sumUrl);
  if (!sumRes.ok) return `Found "${title}" but could not fetch summary.`;
  const sumData = await sumRes.json();
  const extract = (sumData.extract || "").toString().trim();
  const url = sumData?.content_urls?.desktop?.page || "";
  return `Title: ${title}\nURL: ${url}\nSummary: ${extract || "(no summary available)"}`;
}

// ── Unit conversion ───────────────────────────────────────────────────────────

const UNIT_FACTORS_LENGTH: Record<string, number> = {
  m: 1, km: 1000, cm: 0.01, mm: 0.001,
  mi: 1609.344, ft: 0.3048, in: 0.0254, yd: 0.9144,
};
const UNIT_FACTORS_WEIGHT: Record<string, number> = {
  kg: 1, g: 0.001, mg: 0.000001,
  lb: 0.45359237, oz: 0.028349523125,
};
const UNIT_FACTORS_TIME: Record<string, number> = {
  s: 1, sec: 1, min: 60, hr: 3600, h: 3600, day: 86400, days: 86400, week: 604800,
};

function unitConvert(value: number, from: string, to: string): string {
  const f = from.toLowerCase().trim();
  const t2 = to.toLowerCase().trim();

  const isTemp = (u: string) => ["c", "f", "k", "°c", "°f"].includes(u);
  if (isTemp(f) || isTemp(t2)) {
    const norm = (u: string) => u.replace("°", "");
    const fn = norm(f), tn = norm(t2);
    let c: number;
    if (fn === "c") c = value;
    else if (fn === "f") c = (value - 32) * (5 / 9);
    else if (fn === "k") c = value - 273.15;
    else throw new Error(`Unknown temperature unit: ${from}`);
    let out: number;
    if (tn === "c") out = c;
    else if (tn === "f") out = c * (9 / 5) + 32;
    else if (tn === "k") out = c + 273.15;
    else throw new Error(`Unknown temperature unit: ${to}`);
    return `${value} ${from} = ${out.toFixed(4)} ${to}`;
  }

  const tables = [UNIT_FACTORS_LENGTH, UNIT_FACTORS_WEIGHT, UNIT_FACTORS_TIME];
  for (const tbl of tables) {
    if (f in tbl && t2 in tbl) {
      const out = (value * tbl[f]) / tbl[t2];
      return `${value} ${from} = ${out.toFixed(6).replace(/\.?0+$/, "")} ${to}`;
    }
  }
  throw new Error(
    `Cannot convert from "${from}" to "${to}" (units must be the same category).`
  );
}

// ── Notes (persisted in localStorage) ────────────────────────────────────────

const NOTES_KEY = "atlas_agent_notes";

export function getNotes(): { id: string; text: string; ts: number }[] {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function setNotes(notes: { id: string; text: string; ts: number }[]) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  window.dispatchEvent(new CustomEvent("atlas-notes-changed"));
}

// ── Dispatcher ────────────────────────────────────────────────────────────────

export async function runTool(
  name: ToolName,
  input: Record<string, unknown>
): Promise<string> {
  switch (name) {
    case "calculator": {
      const expr = String(input.expression ?? "");
      if (!expr) throw new Error("Missing 'expression'.");
      const r = safeMathEval(expr);
      const formatted = Number.isInteger(r) ? String(r) : parseFloat(r.toPrecision(12)).toString();
      return `${expr} = ${formatted}`;
    }
    case "current_datetime": {
      const now = new Date();
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return `${now.toString()} (timezone: ${tz}, ISO: ${now.toISOString()})`;
    }
    case "wikipedia_search": {
      const q = String(input.query ?? "");
      if (!q) throw new Error("Missing 'query'.");
      return await wikipediaSearch(q);
    }
    case "unit_convert": {
      const v = Number(input.value);
      const from = String(input.from ?? "");
      const to = String(input.to ?? "");
      if (!isFinite(v)) throw new Error("Missing or invalid 'value'.");
      if (!from || !to) throw new Error("Missing 'from' or 'to'.");
      return unitConvert(v, from, to);
    }
    case "save_note": {
      const text = String(input.text ?? "").trim();
      if (!text) throw new Error("Missing 'text'.");
      const notes = getNotes();
      notes.unshift({ id: crypto.randomUUID(), text, ts: Date.now() });
      setNotes(notes);
      return `Saved note: "${text}"`;
    }
    case "list_notes": {
      const notes = getNotes();
      if (notes.length === 0) return "No saved notes.";
      return notes
        .map((n, i) => `${i + 1}. ${n.text}  (${new Date(n.ts).toLocaleString()})`)
        .join("\n");
    }
    case "clear_notes": {
      setNotes([]);
      return "All notes cleared.";
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
