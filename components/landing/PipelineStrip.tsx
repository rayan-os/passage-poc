"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { ACCENT, COPY } from "@/components/landing/copy";

export default function PipelineStrip() {
  const reduce = useReducedMotion();
  const stages = COPY.platformClaim.stages;
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const items = useMemo(() => stages.map((s, idx) => ({ s, idx })), [stages]);

  const tooltips = useMemo(
    () => [
      "Ingest, collect and normalize inputs",
      "Verify, document checks and proof",
      "Decide, apply rules and rationale",
      "Follow up, requests and reminders",
      "LOA, generate and track outputs",
      "Report, metrics and audits",
    ],
    []
  );

  return (
    <div
      ref={containerRef}
      className="border border-border bg-card/20 backdrop-blur-sm p-6 md:p-7"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setHovered(null);
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Pipeline</p>
        <span className={["h-2 w-2 rounded-full", ACCENT.bgSoft].join(" ")} />
      </div>

      <div className="mt-6 relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-border/80" aria-hidden="true" />

        <div className="relative grid grid-cols-6 gap-2">
          {items.map(({ s, idx }) => (
            <div key={s} className="relative flex justify-center">
              <button
                type="button"
                className={[
                  "group flex flex-col items-center gap-2 text-left",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                ].join(" ")}
                onMouseEnter={() => setHovered(idx)}
                onFocus={() => setHovered(idx)}
                onBlur={() => setHovered(null)}
              >
                <span
                  className={[
                    "h-2.5 w-2.5 border border-border bg-background",
                    hovered === idx ? ACCENT.border : "",
                  ].join(" ")}
                  aria-hidden="true"
                />
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                  {s}
                </span>
              </button>

              {hovered === idx && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap border border-border bg-background/80 backdrop-blur px-3 py-2 text-xs text-foreground/90">
                  {tooltips[idx] ?? ""}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pulse that moves across nodes */}
        <motion.div
          aria-hidden="true"
          className={["absolute top-1/2 -translate-y-1/2 h-2 w-2", ACCENT.bgSoft].join(" ")}
          style={{ borderRadius: 0 }}
          animate={
            reduce || paused
              ? undefined
              : {
                  left: ["0%", "100%"],
                }
          }
          transition={
            reduce || paused
              ? undefined
              : { duration: 7, ease: "linear", repeat: Infinity }
          }
        />
      </div>

      <div className="mt-6 h-px w-full bg-border/70" />
      <p className="mt-4 text-sm text-muted-foreground">
        A governed workflow with clear state, clear ownership, and measurable outcomes.
      </p>
    </div>
  );
}

