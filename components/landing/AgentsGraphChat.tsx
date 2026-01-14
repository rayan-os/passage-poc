"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

type AgentKey = "jackie" | "david" | "ella" | "mark";

type Agent = {
  key: AgentKey;
  name: string;
  role: string;
  src: string;
  connectsTo: string; // pipeline node id
};

type ChatMsg = { from: "user" | "agent"; text: string };

const AGENTS: Agent[] = [
  { key: "jackie", name: "Jackie", role: "Intake", src: "/agents/jackie.png", connectsTo: "intake" },
  { key: "david", name: "David", role: "Verification", src: "/agents/david.png", connectsTo: "verify" },
  { key: "ella", name: "Ella", role: "Decisions", src: "/agents/ella.png", connectsTo: "decide" },
  { key: "mark", name: "Mark", role: "Support", src: "/agents/mark.png", connectsTo: "support" },
];

const PIPELINE = [
  { id: "intake", label: "Intake" },
  { id: "verify", label: "Verify" },
  { id: "decide", label: "Decide" },
  { id: "support", label: "Support" },
  { id: "report", label: "Report" },
];

const CHAT: Record<AgentKey, { title: string; subtitle: string; msgs: ChatMsg[]; highlights: string[] }> = {
  jackie: {
    title: "Intake",
    subtitle: "Collects inputs. Guides applicants. Builds the packet.",
    highlights: ["Forms and checklists", "Document requests", "Structured packet output"],
    msgs: [
      { from: "user", text: "Start an application for Graduate admissions." },
      { from: "agent", text: "Created packet. Missing transcript and residency proof. Request sent." },
      { from: "user", text: "What is blocking submission?" },
      { from: "agent", text: "Transcript not received. Residency proof unreadable. One retry requested." },
    ],
  },
  david: {
    title: "Verification",
    subtitle: "Runs checks. Extracts fields. Links proof.",
    highlights: ["Document checks", "Field extraction", "Proof linking"],
    msgs: [
      { from: "user", text: "Verify Rivera, A. and link evidence." },
      { from: "agent", text: "ID match pass. Transcript missing. GPA extracted 3.7 from records. Proof linked 2 items." },
      { from: "user", text: "Any conflicts?" },
      { from: "agent", text: "No policy conflicts. Waiting on transcript to complete verification." },
    ],
  },
  ella: {
    title: "Decisions",
    subtitle: "Applies rules. Generates rationale. Routes to review.",
    highlights: ["Rules and rubrics", "Rationale", "Human approval routing"],
    msgs: [
      { from: "user", text: "Decide Patel, S. under admissions_v3." },
      { from: "agent", text: "Outcome: ADMIT. Meets thresholds. No conflicts detected. Ready for approval." },
      { from: "user", text: "Explain the outcome." },
      { from: "agent", text: "GPA above minimum. Verification complete. Program fit high. No exceptions required." },
    ],
  },
  mark: {
    title: "Support",
    subtitle: "Answers questions. Escalates edge cases. Updates status.",
    highlights: ["Inbound replies", "Escalations", "Status updates"],
    msgs: [
      { from: "user", text: "Applicant asks: when will I get my LOA?" },
      { from: "agent", text: "Their file is in Decisions. Expected within 3 hours once approval completes." },
      { from: "user", text: "Escalate if stuck." },
      { from: "agent", text: "Escalation rule armed. Will notify staff if LOA stage exceeds threshold." },
    ],
  },
};

export default function AgentsGraphChat() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<AgentKey>("jackie");

  const positions = useMemo(() => {
    // Percent-based layout so it scales responsively.
    return {
      agents: {
        jackie: { x: 12, y: 18 },
        david: { x: 36, y: 12 },
        ella: { x: 60, y: 18 },
        mark: { x: 84, y: 12 },
      } as Record<AgentKey, { x: number; y: number }>,
      pipeline: {
        intake: { x: 12, y: 72 },
        verify: { x: 32, y: 62 },
        decide: { x: 52, y: 72 },
        support: { x: 72, y: 62 },
        report: { x: 90, y: 72 },
      } as Record<string, { x: number; y: number }>,
    };
  }, []);

  const activeAgent = AGENTS.find((a) => a.key === active)!;
  const activeChat = CHAT[active];

  return (
    <div className="panel panel-sharp panel-topline p-6 md:p-7">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Agents graph</p>
        <span className="h-2 w-2 rounded-full bg-violet-400/70" aria-hidden="true" />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Graph */}
        <div className="lg:col-span-7">
          <div className="relative bg-background/10 rounded-[10px] overflow-hidden min-h-[360px]">
            <div className="absolute inset-0 pointer-events-none opacity-70" aria-hidden="true">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1px, transparent 1.9px)",
                }}
              />
              <div
                className="absolute inset-0 dark:block hidden"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 1.9px)",
                }}
              />
            </div>

            {/* Connections */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <filter id="gGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="0.6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Pipeline backbone */}
              {PIPELINE.slice(0, -1).map((p, idx) => {
                const a = positions.pipeline[p.id];
                const b = positions.pipeline[PIPELINE[idx + 1]!.id];
                const d = `M ${a.x} ${a.y} C ${a.x + 8} ${a.y} ${b.x - 8} ${b.y} ${b.x} ${b.y}`;
                return (
                  <path
                    key={`pipe-${p.id}`}
                    d={d}
                    fill="none"
                    stroke="rgba(0,0,0,0.10)"
                    className="dark:[stroke:rgba(255,255,255,0.10)]"
                    strokeWidth="0.6"
                  />
                );
              })}

              {/* Agent-to-step connectors (dim others, highlight active) */}
              {AGENTS.map((a) => {
                const ap = positions.agents[a.key];
                const bp = positions.pipeline[a.connectsTo];
                const d = `M ${ap.x} ${ap.y} C ${ap.x} ${ap.y + 12} ${bp.x} ${bp.y - 12} ${bp.x} ${bp.y}`;
                const isActive = a.key === active;
                return (
                  <motion.path
                    key={`a-${a.key}`}
                    d={d}
                    fill="none"
                    stroke={isActive ? "rgba(167,139,250,0.55)" : "rgba(0,0,0,0.08)"}
                    className={isActive ? "" : "dark:[stroke:rgba(255,255,255,0.08)]"}
                    strokeWidth={isActive ? "0.85" : "0.6"}
                    filter={isActive ? "url(#gGlow)" : undefined}
                    initial={false}
                    animate={reduce ? undefined : { opacity: isActive ? 1 : 0.45 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                );
              })}
            </svg>

            {/* Agent nodes */}
            {AGENTS.map((a) => {
              const p = positions.agents[a.key];
              const isActive = a.key === active;
              return (
                <motion.button
                  key={a.key}
                  type="button"
                  onClick={() => setActive(a.key)}
                  className={[
                    "absolute -translate-x-1/2 -translate-y-1/2 text-left",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                  ].join(" ")}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  initial={false}
                  animate={reduce ? undefined : { scale: isActive ? 1.15 : 1, opacity: isActive ? 1 : 0.65 }}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                >
                  <div className={["flex items-center gap-3 bg-background/40 backdrop-blur px-3 py-2 rounded-[10px]"].join(" ")}>
                    <div className="relative h-10 w-10 overflow-hidden rounded-[10px]">
                      <Image src={a.src} alt={`${a.name} portrait`} fill sizes="40px" className="object-cover" />
                      <div className="absolute inset-0 ring-1 ring-black/10 dark:ring-white/10" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground/90">{a.name}</p>
                        {isActive && <span className="h-1.5 w-1.5 rounded-full bg-violet-400/80" aria-hidden="true" />}
                      </div>
                      <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{a.role}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}

            {/* Pipeline nodes */}
            {PIPELINE.map((p) => {
              const pt = positions.pipeline[p.id];
              const isActive = p.id === activeAgent.connectsTo;
              return (
                <div
                  key={p.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                >
                  <div className={["h-3 w-3 rounded-full", isActive ? "bg-violet-400/70" : "bg-foreground/25"].join(" ")} />
                  <div className="mt-2 text-[11px] font-mono text-muted-foreground text-center">{p.label}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <p className="text-[11px] font-mono text-muted-foreground">Click an agent to inspect.</p>
          </div>
        </div>

        {/* Chat panel */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="panel panel-sharp panel-topline p-5"
              initial={reduce ? undefined : { opacity: 0, x: 12 }}
              animate={reduce ? undefined : { opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: 12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Agent</p>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">{activeChat.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{activeChat.subtitle}</p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-background/10 hover:bg-background/20 text-foreground/90 px-3 py-2 text-xs font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring/50"
                  aria-label={`Call ${activeAgent.name}`}
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

              <div className="mt-5 divider" />

              <div className="mt-4 flex flex-wrap gap-2">
                {activeChat.highlights.map((h) => (
                  <span key={h} className="bg-background/10 px-3 py-2 text-xs font-mono text-muted-foreground">
                    {h}
                  </span>
                ))}
              </div>

              <div className="mt-5 divider" />

              <div className="mt-4 space-y-3">
                {activeChat.msgs.map((m, i) => (
                  <motion.div
                    key={`${m.from}-${i}`}
                    className={[
                      "max-w-[92%] px-3 py-2 text-sm",
                      m.from === "user"
                        ? "ml-auto bg-background/10 text-foreground/90"
                        : "mr-auto bg-foreground/[0.04] text-foreground/90 dark:bg-background/10",
                    ].join(" ")}
                    initial={reduce ? undefined : { opacity: 0, y: 8 }}
                    animate={reduce ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut", delay: 0.05 + i * 0.06 }}
                  >
                    <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                      {m.from === "user" ? "You" : activeAgent.name}
                    </p>
                    <p className="mt-1">{m.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

