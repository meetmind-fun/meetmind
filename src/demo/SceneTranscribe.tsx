// Scene: Live transcription streaming in
const LINES = [
  { speaker: "Sarah K.", init: "S", color: "#6B8F63", text: "Alright team, let's lock down the Q3 priorities today. We need clarity before end of week." },
  { speaker: "James M.", init: "J", color: "#7B8FA8", text: "I think mobile has to lead. Our data shows 70% of sign-ups come from mobile — we can't ignore that." },
  { speaker: "Priya L.", init: "P", color: "#A8836B", text: "Agreed. And we need the backend API contracts signed off — ideally before next Friday." },
  { speaker: "Sarah K.", init: "S", color: "#6B8F63", text: "Perfect. James, can you own the mobile spec doc? And Priya — can you schedule the API sync?" },
  { speaker: "James M.", init: "J", color: "#7B8FA8", text: "On it. I'll have a first draft by Wednesday." },
  { speaker: "Priya L.", init: "P", color: "#A8836B", text: "I'll set up the sync for Thursday morning and send a calendar invite." },
];

export default function SceneTranscribe({ progress }: { progress: number }) {
  const visibleLines = Math.min(LINES.length, Math.floor(progress * (LINES.length + 1)));
  const isLive = progress < 0.95;

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-[#E5E2DC] shadow-xl shadow-black/6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#F7F6F3] border-b border-[#E5E2DC]">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-[#F0A89E]" />
            <div className="size-2.5 rounded-full bg-[#F0CDA0]" />
            <div className="size-2.5 rounded-full bg-[#A8D4A0]" />
          </div>
          <div className="flex items-center gap-1.5">
            {isLive && <span className="size-1.5 rounded-full bg-[#B84E44] animate-pulse" />}
            <span className="text-[11px] text-[#9B958E]">{isLive ? "Recording · Live Transcript" : "Transcript complete"}</span>
          </div>
          <span className="text-[11px] text-[#9B958E]">3 speakers</span>
        </div>

        {/* Transcript stream */}
        <div className="p-4 space-y-3 max-h-72 overflow-hidden">
          {LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className="flex gap-3 items-start"
              style={{ animation: "slideIn 0.35s ease-out both" }}
            >
              <div
                className="shrink-0 size-6 rounded-full grid place-items-center text-[10px] font-bold text-white mt-0.5"
                style={{ backgroundColor: line.color }}
              >
                {line.init}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-[11px] font-semibold text-[#1a1a1a]">{line.speaker}</span>
                  <span className="text-[10px] text-[#9B958E]">{`0:${String(i * 17 + 4).padStart(2, "0")}`}</span>
                </div>
                <p className="text-[12.5px] text-[#6B6560] leading-relaxed">{line.text}</p>
              </div>
            </div>
          ))}

          {/* Live cursor */}
          {isLive && visibleLines < LINES.length && (
            <div className="flex items-center gap-2 pl-9">
              <div className="flex gap-[3px] items-end h-3">
                {[3, 5, 4, 6, 3, 5].map((h, i) => (
                  <div key={i} className="w-[2px] rounded-full bg-[#6B8F63] animate-pulse" style={{ height: `${h}px`, animationDelay: `${i * 90}ms` }} />
                ))}
              </div>
              <span className="text-[10px] text-[#9B958E]">Transcribing…</span>
            </div>
          )}
        </div>

        {/* Stats bar */}
        <div className="px-4 py-2.5 border-t border-[#E5E2DC] bg-[#F9F8F5] flex items-center gap-5">
          {[
            { label: "Words",    val: String(Math.floor(progress * 187)) },
            { label: "Speakers", val: "3" },
            { label: "Accuracy", val: "98.4%" },
          ].map((s) => (
            <div key={s.label}>
              <span className="text-[11px] font-semibold text-[#1a1a1a]">{s.val}</span>
              <span className="text-[10px] text-[#9B958E] ml-1">{s.label}</span>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-[#5A8F50]" />
            <span className="text-[10px] text-[#5A8F50] font-medium">98% confidence</span>
          </div>
        </div>
      </div>
    </div>
  );
}
