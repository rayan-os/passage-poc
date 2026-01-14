"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { COPY } from "@/components/landing/copy";

const ROW_META = [
  { code: "/0.1", blurb: "Collect and normalize inputs." },
  { code: "/0.2", blurb: "Document checks and proof." },
  { code: "/0.3", blurb: "Rules, rationale, and review." },
  { code: "/0.4", blurb: "Requests and follow ups." },
  { code: "/0.5", blurb: "Generate LOAs and track status." },
  { code: "/0.6", blurb: "Metrics and audit exports." },
];

export default function PlatformSoftwareRows() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  const rows = useMemo(
    () =>
      COPY.platformClaim.stages.map((label, idx) => ({
        label,
        idx,
        code: ROW_META[idx]?.code ?? `/${idx + 1}`,
        blurb: ROW_META[idx]?.blurb ?? "",
      })),
    []
  );

  return (
    <div className="panel panel-sharp panel-topline">
      <div className="px-6 md:px-7 py-5 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Our software</p>
          <p className="mt-2 text-sm text-muted-foreground max-w-md">
            A pipeline you can measure, inspect, and control.
          </p>
        </div>
        <div className="hidden md:block text-xs font-mono text-muted-foreground">Mode: admissions</div>
      </div>

      <div className="divider" />

      <div>
        {rows.map((r) => {
          const isActive = active === r.idx;
          return (
            <motion.div
              key={r.label}
              onMouseEnter={() => setActive(r.idx)}
              onMouseLeave={() => setActive(null)}
              className={[
                "relative px-6 md:px-7 py-10 md:py-12",
                "transition-colors",
                isActive ? "bg-foreground/[0.03]" : "",
              ].join(" ")}
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: r.idx * 0.04 }}
            >
              <div
                aria-hidden="true"
                className={[
                  "absolute left-0 top-0 h-full w-[2px] transition-opacity",
                  isActive ? "opacity-100 bg-violet-400/70" : "opacity-0",
                ].join(" ")}
              />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                <div className="md:col-span-3">
                  <p className="text-xs font-mono text-muted-foreground">{r.code}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{r.blurb}</p>
                </div>

                <div className="md:col-span-9">
                  <div className="flex items-center justify-between gap-6">
                    <h3 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                      {r.label}
                    </h3>
                    <div className="hidden md:flex items-center gap-3">
                      <span className="text-xs font-mono text-muted-foreground">Inspect</span>
                      <span className="h-2 w-2 rounded-full bg-foreground/30" />
                    </div>
                  </div>
                  <div className="mt-6 divider" />
                  <div className="mt-4 text-[11px] font-mono text-muted-foreground">
                    State: {isActive ? "active" : "idle"}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

