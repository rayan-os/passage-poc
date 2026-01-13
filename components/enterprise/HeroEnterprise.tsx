"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedDotGrid from "@/components/enterprise/AnimatedDotGrid";

export default function HeroEnterprise() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <AnimatedDotGrid className="absolute inset-0" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />

      <div className="container-grid relative py-24 md:py-32 lg:py-36">
        <div className="grid-12 items-end">
          <div className="col-span-12 lg:col-span-9">
            <motion.p
              className="section-label"
              initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Decision Operations Platform
            </motion.p>
            <motion.h1
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
              initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            >
              Turn applications into auditable decisions
            </motion.h1>
            <motion.p
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl"
              initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            >
              Automate intake, verification, screening, and decisioning with a complete audit trail.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3"
              initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring/60"
              >
                Request demo
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-md border border-border bg-secondary/30 px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring/60"
              >
                See how it works
              </Link>
            </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-3 mt-12 lg:mt-0">
            <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-5">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Built for</p>
              <ul className="space-y-2 text-sm text-foreground/90">
                <li className="flex items-center justify-between">
                  <span>Government programs</span>
                  <span className="text-muted-foreground">•</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Employers</span>
                  <span className="text-muted-foreground">•</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Lenders</span>
                  <span className="text-muted-foreground">•</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Regulated programs</span>
                  <span className="text-muted-foreground">•</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  One governed pipeline. Modular agents. Human review when it matters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

