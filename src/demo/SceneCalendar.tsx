// Scene: Calendar invite — MeetMind being added as a guest
export default function SceneCalendar({ progress }: { progress: number }) {
  const showMeetmind = progress > 0.35;
  const showConfirm  = progress > 0.72;

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#E5E2DC] shadow-xl shadow-black/6 overflow-hidden">
        {/* Header */}
        <div className="bg-[#3A5C34] px-5 py-4">
          <p className="text-white/60 text-[11px] font-semibold uppercase tracking-widest mb-1">Google Calendar</p>
          <p className="text-white font-semibold text-lg">Q3 Planning · Kickoff</p>
          <p className="text-white/70 text-[13px] mt-0.5">Tuesday, 14 Jan · 10:00 – 11:00 AM</p>
        </div>

        <div className="p-5 space-y-4">
          {/* Guests */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9B958E] mb-2">Guests</p>
            <div className="space-y-2">
              {[
                { name: "Sarah Kim",  email: "sarah@acme.com",  init: "S", color: "#6B8F63" },
                { name: "James Mori", email: "james@acme.com",  init: "J", color: "#7B8FA8" },
                { name: "Priya Lal",  email: "priya@acme.com",  init: "P", color: "#A8836B" },
              ].map((g) => (
                <div key={g.email} className="flex items-center gap-2.5">
                  <div className="size-7 rounded-full grid place-items-center text-white text-[11px] font-bold" style={{ backgroundColor: g.color }}>{g.init}</div>
                  <div>
                    <p className="text-[12px] font-medium text-[#1a1a1a]">{g.name}</p>
                    <p className="text-[10px] text-[#9B958E]">{g.email}</p>
                  </div>
                </div>
              ))}

              {/* MeetMind appearing */}
              <div
                className="flex items-center gap-2.5 transition-all duration-500"
                style={{ opacity: showMeetmind ? 1 : 0, transform: showMeetmind ? "translateY(0)" : "translateY(8px)" }}
              >
                <div className="size-7 rounded-lg bg-[#3A5C34] grid place-items-center">
                  <svg width="12" height="12" viewBox="0 0 40 40" fill="none">
                    <rect x="6" y="17" width="4" height="6" rx="2" fill="white" opacity="0.4"/>
                    <rect x="13" y="12" width="4" height="16" rx="2" fill="white" opacity="0.65"/>
                    <rect x="20" y="8" width="4" height="24" rx="2" fill="white"/>
                    <rect x="27" y="12" width="4" height="16" rx="2" fill="white" opacity="0.65"/>
                    <rect x="34" y="17" width="4" height="6" rx="2" fill="white" opacity="0.4"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-[#3A5C34]">MeetMind AI</p>
                  <p className="text-[10px] text-[#9B958E]">meet@meetmind.app · AI notetaker</p>
                </div>
                <span className="ml-auto text-[10px] bg-[#EDF5EC] text-[#3A5C34] font-semibold px-2 py-0.5 rounded-full">Added</span>
              </div>
            </div>
          </div>

          {/* Confirm banner */}
          <div
            className="rounded-xl bg-[#F3F7F2] border border-[#C9DEC5] px-4 py-3 transition-all duration-500"
            style={{ opacity: showConfirm ? 1 : 0 }}
          >
            <p className="text-[12px] font-semibold text-[#3A5C34] mb-0.5">✓ MeetMind will join automatically</p>
            <p className="text-[11px] text-[#6B6560]">Summary, action items and decisions delivered within 60 seconds of the call ending.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
