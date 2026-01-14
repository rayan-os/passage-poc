"use client";

import Reveal from "@/components/enterprise/Reveal";

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
  return (
    <section className="container-grid py-20 md:py-24 border-t border-border">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-4">
          <Reveal>
            <p className="section-label">Platform primitives</p>
          </Reveal>
          <Reveal delayMs={70}>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Enterprise-grade by default
            </h2>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-4 text-muted-foreground">
              The building blocks that keep automation governable and decisions defensible.
            </p>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-8 mt-10 lg:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((p, idx) => (
              <Reveal key={p.title} delayMs={idx * 60} className="h-full">
                <div className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6 hover:bg-card/45 transition-colors">
                <h3 className="font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

