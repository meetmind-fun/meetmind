// All scene data for the MeetMind interactive product walkthrough.
// Each scene has a duration (ms), a type, and data to render.

export type SceneKind =
  | "intro"
  | "calendar"
  | "join"
  | "transcribe"
  | "extract"
  | "summary"
  | "slack"
  | "analytics"
  | "outro";

export interface Scene {
  id: SceneKind;
  title: string;
  narration: string;
  duration: number; // ms
}

export const SCENES: Scene[] = [
  {
    id: "intro",
    title: "The Problem",
    narration: "Every team runs meetings. Almost none of them leave with a clear record of what was decided or who's responsible. MeetMind fixes that.",
    duration: 4000,
  },
  {
    id: "calendar",
    title: "Step 1 — Invite MeetMind",
    narration: "Add MeetMind to your calendar event. It joins as a silent participant — no installs, no plugins, no setup needed by anyone else on the call.",
    duration: 5000,
  },
  {
    id: "join",
    title: "Step 2 — MeetMind Joins",
    narration: "The moment your call starts, MeetMind is already listening. You see it appear in the participant list. Everyone else can keep talking naturally.",
    duration: 4500,
  },
  {
    id: "transcribe",
    title: "Step 3 — Live Transcription",
    narration: "Every word is transcribed in real time with speaker labels. 98% accuracy across 50+ languages. You can watch it happen live, or just focus on the conversation.",
    duration: 6000,
  },
  {
    id: "extract",
    title: "Step 4 — AI Extraction",
    narration: "As the meeting ends, MeetMind's AI identifies action items, owners, deadlines, and key decisions — automatically, with no manual tagging.",
    duration: 5500,
  },
  {
    id: "summary",
    title: "Step 5 — Instant Summary",
    narration: "Within 60 seconds of hanging up, every participant receives a crisp, structured summary. No more 'what did we decide again?' emails.",
    duration: 5000,
  },
  {
    id: "slack",
    title: "Step 6 — Delivered to Your Stack",
    narration: "Action items sync to Jira, Linear, or Asana. Summaries post to Slack. Your CRM is updated. Everything lives where your team already works.",
    duration: 5000,
  },
  {
    id: "analytics",
    title: "Step 7 — Meeting Intelligence",
    narration: "Over time, MeetMind builds a picture of your org's meeting health — participation equity, recurring blockers, decision velocity, and more.",
    duration: 5000,
  },
  {
    id: "outro",
    title: "Ready to try it?",
    narration: "MeetMind is in private beta with 50 teams. Start your free trial today — no credit card required, no change to how your team runs meetings.",
    duration: 4000,
  },
];

export const TOTAL_DURATION = SCENES.reduce((s, sc) => s + sc.duration, 0);
