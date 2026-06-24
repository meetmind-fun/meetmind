// Scene: The Problem — animated stat cards appear one by one
// no hooks needed here
import { Clock, Brain, CheckSquare, TrendingDown } from "lucide-react";

const stats = [
  { icon: Clock,        val: "31 hrs",  label: "wasted per employee / month",     color: "#B84E44", bg: "#FDF0EE" },
  { icon: Brain,        val: "90%",     label: "of meeting content forgotten",     color: "#A07030", bg: "#FDF6ED" },
  { icon: CheckSquare,  val: "72%",     label: "of action items never completed",  color: "#5A6A9E", bg: "#F0F2FA" },
  { icon: TrendingDown, val: "$37B",    label: "lost annually (US)",               color: "#4A7A6B", bg: "#EEF5F3" },
];

export default function SceneIntro({ progress }: { progress: number }) {
  const visible = Math.floor(progress * (stats.length + 0.99));
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <p className="text-[11px] font-semibold tracking-widest text-[#9B958E] uppercase mb-3">Before MeetMind</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a]">Meetings are broken — and costly</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        {stats.map((s, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border border-[#E8E4DE] bg-white transition-all duration-500"
            style={{
              opacity: i < visible ? 1 : 0,
              transform: i < visible ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <div className="size-8 rounded-xl grid place-items-center mb-3" style={{ backgroundColor: s.bg }}>
              <s.icon className="size-4" style={{ color: s.color }} strokeWidth={1.75} />
            </div>
            <div className="text-2xl font-bold text-[#1a1a1a] mb-0.5">{s.val}</div>
            <p className="text-[12px] text-[#6B6560]">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
