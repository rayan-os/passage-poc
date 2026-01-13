"use client";

import { ACCENT } from "@/components/landing/copy";

export default function KPIStrip({ kpis }: { kpis: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {kpis.map((k) => (
        <div key={k} className="rounded-2xl border border-border bg-card/20 backdrop-blur-sm p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground/90">{k}</p>
            <span className={["h-2 w-2 rounded-full", ACCENT.bgSoft].join(" ")} />
          </div>
          <div className="mt-4 h-px w-full bg-border/70" />
          <p className="mt-3 text-xs text-muted-foreground">Placeholder KPI</p>
        </div>
      ))}
    </div>
  );
}

