"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

export default function ProofLogos({ count }: { count: number }) {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);

  const UNI = useMemo(
    () => [
      { name: "Stanford", mark: "S" },
      { name: "MIT", mark: "MIT" },
      { name: "Harvard", mark: "H" },
      { name: "Oxford", mark: "OX" },
      { name: "Cambridge", mark: "C" },
      { name: "UofT", mark: "UT" },
    ],
    []
  );

  const logos = useMemo(
    () =>
      Array.from({ length: Math.max(6, count) }).map((_, i) => UNI[i % UNI.length]!),
    [UNI, count]
  );

  // Two lanes to create continuity.
  const lane = (offset: number) => (
    <motion.div
      className="flex items-center gap-3"
      animate={reduce || paused ? undefined : { x: ["0%", "-50%"] }}
      transition={
        reduce || paused
          ? undefined
          : { duration: 80 + offset, ease: "linear", repeat: Infinity }
      }
      style={{ willChange: "transform" }}
    >
      {[...logos, ...logos].map((l, idx) => (
        <div key={`${l.name}-${idx}`} className="h-10 px-4 bg-background/10 flex items-center gap-3">
          <span className="h-6 w-6 rounded-full bg-foreground/10 dark:bg-background/10 flex items-center justify-center">
            <span className="text-[10px] font-mono text-foreground/45">{l.mark}</span>
          </span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-foreground/35">{l.name}</span>
        </div>
      ))}
    </motion.div>
  );

  return (
    <div
      className="overflow-hidden panel panel-sharp panel-topline p-4"
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

