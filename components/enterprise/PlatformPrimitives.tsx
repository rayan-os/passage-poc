"use client";

import { motion, useReducedMotion } from "framer-motion";

const PILLARS = [
  {
    title: "Policy engine",
    description: "Rules and rubrics that define eligibility, thresholds, and escalation paths.",
  },
  {
    title: "Evidence store",
    description: "Documents and extracted fields linked to each decision step.",
  },
  {
    title: "Audit trail",
    description: "Every action logged with timestamps, inputs, outputs, and attribution.",
  },
  {
    title: "Human in the loop",
    description: "Review queues, overrides, and escalation when confidence is low.",
  },
];

export default function PlatformPrimitives() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="container-grid py-20 md:py-24 border-t border-border">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-4">
          <p className="section-label">Platform primitives</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Enterprise-grade by default
          </h2>
          <p className="mt-4 text-muted-foreground">
            The building blocks that keep automation governable and decisions defensible.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-8 mt-10 lg:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((p, idx) => (
              <motion.div
                key={p.title}
                className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6 hover:bg-card/45 transition-colors"
                initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: idx * 0.04 }}
              >
                <h3 className="font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

