"use client";

import { motion, useReducedMotion } from "framer-motion";

type Agent = {
  name: string;
  role: string;
  description: string;
  bullets: string[];
};

const AGENTS: Agent[] = [
  {
    name: "Jackie",
    role: "Intake agent",
    description: "Collects info, guides applicants, builds the application packet.",
    bullets: ["Adaptive forms and checklists", "Document collection with status"],
  },
  {
    name: "David",
    role: "Processing agent",
    description: "Runs KYC, document analysis, diligence screening, credit checks.",
    bullets: ["Verification + extraction with evidence", "Screening checks with traceable outputs"],
  },
  {
    name: "Ella",
    role: "Interview agent",
    description: "Schedules and runs structured interviews, produces a structured scorecard.",
    bullets: ["Structured prompts and rubrics", "Scorecards ready for review"],
  },
  {
    name: "Mark",
    role: "Support agent",
    description: "Answers emails, answers calls, escalates to human.",
    bullets: ["Applicant Q&A with context", "Escalation to queues and humans"],
  },
];

export default function AgentsModules() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="container-grid py-20 md:py-24 border-t border-border">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-4">
          <p className="section-label">Agents</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Modular agents inside the platform
          </h2>
          <p className="mt-4 text-muted-foreground">
            Agents run inside Passage, governed by policies, logs, and human review.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-8 mt-10 lg:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AGENTS.map((agent, idx) => (
              <motion.div
                key={agent.name}
                className="group rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6 hover:bg-card/45 transition-colors"
                initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: idx * 0.04 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      {agent.role}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
                      {agent.name}
                    </h3>
                  </div>
                  <div className="h-10 w-10 rounded-xl border border-border bg-background/40 flex items-center justify-center group-hover:border-border/80 transition-colors">
                    <div className="h-2 w-2 rounded-full bg-primary/80 shadow-[0_0_18px_rgba(255,255,255,0.25)]" />
                  </div>
                </div>

                <p className="mt-4 text-sm text-muted-foreground">{agent.description}</p>

                <ul className="mt-6 space-y-2">
                  {agent.bullets.map((b) => (
                    <li key={b} className="text-sm text-foreground/90 flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
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

