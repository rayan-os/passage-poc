"use client";

import { useEffect, useRef, useState } from "react";
import { AGENTS } from "@/components/enterprise/agentColors";
import { useAgentHighlight } from "@/components/enterprise/AgentHighlightContext";

type SegmentKey = "jackie" | "david" | "ella" | "mark";

function segmentOpacity(active: SegmentKey | null, seg: SegmentKey) {
  if (!active) return 1;
  return active === seg ? 1 : 0.18;
}

export default function WorkflowGraph() {
  const { activeAgent } = useAgentHighlight();
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const dash = inView ? 0 : 1;

  return (
    <div ref={ref} className="mt-10">
      <div className="rounded-2xl border border-border bg-card/20 backdrop-blur-sm p-6 md:p-8">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Workflow graph</p>
            <p className="mt-2 text-sm text-muted-foreground">
              A simple handoff view across the pipeline. Hover an agent to highlight their paths.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            {(["jackie", "david", "ella", "mark"] as SegmentKey[]).map((k) => (
              <span
                key={k}
                className={[
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
                  "bg-background/30 border-border",
                ].join(" ")}
              >
                <span className={["h-2 w-2 rounded-full", AGENTS[k].dotClass].join(" ")} />
                <span className="text-muted-foreground">{AGENTS[k].name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Desktop graph */}
        <div className="hidden md:block mt-8">
          <svg
            width="100%"
            height="180"
            viewBox="0 0 980 180"
            role="img"
            aria-label="Workflow graph: Intake to Submit"
          >
            <defs>
              <filter id="softGlow" x="-40%" y="-80%" width="180%" height="260%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Paths */}
            <path
              d="M120 92 C 210 18, 300 18, 390 92"
              fill="none"
              stroke={AGENTS.jackie.stroke}
              strokeWidth="2.5"
              opacity={segmentOpacity(activeAgent, "jackie")}
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={dash}
              style={{ transition: "stroke-dashoffset 900ms ease, opacity 200ms ease" }}
              filter="url(#softGlow)"
            />
            <path
              d="M390 92 C 480 165, 570 165, 660 92"
              fill="none"
              stroke={AGENTS.david.stroke}
              strokeWidth="2.5"
              opacity={segmentOpacity(activeAgent, "david")}
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={dash}
              style={{ transition: "stroke-dashoffset 900ms ease 120ms, opacity 200ms ease" }}
              filter="url(#softGlow)"
            />
            <path
              d="M660 92 C 740 18, 810 18, 880 92"
              fill="none"
              stroke={AGENTS.ella.stroke}
              strokeWidth="2.5"
              opacity={segmentOpacity(activeAgent, "ella")}
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={dash}
              style={{ transition: "stroke-dashoffset 900ms ease 240ms, opacity 200ms ease" }}
              filter="url(#softGlow)"
            />
            <path
              d="M880 92 C 930 110, 940 125, 940 150"
              fill="none"
              stroke={AGENTS.mark.stroke}
              strokeWidth="2.5"
              opacity={segmentOpacity(activeAgent, "mark")}
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={dash}
              style={{ transition: "stroke-dashoffset 900ms ease 360ms, opacity 200ms ease" }}
              filter="url(#softGlow)"
            />

            {/* Nodes */}
            <g>
              <Node x={120} y={92} label="Intake" />
              <Node x={390} y={92} label="Processing" />
              <Node x={660} y={92} label="Interview" />
              <Node x={880} y={92} label="Support" />
              <Node x={940} y={150} label="Submit" />
            </g>
          </svg>
        </div>

        {/* Mobile simplified flow */}
        <div className="md:hidden mt-8 space-y-4">
          <MobileStep title="Intake" agent="jackie" />
          <MobileStep title="Processing" agent="david" />
          <MobileStep title="Interview" agent="ella" />
          <MobileStep title="Support" agent="mark" />
          <div className="rounded-xl border border-border bg-background/30 p-4">
            <p className="text-sm font-medium text-foreground/90">Submit</p>
            <p className="mt-1 text-xs text-muted-foreground">Outcome delivered and logged.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Node({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle r="16" fill="rgba(10,10,10,0.65)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <circle r="4" fill="rgba(255,255,255,0.65)" />
      <text
        x="0"
        y="42"
        textAnchor="middle"
        fontSize="12"
        fill="rgba(255,255,255,0.75)"
        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial"
      >
        {label}
      </text>
    </g>
  );
}

function MobileStep({ title, agent }: { title: string; agent: SegmentKey }) {
  const { activeAgent } = useAgentHighlight();
  const dim = activeAgent && activeAgent !== agent;
  return (
    <div
      className={[
        "rounded-xl border border-border bg-background/30 p-4 transition-opacity",
        dim ? "opacity-40" : "opacity-100",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-foreground/90">{title}</p>
        <div className="flex items-center gap-2">
          <span className={["h-2 w-2 rounded-full", AGENTS[agent].dotClass].join(" ")} />
          <span className="text-xs text-muted-foreground">{AGENTS[agent].name}</span>
        </div>
      </div>
    </div>
  );
}

