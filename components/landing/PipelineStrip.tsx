"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ACCENT, COPY } from "@/components/landing/copy";

export default function PipelineStrip() {
  const reduce = useReducedMotion();
  const stages = COPY.platformClaim.stages;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const items = useMemo(() => stages.map((s, idx) => ({ s, idx })), [stages]);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % stages.length), 8000 / stages.length);
    return () => window.clearInterval(id);
  }, [reduce, paused, stages.length]);

  return (
    <div
      className="rounded-2xl border border-border bg-card/20 backdrop-blur-sm p-6 md:p-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Pipeline</p>
        <span className={["h-2 w-2 rounded-full", ACCENT.bgSoft].join(" ")} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {items.map(({ s, idx }) => {
          const isActive = idx === active;
          return (
            <div key={s} className="flex items-center gap-2">
              <motion.div
                className={[
                  "rounded-full border px-3 py-1 text-xs font-medium",
                  isActive ? `${ACCENT.border} ${ACCENT.bgSoft} text-foreground` : "border-border bg-background/20 text-muted-foreground",
                ].join(" ")}
                animate={
                  reduce
                    ? undefined
                    : isActive
                      ? { boxShadow: "0 0 0 1px rgba(139,92,246,0.22), 0 0 28px rgba(139,92,246,0.10)" }
                      : { boxShadow: "0 0 0 0 rgba(0,0,0,0)" }
                }
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {s}
              </motion.div>
              {idx < items.length - 1 && <span className="text-muted-foreground/70">→</span>}
            </div>
          );
        })}
      </div>

      <div className="mt-6 h-px w-full bg-border/70" />
      <p className="mt-4 text-sm text-muted-foreground">
        A governed workflow with clear state, clear ownership, and measurable outcomes.
      </p>
    </div>
  );
}

