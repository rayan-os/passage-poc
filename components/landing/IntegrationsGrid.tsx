"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useMemo } from "react";
import { ACCENT, COPY } from "@/components/landing/copy";

function MagneticChip({ label }: { label: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.25 });

  return (
    <motion.button
      type="button"
      className={[
        "relative inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium",
        "border-border bg-background/20 text-muted-foreground hover:text-foreground",
        "focus:outline-none focus:ring-2 focus:ring-ring/60",
      ].join(" ")}
      style={reduce ? undefined : { x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce) return;
        const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set(dx * 0.12);
        y.set(dy * 0.12);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={reduce ? undefined : { boxShadow: "0 0 0 1px rgba(139,92,246,0.22)" }}
    >
      <span className={["mr-2 h-1.5 w-1.5 rounded-full", ACCENT.bgSoft].join(" ")} />
      {label}
    </motion.button>
  );
}

export default function IntegrationsGrid() {
  const reduce = useReducedMotion();
  const categories = COPY.integrations.categories;

  const float = useMemo(
    () => (reduce ? undefined : { y: [0, -4, 0] }),
    [reduce]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {categories.map((cat, idx) => (
        <motion.div
          key={cat.title}
          className="rounded-2xl border border-border bg-card/20 backdrop-blur-sm p-6"
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.05 }}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-bold">{cat.title}</h3>
            <span className={["h-2 w-2 rounded-full", ACCENT.bgSoft].join(" ")} />
          </div>
          <div className="mt-4 h-px w-full bg-border/70" />
          <motion.div
            className="mt-5 flex flex-wrap gap-2"
            animate={float}
            transition={reduce ? undefined : { duration: 6 + idx, ease: "easeInOut", repeat: Infinity }}
          >
            {cat.chips.map((c) => (
              <MagneticChip key={c} label={c} />
            ))}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

