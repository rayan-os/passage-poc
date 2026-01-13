"use client";

import { motion, useReducedMotion } from "framer-motion";

type Stage = {
  title: string;
  tasks: string[];
  mappedAgents: string;
};

const STAGES: Stage[] = [
  {
    title: "Intake",
    tasks: ["Collect applicant inputs", "Assemble application packet"],
    mappedAgents: "Jackie",
  },
  {
    title: "Verification",
    tasks: ["Identity + document checks", "Extract fields with evidence"],
    mappedAgents: "David",
  },
  {
    title: "Screening",
    tasks: ["Diligence screening", "Risk and fraud signals"],
    mappedAgents: "David",
  },
  {
    title: "Decision",
    tasks: ["Structured interviews", "Apply policy and rubrics"],
    mappedAgents: "Ella",
  },
  {
    title: "Support",
    tasks: ["Answer questions", "Escalate to human review"],
    mappedAgents: "Mark",
  },
];

export default function HowItWorksPipeline() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="container-grid py-20 md:py-24 border-t border-border">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-4">
          <p className="section-label">How it works</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            One governed decision pipeline
          </h2>
          <p className="mt-4 text-muted-foreground">
            Modular agents run inside a single workflow with policies, logs, and review queues.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-8 mt-10 lg:mt-0">
          <div className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-3">
              {STAGES.map((stage, idx) => (
                <motion.div
                  key={stage.title}
                  className="relative"
                  initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: idx * 0.03 }}
                >
                  <div className="h-full rounded-xl border border-border/70 bg-background/30 p-4">
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Stage {idx + 1}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold">{stage.title}</h3>
                    <ul className="mt-3 space-y-2">
                      {stage.tasks.map((t) => (
                        <li key={t} className="text-xs text-muted-foreground">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-border/70">
                      <p className="text-[11px] text-muted-foreground">
                        Agent: <span className="text-foreground/90">{stage.mappedAgents}</span>
                      </p>
                    </div>
                  </div>

                  {idx < STAGES.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                      <div className="h-8 w-8 rounded-full border border-border bg-background/60 backdrop-blur flex items-center justify-center">
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

