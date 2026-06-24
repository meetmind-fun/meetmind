import { useEffect, useRef, useState } from "react";
import { Play, ArrowRight } from "lucide-react";

const TRANSCRIPT = [
  { speaker: "Sarah K.", initial: "S", color: "#6B8F63", time: "0:04", text: "Alright team, let's finalise the Q3 roadmap. We need clarity on priorities before end of week." },
  { speaker: "James M.", initial: "J", color: "#7B8FA8", time: "0:21", text: "I think mobile should lead. Our data shows 70% of sign-ups come from mobile devices." },
  { speaker: "Priya L.", initial: "P", color: "#A8836B", time: "0:38", text: "Agreed. We also need the API contract locked with backend — ideally before next Friday." },
  { speaker: "Sarah K.", initial: "S", color: "#6B8F63", time: "0:55", text: "Perfect. James, can you own the mobile spec? Priya, please schedule the API sync." },
];

const ACTIONS = [
  { owner: "James M.", task: "Own mobile app specification doc", due: "by Friday" },
  { owner: "Priya L.", task: "Schedule API sync with backend team", due: "by Friday" },
  { owner: "Sarah K.", task: "Share Q3 roadmap draft with stakeholders", due: "next week" },
];

const DECISIONS = [
  "Mobile app leads Q3 roadmap",
  "API contracts finalised by Friday",
];

export default function Hero({ onWatchDemo }: { onWatchDemo?: () => void }) {
  const [line, setLine]               = useState(0);
  const [showActions, setShowActions] = useState(false);
  const [showDecisions, setShowDec]   = useState(false);
  const [playing, setPlaying]         = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clear() { timers.current.forEach(clearTimeout); timers.current = []; }

  function startDemo() {
    clear();
    setLine(0); setShowActions(false); setShowDec(false); setPlaying(true);
    TRANSCRIPT.forEach((_, i) => {
      timers.current.push(setTimeout(() => setLine(i + 1), (i + 1) * 1600));
    });
    const base = TRANSCRIPT.length * 1600;
    timers.current.push(setTimeout(() => setShowActions(true), base + 400));
    timers.current.push(setTimeout(() => setShowDec(true),    base + 900));
    timers.current.push(setTimeout(() => setPlaying(false),   base + 1400));
  }

  useEffect(() => {
    const t = setTimeout(startDemo, 500);
    return () => { clearTimeout(t); clear(); };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-5 bg-[#F7F6F3] overflow-hidden">
      {/* Background warmth */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#D9EAD5] opacity-35 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0  w-[500px] h-[500px] rounded-full bg-[#DDD8F0] opacity-22 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">

        {/* ── Copy ── */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-[#ECF4EA] border border-[#C9DEC5] rounded-full px-3.5 py-1.5 mb-7">
            <span className="size-1.5 rounded-full bg-[#5A8F50] animate-pulse-soft" />
            <span className="text-xs font-medium text-[#3A5C34]">Now in private beta · 50 teams</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#1a1a1a] leading-[1.1] tracking-tight mb-5">
            Every meeting,<br />
            <span className="text-[#3A5C34]">turned into action</span>
          </h1>

          <p className="text-[17px] text-[#6B6560] leading-relaxed mb-8 max-w-[430px] mx-auto lg:mx-0">
            MeetMind joins your calls, transcribes in real time, and automatically surfaces action items, decisions, and summaries — so your team can focus on doing, not note-taking.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-12">
            <a
              href="#waitlist"
              className="group flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#3A5C34] text-white font-semibold text-sm hover:bg-[#2E4A29] transition-colors shadow-md shadow-[#3A5C34]/20"
            >
              Join the waitlist
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <button
              onClick={startDemo}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#D8D3CB] bg-white text-[#1a1a1a] font-semibold text-sm hover:bg-[#F0EDE8] transition-colors shadow-sm"
            >
              <Play className="size-3.5 fill-current text-[#6B6560]" />
              Replay demo
            </button>
            {onWatchDemo && (
              <button
                onClick={onWatchDemo}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#C9DEC5] bg-[#EDF5EC] text-[#3A5C34] font-semibold text-sm hover:bg-[#DCF0D8] transition-colors shadow-sm"
              >
                ▶ Watch full walkthrough
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
            {[
              { val: "98%",   label: "Transcription accuracy" },
              { val: "60s",   label: "Summary delivery" },
              { val: "50+",   label: "Languages supported" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-[#1a1a1a]">{s.val}</div>
                <div className="text-xs text-[#9B958E] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Demo card ── */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-[#3A5C34]/5 blur-2xl" />
          <div className="relative bg-white border border-[#E5E2DC] rounded-2xl shadow-2xl shadow-black/6 overflow-hidden">

            {/* Window chrome */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#F7F6F3] border-b border-[#E5E2DC]">
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-[#F0A89E]" />
                <div className="size-2.5 rounded-full bg-[#F0CDA0]" />
                <div className="size-2.5 rounded-full bg-[#A8D4A0]" />
              </div>
              <div className="flex items-center gap-1.5">
                {playing
                  ? <span className="flex items-center gap-1.5 text-xs font-medium text-[#B84E44]">
                      <span className="size-1.5 rounded-full bg-[#B84E44] animate-pulse" />
                      Recording
                    </span>
                  : <span className="text-xs text-[#9B958E]">MeetMind · Q3 Planning</span>
                }
              </div>
              <span className="text-xs text-[#9B958E]">3 participants</span>
            </div>

            {/* Transcript */}
            <div className="p-5 space-y-3.5 min-h-[230px]">
              <p className="text-[10px] font-semibold tracking-widest text-[#9B958E] uppercase mb-1">Live Transcript</p>

              {TRANSCRIPT.slice(0, line).map((l, i) => (
                <div key={i} className="flex gap-3 items-start animate-slide-in">
                  <div
                    className="shrink-0 size-6 rounded-full grid place-items-center text-[10px] font-bold text-white"
                    style={{ backgroundColor: l.color }}
                  >
                    {l.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="text-[12px] font-semibold text-[#1a1a1a]">{l.speaker}</span>
                      <span className="text-[10px] text-[#9B958E]">{l.time}</span>
                    </div>
                    <p className="text-[12.5px] text-[#6B6560] leading-relaxed">{l.text}</p>
                  </div>
                </div>
              ))}

              {playing && line < TRANSCRIPT.length && (
                <div className="flex items-center gap-2 px-1 pt-1">
                  <div className="flex gap-[3px] items-end h-3.5">
                    {[4, 8, 5, 9, 4, 7, 6, 4].map((h, i) => (
                      <div
                        key={i}
                        className="w-[2.5px] rounded-full bg-[#6B8F63] animate-pulse"
                        style={{ height: `${h}px`, animationDelay: `${i * 90}ms` }}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#9B958E]">Transcribing…</span>
                </div>
              )}
            </div>

            {/* AI output */}
            {(showActions || showDecisions) && (
              <div className="border-t border-[#E8E4DE] bg-[#F9F8F5] p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="size-4 rounded-full bg-[#3A5C34]/12 grid place-items-center inline-flex">
                    <span className="size-1.5 rounded-full bg-[#3A5C34]" />
                  </span>
                  <span className="text-[10px] font-semibold tracking-widest text-[#3A5C34] uppercase">
                    AI Extracted
                  </span>
                </div>

                {showActions && (
                  <div className="animate-fade-up">
                    <p className="text-[10px] font-semibold text-[#9B958E] uppercase tracking-wider mb-2">
                      Action Items · {ACTIONS.length}
                    </p>
                    <div className="space-y-1.5">
                      {ACTIONS.map((a, i) => (
                        <div key={i} className="flex items-start gap-2.5 bg-white border border-[#E5E2DC] rounded-lg px-3 py-2">
                          <div className="size-3.5 rounded border border-[#C5C0B8] shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] text-[#1a1a1a]">{a.task}</p>
                            <div className="flex gap-1.5 mt-0.5">
                              <span className="text-[10px] text-[#6B8F63] font-medium">{a.owner}</span>
                              <span className="text-[10px] text-[#D0CBC2]">·</span>
                              <span className="text-[10px] text-[#9B958E]">{a.due}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {showDecisions && (
                  <div className="animate-fade-up">
                    <p className="text-[10px] font-semibold text-[#9B958E] uppercase tracking-wider mb-2">
                      Decisions · {DECISIONS.length}
                    </p>
                    <div className="space-y-1.5">
                      {DECISIONS.map((d, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="size-1.5 rounded-full bg-[#5A8F50] shrink-0" />
                          <span className="text-[12px] text-[#6B6560]">{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Social proof strip */}
      <div className="relative z-10 max-w-6xl mx-auto w-full mt-16 pt-10 border-t border-[#E5E2DC]">
        <p className="text-center text-[11px] text-[#9B958E] uppercase tracking-widest mb-5">Works with your tools</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {["Zoom", "Google Meet", "Microsoft Teams", "Slack", "Notion", "Jira", "Linear", "HubSpot"].map((t) => (
            <span key={t} className="text-[12px] text-[#6B6560] font-medium bg-white border border-[#E5E2DC] rounded-full px-3.5 py-1.5">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
