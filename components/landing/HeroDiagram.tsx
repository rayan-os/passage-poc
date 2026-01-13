"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ACCENT, COPY } from "@/components/landing/copy";

function Block({ title, items }: { title: string; items: string }) {
  return (
    <div className="group rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-5 hover:bg-card/40 transition-colors">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{title}</p>
        <span className={["h-2 w-2 rounded-full", ACCENT.bgSoft].join(" ")} />
      </div>
      <p className="mt-3 text-sm text-foreground/90">{items}</p>
      <div className="mt-4 h-px w-full bg-border/70" />
      <p className="mt-3 text-xs text-muted-foreground">Tap to inspect</p>
    </div>
  );
}

export default function HeroDiagram() {
  const reduce = useReducedMotion();
  const { diagram } = COPY.hero;

  return (
    <div className="relative rounded-3xl border border-border bg-card/20 backdrop-blur-sm p-6 md:p-8 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-28 -right-28 h-[340px] w-[340px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.22), transparent 60%)" }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 relative">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
        >
          <Block title={diagram.inputs.title} items={diagram.inputs.items} />
        </motion.div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
        >
          <div className={["rounded-2xl border bg-card/30 backdrop-blur-sm p-5 transition-all", ACCENT.border].join(" ")}>
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{diagram.passage.title}</p>
              <span className={["h-2 w-2 rounded-full", ACCENT.bgSoft].join(" ")} />
            </div>
            <p className="mt-3 text-sm text-foreground/90">{diagram.passage.items}</p>
            <div className="mt-4 h-px w-full bg-border/70" />
            <p className="mt-3 text-xs text-muted-foreground">Governed workflow</p>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.24 }}
        >
          <Block title={diagram.outputs.title} items={diagram.outputs.items} />
        </motion.div>
      </div>

      <div className="hidden md:block mt-6 relative">
        <svg width="100%" height="70" viewBox="0 0 900 70" aria-hidden="true">
          <motion.path
            d="M140 35 C 250 35, 290 35, 400 35"
            fill="none"
            stroke={ACCENT.stroke}
            strokeOpacity="0.9"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
            animate={reduce ? undefined : { pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          />
          <motion.path
            d="M500 35 C 610 35, 650 35, 760 35"
            fill="none"
            stroke={ACCENT.stroke}
            strokeOpacity="0.9"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
            animate={reduce ? undefined : { pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
          />
          <circle cx="450" cy="35" r="3" fill="rgba(255,255,255,0.55)" />
        </svg>
      </div>
    </div>
  );
}

