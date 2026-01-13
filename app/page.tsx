import dynamic from "next/dynamic";
import Hero from "@/components/landing/Hero";
import { Section } from "@/components/landing/Layout";
import { COPY } from "@/components/landing/copy";
import PipelineStrip from "@/components/landing/PipelineStrip";
import OutcomeStrip from "@/components/landing/OutcomeStrip";
import ProofSection from "@/components/landing/ProofSection";
import IntegrationsGrid from "@/components/landing/IntegrationsGrid";
import FounderCard from "@/components/landing/FounderCard";
import FinalCTABand from "@/components/landing/FinalCTABand";
import VoiceAgents from "@/components/landing/VoiceAgents";
import DataFlowDots from "@/components/landing/DataFlowDots";

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
        <PipelineStrip />
      </Section>

      <Section id="outcomes" eyebrow="Outcomes" title={COPY.outcomeStrip.header} subtitle={COPY.outcomeStrip.body}>
        <OutcomeStrip />
      </Section>

      <Section id="agents" eyebrow="Agents" title={COPY.agents.header} subtitle={COPY.agents.body}>
        <div className="space-y-6">
          <VoiceAgents />
          <DataFlowDots />
        </div>
      </Section>

      <ProofSection />

      <Section id="integrations" eyebrow="Integrations" title={COPY.integrations.header} subtitle={COPY.integrations.body}>
        <IntegrationsGrid />
      </Section>

      <Section id="console" eyebrow="Console" title={COPY.console.header} subtitle={COPY.console.subhead}>
        <PromptConsole />
      </Section>

      <Section id="team" eyebrow="Team" title={COPY.team.header} subtitle={COPY.team.body}>
        <div className="space-y-6">
          <FounderCard />
          <FinalCTABand />
        </div>
      </Section>
    </>
  );
}
