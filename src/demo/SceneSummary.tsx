// Scene: the email summary that lands in your inbox
export default function SceneSummary({ progress }: { progress: number }) {
  const showHeader  = progress > 0.05;
  const showMeta    = progress > 0.2;
  const showItems   = progress > 0.38;
  const itemCount   = Math.min(3, Math.floor((progress - 0.38) / 0.15 * 4));
  const showDecision= progress > 0.72;
  const showFooter  = progress > 0.88;

  const items = [
    { owner: "James M.", task: "Write mobile app specification doc", due: "Wed 15 Jan" },
    { owner: "Priya L.", task: "Schedule API sync with backend team", due: "Thu 16 Jan" },
    { owner: "Sarah K.", task: "Share Q3 roadmap with stakeholders",  due: "Fri 17 Jan" },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Email client frame */}
        <div className="bg-white rounded-2xl border border-[#E5E2DC] shadow-2xl shadow-black/8 overflow-hidden">
          {/* Email chrome */}
          <div className="bg-[#F7F6F3] border-b border-[#E5E2DC] px-4 py-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-2 rounded-full bg-[#3A5C34]" />
              <span className="text-[11px] font-medium text-[#3A5C34]">MeetMind Summary · Just now</span>
            </div>
            <p className="text-[13px] font-semibold text-[#1a1a1a]">✦ Q3 Planning · Kickoff — Meeting Summary</p>
            <p className="text-[11px] text-[#9B958E]">From: hello@meetmind.app · To: team@acme.com</p>
          </div>

          {/* Email body */}
          <div className="p-5 space-y-4 text-[13px]">

            {showHeader && (
              <div style={{ animation: "slideIn 0.4s ease-out" }}>
                <p className="text-[#1a1a1a] font-semibold mb-1">Hi team 👋</p>
                <p className="text-[#6B6560] leading-relaxed text-[12.5px]">
                  Here's your summary from today's <span className="font-medium text-[#1a1a1a]">Q3 Planning Kickoff</span>. The meeting ran 47 minutes with full attendance.
                </p>
              </div>
            )}

            {showMeta && (
              <div className="flex flex-wrap gap-3 py-3 border-y border-[#F0EDE8]" style={{ animation: "slideIn 0.4s ease-out" }}>
                {[
                  { label: "Duration", val: "47 min" },
                  { label: "Participants", val: "3" },
                  { label: "Action items", val: "3" },
                  { label: "Decisions", val: "2" },
                ].map((m) => (
                  <div key={m.label}>
                    <p className="text-[10px] text-[#9B958E]">{m.label}</p>
                    <p className="text-[13px] font-semibold text-[#1a1a1a]">{m.val}</p>
                  </div>
                ))}
              </div>
            )}

            {showItems && (
              <div style={{ animation: "slideIn 0.4s ease-out" }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9B958E] mb-2">Action Items</p>
                <div className="space-y-1.5">
                  {items.slice(0, itemCount).map((item, i) => (
                    <div key={i} className="flex items-start gap-2" style={{ animation: "slideIn 0.3s ease-out both" }}>
                      <div className="size-3.5 rounded border border-[#C5C0B8] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[12px] text-[#1a1a1a]">{item.task}</span>
                        <span className="text-[11px] text-[#9B958E] ml-1.5">— {item.owner} · {item.due}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showDecision && (
              <div style={{ animation: "slideIn 0.4s ease-out" }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9B958E] mb-2">Key Decisions</p>
                <div className="space-y-1">
                  {["Mobile app leads Q3 roadmap", "API contracts finalised by Friday"].map((d, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="size-1.5 rounded-full bg-[#5A8F50] shrink-0" />
                      <span className="text-[12px] text-[#4A4540]">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showFooter && (
              <div className="pt-2 border-t border-[#F0EDE8]" style={{ animation: "slideIn 0.4s ease-out" }}>
                <p className="text-[11px] text-[#9B958E]">Full transcript, recording, and decision log →</p>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-[11px] text-[#9B958E] mt-3">Delivered 38 seconds after the call ended</p>
      </div>
    </div>
  );
}
