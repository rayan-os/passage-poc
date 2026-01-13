"use client";

import { motion, useReducedMotion } from "framer-motion";

type Node = { id: string; x: number; y: number; label: string };
type Edge = { from: string; to: string };

const NODES: Node[] = [
  { id: "intake", x: 70, y: 70, label: "Intake" },
  { id: "verify", x: 230, y: 40, label: "Verify" },
  { id: "decide", x: 390, y: 70, label: "Decide" },
  { id: "loa", x: 540, y: 40, label: "LOA" },
  { id: "report", x: 700, y: 70, label: "Report" },
];

const EDGES: Edge[] = [
  { from: "intake", to: "verify" },
  { from: "verify", to: "decide" },
  { from: "decide", to: "loa" },
  { from: "loa", to: "report" },
];

function pos(id: string) {
  const n = NODES.find((x) => x.id === id);
  if (!n) return { x: 0, y: 0 };
  return { x: n.x, y: n.y };
}

export default function DataFlowDots() {
  const reduce = useReducedMotion();

  return (
    <div className="panel panel-sharp panel-topline p-6 md:p-7">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Data flow</p>
        <span className="h-2 w-2 rounded-full bg-violet-400/70" aria-hidden="true" />
      </div>

      <div className="mt-6">
        <svg viewBox="0 0 760 120" width="100%" height="120" role="img" aria-label="Admissions data flow diagram">
          <defs>
            <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {EDGES.map((e, idx) => {
            const a = pos(e.from);
            const b = pos(e.to);
            const d = `M ${a.x} ${a.y} C ${a.x + 55} ${a.y} ${b.x - 55} ${b.y} ${b.x} ${b.y}`;
            return (
              <motion.path
                key={`${e.from}-${e.to}`}
                d={d}
                fill="none"
                stroke="rgba(167,139,250,0.55)"
                strokeWidth="1.8"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
                whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.12 }}
              />
            );
          })}

          {NODES.map((n, idx) => (
            <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
              <circle r="9" fill="rgba(255,255,255,0.06)" />
              <motion.circle
                r="3"
                fill="rgba(167,139,250,0.95)"
                initial={reduce ? undefined : { opacity: 0.4 }}
                animate={reduce ? undefined : { opacity: [0.35, 0.95, 0.35] }}
                transition={reduce ? undefined : { duration: 2.6 + idx * 0.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <text
                x="0"
                y="24"
                textAnchor="middle"
                fontSize="11"
                fill="rgba(255,255,255,0.65)"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

