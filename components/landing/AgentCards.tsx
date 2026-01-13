"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import { ACCENT, COPY } from "@/components/landing/copy";

function useParallax() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 140, damping: 18, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 140, damping: 18, mass: 0.35 });
  const rotateX = useTransform(sy, [-30, 30], [2, -2]);
  const rotateY = useTransform(sx, [-30, 30], [-2, 2]);
  return { x, y, rotateX, rotateY };
}

export default function AgentCards() {
  const reduce = useReducedMotion() ?? false;
  const cards = COPY.agents.cards;
  const ref = useRef<HTMLDivElement | null>(null);

  const columns = useMemo(() => {
    const left = cards.filter((_, i) => i % 2 === 0);
    const right = cards.filter((_, i) => i % 2 === 1);
    return { left, right };
  }, [cards]);

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {[columns.left, columns.right].map((col, colIdx) => (
        <div key={colIdx} className="space-y-4 md:space-y-6">
          {col.map((c, idx) => (
            <AgentCard
              key={c.title}
              index={c.index}
              title={c.title}
              body={c.body}
              delay={(colIdx * 0.1) + idx * 0.08}
              reduce={reduce}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function AgentCard({
  index,
  title,
  body,
  delay,
  reduce,
}: {
  index: string;
  title: string;
  body: string;
  delay: number;
  reduce: boolean;
}) {
  const { x, y, rotateX, rotateY } = useParallax();
  const io = useMemo(() => agentIO(title), [title]);

  return (
    <motion.div
      className="relative border border-border bg-card/20 backdrop-blur-sm p-4 hover:bg-card/30 transition-colors"
      initial={reduce ? undefined : { opacity: 0, y: 10 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      onPointerMove={(e) => {
        if (reduce) return;
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set(Math.max(-30, Math.min(30, dx / 8)));
        y.set(Math.max(-30, Math.min(30, dy / 8)));
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={reduce ? undefined : { y: -2 }}
    >
      <div
        aria-hidden="true"
        className={[
          "absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none",
          ACCENT.glow,
        ].join(" ")}
      />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className={["h-2 w-2", "bg-violet-400/80", "animate-pulse"].join(" ")} aria-hidden="true" />
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{index}</p>
          </div>
          <h3 className="mt-2 font-display text-xl font-bold tracking-tight">{title}</h3>
        </div>
        <div className={["h-9 w-9 border bg-background/20 flex items-center justify-center", ACCENT.border].join(" ")}>
          <span className={["text-xs font-mono text-muted-foreground"].join(" ")} aria-hidden="true">
            {glyph(title)}
          </span>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{body}</p>

      <div className="mt-4 h-px w-full bg-border/70" />
      <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="font-mono uppercase tracking-wider text-muted-foreground">Inputs</p>
          <p className="mt-1 text-muted-foreground">{io.inputs}</p>
        </div>
        <div>
          <p className="font-mono uppercase tracking-wider text-muted-foreground">Outputs</p>
          <p className="mt-1 text-muted-foreground">{io.outputs}</p>
        </div>
      </div>
    </motion.div>
  );
}

function glyph(title: string) {
  const t = title.toLowerCase();
  if (t.includes("verify")) return "V";
  if (t.includes("decide")) return "D";
  if (t.includes("support")) return "S";
  if (t.includes("guide")) return "G";
  return "C";
}

function agentIO(title: string) {
  const t = title.toLowerCase();
  if (t.includes("verify")) return { inputs: "Documents", outputs: "Flags, proof" };
  if (t.includes("decide")) return { inputs: "Rules, evidence", outputs: "Outcome, rationale" };
  if (t.includes("support")) return { inputs: "Questions, status", outputs: "Replies, escalations" };
  if (t.includes("guide")) return { inputs: "Programs, constraints", outputs: "Next steps" };
  return { inputs: "Queues, policies", outputs: "Overrides, metrics" };
}

