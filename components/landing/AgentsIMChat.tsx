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

const ORDER: AgentKey[] = ["jackie", "david", "ella", "mark"];

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
  const [intro, setIntro] = useState(true);

  const agent = useMemo(() => AGENTS.find((a) => a.key === active)!, [active]);
  const accent = useMemo(() => accentFor(active), [active]);

  useEffect(() => {
    setMsgs(seedMessages(active));
    setTyping(false);
  }, [active]);

  // “Walk” left→right once on load (Palantir-ish demo motion, Airbnb-ish color).
  useEffect(() => {
    if (reduce) return;
    const timers: number[] = [];
    timers.push(
      window.setTimeout(() => {
        setActive("jackie");
      }, 250)
    );
    timers.push(
      window.setTimeout(() => {
        setActive("david");
      }, 800)
    );
    timers.push(
      window.setTimeout(() => {
        setActive("ella");
      }, 1350)
    );
    timers.push(
      window.setTimeout(() => {
        setActive("mark");
        setIntro(false);
      }, 1900)
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [reduce]);

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
        <span
          className="h-2 w-2 rounded-full motion-safe:[animation:status-pulse_3.1s_ease-in-out_infinite]"
          style={{ backgroundColor: accent.dot }}
          aria-hidden="true"
        />
      </div>

      {/* Horizontal pipeline (small) with animated links */}
      <div className="mt-7">
        <div className="relative bg-background/10 rounded-[14px] px-4 py-4 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(700px 220px at 20% 0%, rgba(236,72,153,0.10), transparent 60%), radial-gradient(700px 220px at 55% 0%, rgba(34,197,94,0.08), transparent 60%), radial-gradient(700px 220px at 90% 0%, rgba(34,211,238,0.10), transparent 60%)",
            }}
          />

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <filter id="aGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="0.7" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Base track */}
            {segmentPaths().map((d, i) => (
              <path
                key={`base-${i}`}
                d={d}
                fill="none"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="0.8"
                opacity="0.35"
              />
            ))}

            {/* Colored segments (one per agent step) */}
            {ORDER.slice(0, -1).map((k, i) => {
              const a = accentFor(k);
              const isHot = ORDER.indexOf(active) >= i + 1 || (intro && ORDER.indexOf(active) === i + 1);
              return (
                <motion.path
                  key={`seg-${k}`}
                  d={segmentPaths()[i]!}
                  fill="none"
                  stroke={a.stroke}
                  strokeWidth="1.2"
                  filter="url(#aGlow)"
                  initial={false}
                  animate={reduce ? undefined : { opacity: isHot ? 0.9 : 0.2, pathLength: isHot ? 1 : 0.35 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
              );
            })}

            {/* Traveling pulse */}
            {!reduce && (
              <motion.circle
                r="1.2"
                fill={accent.dot}
                filter="url(#aGlow)"
                animate={{
                  cx: [10, 37, 64, 90],
                  cy: [14, 14, 14, 14],
                  opacity: [0.0, 1.0, 1.0, 0.0],
                }}
                transition={{
                  duration: 2.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.6,
                }}
              />
            )}
          </svg>

          <div className="relative grid grid-cols-4 gap-3">
            {ORDER.map((k, idx) => {
              const a = AGENTS.find((x) => x.key === k)!;
              const isActive = a.key === active;
              const ac = accentFor(a.key);
              return (
                <motion.button
                  key={a.key}
                  type="button"
                  onClick={() => {
                    setIntro(false);
                    setActive(a.key);
                  }}
                  className={[
                    "text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                    "rounded-[12px] px-3 py-3",
                    "hover:bg-background/10 transition-colors",
                  ].join(" ")}
                  initial={false}
                  animate={reduce ? undefined : { y: isActive ? -2 : 0, opacity: isActive ? 1 : 0.72 }}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-[12px] shrink-0">
                      <Image src={a.src} alt={`${a.name} portrait`} fill sizes="40px" className="object-cover" />
                      <div
                        className="absolute inset-0 ring-1"
                        style={{ borderColor: isActive ? ac.ring : "rgba(255,255,255,0.10)" }}
                        aria-hidden="true"
                      />
                      <span
                        className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full ring-2 ring-background"
                        style={{ backgroundColor: ac.dot }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold tracking-tight text-foreground/95">{a.name}</p>
                        <span className="text-[11px] font-mono text-muted-foreground">{String(idx + 1).padStart(2, "0")}</span>
                      </div>
                      <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{a.role}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <p className="mt-3 text-[11px] font-mono text-muted-foreground">
          Pipeline: Intake → Verification → Interview → Support
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active agent detail */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="panel panel-sharp panel-topline p-6 md:p-7 relative overflow-hidden"
              initial={reduce ? undefined : { opacity: 0, y: 14 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: 14 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-10 -top-14 h-32 opacity-70"
                style={{
                  background: `radial-gradient(500px 180px at 18% 50%, ${accent.glow}, transparent 65%)`,
                }}
              />
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="relative h-14 w-14 overflow-hidden rounded-[12px] shrink-0">
                    <Image src={agent.src} alt={`${agent.name} portrait`} fill sizes="56px" className="object-cover" />
                    <div className="absolute inset-0 ring-1 ring-black/10 dark:ring-white/10" aria-hidden="true" />
                    <span
                      className="absolute -right-1 -bottom-1 h-3.5 w-3.5 rounded-full ring-2 ring-background"
                      style={{ backgroundColor: accent.dot }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-semibold tracking-tight text-foreground/95">{agent.name}</p>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{agent.role}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{agent.oneLine}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {agent.chips.map((c) => (
                        <span
                          key={c}
                          className="px-3 py-2 text-xs font-mono"
                          style={{
                            backgroundColor: accent.chipBg,
                            color: "rgba(255,255,255,0.82)",
                          }}
                        >
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
                  className="px-3 py-2 text-xs font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring/50"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.86)",
                    border: `1px solid ${accent.ring}`,
                  }}
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
                          ? "ml-auto text-foreground/95"
                          : "mr-auto bg-background/10 text-foreground/90",
                      ].join(" ")}
                      style={
                        m.from === "user"
                          ? { backgroundColor: accent.userBubble }
                          : undefined
                      }
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
                className="inline-flex items-center justify-center rounded-[14px] px-4 py-3 text-sm font-medium hover:opacity-95 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring/60"
                aria-label="Send message"
                onClick={() => runPrompt(agent.prompts[0]!)}
                style={{
                  background: accent.buttonBg,
                  color: "rgba(255,255,255,0.92)",
                }}
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

function accentFor(key: AgentKey) {
  // Airbnb-colorful accents, still enterprise.
  if (key === "jackie") {
    return {
      stroke: "rgba(236,72,153,0.85)", // pink
      ring: "rgba(236,72,153,0.35)",
      dot: "rgba(236,72,153,0.95)",
      glow: "rgba(236,72,153,0.24)",
      chipBg: "rgba(236,72,153,0.16)",
      userBubble: "rgba(236,72,153,0.16)",
      buttonBg: "linear-gradient(135deg, rgba(236,72,153,0.65), rgba(167,139,250,0.55))",
    };
  }
  if (key === "david") {
    return {
      stroke: "rgba(245,158,11,0.85)", // amber
      ring: "rgba(245,158,11,0.35)",
      dot: "rgba(245,158,11,0.95)",
      glow: "rgba(245,158,11,0.22)",
      chipBg: "rgba(245,158,11,0.14)",
      userBubble: "rgba(245,158,11,0.14)",
      buttonBg: "linear-gradient(135deg, rgba(245,158,11,0.62), rgba(236,72,153,0.45))",
    };
  }
  if (key === "ella") {
    return {
      stroke: "rgba(34,211,238,0.85)", // cyan
      ring: "rgba(34,211,238,0.32)",
      dot: "rgba(34,211,238,0.95)",
      glow: "rgba(34,211,238,0.20)",
      chipBg: "rgba(34,211,238,0.14)",
      userBubble: "rgba(34,211,238,0.14)",
      buttonBg: "linear-gradient(135deg, rgba(34,211,238,0.60), rgba(99,102,241,0.50))",
    };
  }
  return {
    stroke: "rgba(34,197,94,0.85)", // green
    ring: "rgba(34,197,94,0.32)",
    dot: "rgba(34,197,94,0.95)",
    glow: "rgba(34,197,94,0.20)",
    chipBg: "rgba(34,197,94,0.14)",
    userBubble: "rgba(34,197,94,0.14)",
    buttonBg: "linear-gradient(135deg, rgba(34,197,94,0.60), rgba(34,211,238,0.45))",
  };
}

function segmentPaths() {
  // Four fixed points across the selector (percent space), slight curve for “signal”.
  // x: 10 → 37 → 64 → 90, y: 14
  return [
    "M 10 14 C 18 10, 28 10, 37 14",
    "M 37 14 C 45 10, 55 10, 64 14",
    "M 64 14 C 72 10, 82 10, 90 14",
  ];
}

