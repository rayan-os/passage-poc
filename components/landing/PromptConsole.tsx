"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";
import { ACCENT, COPY } from "@/components/landing/copy";

type OutputKind = "blocking" | "missing_docs" | "throughput";

function categorize(prompt: string): OutputKind {
  const p = prompt.toLowerCase();
  if (p.includes("missing docs") || p.includes("summarize")) return "missing_docs";
  if (p.includes("throughput") || p.includes("stage") || p.includes("funnel") || p.includes("export")) return "throughput";
  return "blocking";
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function Sparkline() {
  return (
    <svg width="120" height="32" viewBox="0 0 120 32" aria-hidden="true">
      <path d="M2 24 C 18 10, 30 28, 44 16 C 58 5, 74 20, 88 10 C 98 5, 108 10, 118 6" fill="none" stroke={ACCENT.stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M2 24 C 18 10, 30 28, 44 16 C 58 5, 74 20, 88 10 C 98 5, 108 10, 118 6 L118 32 L2 32 Z" fill="rgba(139,92,246,0.10)" />
    </svg>
  );
}

function OutputPane({ kind }: { kind: OutputKind }) {
  if (kind === "missing_docs") {
    return (
      <div className="text-sm text-foreground/90">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Missing docs</p>
        <div className="mt-4 rounded-xl border border-border bg-background/20 overflow-hidden">
          <div className="grid grid-cols-3 text-xs text-muted-foreground px-4 py-2 border-b border-border">
            <span>Applicant</span>
            <span>Missing</span>
            <span>Status</span>
          </div>
          {[
            ["A. Rivera", "Transcript", "Requested"],
            ["M. Chen", "ID", "Pending"],
            ["S. Patel", "Recommendation", "Requested"],
          ].map((r) => (
            <div key={r[0]} className="grid grid-cols-3 px-4 py-2 text-xs text-foreground/85 border-b border-border last:border-b-0">
              <span>{r[0]}</span>
              <span className="text-muted-foreground">{r[1]}</span>
              <span className="text-muted-foreground">{r[2]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "throughput") {
    return (
      <div className="text-sm text-foreground/90">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Throughput</p>
            <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center justify-between gap-6">
                <span>Ingest</span>
                <span className="text-foreground/85">Stable</span>
              </li>
              <li className="flex items-center justify-between gap-6">
                <span>Verify</span>
                <span className="text-foreground/85">Rising</span>
              </li>
              <li className="flex items-center justify-between gap-6">
                <span>Decide</span>
                <span className="text-foreground/85">Stable</span>
              </li>
            </ul>
          </div>
          <div className="shrink-0">
            <Sparkline />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-sm text-foreground/90">
      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Blocking LOAs</p>
      <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
        <li className="flex items-center justify-between gap-6">
          <span>Missing document proof</span>
          <span className="text-foreground/85">12</span>
        </li>
        <li className="flex items-center justify-between gap-6">
          <span>Awaiting review queue</span>
          <span className="text-foreground/85">7</span>
        </li>
        <li className="flex items-center justify-between gap-6">
          <span>Policy conflict</span>
          <span className="text-foreground/85">3</span>
        </li>
      </ul>
    </div>
  );
}

export default function PromptConsole() {
  const reduce = useReducedMotion();
  const [input, setInput] = useState("");
  const [outputKind, setOutputKind] = useState<OutputKind>("blocking");
  const [busy, setBusy] = useState(false);
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const prompts = COPY.console.prompts;

  const runPrompt = useCallback(
    async (prompt: string, withType = false) => {
      if (busy) return;
      setBusy(true);
      setActiveChip(prompt);
      setOutputKind(categorize(prompt));

      if (withType && !reduce) {
        setInput("");
        inputRef.current?.focus();
        for (let i = 0; i < prompt.length; i++) {
          setInput(prompt.slice(0, i + 1));
          // fast, readable
          // eslint-disable-next-line no-await-in-loop
          await sleep(14);
        }
      } else {
        setInput(prompt);
      }

      await sleep(reduce ? 0 : 180);
      setBusy(false);
    },
    [busy, reduce]
  );

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;
      void runPrompt(input.trim(), false);
    },
    [input, runPrompt]
  );

  const lanes = useMemo(() => {
    // 3 drifting lanes for prompt chips
    const laneCount = 3;
    const lanesLocal: string[][] = Array.from({ length: laneCount }, () => []);
    prompts.forEach((p, i) => lanesLocal[i % laneCount].push(p));
    return lanesLocal;
  }, [prompts]);

  return (
    <div className="dark rounded-3xl border border-border bg-background text-foreground">
      <div className="rounded-3xl border border-border bg-card/20 backdrop-blur-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-border p-6 md:p-8">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Console</p>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">{COPY.console.header}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{COPY.console.subhead}</p>

            <form className="mt-6" onSubmit={onSubmit}>
              <label className="sr-only" htmlFor="console-input">
                Question
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background/20 px-3 py-2 focus-within:ring-2 focus-within:ring-ring/60">
                <span className={["h-2 w-2 rounded-full", ACCENT.bgSoft].join(" ")} />
                <input
                  id="console-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a question"
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex items-center justify-center rounded-md border border-border bg-secondary/20 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary/35 transition-colors disabled:opacity-60"
                >
                  Run
                </button>
              </div>
            </form>
          </div>

          <div className="md:col-span-7 p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Output</p>
              <span className={["h-2 w-2 rounded-full", ACCENT.bgSoft].join(" ")} />
            </div>
            <div className="mt-6 rounded-2xl border border-border bg-background/20 p-5 min-h-[180px]">
              <motion.div
                key={outputKind}
                initial={reduce ? undefined : { opacity: 0, y: 6 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <OutputPane kind={outputKind} />
              </motion.div>
            </div>
            {activeChip && (
              <p className="mt-4 text-xs text-muted-foreground">
                Active prompt <span className="text-foreground/80">{activeChip}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-card/10 backdrop-blur-sm p-6 overflow-hidden">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Prompt cloud</p>
          <span className={["h-2 w-2 rounded-full", ACCENT.bgSoft].join(" ")} />
        </div>

        <div className="mt-6 space-y-4">
          {lanes.map((lane, laneIdx) => (
            <PromptLane
              key={laneIdx}
              lane={lane}
              laneIdx={laneIdx}
              onPick={(p) => void runPrompt(p, true)}
              busy={busy}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PromptLane({
  lane,
  laneIdx,
  onPick,
  busy,
}: {
  lane: string[];
  laneIdx: number;
  onPick: (p: string) => void;
  busy: boolean;
}) {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const duration = 36 + laneIdx * 7;

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="flex items-center gap-3"
        animate={reduce || paused ? undefined : { x: ["0%", "-50%"] }}
        transition={reduce || paused ? undefined : { duration, ease: "linear", repeat: Infinity }}
        style={{ willChange: "transform" }}
      >
        {[...lane, ...lane].map((p, idx) => (
          <button
            key={`${p}-${idx}`}
            type="button"
            onClick={() => onPick(p)}
            disabled={busy}
            className={[
              "whitespace-nowrap rounded-full border px-3 py-2 text-xs font-medium",
              "border-border bg-background/20 text-muted-foreground hover:text-foreground hover:bg-background/30",
              "focus:outline-none focus:ring-2 focus:ring-ring/60",
              "disabled:opacity-60 disabled:cursor-not-allowed",
            ].join(" ")}
          >
            {p}
          </button>
        ))}
      </motion.div>
    </div>
  );
}

