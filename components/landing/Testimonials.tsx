"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ACCENT } from "@/components/landing/copy";

export default function Testimonials({
  items,
}: {
  items: Array<{ quote: string; name: string; org: string }>;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((t, idx) => (
        <motion.figure
          key={t.quote}
          className="rounded-2xl border border-border bg-card/20 backdrop-blur-sm p-6"
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.06 }}
        >
          <div className="flex items-center justify-between">
            <span className={["h-2 w-2 rounded-full", ACCENT.bgSoft].join(" ")} />
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Quote</p>
          </div>
          <blockquote className="mt-4 text-sm text-foreground/90">“{t.quote}”</blockquote>
          <div className="mt-6 h-px w-full bg-border/70" />
          <figcaption className="mt-4 text-xs text-muted-foreground">
            <span className="text-foreground/80">{t.name}</span>
            <span className="mx-1">,</span>
            <span>{t.org}</span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}

