"use client";

import Reveal from "@/components/enterprise/Reveal";
import { AGENTS as AGENT_COLORS, type AgentKey } from "@/components/enterprise/agentColors";
import { useAgentHighlight } from "@/components/enterprise/AgentHighlightContext";

type Agent = {
  key: AgentKey;
  name: string;
  roleLine: string;
  chips: string[];
};

const AGENT_CARDS: Agent[] = [
  {
    key: "jackie",
    name: "Jackie",
    roleLine: "Intake agent",
    chips: ["Intake", "Eligibility"],
  },
  {
    key: "david",
    name: "David",
    roleLine: "Processing agent",
    chips: ["Verification", "Screening"],
  },
  {
    key: "ella",
    name: "Ella",
    roleLine: "Interview agent",
    chips: ["Interview", "Assessment"],
  },
  {
    key: "mark",
    name: "Mark",
    roleLine: "Support agent",
    chips: ["Support", "Escalation"],
  },
];

export default function AgentsModules() {
  const { activeAgent, setActiveAgent } = useAgentHighlight();

  return (
    <section className="container-grid py-20 md:py-24 border-t border-border">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-4">
          <Reveal>
            <p className="section-label">Agents</p>
          </Reveal>
          <Reveal delayMs={70}>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Modular agents inside the platform
            </h2>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-4 text-muted-foreground">
              Agents run inside Passage, governed by policies, logs, and human review.
            </p>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-8 mt-10 lg:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AGENT_CARDS.map((agent, idx) => {
              const dim = activeAgent && activeAgent !== agent.key;
              const styles = AGENTS_META[agent.key];
              return (
                <Reveal key={agent.name} delayMs={idx * 70} className="h-full">
                  <div
                    onMouseEnter={() => setActiveAgent(agent.key)}
                    onMouseLeave={() => setActiveAgent(null)}
                    className={[
                      "group relative h-full rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6",
                      "transition-all duration-200 hover:-translate-y-0.5",
                      dim ? "opacity-50" : "opacity-100",
                      "hover:ring-1",
                      styles.ringClass,
                      "hover:bg-card/45",
                      "focus-within:ring-2 focus-within:ring-ring/40",
                    ].join(" ")}
                  >
                    <div
                      aria-hidden="true"
                      className={[
                        "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none",
                        styles.glowClass,
                      ].join(" ")}
                    />

                    <div className="relative flex items-start justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2">
                          <span className={["h-2 w-2 rounded-full", styles.dotClass].join(" ")} />
                          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                            {agent.roleLine}
                          </p>
                        </div>
                        <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
                          {agent.name}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {agent.roleLine} for the governed pipeline.
                        </p>
                      </div>
                      <div className="h-10 w-10 rounded-xl border border-border bg-background/40 flex items-center justify-center transition-colors group-hover:border-border/80">
                        <div className={["h-2.5 w-2.5 rounded-full", styles.dotClass].join(" ")} />
                      </div>
                    </div>

                    <div className="relative mt-5 flex flex-wrap gap-2">
                      {agent.chips.map((chip) => (
                        <span
                          key={chip}
                          className={[
                            "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
                            styles.chipClass,
                          ].join(" ")}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-8 rounded-xl border border-border bg-background/30 p-5">
            <p className="text-sm text-muted-foreground">
              These are not separate products. They inherit your policies, evidence requirements, and review rules by default.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const AGENTS_META = {
  jackie: AGENT_COLORS.jackie,
  david: AGENT_COLORS.david,
  ella: AGENT_COLORS.ella,
  mark: AGENT_COLORS.mark,
};

