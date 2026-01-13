"use client";

import Reveal from "@/components/enterprise/Reveal";
import { useEffect, useMemo, useRef, useState } from "react";

type BuyerKey = "government" | "employers" | "lenders" | "programs";

type BuyerContent = {
  label: string;
  outcomes: string[];
  workflows: string[];
  proof: string;
};

const BUYERS: Record<BuyerKey, BuyerContent> = {
  government: {
    label: "Government",
    outcomes: ["Faster eligibility decisions", "Fewer processing errors", "Consistent policy enforcement"],
    workflows: ["Benefits intake", "Licensing & permitting", "Program enrollment"],
    proof: "Built for decisions that must be explainable and reviewable."
  },
  employers: {
    label: "Employers",
    outcomes: ["Shorter time-to-decision", "Standardized screening", "Clear escalation to reviewers"],
    workflows: ["Candidate onboarding", "Credential verification", "Talent program selection"],
    proof: "Designed to keep every decision aligned to documented criteria."
  },
  lenders: {
    label: "Lenders",
    outcomes: ["Lower manual review load", "Tighter risk controls", "Repeatable underwriting decisions"],
    workflows: ["Credit applications", "KYC + document review", "Fraud screening"],
    proof: "Every check and decision step is logged with evidence."
  },
  programs: {
    label: "Programs",
    outcomes: ["More consistent outcomes", "Less back-and-forth with applicants", "Auditable decision paths"],
    workflows: ["Admissions", "Scholarships & grants", "Access programs"],
    proof: "A single pipeline for intake through decision, with human oversight."
  },
};

const ORDER: BuyerKey[] = ["government", "employers", "lenders", "programs"];

export default function BuyerSelector() {
  const [active, setActive] = useState<BuyerKey>("government");
  const activeContent = BUYERS[active];

  const tabs = useMemo(() => ORDER.map((k) => ({ key: k, label: BUYERS[k].label })), []);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
  const [panelVisible, setPanelVisible] = useState(true);

  useEffect(() => {
    const el = tabRefs.current[active];
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setIndicator({ left: rect.left - parentRect.left, width: rect.width });
  }, [active]);

  useEffect(() => {
    setPanelVisible(false);
    const t = window.setTimeout(() => setPanelVisible(true), 20);
    return () => window.clearTimeout(t);
  }, [active]);

  return (
    <section className="container-grid py-20 md:py-24 border-t border-border">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-4">
          <Reveal>
            <p className="section-label">Who it’s for</p>
          </Reveal>
          <Reveal delayMs={70}>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Clarity by buyer
            </h2>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-4 text-muted-foreground">
              Passage supports regulated programs that need consistent decisions with auditability.
            </p>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-8 mt-10 lg:mt-0">
          <div className="relative inline-flex rounded-full border border-border bg-secondary/30 p-1">
            {indicator && (
              <span
                aria-hidden="true"
                className="absolute top-1 bottom-1 rounded-full bg-accent transition-all duration-300 ease-out"
                style={{ left: indicator.left, width: indicator.width }}
              />
            )}
            {tabs.map((tab) => {
              const isActive = tab.key === active;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActive(tab.key)}
                  ref={(node) => {
                    tabRefs.current[tab.key] = node;
                  }}
                  className="relative px-4 md:px-5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className={isActive ? "relative text-foreground" : "relative"}>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-7 md:p-8">
            <div
              key={active}
              className={[
                "transition-all duration-200 ease-out",
                panelVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
              ].join(" ")}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Outcomes</p>
                  <ul className="space-y-2">
                    {activeContent.outcomes.map((o) => (
                      <li key={o} className="text-sm text-foreground/90 flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/80 flex-shrink-0" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Example workflows</p>
                  <ul className="space-y-2">
                    {activeContent.workflows.map((w) => (
                      <li key={w} className="text-sm text-foreground/90 flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-8 text-sm text-muted-foreground">{activeContent.proof}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

