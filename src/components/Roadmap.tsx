import { useState } from "react";
import { CheckCircle2, Circle, Clock, Zap, CalendarDays } from "lucide-react";

type Status = "done" | "active" | "soon" | "planned";

interface Milestone {
  title: string;
  desc: string;
  status: Status;
  tag?: string;
}

interface Phase {
  period: string;
  dateRange: string;
  label: string;
  theme: string;
  status: Status;
  milestones: Milestone[];
  startMs: number;
  endMs: number;
}

// Today: 10 Jul 2026 — we are in Q3 2026, but Q2 2026 is Foundation (just shipped)
const TODAY = new Date("2026-07-10");

const PHASES: Phase[] = [
  {
    period: "Q2 2026",
    dateRange: "Apr – Jun 2026",
    label: "Foundation",
    theme: "Core engine, first integrations, private beta",
    status: "done",
    startMs: new Date("2026-04-01").getTime(),
    endMs:   new Date("2026-06-30").getTime(),
    milestones: [
      { title: "Core transcription engine",       desc: "Real-time speech-to-text with 98% accuracy across 12 languages.",                        status: "done", tag: "shipped" },
      { title: "Speaker diarisation v1",           desc: "Automatic speaker identification and labelling during live calls.",                       status: "done", tag: "shipped" },
      { title: "Action item extraction (AI v1)",   desc: "LLM-powered detection of tasks, owners, and deadlines from natural conversation.",        status: "done", tag: "shipped" },
      { title: "Zoom & Google Meet integration",   desc: "Silent join via calendar invite — no plugins, no friction for other participants.",        status: "done", tag: "shipped" },
      { title: "Email summary delivery",           desc: "Structured summary sent to all participants within 60 s of call end.",                    status: "done", tag: "shipped" },
      { title: "Private beta launch (50 teams)",   desc: "Onboarded first cohort of design partners for feedback and iteration.",                   status: "done", tag: "shipped" },
    ],
  },
  {
    period: "Q3 2026",
    dateRange: "Jul – Sep 2026",
    label: "Integrations",
    theme: "Deliver output where teams already work",
    status: "active",
    startMs: new Date("2026-07-01").getTime(),
    endMs:   new Date("2026-09-30").getTime(),
    milestones: [
      { title: "Slack integration",               desc: "Meeting summaries and action items posted to the right Slack channel automatically.",      status: "done",   tag: "shipped"     },
      { title: "Jira & Linear sync",              desc: "Action items become tracked tickets in your project management tool, zero manual work.",   status: "done",   tag: "shipped"     },
      { title: "Notion integration",              desc: "Full transcript and summary pushed to a Notion page in your workspace.",                   status: "active", tag: "in progress" },
      { title: "Microsoft Teams support",         desc: "MeetMind joins Teams calls with the same silent, zero-friction experience.",               status: "active", tag: "in progress" },
      { title: "Speaker diarisation v2",          desc: "Named speaker profiles, cross-meeting recognition, voice fingerprinting.",                 status: "soon",   tag: "next"        },
      { title: "Decision registry",               desc: "Searchable log of every decision made across all meetings, with full context.",            status: "soon",   tag: "next"        },
    ],
  },
  {
    period: "Q4 2026",
    dateRange: "Oct – Dec 2026",
    label: "Intelligence",
    theme: "Deeper AI, analytics, and enterprise readiness",
    status: "soon",
    startMs: new Date("2026-10-01").getTime(),
    endMs:   new Date("2026-12-31").getTime(),
    milestones: [
      { title: "Meeting analytics dashboard",     desc: "Team-level view of meeting frequency, participation equity, and action completion rates.", status: "planned" },
      { title: "Multilingual expansion (50+ langs)", desc: "Full transcription and summary support for 50+ languages with auto-detect.",            status: "planned" },
      { title: "Custom vocabulary & jargon",      desc: "Pro and Enterprise plans learn your product names, internal terms, and abbreviations.",    status: "planned" },
      { title: "HubSpot & Salesforce CRM sync",   desc: "Sales call outputs sync directly to contact and deal records in your CRM.",               status: "planned" },
      { title: "SOC 2 Type II certification",     desc: "Enterprise-grade security certification, required by many large-org procurement teams.",   status: "planned" },
      { title: "Smart follow-up nudges",          desc: "Automated reminders to action item owners as deadlines approach.",                        status: "planned" },
    ],
  },
  {
    period: "Q1–Q2 2027",
    dateRange: "Jan – Jun 2027",
    label: "Platform",
    theme: "Open API, mobile, and the intelligence layer",
    status: "planned",
    startMs: new Date("2027-01-01").getTime(),
    endMs:   new Date("2027-06-30").getTime(),
    milestones: [
      { title: "Public API & webhooks",           desc: "Build on top of MeetMind — push meeting data anywhere, trigger workflows programmatically.", status: "planned" },
      { title: "Mobile apps (iOS & Android)",     desc: "Native apps for reviewing summaries, managing action items, and joining calls on mobile.",  status: "planned" },
      { title: "AI coaching & meeting health",    desc: "Real-time suggestions during calls: pacing, unaddressed action items, missing owners.",     status: "planned" },
      { title: "Org knowledge graph",             desc: "Connect decisions, actions, and topics across all meetings into a searchable org memory.",   status: "planned" },
      { title: "Webex & Loom support",            desc: "Extend MeetMind to async video tools and additional conferencing platforms.",               status: "planned" },
      { title: "Series A fundraise",              desc: "Raise growth capital to scale the team, infrastructure, and go-to-market motion.",          status: "planned" },
    ],
  },
];

// ── Config ────────────────────────────────────────────────────────────────────
const statusConfig: Record<Status, {
  icon: typeof CheckCircle2;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
  badgeLabel: string;
}> = {
  done:    { icon: CheckCircle2, iconColor: "#3A5C34", badgeBg: "#EDF5EC", badgeText: "#3A5C34", badgeLabel: "Shipped"     },
  active:  { icon: Zap,          iconColor: "#A07030", badgeBg: "#FDF6ED", badgeText: "#A07030", badgeLabel: "In progress" },
  soon:    { icon: Clock,        iconColor: "#5A6A9E", badgeBg: "#F0F2FA", badgeText: "#5A6A9E", badgeLabel: "Up next"     },
  planned: { icon: Circle,       iconColor: "#9B958E", badgeBg: "#F0EDE8", badgeText: "#9B958E", badgeLabel: "Planned"     },
};

const phaseStyle: Record<Status, { ring: string; dotBg: string; headerBg: string; barColor: string }> = {
  done:    { ring: "border-[#C9DEC5]", dotBg: "bg-[#3A5C34]",                    headerBg: "bg-[#F3F7F2]", barColor: "#3A5C34" },
  active:  { ring: "border-[#E8D9C0]", dotBg: "bg-[#A07030] animate-pulse-soft", headerBg: "bg-[#FDF8F1]", barColor: "#A07030" },
  soon:    { ring: "border-[#D0CFEA]", dotBg: "bg-[#5A6A9E]",                    headerBg: "bg-[#F4F3FB]", barColor: "#5A6A9E" },
  planned: { ring: "border-[#E5E2DC]", dotBg: "bg-[#D0CCC5]",                    headerBg: "bg-[#F7F6F3]", barColor: "#D0CCC5" },
};

// ── Timeline bar ──────────────────────────────────────────────────────────────
function TimelineBar() {
  const start    = PHASES[0].startMs;
  const end      = PHASES[PHASES.length - 1].endMs;
  const total    = end - start;
  const todayPct = Math.min(100, Math.max(0, ((TODAY.getTime() - start) / total) * 100));

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] text-[#9B958E] font-medium">Apr 2026</span>
        <span className="flex items-center gap-1 text-[11px] text-[#A07030] font-semibold">
          <CalendarDays className="size-3" />
          Today · {TODAY.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </span>
        <span className="text-[10px] text-[#9B958E] font-medium">Jun 2027</span>
      </div>

      {/* Track */}
      <div className="relative h-3 bg-[#E8E4DE] rounded-full overflow-visible">
        {/* Coloured phase segments */}
        {PHASES.map((p, i) => {
          const left  = ((p.startMs - start) / total) * 100;
          const width = ((p.endMs   - start) / total) * 100 - left;
          return (
            <div
              key={i}
              className="absolute top-0 h-full transition-all"
              style={{
                left:            `${left}%`,
                width:           `${width}%`,
                backgroundColor: phaseStyle[p.status].barColor,
                opacity:         p.status === "planned" ? 0.25 : p.status === "soon" ? 0.45 : 0.72,
              }}
            />
          );
        })}

        {/* Dividers between phases */}
        {PHASES.slice(1).map((p, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-white/70"
            style={{ left: `${((p.startMs - start) / total) * 100}%` }}
          />
        ))}

        {/* Today dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
          style={{ left: `${todayPct}%` }}
        >
          <div className="size-4 rounded-full bg-[#A07030] border-2 border-white shadow-md grid place-items-center">
            <div className="size-1.5 rounded-full bg-white" />
          </div>
        </div>
      </div>

      {/* Phase name labels */}
      <div className="relative mt-2" style={{ height: "16px" }}>
        {PHASES.map((p, i) => {
          const left  = ((p.startMs - start) / total) * 100;
          const width = ((p.endMs   - start) / total) * 100 - left;
          return (
            <span
              key={i}
              className="absolute text-[9px] font-semibold uppercase tracking-wider text-center truncate"
              style={{
                left:  `${left}%`,
                width: `${width}%`,
                color: phaseStyle[p.status].barColor,
              }}
            >
              {p.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ── Milestone row ─────────────────────────────────────────────────────────────
function MilestoneRow({ m }: { m: Milestone }) {
  const cfg  = statusConfig[m.status];
  const Icon = cfg.icon;
  return (
    <div className="flex gap-3 items-start py-3 border-b border-[#F0EDE8] last:border-0">
      <Icon
        className="size-4 shrink-0 mt-0.5"
        style={{ color: cfg.iconColor }}
        strokeWidth={m.status === "done" ? 2 : 1.75}
      />
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-0.5">
          <p className="text-[13px] font-semibold text-[#1a1a1a]">{m.title}</p>
          {m.tag && (
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: cfg.badgeBg, color: cfg.badgeText }}
            >
              {m.tag}
            </span>
          )}
        </div>
        <p className="text-[12px] text-[#6B6560] leading-relaxed">{m.desc}</p>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Roadmap() {
  // Default open: the active phase (Q3 2026)
  const activeIdx = PHASES.findIndex((p) => p.status === "active");
  const [open, setOpen] = useState<number>(activeIdx);

  const allMilestones = PHASES.flatMap((p) => p.milestones);
  const doneCount     = allMilestones.filter((m) => m.status === "done").length;
  const activeCount   = allMilestones.filter((m) => m.status === "active").length;
  const total         = allMilestones.length;
  const pct           = Math.round(((doneCount + activeCount * 0.5) / total) * 100);

  return (
    <section id="roadmap" className="py-24 px-5 bg-[#F7F6F3]">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="grid sm:grid-cols-2 gap-10 items-end mb-12">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#9B958E] uppercase mb-4">Roadmap</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] leading-[1.2] mb-4">
              Where we are.<br />Where we're going.
            </h2>
            <p className="text-[15px] text-[#6B6560] leading-relaxed">
              A transparent, milestone-driven plan. We ship continuously and update this page as things change.
            </p>
          </div>

          {/* Progress card */}
          <div className="bg-white border border-[#E5E2DC] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[13px] font-semibold text-[#1a1a1a]">Overall progress</p>
              <span className="text-[13px] font-bold text-[#3A5C34]">{pct}%</span>
            </div>
            <div className="h-2 bg-[#F0EDE8] rounded-full overflow-hidden mb-4">
              <div
                className="h-full rounded-full bg-[#3A5C34] transition-all duration-700"
                style={{ width: `${pct}%`, opacity: 0.8 }}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { val: doneCount,                       label: "Shipped",     color: "#3A5C34", bg: "#EDF5EC" },
                { val: activeCount,                     label: "In progress", color: "#A07030", bg: "#FDF6ED" },
                { val: total - doneCount - activeCount, label: "Planned",     color: "#9B958E", bg: "#F0EDE8" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl py-2" style={{ backgroundColor: s.bg }}>
                  <p className="text-[18px] font-bold" style={{ color: s.color }}>{s.val}</p>
                  <p className="text-[10px] font-medium" style={{ color: s.color }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline bar */}
        <TimelineBar />

        {/* Phase accordions */}
        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-[#E5E2DC] hidden sm:block" />

          <div className="space-y-3">
            {PHASES.map((p, qi) => {
              const ps      = phaseStyle[p.status];
              const isOpen  = open === qi;
              const isActive = p.status === "active";
              const doneCt  = p.milestones.filter((m) => m.status === "done").length;
              const actCt   = p.milestones.filter((m) => m.status === "active").length;

              return (
                <div key={qi} className="relative sm:pl-12">
                  {/* Spine dot */}
                  <div className={`absolute left-[13px] top-5 size-3 rounded-full border-2 border-[#F7F6F3] hidden sm:block ${ps.dotBg}`} />

                  {/* "Today" label beside active dot */}
                  {isActive && (
                    <div className="absolute left-0 top-[54px] hidden sm:flex flex-col items-center">
                      <div className="w-px h-2 bg-[#A07030]/40" />
                      <span className="text-[8px] font-bold text-[#A07030] bg-[#FDF6ED] border border-[#E8D9C0] rounded px-1 py-0.5 whitespace-nowrap -translate-x-[3px]">
                        TODAY
                      </span>
                    </div>
                  )}

                  <div className={`rounded-2xl border overflow-hidden transition-all duration-200 ${ps.ring} ${isOpen ? "shadow-md shadow-black/4" : "hover:shadow-sm"}`}>
                    {/* Header */}
                    <button
                      className={`w-full text-left px-5 sm:px-6 py-5 flex items-center gap-4 ${ps.headerBg} transition-colors`}
                      onClick={() => setOpen(isOpen ? -1 : qi)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9B958E]">{p.period}</span>
                          <span className="text-[10px] text-[#C5C0B8]">·</span>
                          <span className="text-[10px] text-[#9B958E]">{p.dateRange}</span>
                          {isActive && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FDF6ED] text-[#A07030] border border-[#E8D9C0]">
                              ← you are here
                            </span>
                          )}
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: statusConfig[p.status].badgeBg, color: statusConfig[p.status].badgeText }}
                          >
                            {statusConfig[p.status].badgeLabel}
                          </span>
                        </div>
                        <p className="text-[15px] font-bold text-[#1a1a1a] leading-snug">{p.label}</p>
                        <p className="text-[12px] text-[#6B6560] mt-0.5">{p.theme}</p>
                      </div>

                      <div className="shrink-0 flex items-center gap-3">
                        <div className="hidden sm:block w-20">
                          <div className="flex justify-between mb-1">
                            <span className="text-[10px] text-[#9B958E]">{doneCt + actCt}/{p.milestones.length}</span>
                          </div>
                          <div className="h-1 bg-[#E5E2DC] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#3A5C34]"
                              style={{ width: `${((doneCt + actCt * 0.5) / p.milestones.length) * 100}%`, opacity: 0.75 }}
                            />
                          </div>
                        </div>
                        <span
                          className="text-[10px] text-[#9B958E] inline-block transition-transform duration-200"
                          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                        >
                          ▼
                        </span>
                      </div>
                    </button>

                    {/* Milestones */}
                    {isOpen && (
                      <div className="bg-white px-5 sm:px-6" style={{ animation: "fadeUp 0.2s ease-out" }}>
                        {p.milestones.map((m, mi) => <MilestoneRow key={mi} m={m} />)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          {(["done", "active", "soon", "planned"] as Status[]).map((s) => {
            const cfg  = statusConfig[s];
            const Icon = cfg.icon;
            return (
              <div key={s} className="flex items-center gap-1.5">
                <Icon className="size-3.5" style={{ color: cfg.iconColor }} strokeWidth={s === "done" ? 2 : 1.75} />
                <span className="text-[12px] text-[#6B6560]">{cfg.badgeLabel}</span>
              </div>
            );
          })}
          <p className="ml-auto text-[11px] text-[#9B958E] italic">
            Updated {TODAY.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>

      </div>
    </section>
  );
}
