"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

export default function ProofLogos({ count }: { count: number }) {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);

  const logos = useMemo(() => Array.from({ length: count }).map((_, i) => `Logo ${i + 1}`), [count]);

  // Two lanes to create continuity.
  const lane = (offset: number) => (
    <motion.div
      className="flex items-center gap-3"
      animate={reduce || paused ? undefined : { x: ["0%", "-50%"] }}
      transition={
        reduce || paused
          ? undefined
          : { duration: 50 + offset, ease: "linear", repeat: Infinity }
      }
      style={{ willChange: "transform" }}
    >
      {[...logos, ...logos].map((l, idx) => (
        <div
          key={`${l}-${idx}`}
          className="h-10 w-28 rounded-lg border border-border bg-background/20"
          aria-label={l}
          role="img"
        />
      ))}
    </motion.div>
  );

  return (
    <div
      className="overflow-hidden rounded-2xl border border-border bg-card/15 backdrop-blur-sm p-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex gap-6">
        {lane(0)}
        {lane(7)}
      </div>
    </div>
  );
}

