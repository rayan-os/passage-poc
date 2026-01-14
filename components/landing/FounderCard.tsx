"use client";

import { ACCENT, COPY } from "@/components/landing/copy";

export default function FounderCard() {
  const f = COPY.team.founder;

  return (
    <div className="rounded-3xl border border-border bg-card/20 backdrop-blur-sm p-6 md:p-8">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Team</p>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">{f.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{f.title}</p>
        </div>
        <div className="h-12 w-12 rounded-full border border-border bg-background/20 flex items-center justify-center">
          <span className={["h-2.5 w-2.5 rounded-full", ACCENT.bgSoft].join(" ")} />
        </div>
      </div>

      <div className="mt-6 h-px w-full bg-border/70" />
      <ul className="mt-5 space-y-2">
        {f.bullets.map((b) => (
          <li key={b} className="text-sm text-muted-foreground flex items-start gap-2">
            <span className={["mt-2 h-1.5 w-1.5 rounded-full", ACCENT.bgSoft].join(" ")} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

