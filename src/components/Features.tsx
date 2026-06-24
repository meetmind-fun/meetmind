import { AudioLines, Users, GitBranch, Shield, Globe, BarChart3, Lightbulb, Bell } from "lucide-react";

const features = [
  { icon: AudioLines, title: "Real-time Transcription",   desc: "Word-by-word live transcript with 98% accuracy across 50+ languages, with a speaker label on every line.",          color: "#5A6A9E", bg: "#F0F2FA" },
  { icon: Users,      title: "Speaker Intelligence",      desc: "Automatically identifies and names each speaker, tracking contribution, speaking time, and engagement throughout.",  color: "#4A7A6B", bg: "#EEF5F3" },
  { icon: GitBranch,  title: "Action Item Tracking",      desc: "Every task assigned in a call becomes a tracked item, synced to Jira, Linear, or Asana — automatically.",          color: "#3A5C34", bg: "#EDF5EC" },
  { icon: Lightbulb,  title: "Decision Registry",         desc: "All decisions are logged with context and rationale, building a searchable history of every choice your team makes.", color: "#A07030", bg: "#FDF6ED" },
  { icon: BarChart3,  title: "Meeting Analytics",         desc: "Understand meeting ROI, participation equity, recurring topics, and time-to-action across your whole organisation.",  color: "#7A8FB0", bg: "#EFF2F8" },
  { icon: Globe,      title: "Multilingual",              desc: "Transcribe in one language, receive summaries in another. Built for global, distributed teams.",                     color: "#9E6B5A", bg: "#FDF0EE" },
  { icon: Shield,     title: "Enterprise-grade Security", desc: "SOC 2 Type II, GDPR compliant, end-to-end encrypted. Your meeting data never trains our models. Ever.",             color: "#4A7A6B", bg: "#EEF5F3" },
  { icon: Bell,       title: "Smart Follow-ups",          desc: "MeetMind nudges owners before deadlines, resurfaces unresolved items in your next meeting, and closes the loop.",   color: "#A07030", bg: "#FDF6ED" },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">

        <div className="max-w-xl mb-14">
          <p className="text-xs font-semibold tracking-widest text-[#9B958E] uppercase mb-4">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] leading-[1.2] mb-5">
            Everything you need.<br />Nothing you don't.
          </h2>
          <p className="text-[16px] text-[#6B6560] leading-relaxed">
            A complete meeting intelligence layer — designed to disappear into your workflow and just work.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-[#E8E4DE] bg-[#FDFCFB] hover:border-[#CEC9C0] hover:shadow-md hover:shadow-black/4 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
            >
              <div className="size-9 rounded-xl grid place-items-center mb-4" style={{ backgroundColor: f.bg }}>
                <f.icon className="size-4.5" style={{ color: f.color }} strokeWidth={1.75} />
              </div>
              <h3 className="text-[14px] font-semibold text-[#1a1a1a] mb-2">{f.title}</h3>
              <p className="text-[12.5px] text-[#6B6560] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
