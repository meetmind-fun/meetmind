// Scene: CTA outro
import { ArrowRight } from "lucide-react";

export default function SceneOutro({ progress }: { progress: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-8 text-center">
      <div
        className="size-16 rounded-2xl bg-[#3A5C34] grid place-items-center shadow-xl shadow-[#3A5C34]/20 transition-all duration-700"
        style={{ opacity: progress > 0.1 ? 1 : 0, transform: progress > 0.1 ? "scale(1)" : "scale(0.8)" }}
      >
        <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
          <rect x="6"  y="17" width="4" height="6"  rx="2" fill="white" opacity="0.4"/>
          <rect x="13" y="12" width="4" height="16" rx="2" fill="white" opacity="0.65"/>
          <rect x="20" y="8"  width="4" height="24" rx="2" fill="white"/>
          <rect x="27" y="12" width="4" height="16" rx="2" fill="white" opacity="0.65"/>
          <rect x="34" y="17" width="4" height="6"  rx="2" fill="white" opacity="0.4"/>
        </svg>
      </div>

      <div
        className="transition-all duration-700"
        style={{ opacity: progress > 0.25 ? 1 : 0, transform: progress > 0.25 ? "translateY(0)" : "translateY(12px)" }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-3">
          Your next meeting deserves to count.
        </h2>
        <p className="text-[15px] text-[#6B6560] max-w-sm mx-auto leading-relaxed">
          MeetMind is free to try. No credit card. No change to how your team works. Just better outcomes from every call.
        </p>
      </div>

      <div
        className="flex flex-col sm:flex-row gap-3 transition-all duration-700"
        style={{ opacity: progress > 0.55 ? 1 : 0, transform: progress > 0.55 ? "translateY(0)" : "translateY(8px)" }}
      >
        <a
          href="#waitlist"
          className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#3A5C34] text-white font-semibold text-sm hover:bg-[#2E4A29] transition-colors shadow-md shadow-[#3A5C34]/20"
        >
          Join the waitlist
          <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
        <a
          href="#"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#D8D3CB] bg-white text-[#1a1a1a] font-semibold text-sm hover:bg-[#F0EDE8] transition-colors"
        >
          Book a demo
        </a>
      </div>

      <div
        className="flex flex-wrap gap-5 justify-center text-[12px] text-[#9B958E] transition-all duration-700"
        style={{ opacity: progress > 0.75 ? 1 : 0 }}
      >
        <span>✓ Free plan available</span>
        <span>✓ No credit card</span>
        <span>✓ Cancel any time</span>
      </div>
    </div>
  );
}
