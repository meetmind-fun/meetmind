const testimonials = [
  {
    quote: "I used to spend 20 minutes after every standup writing up notes. MeetMind does it in 10 seconds. The action item extraction is eerily accurate.",
    name: "Alex J.", role: "Engineering Manager · Stripe",
    initials: "AJ", color: "#5A6A9E",
  },
  {
    quote: "Our sales team runs 40+ calls a week. MeetMind turning those into CRM updates automatically saved us 3 hours per rep per week. That's real, measurable money.",
    name: "Dana P.", role: "VP Sales · Series B SaaS",
    initials: "DP", color: "#4A7A6B",
  },
  {
    quote: "The decision registry is the feature I didn't know I needed. We can now look back at why we made any product call from 6 months ago. That context is priceless.",
    name: "Sarah M.", role: "Head of Product · Fintech startup",
    initials: "SM", color: "#A07030",
  },
  {
    quote: "We're a remote team across 5 time zones. MeetMind means everyone is fully looped in even if they miss a call. It's genuinely levelled the playing field.",
    name: "Raj K.", role: "CEO · Distributed-first startup",
    initials: "RK", color: "#3A5C34",
  },
  {
    quote: "I was sceptical — I've tried every meeting tool out there. MeetMind is the only one I've kept running past the trial. The speaker labels alone are worth it.",
    name: "Mia T.", role: "UX Lead · Design Agency",
    initials: "MT", color: "#9E6B5A",
  },
  {
    quote: "As a VC I sit in 8–10 portfolio calls a day. MeetMind's summaries mean I'm never scrambling for context before a follow-up. It's become my unfair advantage.",
    name: "Ben O.", role: "Partner · Early-stage VC",
    initials: "BO", color: "#7A8FB0",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-5 bg-[#F7F6F3]">
      <div className="max-w-6xl mx-auto">

        <div className="max-w-xl mb-14">
          <p className="text-xs font-semibold tracking-widest text-[#9B958E] uppercase mb-4">What people say</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] leading-[1.2] mb-4">
            Teams that run better meetings
          </h2>
          <p className="text-[16px] text-[#6B6560] leading-relaxed">
            From our private beta. Real teams, real results.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="break-inside-avoid bg-white border border-[#E8E4DE] rounded-2xl p-6 hover:border-[#CEC9C0] hover:shadow-md hover:shadow-black/4 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1,2,3,4,5].map((j) => <span key={j} className="text-[#E0BA5A] text-sm">★</span>)}
              </div>
              <p className="text-[13.5px] text-[#4A4540] leading-relaxed mb-5">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div
                  className="size-8 rounded-full grid place-items-center text-white text-[11px] font-bold shrink-0"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#1a1a1a]">{t.name}</p>
                  <p className="text-[11px] text-[#9B958E]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
