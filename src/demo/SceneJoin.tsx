// Scene: MeetMind joins the video call
export default function SceneJoin({ progress }: { progress: number }) {
  const showBadge   = progress > 0.2;
  const showStatus  = progress > 0.5;
  const showReady   = progress > 0.78;

  const participants = [
    { name: "Sarah K.", init: "S", color: "#6B8F63", speaking: progress > 0.55 && progress < 0.75 },
    { name: "James M.", init: "J", color: "#7B8FA8", speaking: false },
    { name: "Priya L.", init: "P", color: "#A8836B", speaking: false },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-[#1C1C1E] rounded-2xl overflow-hidden shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#2C2C2E]">
          <span className="text-[12px] text-white/60">Q3 Planning · Kickoff</span>
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-[#4CAF50]" />
            <span className="text-[11px] text-white/50">Connected</span>
          </div>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-3 gap-2 p-3">
          {participants.map((p) => (
            <div
              key={p.name}
              className="aspect-video rounded-xl flex flex-col items-center justify-center gap-2 relative"
              style={{ backgroundColor: p.color + "22", border: p.speaking ? `2px solid ${p.color}` : "2px solid transparent" }}
            >
              <div className="size-10 rounded-full grid place-items-center text-white font-bold text-sm" style={{ backgroundColor: p.color }}>
                {p.init}
              </div>
              <p className="text-[10px] text-white/70">{p.name}</p>
              {p.speaking && (
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-0.5 items-end h-3">
                  {[3, 5, 4, 6, 3].map((h, i) => (
                    <div key={i} className="w-0.5 rounded-full animate-pulse" style={{ height: `${h}px`, backgroundColor: p.color, animationDelay: `${i * 100}ms` }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* MeetMind participant tile */}
        <div className="px-3 pb-3">
          <div
            className="rounded-xl border border-[#3A5C34]/60 bg-[#3A5C34]/10 px-4 py-3 flex items-center gap-3 transition-all duration-500"
            style={{ opacity: showBadge ? 1 : 0, transform: showBadge ? "translateY(0)" : "translateY(10px)" }}
          >
            <div className="size-8 rounded-lg bg-[#3A5C34] grid place-items-center shrink-0">
              <svg width="14" height="14" viewBox="0 0 40 40" fill="none">
                <rect x="6"  y="17" width="4" height="6"  rx="2" fill="white" opacity="0.4"/>
                <rect x="13" y="12" width="4" height="16" rx="2" fill="white" opacity="0.65"/>
                <rect x="20" y="8"  width="4" height="24" rx="2" fill="white"/>
                <rect x="27" y="12" width="4" height="16" rx="2" fill="white" opacity="0.65"/>
                <rect x="34" y="17" width="4" height="6"  rx="2" fill="white" opacity="0.4"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[12px] font-semibold text-[#A8D0A0]">MeetMind AI · Listening</p>
              <p
                className="text-[10px] text-[#6B9E6B] transition-all duration-500"
                style={{ opacity: showStatus ? 1 : 0 }}
              >
                {showReady ? "✓ Transcription active · Real-time" : "Initialising transcription engine…"}
              </p>
            </div>
            <div className="flex gap-[3px] items-end h-4">
              {[3, 5, 7, 5, 3, 6, 4].map((h, i) => (
                <div
                  key={i}
                  className="w-[2px] rounded-full bg-[#6B9E6B] animate-pulse"
                  style={{ height: `${h}px`, animationDelay: `${i * 80}ms`, opacity: showStatus ? 0.8 : 0 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
