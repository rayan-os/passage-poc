"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Stage = "Inbox" | "Docs" | "Checks" | "Packet" | "Done";

const STAGES: Stage[] = ["Inbox", "Docs", "Checks", "Packet", "Done"];

type Doc = { id: string; label: string };

const DOCS: Doc[] = [
  { id: "d1", label: "transcript.pdf" },
  { id: "d2", label: "id.png" },
  { id: "d3", label: "residency.pdf" },
];

export default function AdmissionsDocOSVisual() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<Stage>("Inbox");
  const [activeDoc, setActiveDoc] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => {
      setStage((s) => {
        const i = STAGES.indexOf(s);
        return STAGES[(i + 1) % STAGES.length]!;
      });
      setActiveDoc((d) => (d + 1) % DOCS.length);
    }, 2600);
    return () => window.clearInterval(t);
  }, [reduce]);

  const progress = useMemo(() => {
    const i = STAGES.indexOf(stage);
    return Math.max(0.08, (i + 1) / STAGES.length);
  }, [stage]);

  return (
    <div className="panel panel-sharp panel-topline overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Admissions OS</p>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-muted-foreground">LIVE</span>
          <span className="h-2 w-2 rounded-full bg-violet-400/70 motion-safe:[animation:status-pulse_3.1s_ease-in-out_infinite]" />
        </div>
      </div>

      <div className="divider" />

      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left: event stream */}
          <div className="md:col-span-5 bg-background/10 rounded-[10px] p-4">
            <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Inbound</p>
            <div className="mt-3 space-y-2">
              {[
                { t: "09:41:12", m: "email received" },
                { t: "09:41:13", m: "attachments detected" },
                { t: "09:41:14", m: "doc parse started" },
                { t: "09:41:18", m: "checks complete" },
              ].map((e, idx) => (
                <div key={e.t} className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>{e.t}</span>
                  <span className={idx === 2 ? "text-foreground/80" : ""}>{e.m}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 divider" />

            <div className="mt-4">
              <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Email</p>
              <div className="mt-3 bg-background/10 rounded-[10px] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-foreground/90">Admissions Documents</p>
                  <span className="text-[11px] font-mono text-muted-foreground">inbox</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  3 attachments. Student Rivera, A.
                </p>
              </div>
            </div>
          </div>

          {/* Right: stages + doc animation */}
          <div className="md:col-span-7 bg-background/10 rounded-[10px] p-4 relative overflow-hidden">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Pipeline</p>
              <p className="text-[11px] font-mono text-muted-foreground">Stage: {stage}</p>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              {STAGES.map((s) => {
                const active = s === stage;
                return (
                  <div key={s} className="flex items-center gap-2">
                    <span className={["h-2 w-2 rounded-full", active ? "bg-violet-400/70" : "bg-foreground/20"].join(" ")} />
                    <span className="text-[11px] font-mono text-muted-foreground">{s}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 h-1 bg-border/60 overflow-hidden">
              <motion.div
                className="h-full bg-violet-400/70"
                initial={false}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>

            {/* abstract doc objects moving through stages */}
            <div className="mt-6 relative h-[190px]">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-border/70" aria-hidden="true" />

              <div className="absolute left-2 top-6 text-[11px] font-mono text-muted-foreground">drop → parse → check → packet</div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${stage}-${activeDoc}`}
                  className="absolute left-0 top-[92px] -translate-y-1/2"
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: stageX(stage), opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75, ease: "easeInOut" }}
                >
                  <div className="bg-background/20 rounded-[10px] px-4 py-3 min-w-[220px]">
                    <p className="text-[11px] font-mono text-muted-foreground">doc</p>
                    <p className="mt-1 text-sm text-foreground/90">{DOCS[activeDoc]!.label}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {stage === "Checks" ? "running checks…" : stage === "Done" ? "complete" : "processing"}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* completion ticks */}
              <div className="absolute right-4 bottom-4 bg-background/10 rounded-[10px] p-4 w-[240px]">
                <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Result</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {["Docs parsed", "Proof linked", "Packet ready"].map((t, i) => (
                    <li key={t} className="flex items-center justify-between">
                      <span>{t}</span>
                      <span className="font-mono text-foreground/80">{stage === "Done" ? "OK" : i === 0 && stage !== "Inbox" ? "OK" : "…"}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 divider" />
      <div className="px-5 py-4 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
        <span>workspace: admissions</span>
        <span>trace: enabled</span>
      </div>
    </div>
  );
}

function stageX(stage: Stage) {
  if (stage === "Inbox") return 20;
  if (stage === "Docs") return 140;
  if (stage === "Checks") return 260;
  if (stage === "Packet") return 380;
  return 500;
}

