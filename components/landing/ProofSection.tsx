"use client";

import { COPY } from "@/components/landing/copy";
import ProofLogos from "@/components/landing/ProofLogos";
import KPIStrip from "@/components/landing/KPIStrip";
import Testimonials from "@/components/landing/Testimonials";

export default function ProofSection() {
  return (
    <section id="proof" className="border-t border-border">
      <div className="container-grid py-18 md:py-24 lg:py-28">
        <div className="grid-12">
          <div className="col-span-12">
            <p className="text-xs uppercase tracking-wider font-mono text-muted-foreground">Proof</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight leading-[1.05]">
              {COPY.proof.header}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl">{COPY.proof.body}</p>
          </div>

          <div className="col-span-12 mt-10">
            <div className="space-y-8">
              <ProofLogos count={COPY.proof.logosCount} />
              <KPIStrip kpis={COPY.proof.kpis} />
              <Testimonials items={COPY.proof.testimonials} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

