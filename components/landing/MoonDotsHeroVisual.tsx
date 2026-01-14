"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useMemo } from "react";

type Dot = { x: number; y: number; r: number; a: number };

function rand(seed: number) {
  // deterministic pseudo-random
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export default function MoonDotsHeroVisual() {
  const reduce = useReducedMotion();

  const dots = useMemo<Dot[]>(() => {
    const out: Dot[] = [];
    for (let i = 0; i < 42; i++) {
      const rx = rand(i * 11 + 3);
      const ry = rand(i * 19 + 7);
      const rr = rand(i * 23 + 13);
      const ra = rand(i * 29 + 17);
      out.push({
        x: 6 + rx * 88,
        y: 10 + ry * 74,
        r: 0.6 + rr * 1.6,
        a: 0.18 + ra * 0.55,
      });
    }
    return out;
  }, []);

  // subtle parallax on pointer move
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.35 });
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.35 });
  const tx = useTransform(sx, [-40, 40], [-8, 8]);
  const ty = useTransform(sy, [-40, 40], [-6, 6]);

  return (
    <motion.div
      className="panel panel-sharp panel-topline overflow-hidden"
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
      }}
      style={reduce ? undefined : { x: tx, y: ty }}
    >
      <div className="relative aspect-[4/3] w-full">
        {/* Top label */}
        <div className="absolute left-0 right-0 top-0 px-5 py-4 flex items-center justify-between">
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Live graph</p>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-muted-foreground">LIVE</span>
            <span className="h-2 w-2 rounded-full bg-foreground/40 motion-safe:[animation:status-pulse_3.2s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Moon */}
        <div
          aria-hidden="true"
          className="absolute right-[-60px] bottom-[-90px] h-[320px] w-[320px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.22), rgba(255,255,255,0.08) 45%, rgba(0,0,0,0.06) 70%, rgba(0,0,0,0) 72%)",
            boxShadow: "0 0 120px rgba(167,139,250,0.10)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute right-[10px] bottom-[20px] h-[120px] w-[120px] rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle at 40% 35%, rgba(0,0,0,0.0), rgba(0,0,0,0.18) 68%, rgba(0,0,0,0.0) 72%)",
            filter: "blur(0.2px)",
          }}
        />

        {/* Dots + connectors */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <filter id="mGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="mLine" x1="0" x2="1">
              <stop offset="0" stopColor="rgba(167,139,250,0.08)" />
              <stop offset="0.5" stopColor="rgba(167,139,250,0.18)" />
              <stop offset="1" stopColor="rgba(167,139,250,0.08)" />
            </linearGradient>
          </defs>

          {/* a few structured connectors */}
          {(
            [
              [dots[3]!, dots[8]!, 0.0],
              [dots[8]!, dots[16]!, 0.2],
              [dots[16]!, dots[27]!, 0.4],
              [dots[11]!, dots[19]!, 0.15],
              [dots[19]!, dots[31]!, 0.35],
              [dots[5]!, dots[14]!, 0.25],
              [dots[14]!, dots[22]!, 0.45],
            ] as Array<[Dot, Dot, number]>
          ).map(([a, b, delay], idx) => (
            <motion.path
              key={`l-${idx}`}
              d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
              fill="none"
              stroke="url(#mLine)"
              strokeWidth="0.35"
              initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
              animate={reduce ? undefined : { pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.12 + delay }}
            />
          ))}

          {/* dots */}
          {dots.map((d, idx) => (
            <g key={`d-${idx}`}>
              <motion.circle
                cx={d.x}
                cy={d.y}
                r={d.r}
                fill={`rgba(255,255,255,${Math.min(0.55, d.a)})`}
                className="dark:fill-[rgba(255,255,255,0.45)]"
                filter="url(#mGlow)"
                animate={
                  reduce
                    ? undefined
                    : { opacity: [d.a * 0.65, d.a, d.a * 0.65] }
                }
                transition={
                  reduce
                    ? undefined
                    : { duration: 2.8 + (idx % 7) * 0.25, repeat: Infinity, ease: "easeInOut" }
                }
              />
            </g>
          ))}

          {/* moving signal */}
          <motion.circle
            r="1.6"
            fill="rgba(167,139,250,0.9)"
            filter="url(#mGlow)"
            animate={
              reduce
                ? undefined
                : {
                    cx: [dots[3]!.x, dots[8]!.x, dots[16]!.x, dots[27]!.x],
                    cy: [dots[3]!.y, dots[8]!.y, dots[16]!.y, dots[27]!.y],
                    opacity: [0, 1, 1, 0],
                  }
            }
            transition={
              reduce
                ? undefined
                : { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
            }
          />
        </svg>

        {/* bottom baseline */}
        <div className="absolute left-0 right-0 bottom-0 px-5 py-4 flex items-center justify-between">
          <span className="text-[11px] font-mono text-muted-foreground">admissions.os</span>
          <span className="text-[11px] font-mono text-muted-foreground">signal: stable</span>
        </div>
      </div>
    </motion.div>
  );
}

