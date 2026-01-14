"use client";

import Link from "next/link";
import AnimatedDotGrid from "@/components/enterprise/AnimatedDotGrid";
import Reveal from "@/components/enterprise/Reveal";

export default function HeroEnterprise() {
  return (
    <section className="relative overflow-hidden">
      <AnimatedDotGrid className="absolute inset-0" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />

      <div className="container-grid relative py-24 md:py-32 lg:py-36">
        <div className="grid-12 items-end">
          <div className="col-span-12 lg:col-span-9">
            <Reveal>
              <p className="section-label">Decision Operations Platform</p>
            </Reveal>
            <Reveal delayMs={60}>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                Turn applications into auditable decisions
              </h1>
            </Reveal>
            <Reveal delayMs={120}>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl">
                Automate intake, verification, screening, and decisioning with a complete audit trail.
              </p>
            </Reveal>

            <Reveal delayMs={170}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:opacity-95 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring/60"
                >
                  Request demo
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
                  href="#how-it-works"
                  className="group inline-flex items-center justify-center rounded-md border border-border bg-secondary/30 px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring/60"
                >
                  See how it works
                  <svg
                    className="ml-2 h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-3 mt-12 lg:mt-0">
            <Reveal delayMs={220}>
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
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

