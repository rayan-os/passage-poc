"use client";

import Link from "next/link";
import { ACCENT, COPY } from "@/components/landing/copy";

export default function FinalCTABand() {
  return (
    <div id="demo" className="rounded-3xl border border-border bg-card/20 backdrop-blur-sm p-8 md:p-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="section-label">Demo</p>
          <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight leading-[1.05]">
            {COPY.team.finalCta.header}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground max-w-xl">
            Admissions workflow, governed automation, clear outputs.
          </p>
        </div>
        <Link
          href="/contact"
          className="group inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-95 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring/60"
        >
          {COPY.team.finalCta.cta}
          <svg
            className={["ml-2 h-4 w-4 opacity-85 transition-transform group-hover:translate-x-0.5", ACCENT.text].join(" ")}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

