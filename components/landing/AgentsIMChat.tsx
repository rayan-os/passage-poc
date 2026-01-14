"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type AgentKey = "jackie" | "david" | "ella" | "mark";

type Agent = {
  key: AgentKey;
  name: string;
  role: string;
  src: string;
  oneLine: string;
  inputs: string[];
  outputs: string[];
  chips: string[];
  prompts: string[];
};

type Msg = { id: string; from: "user" | "agent"; text: string };

const AGENTS: Agent[] = [
  {
    key: "jackie",
    name: "Jackie",
    role: "Intake",
    src: "/agents/jackie.png",
    oneLine: "Collects info, requests missing docs, builds a clean packet.",
    inputs: ["Email + attachments", "Form answers", "Program selection"],
    outputs: ["Structured packet", "Missing-docs list", "Applicant-ready checklist"],
    chips: ["Intake", "Eligibility", "Packet"],
    prompts: ["What’s missing to submit?", "Generate the applicant checklist", "Summarize this inbox thread"],
  },
  {
    key: "david",
    name: "David",
    role: "Verification",
    src: "/agents/david.png",
    oneLine: "Parses docs, extracts fields, runs checks, links evidence.",
    inputs: ["ID + proof docs", "Third‑party checks", "Policy requirements"],
    outputs: ["Extracted fields", "Evidence links", "Verification status"],
    chips: ["Verification", "Screening", "Evidence"],
    prompts: ["Run verification and link evidence", "Show conflicts and exceptions", "Extract key fields from docs"],
  },
  {
    key: "ella",
    name: "Ella",
    role: "Interview",
    src: "/agents/ella.png",
    oneLine: "Runs structured interviews and produces a scorecard.",
    inputs: ["Interview rubric", "Calendar availability", "Applicant responses"],
    outputs: ["Scorecard", "Risk flags", "Recommendation"],
    chips: ["Interview", "Assessment", "Scorecard"],
    prompts: ["Schedule a structured interview", "Generate a scorecard", "Highlight risk flags"],
  },
  {
    key: "mark",
    name: "Mark",
    role: "Support",
    src: "/agents/mark.png",
    oneLine: "Answers inbound, updates status, escalates edge cases.",
    inputs: ["Email + calls", "Case status", "Escalation rules"],
    outputs: ["Replies", "Escalations", "Status updates"],
    chips: ["Support", "Escalation", "SLAs"],
    prompts: ["Draft a response to the applicant", "Escalate if stuck > 24h", "What’s the current status?"],
  },
];

const RESPONSES: Record<AgentKey, (prompt: string) => string> = {
  jackie: (p) => {
    if (p.toLowerCase().includes("missing")) return "Blocking: transcript.pdf not received; residency.pdf is unreadable. Request sent with secure upload link.";
    if (p.toLowerCase().includes("checklist")) return "Checklist generated: identity proof, transcript, residency proof, program selection, consent. Packet will auto‑validate on upload.";
    return "Thread summarized: applicant submitted ID + residency; transcript pending. Next action: send transcript request and set reminder.";
  },
  david: (p) => {
    if (p.toLowerCase().includes("conflict")) return "No conflicts found. One exception candidate: residency proof low confidence → route to human review.";
    if (p.toLowerCase().includes("extract")) return "Extracted: name, DOB, document IDs, dates, GPA (3.7), institution, program. Evidence links attached.";
    return "Verification started. ID match PASS. Doc integrity checks PASS. Evidence linked (2). Waiting on transcript to complete.";
  },
  ella: (p) => {
    if (p.toLowerCase().includes("schedule")) return "Interview scheduled for Wed 2:30pm. Rubric attached. Candidate prep email queued.";
    if (p.toLowerCase().includes("risk")) return "Risk flags: inconsistent employment dates, incomplete residency proof. Recommend follow‑up questions.";
    return "Scorecard generated: Communication 4/5, Motivation 5/5, Preparedness 4/5, Policy fit 5/5. Recommendation: proceed.";
  },
  mark: (p) => {
    if (p.toLowerCase().includes("status")) return "Current status: Verification pending transcript. Estimated completion: 3 hours after upload.";
    if (p.toLowerCase().includes("escalate")) return "Escalation rule armed: notify staff if case remains blocked > 24h. Next check in 60 minutes.";
    return "Draft reply: “Thanks—your application is in review. We’re waiting on your transcript upload. Once received, decisions typically finalize within a few hours.”";
  },
};

export default function AgentsIMChat() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<AgentKey>("jackie");
  const [msgs, setMsgs] = useState<Msg[]>(() => seedMessages("jackie"));
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const agent = useMemo(() => AGENTS.find((a) => a.key === active)!, [active]);

  useEffect(() => {
    setMsgs(seedMessages(active));
    setTyping(false);
  }, [active]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [msgs, typing]);

  function runPrompt(prompt: string) {
    const now = Date.now();
    const userMsg: Msg = { id: `u-${now}`, from: "user", text: prompt };
    setMsgs((m) => [...m, userMsg]);
    setTyping(true);
    window.setTimeout(() => {
      const text = RESPONSES[active](prompt);
      const agentMsg: Msg = { id: `a-${now}`, from: "agent", text };
      setMsgs((m) => [...m, agentMsg]);
      setTyping(false);
    }, reduce ? 0 : 520);
  }

  return (
    <div className="panel panel-sharp panel-topline p-8 md:p-10">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Agents</p>
        <span className="h-2 w-2 rounded-full bg-violet-400/70 motion-safe:[animation:status-pulse_3.1s_ease-in-out_infinite]" aria-hidden="true" />
      </div>

      {/* Agent selector (horizontal) */}
      <div className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-3">
        {AGENTS.map((a) => {
          const isActive = a.key === active;
          return (
            <motion.button
              key={a.key}
              type="button"
              onClick={() => setActive(a.key)}
              className={[
                "text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                "bg-background/10 hover:bg-background/15 transition-colors",
                "px-4 py-3",
                isActive ? "panel-topline" : "border-t border-transparent",
              ].join(" ")}
              initial={false}
              animate={reduce ? undefined : { opacity: isActive ? 1 : 0.7 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-[12px] shrink-0">
                  <Image src={a.src} alt={`${a.name} portrait`} fill sizes="40px" className="object-cover" />
                  <div className="absolute inset-0 ring-1 ring-black/10 dark:ring-white/10" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold tracking-tight text-foreground/95">{a.name}</p>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-violet-400/80" aria-hidden="true" />}
                  </div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{a.role}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active agent detail */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="panel panel-sharp panel-topline p-6 md:p-7"
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: 10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="relative h-14 w-14 overflow-hidden rounded-[12px] shrink-0">
                    <Image src={agent.src} alt={`${agent.name} portrait`} fill sizes="56px" className="object-cover" />
                    <div className="absolute inset-0 ring-1 ring-black/10 dark:ring-white/10" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-semibold tracking-tight text-foreground/95">{agent.name}</p>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{agent.role}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{agent.oneLine}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {agent.chips.map((c) => (
                        <span key={c} className="bg-background/10 px-3 py-2 text-xs font-mono text-muted-foreground">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex flex-col items-end gap-2 shrink-0">
                  <span className="text-[11px] font-mono text-muted-foreground">last run</span>
                  <span className="text-xs font-mono text-foreground/80">09:41</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-background/10 rounded-[12px] p-4">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Inputs</p>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {agent.inputs.map((x) => (
                      <li key={x} className="flex items-center justify-between">
                        <span>{x}</span>
                        <span className="text-foreground/60 font-mono">→</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-background/10 rounded-[12px] p-4">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Outputs</p>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {agent.outputs.map((x) => (
                      <li key={x} className="flex items-center justify-between">
                        <span>{x}</span>
                        <span className="text-foreground/60 font-mono">✓</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* iMessage-like chat */}
        <div className="lg:col-span-6">
          <div className="panel panel-sharp panel-topline p-6 md:p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Inspector</p>
                <h3 className="mt-2 font-display text-3xl font-bold tracking-tight leading-[1.05]">
                  {agent.name} chat
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Click a prompt to see how the agent behaves inside the governed pipeline.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-[11px] font-mono text-muted-foreground">policy</span>
                <span className="text-[11px] font-mono text-foreground/80">enforced</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {agent.prompts.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => runPrompt(p)}
                  className="bg-background/10 hover:bg-background/20 px-3 py-2 text-xs font-mono text-foreground/85 transition-colors focus:outline-none focus:ring-2 focus:ring-ring/50"
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="mt-6 divider" />

            <div ref={scrollRef} className="mt-6 h-[380px] overflow-auto pr-2">
              <div className="space-y-3">
                <AnimatePresence initial={false}>
                  {msgs.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={reduce ? undefined : { opacity: 0, y: 10 }}
                      animate={reduce ? undefined : { opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className={[
                        "max-w-[92%] rounded-[18px] px-4 py-3 text-sm leading-snug shadow-[0_1px_0_rgba(0,0,0,0.06)] dark:shadow-none",
                        m.from === "user"
                          ? "ml-auto bg-violet-400/15 text-foreground/95"
                          : "mr-auto bg-background/10 text-foreground/90",
                      ].join(" ")}
                    >
                      {m.text}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {typing && (
                  <motion.div
                    initial={reduce ? undefined : { opacity: 0, y: 8 }}
                    animate={reduce ? undefined : { opacity: 1, y: 0 }}
                    className="mr-auto bg-background/10 text-foreground/70 rounded-[18px] px-4 py-3 text-sm"
                  >
                    <span className="inline-flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 motion-safe:animate-pulse" />
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground/30 motion-safe:animate-pulse [animation-delay:120ms]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground/20 motion-safe:animate-pulse [animation-delay:240ms]" />
                    </span>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="mt-6 divider" />

            <div className="mt-5 flex items-center justify-between gap-3">
              <div className="flex-1 bg-background/10 rounded-[14px] px-4 py-3 text-sm text-muted-foreground">
                Message… <span className="ml-1 inline-block w-2 h-4 align-[-2px] bg-foreground/50 motion-safe:[animation:blink_1.1s_steps(2,end)_infinite]" />
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-[14px] bg-primary text-primary-foreground px-4 py-3 text-sm font-medium hover:opacity-95 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring/60"
                aria-label="Send message"
                onClick={() => runPrompt(agent.prompts[0]!)}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function seedMessages(agent: AgentKey): Msg[] {
  const base: Msg[] = [
    { id: "s1", from: "agent", text: "Hi — I’m ready. Pick a prompt to inspect behavior and outputs." },
  ];
  if (agent === "jackie") return [...base, { id: "s2", from: "user", text: "What’s missing to submit?" }, { id: "s3", from: "agent", text: RESPONSES.jackie("What’s missing to submit?") }];
  if (agent === "david") return [...base, { id: "s2", from: "user", text: "Run verification and link evidence" }, { id: "s3", from: "agent", text: RESPONSES.david("Run verification and link evidence") }];
  if (agent === "ella") return [...base, { id: "s2", from: "user", text: "Generate a scorecard" }, { id: "s3", from: "agent", text: RESPONSES.ella("Generate a scorecard") }];
  return [...base, { id: "s2", from: "user", text: "What’s the current status?" }, { id: "s3", from: "agent", text: RESPONSES.mark("What’s the current status?") }];
}

