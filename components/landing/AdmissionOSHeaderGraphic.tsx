"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type Node = { id: string; x: number; y: number; label: string };
type Edge = { from: string; to: string };

const NODES: Node[] = [
  { id: "intake", x: 70, y: 42, label: "Intake" },
  { id: "verify", x: 210, y: 26, label: "Verify" },
  { id: "decide", x: 350, y: 42, label: "Decide" },
  { id: "loa", x: 490, y: 26, label: "LOA" },
  { id: "report", x: 630, y: 42, label: "Report" },
];

const EDGES: Edge[] = [
  { from: "intake", to: "verify" },
  { from: "verify", to: "decide" },
  { from: "decide", to: "loa" },
  { from: "loa", to: "report" },
];

function pos(id: string) {
  const n = NODES.find((x) => x.id === id);
  return n ? { x: n.x, y: n.y } : { x: 0, y: 0 };
}

export default function AdmissionOSHeaderGraphic() {
  const reduce = useReducedMotion();

  const signals = useMemo(
    () => [
      { edge: EDGES[0]!, delay: 0.0, duration: 2.8 },
      { edge: EDGES[1]!, delay: 0.6, duration: 3.1 },
      { edge: EDGES[2]!, delay: 1.0, duration: 2.6 },
      { edge: EDGES[3]!, delay: 1.4, duration: 3.4 },
    ],
    []
  );

  return (
    <div className="mt-6">
      <div className="panel panel-sharp panel-topline px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Operating system</p>
          <span className="h-2 w-2 rounded-full bg-violet-400/70" aria-hidden="true" />
        </div>

        <div className="mt-3">
          <svg viewBox="0 0 700 70" width="100%" height="70" role="img" aria-label="Admissions operating system flow">
            <defs>
              <filter id="hdrGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {EDGES.map((e, idx) => {
              const a = pos(e.from);
              const b = pos(e.to);
              const d = `M ${a.x} ${a.y} C ${a.x + 70} ${a.y} ${b.x - 70} ${b.y} ${b.x} ${b.y}`;
              return (
                <motion.path
                  key={`${e.from}-${e.to}`}
                  d={d}
                  fill="none"
                  stroke="rgba(0,0,0,0.10)"
                  className="dark:[stroke:rgba(255,255,255,0.10)]"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
                  animate={reduce ? undefined : { pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 + idx * 0.08 }}
                />
              );
            })}

            {/* Active connector overlay */}
            {EDGES.map((e) => {
              const a = pos(e.from);
              const b = pos(e.to);
              const d = `M ${a.x} ${a.y} C ${a.x + 70} ${a.y} ${b.x - 70} ${b.y} ${b.x} ${b.y}`;
              return (
                <path
                  key={`accent-${e.from}-${e.to}`}
                  d={d}
                  fill="none"
                  stroke="rgba(167,139,250,0.35)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  filter="url(#hdrGlow)"
                />
              );
            })}

            {/* Moving signals */}
            {signals.map((s, idx) => {
              const a = pos(s.edge.from);
              const b = pos(s.edge.to);
              return (
                <motion.circle
                  key={`sig-${idx}`}
                  r="3"
                  fill="rgba(167,139,250,0.95)"
                  filter="url(#hdrGlow)"
                  animate={
                    reduce
                      ? undefined
                      : {
                          cx: [a.x, b.x],
                          cy: [a.y, b.y],
                          opacity: [0, 1, 0],
                        }
                  }
                  transition={
                    reduce
                      ? undefined
                      : {
                          duration: s.duration,
                          delay: s.delay,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                />
              );
            })}

            {NODES.map((n) => (
              <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                <circle r="8" fill="rgba(255,255,255,0.65)" className="dark:fill-[rgba(255,255,255,0.06)]" />
                <circle r="3" fill="rgba(0,0,0,0.65)" className="dark:fill-[rgba(167,139,250,0.95)]" />
                <text
                  x="0"
                  y="22"
                  textAnchor="middle"
                  fontSize="10"
                  className="fill-[rgba(0,0,0,0.55)] dark:fill-[rgba(255,255,255,0.60)]"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace"
                >
                  {n.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

