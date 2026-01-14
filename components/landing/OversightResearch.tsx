"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import Noise from "@/components/landing/Noise";

type Card = {
  category: string;
  title: string;
  description: string;
  date?: string;
  visual: "governance" | "quality" | "policy" | "monitoring";
};

const CARDS: Card[] = [
  {
    category: "Governance",
    title: "Auditable decisions",
    description: "Trace every outcome back to the policy and evidence used.",
    visual: "governance",
  },
  {
    category: "Quality",
    title: "Human feedback loop",
    description: "Officers rate sessions, the system learns within your rules.",
    visual: "quality",
  },
  {
    category: "Policy",
    title: "Rules you can version",
    description: "Update criteria safely, test changes, roll back instantly.",
    visual: "policy",
  },
  {
    category: "Monitoring",
    title: "Throughput visibility",
    description: "Daily funnel snapshots, bottlenecks, and what to fix next.",
    visual: "monitoring",
  },
];

export default function OversightResearch() {
  return (
    <section id="oversight" className="border-t border-border">
      <div className="container-grid py-18 md:py-24 lg:py-28">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-wider font-mono text-muted-foreground">Built for oversight</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight leading-[1.05]">
              Built for oversight
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Every decision can be inspected, measured, and improved.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CARDS.map((c) => (
            <ResearchCard
              key={c.title}
              category={c.category}
              title={c.title}
              description={c.description}
              date={c.date}
              visual={c.visual}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearchCard({
  category,
  title,
  description,
  date,
  visual,
}: {
  category: string;
  title: string;
  description: string;
  date?: string;
  visual: Card["visual"];
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={[
        "group relative overflow-hidden rounded-2xl border border-border/70",
        "bg-card/30 backdrop-blur-sm",
        "transition-colors",
      ].join(" ")}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
    >
      {/* Subtle glow that intensifies on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(600px 240px at 30% 15%, rgba(167,139,250,0.22), transparent 60%)",
        }}
      />

      <div className="relative">
        <Thumbnail visual={visual} />
      </div>

      <div className="relative p-5">
        <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{category}</p>
        <motion.h3
          className="mt-2 font-display text-lg font-semibold tracking-tight leading-snug"
          initial={false}
          whileHover={reduce ? undefined : { y: -2 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          {title}
        </motion.h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        {date ? <p className="mt-4 text-[11px] font-mono text-muted-foreground/80">{date}</p> : null}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-transparent group-hover:ring-violet-400/25 transition-[box-shadow,ring-color] duration-300"
        style={{
          boxShadow: "0 0 0 0 rgba(167,139,250,0)",
        }}
      />
    </motion.div>
  );
}

function Thumbnail({ visual }: { visual: Card["visual"] }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-[150px] overflow-hidden border-b border-border/60">
      {/* base gradient (soft, OpenAI tile-ish) */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: baseGradient(visual),
        }}
      />

      {/* faint noise */}
      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay">
        <Noise />
      </div>

      {/* SVG overlay */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={reduce ? undefined : { duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {visualSvg(visual)}
        </motion.div>
      </div>

      {/* subtle highlight band */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-10 -top-10 h-20 rotate-[-8deg] opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
        }}
      />
    </div>
  );
}

function baseGradient(v: Card["visual"]) {
  if (v === "governance") {
    return "radial-gradient(420px 180px at 25% 20%, rgba(167,139,250,0.35), transparent 60%), radial-gradient(420px 220px at 70% 65%, rgba(99,102,241,0.18), transparent 62%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.10))";
  }
  if (v === "quality") {
    return "radial-gradient(420px 220px at 65% 20%, rgba(167,139,250,0.26), transparent 60%), radial-gradient(360px 200px at 25% 70%, rgba(34,197,94,0.10), transparent 62%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.10))";
  }
  if (v === "policy") {
    return "radial-gradient(420px 220px at 30% 25%, rgba(99,102,241,0.22), transparent 60%), radial-gradient(360px 220px at 75% 70%, rgba(167,139,250,0.22), transparent 62%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.10))";
  }
  return "radial-gradient(420px 220px at 70% 25%, rgba(167,139,250,0.26), transparent 60%), radial-gradient(360px 220px at 25% 70%, rgba(236,72,153,0.10), transparent 62%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.10))";
}

function visualSvg(v: Card["visual"]): ReactNode {
  if (v === "governance") return <GovernanceVisual />;
  if (v === "quality") return <QualityVisual />;
  if (v === "policy") return <PolicyVisual />;
  return <MonitoringVisual />;
}

function GovernanceVisual() {
  return (
    <svg viewBox="0 0 360 180" width="100%" height="100%" aria-hidden="true">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(167,139,250,0.55)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.08)" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#g1)" strokeWidth="1">
        <path d="M40 130 C 90 60, 160 60, 220 120" opacity="0.55" />
        <path d="M70 150 C 130 70, 210 70, 290 128" opacity="0.35" />
        <path d="M30 95 C 80 35, 160 25, 240 70" opacity="0.28" />
      </g>
      <g fill="rgba(255,255,255,0.10)">
        {[
          [70, 110],
          [140, 78],
          [210, 112],
          [260, 86],
          [300, 120],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" />
        ))}
      </g>
      <g fill="rgba(167,139,250,0.22)">
        <circle cx="140" cy="78" r="10" />
      </g>
    </svg>
  );
}

function QualityVisual() {
  return (
    <svg viewBox="0 0 360 180" width="100%" height="100%" aria-hidden="true">
      <defs>
        <linearGradient id="q1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="0.5" stopColor="rgba(167,139,250,0.45)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.06)" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#q1)" strokeWidth="1.2" opacity="0.6">
        <path d="M20 120 C 80 70, 120 140, 180 92 C 240 45, 280 120, 340 80" />
        <path d="M20 140 C 90 90, 120 160, 190 112 C 250 70, 290 140, 340 102" opacity="0.55" />
        <path d="M20 98 C 95 48, 120 120, 190 78 C 250 35, 295 105, 340 62" opacity="0.35" />
      </g>
      <g fill="rgba(255,255,255,0.10)">
        {[
          [90, 90],
          [180, 92],
          [250, 70],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" />
        ))}
      </g>
    </svg>
  );
}

function PolicyVisual() {
  return (
    <svg viewBox="0 0 360 180" width="100%" height="100%" aria-hidden="true">
      <defs>
        <linearGradient id="p1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(167,139,250,0.40)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.05)" />
        </linearGradient>
      </defs>
      <g stroke="rgba(255,255,255,0.10)" strokeWidth="1">
        {Array.from({ length: 7 }).map((_, i) => (
          <path key={i} d={`M30 ${40 + i * 18} H 330`} opacity={i % 2 === 0 ? 0.5 : 0.28} />
        ))}
      </g>
      <g fill="none" stroke="url(#p1)" strokeWidth="1.2" opacity="0.7">
        <path d="M70 58 H 250" />
        <path d="M90 94 H 310" />
        <path d="M50 130 H 210" />
      </g>
      <g fill="rgba(255,255,255,0.10)">
        <rect x="246" y="52" width="10" height="10" rx="2" />
        <rect x="306" y="88" width="10" height="10" rx="2" />
        <rect x="206" y="124" width="10" height="10" rx="2" />
      </g>
    </svg>
  );
}

function MonitoringVisual() {
  return (
    <svg viewBox="0 0 360 180" width="100%" height="100%" aria-hidden="true">
      <defs>
        <linearGradient id="m1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="0.5" stopColor="rgba(167,139,250,0.45)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.06)" />
        </linearGradient>
      </defs>
      <g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
        {Array.from({ length: 5 }).map((_, i) => (
          <path key={i} d={`M40 ${52 + i * 22} H 320`} />
        ))}
      </g>
      <g fill="none" stroke="url(#m1)" strokeWidth="1.6" opacity="0.75">
        <path d="M40 140 C 90 130, 110 92, 150 104 C 190 116, 220 80, 260 88 C 295 95, 310 62, 320 58" />
      </g>
      <g fill="rgba(255,255,255,0.10)">
        {[
          [110, 92],
          [220, 80],
          [310, 62],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" />
        ))}
      </g>
    </svg>
  );
}

