import { TrendingUp, Target, Globe2, Zap } from "lucide-react";

const milestones = [
  { year: "2025", val: "$3.5B", barH: 10, note: "Today · 26% YoY" },
  { year: "2027", val: "$8.4B", barH: 25, note: "AI inflection" },
  { year: "2030", val: "$19B",  barH: 56, note: "Enterprise peak" },
  { year: "2035", val: "$34B",  barH: 100, note: "Mature global market" },
];

const segments = [
  { label: "Remote / hybrid teams",  pct: 78, color: "#6B5A9E" },
  { label: "Enterprise orgs",        pct: 63, color: "#4A7A6B" },
  { label: "Startups & scale-ups",   pct: 54, color: "#6B8F63" },
  { label: "Education & research",   pct: 31, color: "#B07A3E" },
];

const competitors = [
  { name: "Otter.ai",      focus: "Transcription only",                    dots: 3 },
  { name: "Fireflies.ai",  focus: "Notes + search",                        dots: 4 },
  { name: "Fathom",        focus: "CRM sync focused",                       dots: 3 },
  { name: "MeetMind ✦",   focus: "Full intelligence layer + token economy", dots: 5, highlight: true },
];

export default function Market() {
  return (
    <section id="market" className="py-24 px-5 bg-[#F7F6F3]">
      <div className="max-w-6xl mx-auto">

        <div className="max-w-xl mb-14">
          <p className="text-xs font-semibold tracking-widest text-[#9B958E] uppercase mb-3">Market Opportunity</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] leading-tight mb-4">
            A $34 billion wave
          </h2>
          <p className="text-[16px] text-[#6B6560] leading-relaxed">
            The AI meeting intelligence market is projected to grow 10× in a decade, driven by hybrid work and the AI adoption curve.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Market growth card */}
          <div className="lg:col-span-2 bg-white border border-[#E5E2DC] rounded-2xl p-7">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="size-4 text-[#6B8F63]" strokeWidth={1.75} />
              <span className="text-[13px] font-semibold text-[#1a1a1a]">Market Size Trajectory</span>
              <span className="text-[12px] text-[#9B958E]">· AI Meeting Assistants (Global)</span>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              {milestones.map((m) => (
                <div key={m.year} className="text-center">
                  <div className="text-[11px] text-[#9B958E] mb-1">{m.year}</div>
                  <div className="text-xl font-bold text-[#1a1a1a]">{m.val}</div>
                  <div className="text-[11px] text-[#9B958E] mt-0.5">{m.note}</div>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <div className="flex items-end gap-3 h-28 px-2 mb-2">
              {milestones.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-lg transition-all duration-700"
                    style={{
                      height: `${m.barH}%`,
                      background: `linear-gradient(to top, #4A6741, #8FB887)`,
                      opacity: 0.7 + i * 0.1,
                    }}
                  />
                  <span className="text-[10px] text-[#9B958E]">{m.year}</span>
                </div>
              ))}
            </div>

            <div className="pt-5 border-t border-[#E8E4DE] flex flex-wrap gap-5">
              {[
                { icon: Globe2,  label: "Global TAM: $34B (2035)" },
                { icon: Target,  label: "SAM: $8.2B (SMB + Enterprise)" },
                { icon: Zap,     label: "SOM: $820M (5-year target)" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <s.icon className="size-3.5 text-[#6B8F63]" strokeWidth={1.75} />
                  <span className="text-[12px] text-[#6B6560]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">

            {/* Segments */}
            <div className="bg-white border border-[#E5E2DC] rounded-2xl p-6">
              <h3 className="text-[13px] font-semibold text-[#1a1a1a] mb-4">Adoption by Segment</h3>
              <div className="space-y-3.5">
                {segments.map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[12px] text-[#6B6560]">{s.label}</span>
                      <span className="text-[12px] text-[#9B958E]">{s.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-[#F0EDE8] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${s.pct}%`, backgroundColor: s.color, opacity: 0.7 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitive */}
            <div className="bg-white border border-[#E5E2DC] rounded-2xl p-6 flex-1">
              <h3 className="text-[13px] font-semibold text-[#1a1a1a] mb-4">Competitive Landscape</h3>
              <div className="space-y-2.5">
                {competitors.map((c) => (
                  <div
                    key={c.name}
                    className={`p-3 rounded-xl border transition ${
                      c.highlight
                        ? "bg-[#F3F7F2] border-[#C5D9C1]"
                        : "bg-[#FDFCFB] border-[#E8E4DE]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[12px] font-semibold ${c.highlight ? "text-[#4A6741]" : "text-[#6B6560]"}`}>
                        {c.name}
                      </span>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((d) => (
                          <div
                            key={d}
                            className="size-1.5 rounded-full"
                            style={{
                              backgroundColor: d <= c.dots
                                ? c.highlight ? "#4A6741" : "#C5C0B8"
                                : "#E8E4DE"
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[11px] text-[#9B958E]">{c.focus}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
