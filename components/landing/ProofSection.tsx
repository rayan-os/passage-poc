"use client";

import { Section } from "@/components/landing/Layout";
import { COPY } from "@/components/landing/copy";
import ProofLogos from "@/components/landing/ProofLogos";
import KPIStrip from "@/components/landing/KPIStrip";
import Testimonials from "@/components/landing/Testimonials";

export default function ProofSection() {
  return (
    <Section id="proof" eyebrow="Proof" title={COPY.proof.header} subtitle={COPY.proof.body}>
      <div className="space-y-8">
        <ProofLogos count={COPY.proof.logosCount} />
        <KPIStrip kpis={COPY.proof.kpis} />
        <Testimonials items={COPY.proof.testimonials} />
      </div>
    </Section>
  );
}

