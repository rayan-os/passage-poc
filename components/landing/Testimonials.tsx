"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Testimonials({
  items,
}: {
  items: Array<{ quote: string; name: string; org: string }>;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {items.map((t, idx) => (
        <motion.figure
          key={t.quote}
          className="border border-border bg-card/10 backdrop-blur-sm p-4"
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.06 }}
        >
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Testimonial</p>
          <blockquote className="mt-3 text-sm text-foreground/90">“{t.quote}”</blockquote>
          <figcaption className="mt-4 text-xs text-muted-foreground">
            <span className="text-foreground/80">{t.name}</span>, <span>{t.org}</span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}

