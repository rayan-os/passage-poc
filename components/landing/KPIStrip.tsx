"use client";

import { ACCENT } from "@/components/landing/copy";

export default function KPIStrip({ kpis }: { kpis: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {kpis.map((k) => (
        <div key={k} className="border border-border bg-card/15 backdrop-blur-sm p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-2xl text-foreground leading-none">{k.split(" ")[0]}</p>
              <p className="mt-2 text-xs text-muted-foreground">{k.split(" ").slice(1).join(" ")}</p>
            </div>
            <span className={["h-2 w-2", ACCENT.bgSoft].join(" ")} aria-hidden="true" />
          </div>
        </div>
      ))}
    </div>
  );
}

