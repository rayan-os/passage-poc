"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Noise from "@/components/landing/Noise";
import AdmissionsDocOSVisual from "@/components/landing/HeroDocOSVisual";
import { ACCENT, COPY } from "@/components/landing/copy";

export default function Hero() {
  const reduce = useReducedMotion();
  const header = COPY.hero.header;
  const hasAdmissionsTail = /for admissions$/i.test(header);

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0">
        {/* Very subtle noise, no soft gradients */}
        <Noise />
        <div className="dot-cloud" />
      </div>

      <div className="container-grid relative py-20 md:py-24 lg:py-28">
        <div className="grid-12 items-start">
          <div className="col-span-12 lg:col-span-6">
            <motion.p
              className="section-label"
              initial={reduce ? undefined : { opacity: 0, y: 8 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Passage
            </motion.p>

            <motion.h1
              className="mt-2 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.06] max-w-[18ch]"
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            >
              {hasAdmissionsTail ? (
                <>
                  <span className="block">{header.replace(/ for admissions$/i, "")}</span>
                  <span className="block text-muted-foreground">for admissions</span>
                </>
              ) : (
                header
              )}
            </motion.h1>

            <motion.p
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl"
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              {COPY.hero.subhead}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3"
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.14 }}
            >
              <Link
                href={COPY.nav.cta.href}
                className={[
                  "group inline-flex items-center justify-center rounded-md border px-5 py-3 text-sm font-medium",
                  "bg-primary text-primary-foreground border-transparent hover:opacity-95 transition-opacity",
                  "focus:outline-none focus:ring-2 focus:ring-ring/60",
                ].join(" ")}
              >
                {COPY.hero.primaryCta}
                <svg
                  className="ml-2 h-4 w-4 opacity-80 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="#platform"
                className={[
                  "group inline-flex items-center justify-center rounded-md border px-5 py-3 text-sm font-medium",
                  "border-border bg-secondary/20 hover:bg-secondary/35 text-foreground transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-ring/60",
                ].join(" ")}
              >
                {COPY.hero.secondaryCta}
                <svg
                  className={["ml-2 h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5", ACCENT.text].join(" ")}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            <div className="mt-10 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Infrastructure for operator teams
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 mt-12 lg:mt-0">
            <AdmissionsDocOSVisual />
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="border-t border-border/70" />
    </section>
  );
}

