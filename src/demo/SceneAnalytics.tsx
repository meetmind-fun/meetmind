// Scene: Meeting analytics dashboard
const WEEKLY = [
  { day: "Mon", meetings: 4, actions: 8  },
  { day: "Tue", meetings: 6, actions: 14 },
  { day: "Wed", meetings: 3, actions: 6  },
  { day: "Thu", meetings: 7, actions: 19 },
  { day: "Fri", meetings: 2, actions: 5  },
];

const SPEAKERS = [
  { name: "Sarah K.", pct: 38, color: "#6B8F63" },
  { name: "James M.", pct: 34, color: "#7B8FA8" },
  { name: "Priya L.", pct: 28, color: "#A8836B" },
];

export default function SceneAnalytics({ progress }: { progress: number }) {
  const showCards   = progress > 0.05;
  const showChart   = progress > 0.25;
  const showSpeaker = progress > 0.6;
  const chartProg   = Math.max(0, (progress - 0.25) / 0.35);

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="w-full max-w-xl space-y-3">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9B958E]">Meeting Intelligence</p>
            <p className="text-[15px] font-bold text-[#1a1a1a]">Team Overview · Jan 2025</p>
          </div>
          <span className="text-[11px] bg-[#EDF5EC] text-[#3A5C34] font-semibold px-3 py-1 rounded-full border border-[#C9DEC5]">This week</span>
        </div>

        {/* KPI cards */}
        <div
          className="grid grid-cols-4 gap-2.5 transition-all duration-500"
          style={{ opacity: showCards ? 1 : 0 }}
        >
          {[
            { label: "Meetings",      val: "22",   sub: "+4 vs last wk", up: true  },
            { label: "Action items",  val: "52",   sub: "18 completed",  up: true  },
            { label: "Decisions",     val: "31",   sub: "logged",        up: false },
            { label: "Hrs reclaimed", val: "14.5", sub: "saved on notes",up: true  },
          ].map((k) => (
            <div key={k.label} className="bg-white border border-[#E5E2DC] rounded-xl p-3 text-center">
              <p className="text-[18px] font-bold text-[#1a1a1a]">{k.val}</p>
              <p className="text-[9px] text-[#9B958E]">{k.label}</p>
              <p className={`text-[9px] font-medium mt-0.5 ${k.up ? "text-[#3A5C34]" : "text-[#9B958E]"}`}>{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div
          className="bg-white border border-[#E5E2DC] rounded-2xl p-4 transition-all duration-500"
          style={{ opacity: showChart ? 1 : 0 }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9B958E] mb-3">Action Items Created vs Week</p>
          <div className="flex items-end gap-3 h-20">
            {WEEKLY.map((w, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col-reverse gap-0.5" style={{ height: "64px" }}>
                  <div
                    className="w-full rounded-t-md bg-[#3A5C34] transition-all duration-700"
                    style={{ height: `${Math.floor(w.actions / 19 * 64 * Math.min(1, chartProg * 2))}px`, opacity: 0.7 }}
                  />
                </div>
                <p className="text-[9px] text-[#9B958E]">{w.day}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Speaker breakdown */}
        {showSpeaker && (
          <div className="bg-white border border-[#E5E2DC] rounded-2xl p-4" style={{ animation: "slideIn 0.4s ease-out" }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9B958E] mb-3">Speaking Time · Q3 Kickoff</p>
            <div className="space-y-2.5">
              {SPEAKERS.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[11px] text-[#4A4540] font-medium">{s.name}</span>
                    <span className="text-[11px] text-[#9B958E]">{s.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-[#F0EDE8] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${s.pct}%`, backgroundColor: s.color, opacity: 0.75 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
