"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ACCENT, COPY } from "@/components/landing/copy";

export default function OutcomeStrip() {
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {COPY.outcomeStrip.tiles.map((t) => (
        <motion.div
          key={t}
          whileHover={reduce ? undefined : { y: -4 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="rounded-2xl border border-border bg-card/20 backdrop-blur-sm p-6 hover:bg-card/30 transition-colors"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground/90">{t}</p>
            <span className={["h-2 w-2 rounded-full", ACCENT.bgSoft].join(" ")} />
          </div>
          <div className="mt-4 h-px w-full bg-border/70" />
          <p className="mt-3 text-xs text-muted-foreground">Operator controlled workflow</p>
        </motion.div>
      ))}
    </div>
  );
}

