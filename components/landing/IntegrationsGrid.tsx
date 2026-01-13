"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useMemo, useState } from "react";
import { COPY } from "@/components/landing/copy";

function ConnectorToken({ label, active }: { label: string; active: boolean }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.25 });

  return (
    <motion.button
      type="button"
      className={[
        "inline-flex items-center justify-center px-2.5 py-1 text-[11px] font-mono",
        "bg-background/10 text-muted-foreground hover:text-foreground",
        active ? "text-foreground/85" : "",
        "focus:outline-none focus:ring-2 focus:ring-ring/50",
      ].join(" ")}
      style={reduce ? undefined : { x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce) return;
        const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set(dx * 0.10);
        y.set(dy * 0.10);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={reduce ? undefined : { boxShadow: active ? "0 0 0 1px rgba(167,139,250,0.20)" : "0 0 0 0 rgba(0,0,0,0)" }}
    >
      <span className={["mr-2 h-1.5 w-1.5 rounded-full", active ? "bg-violet-400/80" : "bg-foreground/30"].join(" ")} />
      {label}
    </motion.button>
  );
}

export default function IntegrationsGrid() {
  const reduce = useReducedMotion();
  const categories = COPY.integrations.categories;
  const [active, setActive] = useState(0);

  const connectors = useMemo(() => categories[active]?.chips ?? [], [active, categories]);

  return (
    <div className="panel panel-sharp panel-topline p-6 md:p-7">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Connectors matrix</p>
        <span className="h-2 w-2 rounded-full bg-foreground/35" aria-hidden="true" />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4">
          <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Categories</p>
          <div className="mt-3 space-y-1">
            {categories.map((c, idx) => {
              const isActive = idx === active;
              return (
                <button
                  key={c.title}
                  type="button"
                  onMouseEnter={() => setActive(idx)}
                  onFocus={() => setActive(idx)}
                  className={[
                    "w-full flex items-center justify-between px-3 py-2 text-sm",
                    isActive ? "bg-foreground/[0.05]" : "hover:bg-foreground/[0.04] transition-colors",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                  ].join(" ")}
                >
                  <span className="text-foreground/90">{c.title}</span>
                  <span className={["h-1.5 w-6", isActive ? "bg-violet-400/80" : "bg-border"].join(" ")} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-8">
          <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Connectors</p>
          <motion.div
            className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2"
            initial={reduce ? undefined : { opacity: 0, y: 6 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            key={active}
          >
            {connectors.map((t) => (
              <ConnectorToken key={t} label={t} active />
            ))}
          </motion.div>
          <div className="mt-5 divider" />
          <p className="mt-4 text-sm text-muted-foreground">
            Connect without rebuilding. Keep traceability end to end.
          </p>
        </div>
      </div>
    </div>
  );
}

