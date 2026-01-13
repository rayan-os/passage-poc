"use client";

import { useEffect, useMemo, useState } from "react";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem("passage_theme");
  if (saved === "light" || saved === "dark") return saved;
  return "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const t = getInitialTheme();
    setTheme(t);
    document.documentElement.classList.toggle("dark", t === "dark");
  }, []);

  const label = useMemo(() => (theme === "dark" ? "Light" : "Dark"), [theme]);

  return (
    <button
      type="button"
      onClick={() => {
        const next: Theme = theme === "dark" ? "light" : "dark";
        setTheme(next);
        window.localStorage.setItem("passage_theme", next);
        document.documentElement.classList.toggle("dark", next === "dark");
      }}
      className="inline-flex items-center justify-center border border-border bg-secondary/20 hover:bg-secondary/35 text-foreground transition-colors px-3 py-2 text-xs font-mono"
      aria-label={`Switch to ${label} theme`}
    >
      {label}
    </button>
  );
}

