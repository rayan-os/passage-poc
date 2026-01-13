"use client";

import { motion, useReducedMotion } from "framer-motion";

const TRUST_ITEMS = [
  {
    title: "Audit trail",
    description: "Immutable logs for every step: who did what, what evidence was used, and how outcomes were reached.",
  },
  {
    title: "Role-based access",
    description: "Permissions by role and function so sensitive data access is intentional and reviewable.",
  },
  {
    title: "Data retention controls",
    description: "Retention and deletion policies that match your program requirements and data lifecycle needs.",
  },
  {
    title: "Integration-ready",
    description: "APIs and events designed to connect to existing systems without losing traceability.",
  },
];

export default function ProofTrust() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="container-grid py-20 md:py-24 border-t border-border">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-4">
          <p className="section-label">Proof & trust</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Security posture for regulated decisions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Built for environments where access, evidence, and outcomes must be defensible.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-8 mt-10 lg:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRUST_ITEMS.map((item, idx) => (
              <motion.div
                key={item.title}
                className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6 hover:bg-card/45 transition-colors"
                initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: idx * 0.04 }}
              >
                <h3 className="font-display text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

