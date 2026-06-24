// Scene: AI extraction — action items, decisions, risks appear progressively
const ACTIONS = [
  { owner: "James M.", ownerColor: "#7B8FA8", task: "Write mobile app specification doc",      due: "Wed 15 Jan",  confidence: 96 },
  { owner: "Priya L.", ownerColor: "#A8836B", task: "Schedule API contract sync with backend", due: "Thu 16 Jan",  confidence: 94 },
  { owner: "Sarah K.", ownerColor: "#6B8F63", task: "Share Q3 roadmap draft with stakeholders",due: "Fri 17 Jan",  confidence: 91 },
];
const DECISIONS = [
  "Mobile app will lead the Q3 product roadmap",
  "Backend API contracts to be finalised by end of next Friday",
];
const TOPICS = ["Q3 Roadmap", "Mobile App", "API Contracts", "Stakeholder Update"];

export default function SceneExtract({ progress }: { progress: number }) {
  const showThinking = progress > 0.05 && progress < 0.3;
  const showActions  = progress > 0.28;
  const actionsCount = Math.min(ACTIONS.length, Math.floor((progress - 0.28) / 0.18 * ACTIONS.length + 1));
  const showDecisions= progress > 0.65;
  const showTopics   = progress > 0.82;

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-3">

        {/* AI processing header */}
        <div className="bg-white border border-[#E5E2DC] rounded-2xl px-5 py-4 flex items-center gap-3">
          <div className="size-9 rounded-xl bg-[#3A5C34] grid place-items-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
              <rect x="6"  y="17" width="4" height="6"  rx="2" fill="white" opacity="0.4"/>
              <rect x="13" y="12" width="4" height="16" rx="2" fill="white" opacity="0.65"/>
              <rect x="20" y="8"  width="4" height="24" rx="2" fill="white"/>
              <rect x="27" y="12" width="4" height="16" rx="2" fill="white" opacity="0.65"/>
              <rect x="34" y="17" width="4" height="6"  rx="2" fill="white" opacity="0.4"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-[#1a1a1a]">
              {showThinking ? "Analysing meeting…" : "Extraction complete"}
            </p>
            <p className="text-[11px] text-[#9B958E]">
              {showThinking ? "Identifying action items, decisions, and context" : `${ACTIONS.length} action items · ${DECISIONS.length} decisions · ${TOPICS.length} topics`}
            </p>
          </div>
          {showThinking && (
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="size-1.5 rounded-full bg-[#3A5C34] animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          )}
          {!showThinking && (
            <div className="size-5 rounded-full bg-[#EDF5EC] grid place-items-center">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2 2 4-4" stroke="#3A5C34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>

        {/* Action Items */}
        {showActions && (
          <div className="bg-white border border-[#E5E2DC] rounded-2xl p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9B958E] mb-3">Action Items · {ACTIONS.length}</p>
            <div className="space-y-2">
              {ACTIONS.slice(0, actionsCount).map((a, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-[#FDFCFB] border border-[#E8E4DE] rounded-xl px-3 py-2.5" style={{ animation: "slideIn 0.3s ease-out both" }}>
                  <div className="size-4 rounded border border-[#C5C0B8] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-[12.5px] text-[#1a1a1a] font-medium mb-0.5">{a.task}</p>
                    <div className="flex items-center gap-2">
                      <div className="size-3.5 rounded-full grid place-items-center text-white text-[8px] font-bold" style={{ backgroundColor: a.ownerColor }}>{a.owner[0]}</div>
                      <span className="text-[10px] text-[#6B6560]">{a.owner}</span>
                      <span className="text-[10px] text-[#C5C0B8]">·</span>
                      <span className="text-[10px] text-[#9B958E]">{a.due}</span>
                      <span className="ml-auto text-[10px] text-[#5A8F50] font-medium">{a.confidence}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Decisions + Topics */}
        {(showDecisions || showTopics) && (
          <div className="grid grid-cols-2 gap-3">
            {showDecisions && (
              <div className="bg-white border border-[#E5E2DC] rounded-2xl p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9B958E] mb-3">Decisions · {DECISIONS.length}</p>
                <div className="space-y-2">
                  {DECISIONS.map((d, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="size-1.5 rounded-full bg-[#5A8F50] shrink-0 mt-1.5" />
                      <p className="text-[11.5px] text-[#4A4540]">{d}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {showTopics && (
              <div className="bg-white border border-[#E5E2DC] rounded-2xl p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9B958E] mb-3">Topics Discussed</p>
                <div className="flex flex-wrap gap-1.5">
                  {TOPICS.map((t) => (
                    <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-[#F0EDE8] text-[#6B6560] border border-[#E0DCD6]">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
