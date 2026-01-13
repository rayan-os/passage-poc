"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function FinalCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="container-grid py-20 md:py-24 border-t border-border">
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-border bg-card/30 backdrop-blur-sm p-10 md:p-12"
        initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div aria-hidden="true" className="absolute inset-0 opacity-60">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-44 left-12 h-[460px] w-[460px] rounded-full bg-accent/50 blur-3xl" />
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <p className="section-label">Next step</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Ready to modernize decisioning
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Regulated decisions, governed automation, and auditability—without rebuilding your workflow from scratch.
            </p>
          </div>

          <div className="lg:col-span-4 lg:justify-self-end flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring/60"
            >
              Request demo
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-border bg-secondary/30 px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring/60"
            >
              Contact sales
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

