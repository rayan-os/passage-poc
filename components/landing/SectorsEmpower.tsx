"use client";

import Link from "next/link";
import { ACCENT } from "@/components/landing/copy";

const SECTORS = [
  {
    title: "Education",
    body: "Admissions, scholarships, credential review, LOAs.",
    tags: ["Admissions", "LOAs", "Scholarships"],
  },
  {
    title: "Healthcare",
    body: "Intake, eligibility, prior auth, provider onboarding.",
    tags: ["Eligibility", "Intake", "Verification"],
  },
  {
    title: "Public sector",
    body: "Benefits, licensing, grants, regulated casework.",
    tags: ["Casework", "Audit trail", "Policy"],
  },
  {
    title: "Financial services",
    body: "KYC, credit workflows, exceptions, approvals.",
    tags: ["KYC", "Approvals", "Exceptions"],
  },
];

export default function SectorsEmpower() {
  return (
    <div className="panel panel-sharp panel-topline p-8 md:p-10">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">See Passage in action</p>
        <span className="h-2 w-2 rounded-full bg-violet-400/70" aria-hidden="true" />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {SECTORS.map((s) => (
          <div key={s.title} className="bg-background/10 rounded-[14px] p-6">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-2xl font-bold tracking-tight leading-[1.08]">{s.title}</h3>
              <span className={["text-xs font-mono uppercase tracking-wider", ACCENT.text].join(" ")}>sector</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span key={t} className="bg-background/10 px-3 py-2 text-xs font-mono text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 divider" />

      <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-sm text-muted-foreground max-w-2xl">
          We can map your policy and workflow into a governed pipeline with review queues and auditability.
        </p>
        <Link
          href="/contact"
          className="group inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-95 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring/60"
        >
          Request a demo
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

