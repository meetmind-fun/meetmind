import { Video, Cpu, ListChecks, Send } from "lucide-react";

const steps = [
  {
    n: "01", icon: Video,
    iconColor: "#5A6A9E", iconBg: "#F0F2FA",
    title: "Invite MeetMind",
    body: "Add MeetMind as a participant to any Zoom, Google Meet, or Teams call. It joins silently — no plugins, no setup.",
    note: "Works on any platform.",
  },
  {
    n: "02", icon: Cpu,
    iconColor: "#4A7A6B", iconBg: "#EEF5F3",
    title: "AI understands the call",
    body: "Real-time transcription with speaker identification. MeetMind recognises context and intent — not just words.",
    note: "50+ languages · 98% accuracy.",
  },
  {
    n: "03", icon: ListChecks,
    iconColor: "#A07030", iconBg: "#FDF6ED",
    title: "Extracts what matters",
    body: "Action items, owners, deadlines, decisions, and risks are identified and structured automatically. Zero manual work.",
    note: "No tagging or training needed.",
  },
  {
    n: "04", icon: Send,
    iconColor: "#3A5C34", iconBg: "#EDF5EC",
    title: "Delivered to your stack",
    body: "A crisp summary lands in Slack, Notion, Jira, or email within 60 seconds. Your CRM is updated. Everyone is aligned.",
    note: "30+ integrations at launch.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 px-5 bg-[#F7F6F3]">
      <div className="max-w-6xl mx-auto">

        <div className="max-w-xl mb-14">
          <p className="text-xs font-semibold tracking-widest text-[#9B958E] uppercase mb-4">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] leading-[1.2] mb-5">
            From chaotic call to clear action — in 60 seconds
          </h2>
          <p className="text-[16px] text-[#6B6560] leading-relaxed">
            Four steps. Fully automatic. Nothing changes about how your team runs meetings.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div
              key={i}
              className="group bg-white border border-[#E5E2DC] rounded-2xl p-6 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="size-10 rounded-xl grid place-items-center" style={{ backgroundColor: s.iconBg }}>
                  <s.icon className="size-5" style={{ color: s.iconColor }} strokeWidth={1.75} />
                </div>
                <span className="text-[30px] font-bold text-[#EAE6E0] font-mono leading-none select-none">{s.n}</span>
              </div>
              <h3 className="text-[15px] font-semibold text-[#1a1a1a] mb-2">{s.title}</h3>
              <p className="text-[13px] text-[#6B6560] leading-relaxed mb-4">{s.body}</p>
              <p className="text-[11px] font-medium text-[#9B958E]">{s.note}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
