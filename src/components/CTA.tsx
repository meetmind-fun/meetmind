const faqs = [
  {
    q: "How does MeetMind join my meetings?",
    a: "You invite MeetMind as a calendar guest or share the meeting link. It joins as a participant, listens, and leaves when the call ends. No browser extensions or plugins needed.",
  },
  {
    q: "Which meeting platforms are supported?",
    a: "Zoom, Google Meet, and Microsoft Teams at launch. Webex and Loom support is on the roadmap for Q1 2026.",
  },
  {
    q: "Is my meeting data private and secure?",
    a: "Absolutely. All recordings and transcripts are encrypted in transit and at rest. We are SOC 2 Type II certified and fully GDPR compliant. Your data is never used to train our models.",
  },
  {
    q: "How accurate is the transcription?",
    a: "We consistently achieve 97–99% word accuracy across clear audio in supported languages. Accuracy adjusts dynamically for accents, technical vocabulary, and cross-talk.",
  },
  {
    q: "Can MeetMind understand jargon and technical terms specific to my company?",
    a: "Yes. Pro and Enterprise plans support a custom vocabulary so MeetMind learns your product names, internal terms, and abbreviations.",
  },
  {
    q: "How long does it take to get the summary after a call?",
    a: "For most calls, the full summary, action items, and decision log are ready within 60 seconds of the meeting ending.",
  },
];

export default function CTA() {
  return (
    <section className="py-20 px-5 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold tracking-widest text-[#9B958E] uppercase mb-3">FAQ</p>
          <h2 className="text-3xl font-bold text-[#1a1a1a]">Common questions</h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-[#FDFCFB] border border-[#E8E4DE] rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-[14px] font-medium text-[#1a1a1a] hover:text-[#3A5C34] transition-colors list-none select-none">
                {faq.q}
                <span className="ml-4 shrink-0 size-5 rounded-full border border-[#E0DCD6] grid place-items-center text-[#9B958E] text-sm group-open:rotate-45 transition-transform duration-200">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-[13px] text-[#6B6560] leading-relaxed border-t border-[#E8E4DE] pt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
