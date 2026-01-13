"use client";

import Reveal from "@/components/enterprise/Reveal";

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
  return (
    <section className="container-grid py-20 md:py-24 border-t border-border">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-4">
          <Reveal>
            <p className="section-label">Proof & trust</p>
          </Reveal>
          <Reveal delayMs={70}>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Security posture for regulated decisions
            </h2>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-4 text-muted-foreground">
              Built for environments where access, evidence, and outcomes must be defensible.
            </p>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-8 mt-10 lg:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRUST_ITEMS.map((item, idx) => (
              <Reveal key={item.title} delayMs={idx * 60} className="h-full">
                <div className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6 hover:bg-card/45 transition-colors">
                  <h3 className="font-display text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

