"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Step = {
  title: string;
  subtitle: string;
  metric: string;
  content: "queue" | "verify" | "decide" | "report";
};

const STEPS: Step[] = [
  { title: "Intake", subtitle: "Collects inputs and normalizes fields.", metric: "Queue ingest 98%", content: "queue" },
  { title: "Verification", subtitle: "Runs document checks and extracts proof.", metric: "Proof coverage 92%", content: "verify" },
  { title: "Decisions", subtitle: "Applies rules and generates rationale.", metric: "Auto-decisions 61%", content: "decide" },
  { title: "Reporting", subtitle: "Exports metrics and audit trails.", metric: "Audit events 24k/day", content: "report" },
];

export default function PlatformUIShowcase() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const step = STEPS[idx]!;

  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setInterval(() => setIdx((i) => (i + 1) % STEPS.length), 5200);
    return () => window.clearInterval(t);
  }, [paused, reduce]);

  const progressKey = useMemo(() => `${idx}`, [idx]);

  return (
    <div
      className="panel panel-sharp panel-topline p-6 md:p-7"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Platform UI</p>
          <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold tracking-tight">{step.title}</h3>
          <p className="mt-3 text-sm text-muted-foreground max-w-lg">{step.subtitle}</p>
        </div>
        <div className="hidden md:block text-xs font-mono text-muted-foreground">{step.metric}</div>
      </div>

      <div className="mt-6 divider" />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Modules</p>
          <div className="mt-3 space-y-1">
            {STEPS.map((s, i) => {
              const active = i === idx;
              return (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setIdx(i)}
                  className={[
                    "w-full flex items-center justify-between px-3 py-2 text-sm transition-colors",
                    active ? "bg-foreground/[0.05]" : "hover:bg-foreground/[0.04]",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                  ].join(" ")}
                >
                  <span className="text-foreground/90">{s.title}</span>
                  <span className={["h-1.5 w-6", active ? "bg-violet-400/70" : "bg-border"].join(" ")} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-9">
          <div className="bg-background/10 rounded-[10px] overflow-hidden">
            <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Admissions OS</p>
              <p className="text-xs font-mono text-muted-foreground">Mode: admissions</p>
            </div>

            <motion.div
              key={step.content}
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="p-4"
            >
              {step.content === "queue" && <QueueMock />}
              {step.content === "verify" && <VerifyMock />}
              {step.content === "decide" && <DecideMock />}
              {step.content === "report" && <ReportMock />}
            </motion.div>

            <div className="px-4 pb-4">
              <div className="h-1 bg-border/60 overflow-hidden">
                <motion.div
                  key={progressKey}
                  className="h-full bg-violet-400/70"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={reduce || paused ? { duration: 0 } : { duration: 5.2, ease: "linear" }}
                />
              </div>
              <p className="mt-3 text-[11px] font-mono text-muted-foreground">
                Auto cycle {paused ? "paused" : "running"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QueueMock() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-12 text-[11px] font-mono uppercase tracking-wider text-muted-foreground border-b border-border/60 pb-2">
        <div className="col-span-3">ID</div>
        <div className="col-span-5">Applicant</div>
        <div className="col-span-2">Stage</div>
        <div className="col-span-2 text-right">Status</div>
      </div>
      {[
        ["A-1842", "Rivera, A.", "Intake", "Ready"],
        ["M-0391", "Chen, M.", "Intake", "Ready"],
        ["S-5520", "Patel, S.", "Intake", "Needs docs"],
        ["J-1107", "Okafor, J.", "Intake", "Ready"],
      ].map((r, i) => (
        <div
          key={r[0]}
          className={["grid grid-cols-12 text-sm py-2", i === 1 ? "bg-foreground/[0.04]" : ""].join(" ")}
        >
          <div className="col-span-3 font-mono text-muted-foreground">{r[0]}</div>
          <div className="col-span-5 text-foreground/90">{r[1]}</div>
          <div className="col-span-2 text-muted-foreground">{r[2]}</div>
          <div className="col-span-2 text-right">
            <span className="text-[11px] font-mono bg-foreground/[0.06] px-2 py-1 rounded-[7px] text-foreground/80">
              {r[3]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function VerifyMock() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-background/10 p-4 rounded-[10px]">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Checks</p>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center justify-between">
            <span>ID match</span>
            <span className="font-mono text-foreground/80">PASS</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Transcript</span>
            <span className="font-mono text-foreground/80">MISSING</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Proof linked</span>
            <span className="font-mono text-foreground/80">2</span>
          </li>
        </ul>
      </div>
      <div className="bg-background/10 p-4 rounded-[10px]">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Extracted fields</p>
        <div className="mt-3 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>GPA</span>
            <span className="font-mono text-foreground/80">3.7</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Residency</span>
            <span className="font-mono text-foreground/80">ON</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Program fit</span>
            <span className="font-mono text-foreground/80">HIGH</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DecideMock() {
  return (
    <div className="bg-background/10 p-4 rounded-[10px]">
      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Decision rationale</p>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {["Meets minimum thresholds", "No policy conflicts", "Ready for human approval"].map((t) => (
          <li key={t} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-400/70" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 divider" />
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Outcome</span>
        <span className="text-sm font-mono text-foreground/90">ADMIT</span>
      </div>
    </div>
  );
}

function ReportMock() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        ["Throughput", "124", "today"],
        ["Time to LOA", "3.2h", "median"],
        ["Manual load", "−18%", "week"],
      ].map((m) => (
        <div key={m[0]} className="bg-background/10 p-4 rounded-[10px]">
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{m[0]}</p>
          <p className="mt-3 text-2xl font-mono text-foreground/90">{m[1]}</p>
          <p className="mt-1 text-xs text-muted-foreground">{m[2]}</p>
        </div>
      ))}
    </div>
  );
}

