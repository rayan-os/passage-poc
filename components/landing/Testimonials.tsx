"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

export default function Testimonials({
  items,
}: {
  items: Array<{ quote: string; name: string; org: string }>;
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<Record<number, boolean>>({});

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((t, idx) => (
        <motion.figure
          key={t.quote}
          className="panel panel-sharp panel-topline p-6"
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.06 }}
        >
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Testimonial</p>
            <button
              type="button"
              onClick={() => setOpen((o) => ({ ...o, [idx]: !o[idx] }))}
              className="inline-flex items-center justify-center h-8 w-8 bg-background/10 hover:bg-background/20 text-foreground/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring/50"
              aria-label={open[idx] ? "Collapse testimonial" : "Expand testimonial"}
            >
              <span className="text-lg leading-none">{open[idx] ? "–" : "+"}</span>
            </button>
          </div>

          <blockquote className="mt-4 text-lg text-foreground/90 leading-snug">
            “{t.quote}”
          </blockquote>

          {open[idx] && (
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 8 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-4 text-sm text-muted-foreground"
            >
              <p>Expanded details placeholder. Replace with a verified longer quote or outcomes.</p>
            </motion.div>
          )}

          <div className="mt-6 divider" />
          <figcaption className="mt-4 text-sm text-muted-foreground">
            <span className="text-foreground/85">{t.name}</span>, <span>{t.org}</span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}

