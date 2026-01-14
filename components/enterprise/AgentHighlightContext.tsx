"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { AgentKey } from "@/components/enterprise/agentColors";

type AgentHighlightContextValue = {
  activeAgent: AgentKey | null;
  setActiveAgent: (agent: AgentKey | null) => void;
};

const AgentHighlightContext = createContext<AgentHighlightContextValue | null>(null);

export function AgentHighlightProvider({ children }: { children: React.ReactNode }) {
  const [activeAgent, setActiveAgent] = useState<AgentKey | null>(null);

  const value = useMemo(() => ({ activeAgent, setActiveAgent }), [activeAgent]);

  return <AgentHighlightContext.Provider value={value}>{children}</AgentHighlightContext.Provider>;
}

export function useAgentHighlight() {
  const ctx = useContext(AgentHighlightContext);
  if (!ctx) {
    throw new Error("useAgentHighlight must be used within AgentHighlightProvider");
  }
  return ctx;
}

