const team = [
  {
    name: "Aria Chen", role: "CEO & Co-founder", initials: "AC", color: "#5A6A9E",
    bio: "Ex-Otter.ai product lead. Stanford CS. Built meeting products used by 2M+ teams.",
    tags: ["Stanford CS", "Ex-Otter.ai"],
  },
  {
    name: "Marcus Webb", role: "CTO & Co-founder", initials: "MW", color: "#4A7A6B",
    bio: "8 years in NLP and speech recognition. Published researcher in speaker diarisation.",
    tags: ["PhD NLP · MIT", "Ex-Deepgram"],
  },
  {
    name: "Priya Sharma", role: "Head of Product", initials: "PS", color: "#A07030",
    bio: "Former PM at Notion and Asana. Drove Notion AI features from zero to 20M+ users.",
    tags: ["Ex-Notion PM", "Harvard MBA"],
  },
  {
    name: "Tom Okonkwo", role: "Head of Growth", initials: "TO", color: "#3A5C34",
    bio: "Built three B2B SaaS go-to-market motions from zero to product-market fit.",
    tags: ["Ex-Intercom", "3× 0→1 GTM"],
  },
];

const advisors = [
  { name: "Dr. Julia Marks", role: "AI Research · ex-Google DeepMind", initials: "JM", color: "#9E6B5A" },
  { name: "Kevin Park",       role: "GTM · ex-Zoom VP Sales",           initials: "KP", color: "#5A6A9E" },
  { name: "Sofia Reyes",      role: "Enterprise · ex-Salesforce",       initials: "SR", color: "#4A7A6B" },
];

export default function Team() {
  return (
    <section id="team" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">

        <div className="max-w-xl mb-14">
          <p className="text-xs font-semibold tracking-widest text-[#9B958E] uppercase mb-4">Team</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] leading-[1.2] mb-5">
            Built by people who lived the problem
          </h2>
          <p className="text-[16px] text-[#6B6560] leading-relaxed">
            Our founding team has shipped meeting products to millions — and sat through thousands of terrible calls. We know exactly what needs fixing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {team.map((m) => (
            <div
              key={m.name}
              className="bg-[#FDFCFB] border border-[#E5E2DC] rounded-2xl p-6 hover:shadow-md hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div
                className="size-12 rounded-2xl grid place-items-center text-white font-bold text-[16px] mb-4"
                style={{ backgroundColor: m.color }}
              >
                {m.initials}
              </div>
              <h3 className="text-[15px] font-semibold text-[#1a1a1a]">{m.name}</h3>
              <p className="text-[12px] font-medium mb-3" style={{ color: m.color }}>{m.role}</p>
              <p className="text-[12.5px] text-[#6B6560] leading-relaxed mb-4">{m.bio}</p>
              <div className="flex flex-wrap gap-1.5">
                {m.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#F0EDE8] border border-[#E0DCD6] text-[#6B6560]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <p className="text-[11px] text-[#9B958E] uppercase tracking-wider text-center mb-5">Advisors</p>
          <div className="flex flex-wrap justify-center gap-3">
            {advisors.map((a) => (
              <div
                key={a.name}
                className="flex items-center gap-3 bg-[#FDFCFB] border border-[#E5E2DC] rounded-xl px-4 py-3 hover:border-[#CEC9C0] transition"
              >
                <div
                  className="size-8 rounded-full grid place-items-center text-white font-bold text-[11px] shrink-0"
                  style={{ backgroundColor: a.color }}
                >
                  {a.initials}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#1a1a1a]">{a.name}</p>
                  <p className="text-[11px] text-[#9B958E]">{a.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
