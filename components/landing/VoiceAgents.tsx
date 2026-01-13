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

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {AGENTS.map((a, idx) => (
          <motion.div
            key={a.name}
            className="bg-background/20 rounded-[10px] p-4"
            initial={reduce ? undefined : { opacity: 0, y: 10 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.06 }}
            whileHover={reduce ? undefined : { y: -2 }}
          >
            <div className="flex items-start gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-[10px]">
                <Image src={a.src} alt={`${a.name} portrait (AI generated)`} fill sizes="64px" className="object-cover" />
                <div aria-hidden="true" className="absolute inset-0 ring-1 ring-white/10" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground/90 truncate">{a.name}</p>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{a.role}</p>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-foreground/40 motion-safe:[animation:status-pulse_3.0s_ease-in-out_infinite]" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{a.line}</p>
                <div className="mt-3 text-[11px] font-mono text-muted-foreground">
                  Last run 09:{40 + idx}:1{idx}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

