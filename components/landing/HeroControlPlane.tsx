"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ACCENT } from "@/components/landing/copy";

type Row = {
  id: string;
  applicant: string;
  program: string;
  stage: "Intake" | "Verify" | "Decide";
  status: "Ready" | "Needs docs" | "Review";
};

const ROWS: Row[] = [
  { id: "A-1842", applicant: "Rivera, A.", program: "Transfer", stage: "Verify", status: "Needs docs" },
  { id: "M-0391", applicant: "Chen, M.", program: "Undergrad", stage: "Decide", status: "Review" },
  { id: "S-5520", applicant: "Patel, S.", program: "Graduate", stage: "Verify", status: "Ready" },
  { id: "J-1107", applicant: "Okafor, J.", program: "Undergrad", stage: "Intake", status: "Ready" },
  { id: "L-7712", applicant: "Nguyen, L.", program: "Transfer", stage: "Decide", status: "Review" },
  { id: "K-2044", applicant: "Singh, K.", program: "Graduate", stage: "Verify", status: "Ready" },
];

function pillClass(status: Row["status"]) {
  if (status === "Ready") return "bg-foreground/[0.06] text-foreground/80";
  if (status === "Needs docs") return "bg-foreground/[0.06] text-foreground/80";
  return "bg-foreground/[0.06] text-foreground/80";
}

export default function HeroControlPlane() {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState(1);
  const [phase, setPhase] = useState<"idle" | "cursor" | "select" | "update" | "append">("idle");
  const [audit, setAudit] = useState<string[]>(() => [
    "09:41:12  Queue loaded",
    "09:41:13  Verify policy set: admissions_v3",
    "09:41:14  Audit stream connected",
  ]);

  const rationale = useMemo(() => {
    const row = ROWS[selected];
    if (!row) return [];
    if (row.status === "Needs docs") {
      return ["Missing transcript", "ID scan unreadable", "Request sent to applicant"];
    }
    if (row.status === "Review") {
      return ["Rule conflict detected", "Scorecard requires approval", "Escalated to staff queue"];
    }
    return ["Document set complete", "No conflicts detected", "Eligible for decision step"];
  }, [selected]);

  useEffect(() => {
    if (reduce) return;
    setPhase("cursor");
    const t1 = window.setTimeout(() => setPhase("select"), 650);
    const t2 = window.setTimeout(() => {
      setSelected(2);
      setPhase("update");
    }, 1050);
    const t3 = window.setTimeout(() => setPhase("append"), 1550);
    const t4 = window.setTimeout(() => {
      setAudit((a) => [...a, "09:41:18  Decision rationale generated"]);
      setPhase("idle");
    }, 1750);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, [reduce]);

  const cursorVisible = !reduce && (phase === "cursor" || phase === "select");
  const cursorStyle = useMemo(() => {
    // Point at row index 2 (selected after update) inside the table.
    // These values are tuned for the panel layout. It stays subtle.
    return { left: 380, top: 128 };
  }, []);

  return (
    <div className="panel panel-sharp panel-topline p-4 md:p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Control plane</p>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-muted-foreground">LIVE</span>
          <span className="h-2 w-2 rounded-full bg-foreground/40 motion-safe:[animation:status-pulse_2.8s_ease-in-out_infinite]" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <div className="bg-background/20 rounded-[10px] p-3">
            <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Modules</p>
            <div className="mt-3 space-y-1">
              {["Intake", "Verification", "Decisions", "Reporting"].map((m, i) => {
                const active = i === 1;
                return (
                  <div
                    key={m}
                    className={[
                      "flex items-center justify-between px-2 py-2 rounded-[8px] text-sm",
                      active ? "bg-foreground/[0.05]" : "hover:bg-foreground/[0.04] transition-colors",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={[
                          "h-1.5 w-1.5 rounded-full",
                          active ? "bg-violet-400/90" : "bg-foreground/30",
                        ].join(" ")}
                      />
                      <span className="text-foreground/90">{m}</span>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{active ? "ACTIVE" : ""}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main: Admissions Queue */}
        <div className="lg:col-span-6 relative">
          <div className="bg-background/20 rounded-[10px] overflow-hidden">
            <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Admissions Queue</p>
                <p className="mt-1 text-xs text-muted-foreground">6 files, 2 need review</p>
              </div>
              <div className="text-xs font-mono text-muted-foreground">Queue: fall_2026</div>
            </div>

            <div className="grid grid-cols-12 px-4 py-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground border-b border-border/60">
              <div className="col-span-3">ID</div>
              <div className="col-span-4">Applicant</div>
              <div className="col-span-3">Program</div>
              <div className="col-span-2 text-right">Status</div>
            </div>

            <div className="divide-y divide-border/60">
              {ROWS.map((r, idx) => {
                const isSelected = idx === selected;
                return (
                  <button
                    key={r.id}
                    type="button"
                    className={[
                      "w-full grid grid-cols-12 px-4 py-3 text-sm text-left",
                      "hover:bg-foreground/[0.04] transition-colors",
                      isSelected ? "bg-foreground/[0.05]" : "",
                    ].join(" ")}
                    onClick={() => setSelected(idx)}
                  >
                    <div className="col-span-3 text-muted-foreground font-mono">{r.id}</div>
                    <div className="col-span-4 text-foreground/90">{r.applicant}</div>
                    <div className="col-span-3 text-muted-foreground">{r.program}</div>
                    <div className="col-span-2 flex justify-end">
                      <span className={["px-2 py-1 rounded-[7px] text-[11px] font-mono", pillClass(r.status)].join(" ")}>
                        {r.status}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Animated cursor */}
          {cursorVisible && (
            <motion.div
              aria-hidden="true"
              className="absolute z-20"
              initial={{ opacity: 0, x: -8, y: -8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={cursorStyle}
            >
              <div className="h-3 w-3 rotate-45 bg-violet-400/90" />
            </motion.div>
          )}
        </div>

        {/* Right: Decision rationale + Audit log */}
        <div className="lg:col-span-3 space-y-4">
          <motion.div
            className="bg-background/20 rounded-[10px] p-4"
            initial={false}
            animate={!reduce && phase === "update" ? { opacity: 0.75, y: 2 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Decision Rationale</p>
            <ul className="mt-3 space-y-2">
              {rationale.map((b) => (
                <li key={b} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-400/70" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="bg-background/20 rounded-[10px] p-4"
            initial={false}
            animate={!reduce && phase === "append" ? { opacity: 1 } : { opacity: 1 }}
          >
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Audit log</p>
            <div className="mt-3 space-y-2">
              {audit.slice(-4).map((l) => (
                <div key={l} className="text-[11px] font-mono text-muted-foreground">
                  {l}
                </div>
              ))}
              {!reduce && phase === "append" && (
                <motion.div
                  className="text-[11px] font-mono text-muted-foreground"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  09:41:18  Event committed
                </motion.div>
              )}
            </div>
            <div className="mt-3 divider" />
            <p className="mt-3 text-[11px] font-mono text-muted-foreground">
              Append only
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mt-4 divider" />
      <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
        <span>Workspace: admissions</span>
        <span className={ACCENT.text}>Focus: queue</span>
      </div>
    </div>
  );
}

