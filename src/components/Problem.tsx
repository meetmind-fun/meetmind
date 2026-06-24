import { Clock, Brain, CheckSquare, TrendingDown } from "lucide-react";

const stats = [
  { icon: Clock,        color: "#B84E44", bg: "#FDF0EE", val: "31 hrs",  label: "Wasted per employee per month", sub: "Nearly a full work week — gone." },
  { icon: Brain,        color: "#A07030", bg: "#FDF6ED", val: "90%",     label: "Of meeting content forgotten in 24 h", sub: "Critical context lost between every call." },
  { icon: CheckSquare,  color: "#5A6A9E", bg: "#F0F2FA", val: "72%",     label: "Of action items never completed", sub: "Decisions vanish the moment the call ends." },
  { icon: TrendingDown, color: "#4A7A6B", bg: "#EEF5F3", val: "$37B",    label: "Lost annually to bad meetings (US)", sub: "In the US alone. Every single year." },
];

export default function Problem() {
  return (
    <section id="product" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#9B958E] uppercase mb-4">The Problem</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] leading-[1.2] mb-5">
              Meetings are one of the most expensive habits in business.
            </h2>
            <p className="text-[16px] text-[#6B6560] leading-relaxed mb-6">
              Every professional attends 11.5 meetings per week. Most leave without a clear record of what was decided or who is responsible for what.
            </p>
            <p className="text-[16px] text-[#6B6560] leading-relaxed">
              The real cost isn't the meeting itself — it's all the follow-up that doesn't happen. Dropped actions. Forgotten context. Decisions revisited from scratch.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.val}
                className="p-5 rounded-2xl border border-[#E8E4DE] bg-[#FDFCFB] hover:shadow-md hover:shadow-black/4 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="size-9 rounded-xl grid place-items-center mb-4" style={{ backgroundColor: s.bg }}>
                  <s.icon className="size-4.5" style={{ color: s.color }} strokeWidth={1.75} />
                </div>
                <div className="text-[26px] font-bold text-[#1a1a1a] tracking-tight mb-1">{s.val}</div>
                <p className="text-[12.5px] text-[#6B6560] leading-snug mb-1.5">{s.label}</p>
                <p className="text-[11px] text-[#9B958E] italic">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bridge callout */}
        <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-5 p-7 rounded-2xl bg-[#F3F7F2] border border-[#C9DEC5]">
          <div className="shrink-0 size-11 rounded-xl bg-[#3A5C34] grid place-items-center shadow-sm">
            {/* Simple spark / lightbulb icon */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2a5 5 0 0 1 3.54 8.54A3 3 0 0 1 9 13a3 3 0 0 1-3.54-2.46A5 5 0 0 1 9 2Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round"/>
              <path d="M6.5 15.5h5M7.5 13v2.5M10.5 13v2.5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className="font-semibold text-[#1a1a1a] mb-1">MeetMind fixes this automatically.</p>
            <p className="text-[14px] text-[#6B6560] leading-relaxed">
              It joins every call, understands what's said, and delivers structured clarity — action items, decisions, and a full summary — within 60 seconds of the call ending.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
