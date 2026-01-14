"use client";

const COMPANIES_PLACEHOLDER = ["Applyboard", "Google", "BetterMode"];

export default function OperatorsSection() {
  return (
    <div className="panel panel-sharp panel-topline p-8 md:p-10">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Team</p>
        <span className="h-2 w-2 rounded-full bg-violet-400/70" aria-hidden="true" />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight leading-[1.05]">
            Operators and engineers.
          </h3>
          <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-2xl">
            We’ve built workflow and decisioning systems before—shipping end‑to‑end product, operating it in production,
            and scaling teams around it.
          </p>

          <div className="mt-6 bg-background/10 rounded-[14px] p-6">
            <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Background (replace with verified)</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {COMPANIES_PLACEHOLDER.map((c) => (
                <span key={c} className="bg-background/10 px-3 py-2 text-xs font-mono text-muted-foreground">
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Placeholder only — do not ship these names unless verified.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-background/10 rounded-[14px] p-6">
            <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Why it matters</p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start justify-between gap-4">
                <span>We design for review queues, audits, and exceptions—not demos.</span>
                <span className="font-mono text-foreground/60">01</span>
              </li>
              <li className="flex items-start justify-between gap-4">
                <span>We focus on measurable throughput, consistency, and traceability.</span>
                <span className="font-mono text-foreground/60">02</span>
              </li>
              <li className="flex items-start justify-between gap-4">
                <span>We ship primitives that survive policy changes and edge cases.</span>
                <span className="font-mono text-foreground/60">03</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 bg-background/10 rounded-[14px] p-6">
            <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Funding (replace with verified)</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Add your verified financing statement here (e.g., “Backed by …”). Placeholder only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

