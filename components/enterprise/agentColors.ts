export type AgentKey = "jackie" | "david" | "ella" | "mark";

export const AGENT_ORDER: AgentKey[] = ["jackie", "david", "ella", "mark"];

export const AGENTS = {
  jackie: {
    key: "jackie" as const,
    name: "Jackie",
    colorName: "magenta",
    // Tailwind accents (enterprise subtle)
    dotClass: "bg-fuchsia-400",
    textClass: "text-fuchsia-300",
    ringClass: "ring-fuchsia-500/25",
    glowClass: "shadow-[0_0_0_1px_rgba(217,70,239,0.18),0_0_32px_rgba(217,70,239,0.12)]",
    chipClass: "border-fuchsia-500/25 bg-fuchsia-500/10 text-fuchsia-200",
    stroke: "rgba(217,70,239,0.9)",
  },
  david: {
    key: "david" as const,
    name: "David",
    colorName: "amber",
    dotClass: "bg-amber-400",
    textClass: "text-amber-200",
    ringClass: "ring-amber-500/25",
    glowClass: "shadow-[0_0_0_1px_rgba(245,158,11,0.18),0_0_32px_rgba(245,158,11,0.12)]",
    chipClass: "border-amber-500/25 bg-amber-500/10 text-amber-200",
    stroke: "rgba(245,158,11,0.9)",
  },
  ella: {
    key: "ella" as const,
    name: "Ella",
    colorName: "cyan",
    dotClass: "bg-cyan-400",
    textClass: "text-cyan-200",
    ringClass: "ring-cyan-500/25",
    glowClass: "shadow-[0_0_0_1px_rgba(34,211,238,0.18),0_0_32px_rgba(34,211,238,0.12)]",
    chipClass: "border-cyan-500/25 bg-cyan-500/10 text-cyan-200",
    stroke: "rgba(34,211,238,0.9)",
  },
  mark: {
    key: "mark" as const,
    name: "Mark",
    colorName: "green",
    dotClass: "bg-emerald-400",
    textClass: "text-emerald-200",
    ringClass: "ring-emerald-500/25",
    glowClass: "shadow-[0_0_0_1px_rgba(52,211,153,0.18),0_0_32px_rgba(52,211,153,0.12)]",
    chipClass: "border-emerald-500/25 bg-emerald-500/10 text-emerald-200",
    stroke: "rgba(52,211,153,0.9)",
  },
};

