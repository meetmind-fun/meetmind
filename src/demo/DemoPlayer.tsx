import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, X } from "lucide-react";
import { SCENES, TOTAL_DURATION, type SceneKind } from "./scenes";
import SceneIntro     from "./SceneIntro";
import SceneCalendar  from "./SceneCalendar";
import SceneJoin      from "./SceneJoin";
import SceneTranscribe from "./SceneTranscribe";
import SceneExtract   from "./SceneExtract";
import SceneSummary   from "./SceneSummary";
import SceneSlack     from "./SceneSlack";
import SceneAnalytics from "./SceneAnalytics";
import SceneOutro     from "./SceneOutro";

function renderScene(id: SceneKind, progress: number) {
  switch (id) {
    case "intro":      return <SceneIntro      progress={progress} />;
    case "calendar":   return <SceneCalendar   progress={progress} />;
    case "join":       return <SceneJoin       progress={progress} />;
    case "transcribe": return <SceneTranscribe progress={progress} />;
    case "extract":    return <SceneExtract    progress={progress} />;
    case "summary":    return <SceneSummary    progress={progress} />;
    case "slack":      return <SceneSlack      progress={progress} />;
    case "analytics":  return <SceneAnalytics  progress={progress} />;
    case "outro":      return <SceneOutro      progress={progress} />;
  }
}

// Offsets (ms) where each scene starts in the total timeline
const SCENE_OFFSETS: number[] = [];
SCENES.reduce((acc, sc) => { SCENE_OFFSETS.push(acc); return acc + sc.duration; }, 0);

interface Props { onClose: () => void; }

export default function DemoPlayer({ onClose }: Props) {
  const [elapsed, setElapsed]   = useState(0);          // ms into total
  const [playing, setPlaying]   = useState(true);
  const [dragging] = useState(false);
  const rafRef  = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Tick
  const tick = useCallback((ts: number) => {
    if (lastRef.current !== null) {
      const delta = ts - lastRef.current;
      setElapsed((e) => {
        const next = e + delta;
        if (next >= TOTAL_DURATION) { setPlaying(false); return TOTAL_DURATION; }
        return next;
      });
    }
    lastRef.current = ts;
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (playing && !dragging) {
      lastRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [playing, dragging, tick]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " ")           { e.preventDefault(); setPlaying((p) => !p); }
      if (e.key === "Escape")      { onClose(); }
      if (e.key === "ArrowRight")  { setElapsed((v) => Math.min(TOTAL_DURATION, v + 3000)); }
      if (e.key === "ArrowLeft")   { setElapsed((v) => Math.max(0, v - 3000)); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Current scene
  let sceneIndex = 0;
  for (let i = SCENE_OFFSETS.length - 1; i >= 0; i--) {
    if (elapsed >= SCENE_OFFSETS[i]) { sceneIndex = i; break; }
  }
  const safeIndex  = Math.min(sceneIndex, SCENES.length - 1);
  const scene      = SCENES[safeIndex];
  const sceneStart = SCENE_OFFSETS[safeIndex];
  const sceneProgress = Math.min(1, (elapsed - sceneStart) / scene.duration);
  const totalProgress  = elapsed / TOTAL_DURATION;

  function goScene(i: number) {
    const idx = Math.max(0, Math.min(SCENES.length - 1, i));
    setElapsed(SCENE_OFFSETS[idx]);
  }

  function restart() {
    setElapsed(0);
    setPlaying(true);
  }

  // Scrubber drag
  function onScrubberClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setElapsed(ratio * TOTAL_DURATION);
  }

  const fmtTime = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col bg-[#F7F6F3]"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Top bar */}
      <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#E5E2DC] bg-white">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="size-7 rounded-lg bg-[#3A5C34] grid place-items-center">
            <svg width="14" height="14" viewBox="0 0 40 40" fill="none">
              <rect x="6"  y="17" width="4" height="6"  rx="2" fill="white" opacity="0.4"/>
              <rect x="13" y="12" width="4" height="16" rx="2" fill="white" opacity="0.65"/>
              <rect x="20" y="8"  width="4" height="24" rx="2" fill="white"/>
              <rect x="27" y="12" width="4" height="16" rx="2" fill="white" opacity="0.65"/>
              <rect x="34" y="17" width="4" height="6"  rx="2" fill="white" opacity="0.4"/>
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#1a1a1a]">
              Meet<span className="text-[#3A5C34]">Mind</span> — Product Walkthrough
            </p>
            <p className="text-[11px] text-[#9B958E] hidden sm:block">
              {safeIndex + 1} of {SCENES.length} · {scene.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#9B958E] hidden sm:block">Space to play/pause · ← → to seek</span>
          <button
            onClick={onClose}
            className="size-8 rounded-full border border-[#E5E2DC] hover:bg-[#F0EDE8] grid place-items-center transition-colors ml-2"
          >
            <X className="size-4 text-[#6B6560]" />
          </button>
        </div>
      </div>

      {/* Scene area */}
      <div className="flex-1 min-h-0 flex flex-col">
        {/* Scene viewport */}
        <div className="flex-1 min-h-0 overflow-hidden relative">
          <div key={scene.id} className="absolute inset-0" style={{ animation: "fadeIn 0.35s ease-out" }}>
            {renderScene(scene.id, sceneProgress)}
          </div>
        </div>

        {/* Narration bar */}
        <div className="shrink-0 bg-white border-t border-[#E5E2DC] px-5 py-3.5">
          <div className="max-w-3xl mx-auto flex items-center gap-4">
            <div className="size-8 rounded-full bg-[#3A5C34] grid place-items-center shrink-0">
              <svg width="13" height="13" viewBox="0 0 40 40" fill="none">
                <rect x="6" y="17" width="4" height="6" rx="2" fill="white" opacity="0.4"/>
                <rect x="13" y="12" width="4" height="16" rx="2" fill="white" opacity="0.65"/>
                <rect x="20" y="8" width="4" height="24" rx="2" fill="white"/>
                <rect x="27" y="12" width="4" height="16" rx="2" fill="white" opacity="0.65"/>
                <rect x="34" y="17" width="4" height="6" rx="2" fill="white" opacity="0.4"/>
              </svg>
            </div>
            <p className="text-[13.5px] text-[#4A4540] leading-relaxed flex-1" key={scene.id}>
              {scene.narration}
            </p>
          </div>
        </div>
      </div>

      {/* Player controls */}
      <div className="shrink-0 bg-white border-t border-[#E5E2DC] px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto space-y-3">

          {/* Timeline scrubber */}
          <div className="space-y-1">
            {/* Scene markers */}
            <div className="relative h-1" onClick={onScrubberClick}>
              <div className="absolute inset-0 bg-[#E8E4DE] rounded-full cursor-pointer" />
              <div
                className="absolute left-0 top-0 h-full bg-[#3A5C34] rounded-full transition-none pointer-events-none"
                style={{ width: `${totalProgress * 100}%`, opacity: 0.75 }}
              />
              {/* Scene tick marks */}
              {SCENE_OFFSETS.slice(1).map((off, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 size-2 rounded-full bg-white border border-[#C5C0B8] -translate-x-1/2"
                  style={{ left: `${(off / TOTAL_DURATION) * 100}%` }}
                />
              ))}
              {/* Thumb */}
              <div
                className="absolute top-1/2 -translate-y-1/2 size-4 rounded-full bg-white border-2 border-[#3A5C34] shadow-md -translate-x-1/2 cursor-pointer"
                style={{ left: `${totalProgress * 100}%` }}
              />
            </div>

            {/* Scene labels */}
            <div className="relative h-5">
              {SCENES.map((sc, i) => {
                const pct = (SCENE_OFFSETS[i] / TOTAL_DURATION) * 100;
                const isActive = i === safeIndex;
                return (
                  <button
                    key={sc.id}
                    onClick={() => goScene(i)}
                    className="absolute -translate-x-1/2 text-[9px] whitespace-nowrap transition-colors"
                    style={{
                      left: `${pct}%`,
                      color: isActive ? "#3A5C34" : "#9B958E",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {i === 0 ? "Start" : i === SCENES.length - 1 ? "End" : `S${i + 1}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => goScene(safeIndex - 1)}
              disabled={safeIndex === 0}
              className="size-8 rounded-full border border-[#E5E2DC] hover:bg-[#F0EDE8] grid place-items-center disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="size-4 text-[#6B6560]" />
            </button>

            <button
              onClick={() => { if (elapsed >= TOTAL_DURATION) restart(); else setPlaying((p) => !p); }}
              className="size-10 rounded-full bg-[#3A5C34] hover:bg-[#2E4A29] grid place-items-center transition-colors shadow-sm shadow-[#3A5C34]/20"
            >
              {elapsed >= TOTAL_DURATION
                ? <RotateCcw className="size-4 text-white" />
                : playing
                  ? <Pause className="size-4 text-white fill-white" />
                  : <Play  className="size-4 text-white fill-white" />
              }
            </button>

            <button
              onClick={() => goScene(safeIndex + 1)}
              disabled={safeIndex === SCENES.length - 1}
              className="size-8 rounded-full border border-[#E5E2DC] hover:bg-[#F0EDE8] grid place-items-center disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="size-4 text-[#6B6560]" />
            </button>

            <div className="flex-1 flex items-center gap-2 ml-1">
              <span className="text-[12px] font-mono text-[#6B6560]">{fmtTime(elapsed)}</span>
              <span className="text-[12px] text-[#C5C0B8]">/</span>
              <span className="text-[12px] font-mono text-[#9B958E]">{fmtTime(TOTAL_DURATION)}</span>
            </div>

            {/* Scene chips */}
            <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto max-w-xs">
              {SCENES.map((sc, i) => (
                <button
                  key={sc.id}
                  onClick={() => goScene(i)}
                  className="shrink-0 text-[10px] px-2.5 py-1 rounded-full border transition-colors whitespace-nowrap"
                  style={{
                    borderColor:   i === safeIndex ? "#3A5C34" : "#E5E2DC",
                    backgroundColor: i === safeIndex ? "#EDF5EC" : "white",
                    color:         i === safeIndex ? "#3A5C34" : "#9B958E",
                    fontWeight:    i === safeIndex ? 600 : 400,
                  }}
                >
                  {sc.title.replace(/^Step \d+ — /, "")}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
