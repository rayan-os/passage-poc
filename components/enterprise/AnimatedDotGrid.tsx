"use client";

type AnimatedDotGridProps = {
  className?: string;
};

export default function AnimatedDotGrid({ className }: AnimatedDotGridProps) {
  return (
    <div className={className}>
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none motion-safe:[animation:dot-grid-drift_14s_linear_infinite]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(60% 60% at 50% 30%, black, transparent 70%)",
          WebkitMaskImage: "radial-gradient(60% 60% at 50% 30%, black, transparent 70%)",
        }}
      />

      {/* Soft gradient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(900px 500px at 30% 20%, rgba(56,189,248,0.18), transparent 60%), radial-gradient(800px 520px at 70% 30%, rgba(99,102,241,0.16), transparent 55%), radial-gradient(900px 520px at 50% 80%, rgba(16,185,129,0.10), transparent 60%)",
        }}
      />

      {/* Subtle noise */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

