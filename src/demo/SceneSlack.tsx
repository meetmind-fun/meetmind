// Scene: Slack + Jira integrations — output lands where teams work
const JIRA_TASKS = [
  { id: "PROD-441", title: "Write mobile app specification doc", assignee: "J", color: "#7B8FA8", status: "To Do",        statusColor: "#6B6560" },
  { id: "PROD-442", title: "Schedule API contract sync",         assignee: "P", color: "#A8836B", status: "To Do",        statusColor: "#6B6560" },
  { id: "PROD-443", title: "Share Q3 roadmap with stakeholders", assignee: "S", color: "#6B8F63", status: "In Progress",  statusColor: "#3A5C34" },
];

export default function SceneSlack({ progress }: { progress: number }) {
  const showSlack  = progress > 0.05;
  const showJira   = progress > 0.5;
  const jiraCount  = Math.min(JIRA_TASKS.length, Math.ceil((progress - 0.5) / 0.16 * JIRA_TASKS.length));

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Slack */}
        <div
          className="bg-white border border-[#E5E2DC] rounded-2xl overflow-hidden shadow-lg shadow-black/5 transition-all duration-500"
          style={{ opacity: showSlack ? 1 : 0, transform: showSlack ? "translateY(0)" : "translateY(12px)" }}
        >
          <div className="px-4 py-3 bg-[#3E1F47] flex items-center gap-2">
            <div className="size-5 rounded grid place-items-center">
              <span className="text-white text-[14px] font-black">#</span>
            </div>
            <span className="text-[12px] text-white/80 font-medium">product-team</span>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex gap-2.5 items-start">
              <div className="size-7 rounded-lg bg-[#3A5C34] grid place-items-center shrink-0">
                <svg width="11" height="11" viewBox="0 0 40 40" fill="none">
                  <rect x="6" y="17" width="4" height="6" rx="2" fill="white" opacity="0.4"/>
                  <rect x="13" y="12" width="4" height="16" rx="2" fill="white" opacity="0.65"/>
                  <rect x="20" y="8" width="4" height="24" rx="2" fill="white"/>
                  <rect x="27" y="12" width="4" height="16" rx="2" fill="white" opacity="0.65"/>
                  <rect x="34" y="17" width="4" height="6" rx="2" fill="white" opacity="0.4"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[12px] font-bold text-[#1a1a1a]">MeetMind</span>
                  <span className="text-[9px] text-[#9B958E]">Today 11:47 AM</span>
                </div>
                <div className="bg-[#F3F7F2] border border-[#C9DEC5] rounded-xl p-3">
                  <p className="text-[11px] font-semibold text-[#3A5C34] mb-1.5">✦ Q3 Planning Kickoff · Summary</p>
                  <div className="space-y-1">
                    {["📋 3 action items created in Jira", "✅ 2 decisions logged", "⏱ 47 min · 3 participants"].map((l) => (
                      <p key={l} className="text-[11px] text-[#4A4540]">{l}</p>
                    ))}
                  </div>
                  <a href="#" className="inline-block mt-2 text-[10px] font-semibold text-[#3A5C34] underline">View full summary →</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Jira */}
        <div
          className="bg-white border border-[#E5E2DC] rounded-2xl overflow-hidden shadow-lg shadow-black/5 transition-all duration-500"
          style={{ opacity: showJira ? 1 : 0, transform: showJira ? "translateY(0)" : "translateY(12px)" }}
        >
          <div className="px-4 py-3 bg-[#0052CC] flex items-center gap-2">
            <div className="size-5 rounded grid place-items-center">
              <span className="text-white text-[14px] font-black">J</span>
            </div>
            <span className="text-[12px] text-white/80 font-medium">PROD board · Sprint 22</span>
          </div>
          <div className="p-3 space-y-2">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9B958E]">Auto-created by MeetMind</p>
              <span className="text-[10px] bg-[#EDF5EC] text-[#3A5C34] font-semibold px-2 py-0.5 rounded-full">3 new</span>
            </div>
            {JIRA_TASKS.slice(0, jiraCount).map((t) => (
              <div key={t.id} className="flex items-start gap-2 p-2.5 rounded-xl border border-[#E8E4DE] bg-[#FDFCFB]" style={{ animation: "slideIn 0.3s ease-out both" }}>
                <div className="size-5 rounded-full grid place-items-center text-white text-[8px] font-bold shrink-0 mt-0.5" style={{ backgroundColor: t.color }}>{t.assignee}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-[#1a1a1a] font-medium leading-snug">{t.title}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[9px] text-[#9B958E]">{t.id}</span>
                    <span className="text-[9px]" style={{ color: t.statusColor }}>· {t.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
