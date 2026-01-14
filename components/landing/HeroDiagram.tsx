"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useMemo, useState } from "react";
import { ACCENT, COPY } from "@/components/landing/copy";

export default function HeroDiagram() {
  const reduce = useReducedMotion();
  const { diagram } = COPY.hero;
  const [active, setActive] = useState<"inputs" | "passage" | "outputs" | null>(null);

  const bullets = useMemo(() => {
    const split = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean).slice(0, 3);
    return {
      inputs: split(diagram.inputs.items),
      passage: split(diagram.passage.items),
      outputs: split(diagram.outputs.items),
    };
  }, [diagram.inputs.items, diagram.outputs.items, diagram.passage.items]);

  // Subtle parallax on panel
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 120, damping: 16, mass: 0.35 });
  const smy = useSpring(my, { stiffness: 120, damping: 16, mass: 0.35 });
  const rx = useTransform(smy, [-40, 40], [1.6, -1.6]);
  const ry = useTransform(smx, [-40, 40], [-1.6, 1.6]);

  const dimA = active === null ? 1 : active === "inputs" ? 1 : 0.2;
  const dimC = active === null ? 1 : active === "outputs" ? 1 : 0.2;

  return (
    <motion.div
      className="relative border border-border bg-card/20 backdrop-blur-sm p-5 md:p-6 overflow-hidden"
      onPointerMove={(e) => {
        if (reduce) return;
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        mx.set(Math.max(-40, Math.min(40, dx / 10)));
        my.set(Math.max(-40, Math.min(40, dy / 10)));
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
        setActive(null);
      }}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">System panel</p>
        <span className={["h-2 w-2 rounded-full", ACCENT.bgSoft].join(" ")} />
      </div>

      <div className="mt-4 relative">
        {/* Connecting lines */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 900 220" preserveAspectRatio="none">
            <motion.path
              d="M205 110 C 285 110, 315 110, 395 110"
              fill="none"
              stroke={ACCENT.stroke}
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity={dimA}
              initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
              animate={reduce ? undefined : { pathLength: 1, opacity: dimA }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            />
            <motion.path
              d="M505 110 C 585 110, 615 110, 695 110"
              fill="none"
              stroke={ACCENT.stroke}
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity={dimC}
              initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
              animate={reduce ? undefined : { pathLength: 1, opacity: dimC }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.32 }}
            />
          </svg>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          <SystemColumn
            label={diagram.inputs.title}
            value={diagram.inputs.items}
            bullets={bullets.inputs}
            active={active === "inputs"}
            dim={active !== null && active !== "inputs"}
            onEnter={() => setActive("inputs")}
          />
          <SystemColumn
            label={diagram.passage.title}
            value={diagram.passage.items}
            bullets={bullets.passage}
            active={active === "passage"}
            dim={active !== null && active !== "passage"}
            onEnter={() => setActive("passage")}
            accent
          />
          <SystemColumn
            label={diagram.outputs.title}
            value={diagram.outputs.items}
            bullets={bullets.outputs}
            active={active === "outputs"}
            dim={active !== null && active !== "outputs"}
            onEnter={() => setActive("outputs")}
          />
        </div>
      </div>
    </motion.div>
  );
}

function SystemColumn({
  label,
  value,
  bullets,
  active,
  dim,
  onEnter,
  accent,
}: {
  label: string;
  value: string;
  bullets: string[];
  active: boolean;
  dim: boolean;
  onEnter: () => void;
  accent?: boolean;
}) {
  return (
    <motion.div
      className={[
        "md:col-span-4 border border-border bg-background/30 p-4",
        dim ? "opacity-40" : "opacity-100",
        accent ? "ring-1 ring-violet-400/20" : "",
        "transition-opacity",
      ].join(" ")}
      onMouseEnter={onEnter}
      layout
      transition={{ type: "spring", stiffness: 420, damping: 40 }}
      style={{ transformOrigin: "center" }}
      animate={active ? { scale: 1.02 } : { scale: 1 }}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{label}</p>
        <span className={["h-1.5 w-6", accent ? "bg-violet-400/70" : "bg-border"].join(" ")} />
      </div>
      <p className="mt-3 text-sm text-foreground/90">{value}</p>
      <motion.div
        className="mt-4 space-y-2"
        initial={false}
        animate={active ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        style={{ overflow: "hidden" }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <div className="h-px w-full bg-border/70" />
        <ul className="pt-3 space-y-2">
          {bullets.map((b) => (
            <li key={b} className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-violet-400/70" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
