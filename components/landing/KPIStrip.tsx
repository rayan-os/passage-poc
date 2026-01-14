"use client";

export default function KPIStrip({ kpis }: { kpis: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {kpis.map((k) => (
        <div key={k} className="panel panel-sharp panel-topline p-6">
          <p className="font-mono text-5xl md:text-6xl text-foreground leading-none">{k.split(" ")[0]}</p>
          <p className="mt-3 text-sm text-muted-foreground">{k.split(" ").slice(1).join(" ")}</p>
        </div>
      ))}
    </div>
  );
}

