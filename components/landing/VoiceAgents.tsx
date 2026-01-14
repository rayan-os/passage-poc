"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Agent = {
  name: string;
  role: string;
  line: string;
  src: string;
};

const AGENTS: Agent[] = [
  {
    name: "Jackie",
    role: "Intake agent",
    line: "Collects info, guides applicants, builds the packet.",
    src: "/agents/jackie.png",
  },
  {
    name: "David",
    role: "Processing agent",
    line: "Runs checks, extracts fields, flags issues with proof.",
    src: "/agents/david.png",
  },
  {
    name: "Ella",
    role: "Interview agent",
    line: "Runs structured interviews, produces scorecards.",
    src: "/agents/ella.png",
  },
  {
    name: "Mark",
    role: "Support agent",
    line: "Answers questions fast, escalates edge cases.",
    src: "/agents/mark.png",
  },
];

export default function VoiceAgents() {
  const reduce = useReducedMotion();

  return (
    <div className="panel panel-sharp panel-topline p-6 md:p-7">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Agents</p>
        <span className="h-2 w-2 rounded-full bg-foreground/35" aria-hidden="true" />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {AGENTS.map((a, idx) => (
          <motion.div
            key={a.name}
            className="bg-background/20 rounded-[10px] p-5"
            initial={reduce ? undefined : { opacity: 0, y: 10 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.06 }}
            whileHover={reduce ? undefined : { y: -3 }}
          >
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-[12px]">
                <Image src={a.src} alt={`${a.name} portrait (AI generated)`} fill sizes="80px" className="object-cover" />
                <div aria-hidden="true" className="absolute inset-0 ring-1 ring-white/10" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-base font-medium text-foreground/90 truncate">{a.name}</p>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{a.role}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-muted-foreground">AVAILABLE</span>
                    <span className="h-2.5 w-2.5 rounded-full bg-foreground/40 motion-safe:[animation:status-pulse_3.0s_ease-in-out_infinite]" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{a.line}</p>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="text-[11px] font-mono text-muted-foreground">
                    Last run 09:{40 + idx}:1{idx}
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 bg-background/10 hover:bg-background/20 text-foreground/90 px-3 py-2 text-xs font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring/50"
                    aria-label={`Call ${a.name}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.06a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.92Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Call
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

