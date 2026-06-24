import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "For individuals and small teams getting started.",
    cta: "Join the waitlist",
    ctaStyle: "border border-[#D8D3CB] bg-white text-[#1a1a1a] hover:bg-[#F0EDE8]",
    highlight: false,
    features: [
      "5 meetings / month",
      "Real-time transcription",
      "Action item extraction",
      "Basic summary email",
      "1 integration",
      "7-day history",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    period: "/ month per user",
    desc: "For growing teams who need more depth and control.",
    cta: "Join the waitlist",
    ctaStyle: "bg-[#3A5C34] text-white hover:bg-[#2E4A29] shadow-md shadow-[#3A5C34]/20",
    highlight: true,
    features: [
      "Unlimited meetings",
      "Speaker intelligence",
      "Decision registry",
      "Meeting analytics",
      "10 integrations",
      "90-day history",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large organisations with advanced security and compliance needs.",
    cta: "Join the waitlist",
    ctaStyle: "border border-[#D8D3CB] bg-white text-[#1a1a1a] hover:bg-[#F0EDE8]",
    highlight: false,
    features: [
      "Everything in Pro",
      "SSO & admin controls",
      "SOC 2 Type II",
      "Custom data retention",
      "Unlimited integrations",
      "Dedicated success manager",
      "SLA guarantee",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-5 bg-[#F7F6F3]">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest text-[#9B958E] uppercase mb-4">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-[16px] text-[#6B6560] max-w-md mx-auto">
            Start free. Upgrade when you're ready. No surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl p-7 flex flex-col transition-all duration-300 ${
                p.highlight
                  ? "bg-[#3A5C34] text-white shadow-xl shadow-[#3A5C34]/20 -translate-y-2"
                  : "bg-white border border-[#E5E2DC] hover:shadow-md hover:shadow-black/5"
              }`}
            >
              <div className="mb-6">
                <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${p.highlight ? "text-[#A8D0A0]" : "text-[#9B958E]"}`}>
                  {p.name}
                </p>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className={`text-3xl font-bold ${p.highlight ? "text-white" : "text-[#1a1a1a]"}`}>{p.price}</span>
                  {p.period && <span className={`text-[13px] ${p.highlight ? "text-[#A8D0A0]" : "text-[#9B958E]"}`}>{p.period}</span>}
                </div>
                <p className={`text-[13px] leading-relaxed ${p.highlight ? "text-[#C5DFC0]" : "text-[#6B6560]"}`}>{p.desc}</p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <div className={`size-4 rounded-full grid place-items-center shrink-0 ${p.highlight ? "bg-white/15" : "bg-[#EDF5EC]"}`}>
                      <Check className={`size-2.5 ${p.highlight ? "text-[#A8D0A0]" : "text-[#3A5C34]"}`} strokeWidth={2.5} />
                    </div>
                    <span className={`text-[13px] ${p.highlight ? "text-white/90" : "text-[#4A4540]"}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className={`block text-center text-sm font-semibold py-3 rounded-full transition-colors duration-200 ${p.ctaStyle}`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-[12px] text-[#9B958E] mt-8">
          We're in private beta. Join the waitlist to get early access when we open up.
        </p>

      </div>
    </section>
  );
}
