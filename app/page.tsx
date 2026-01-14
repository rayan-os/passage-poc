import dynamic from "next/dynamic";
import Hero from "@/components/landing/Hero";
import { Section } from "@/components/landing/Layout";
import { COPY } from "@/components/landing/copy";
import PlatformUIShowcase from "@/components/landing/PlatformUIShowcase";
import ProofSection from "@/components/landing/ProofSection";
import IntegrationsGrid from "@/components/landing/IntegrationsGrid";
import AgentsIMChat from "@/components/landing/AgentsIMChat";
import OversightResearch from "@/components/landing/OversightResearch";
import SectorsEmpower from "@/components/landing/SectorsEmpower";
import OperatorsSection from "@/components/landing/OperatorsSection";

const PromptConsole = dynamic(() => import("@/components/landing/PromptConsole"), {
  ssr: false,
  loading: () => (
    <div className="rounded-3xl border border-border bg-card/20 backdrop-blur-sm p-6 md:p-8 text-sm text-muted-foreground">
      Loading console…
    </div>
  ),
});

export default function Home() {
  return (
    <>
      <Hero />

      <Section id="platform" eyebrow="Platform" title={COPY.platformClaim.header} subtitle={COPY.platformClaim.body}>
        <PlatformUIShowcase />
      </Section>

      <Section id="agents" eyebrow="Agents" title={COPY.agents.header} subtitle={COPY.agents.body}>
        <AgentsIMChat />
      </Section>

      <OversightResearch />

      <ProofSection />

      <Section id="integrations" eyebrow="Integrations" title={COPY.integrations.header} subtitle={COPY.integrations.body}>
        <IntegrationsGrid />
      </Section>

      <Section id="console" eyebrow="Console" title={COPY.console.header} subtitle={COPY.console.subhead}>
        <PromptConsole />
      </Section>

      <Section id="demo" eyebrow="Demo" title="See Passage in action" subtitle="A governed decision pipeline for regulated workflows.">
        <SectorsEmpower />
      </Section>

      <Section id="team" eyebrow="Team" title="Built by operators and engineers" subtitle="Placeholders included — replace with verified company and funding claims.">
        <OperatorsSection />
      </Section>
    </>
  );
}
