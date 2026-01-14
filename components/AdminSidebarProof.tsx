"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type TabKey = "process" | "owner";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Dot({ className }: { className?: string }) {
  return <span className={cx("inline-block h-1.5 w-1.5 rounded-full", className)} aria-hidden="true" />;
}

function useOnClickOutside<T extends HTMLElement>(ref: React.RefObject<T>, onOutside: () => void) {
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      const el = ref.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      onOutside();
    }

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [onOutside, ref]);
}

function AccordionSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Keep this conservative so the animation is smooth without measuring.
  const maxOpenHeight = 320;

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-950/40 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cx(
          "w-full rounded-xl px-3.5 py-3 text-left",
          "flex items-center justify-between gap-3",
          "transition-colors duration-200",
          "hover:bg-white/[0.04]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
        )}
        aria-expanded={open}
      >
        <span className="text-[13px] font-medium tracking-[-0.01em] text-zinc-100">{title}</span>
        <ChevronDown
          className={cx(
            "h-4 w-4 text-zinc-300 transition-transform duration-300",
            open ? "rotate-180" : "rotate-0"
          )}
        />
      </button>

      <div
        ref={panelRef}
        className={cx(
          "overflow-hidden px-2 pb-2",
          "transition-[max-height,opacity] duration-300 ease-out",
          open ? "opacity-100" : "opacity-0"
        )}
        style={{ maxHeight: open ? maxOpenHeight : 0 }}
      >
        <div className="rounded-lg bg-white/[0.02] p-1">{children}</div>
      </div>
    </div>
  );
}

function Row({
  label,
  count,
  dotClassName,
  active = false,
}: {
  label: string;
  count: number | string;
  dotClassName?: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={cx(
        "w-full rounded-lg px-2.5 py-2",
        "flex items-center justify-between gap-3",
        "transition-colors duration-200",
        active ? "bg-white/[0.05]" : "hover:bg-white/[0.04]"
      )}
    >
      <span className="flex items-center gap-2 text-[13px] text-zinc-100">
        <Dot className={cx("bg-white/20", dotClassName)} />
        {label}
      </span>
      <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[12px] text-zinc-200">
        {count}
      </span>
    </button>
  );
}

export default function AdminSidebarProof() {
  const [tab, setTab] = useState<TabKey>("process");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(dropdownRef, () => setDropdownOpen(false));

  const submittedRows = useMemo(
    () => [
      { label: "New submissions", count: 24, dotClassName: "bg-sky-400/70" },
      { label: "Needs review", count: 8, dotClassName: "bg-amber-300/70" },
      { label: "Ready to process", count: 12, dotClassName: "bg-emerald-300/70" },
    ],
    []
  );

  const totalCount = 217;

  return (
    <aside
      className={cx(
        "w-[360px] max-w-full",
        "rounded-2xl border border-white/10",
        "bg-zinc-950/55 backdrop-blur-xl",
        "shadow-[0_25px_60px_rgba(0,0,0,0.55)]"
      )}
      aria-label="Admin sidebar proof"
    >
      {/* subtle glass shine */}
      <div className="relative overflow-hidden rounded-2xl">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(800px 260px at 10% 0%, rgba(255,255,255,0.12), transparent 60%), radial-gradient(600px 240px at 90% 20%, rgba(56,189,248,0.10), transparent 55%)",
          }}
        />

        <div className="relative p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[12px] uppercase tracking-[0.18em] text-zinc-400">Passage</div>
              <div className="mt-1 text-[14px] font-medium tracking-[-0.01em] text-zinc-100">Applications</div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[12px] text-zinc-200">
                <Dot className="bg-emerald-400/70" />
                Live
              </span>
            </div>
          </div>

          {/* Dropdown */}
          <div className="mt-4" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              className={cx(
                "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5",
                "flex items-center justify-between gap-3",
                "text-[13px] text-zinc-100",
                "transition-all duration-200",
                "hover:bg-white/[0.05] hover:border-white/15",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              )}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400/70" aria-hidden="true" />
                <span className="truncate">All applications</span>
              </span>
              <ChevronDown
                className={cx("h-4 w-4 text-zinc-300 transition-transform duration-300", dropdownOpen && "rotate-180")}
              />
            </button>

            <div
              className={cx(
                "relative",
                "transition-[opacity,transform] duration-200 ease-out",
                dropdownOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"
              )}
              aria-hidden={!dropdownOpen}
            >
              <div
                className={cx(
                  "absolute z-20 mt-2 w-full overflow-hidden rounded-xl",
                  "border border-white/10 bg-zinc-950/80 backdrop-blur-xl",
                  "shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
                )}
              >
                {[
                  { label: "All applications", hint: "Everything in scope" },
                  { label: "My queue", hint: "Assigned to you" },
                  { label: "Flagged", hint: "Needs attention" },
                ].map((opt) => {
                  const selected = opt.label === "All applications";
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setDropdownOpen(false)}
                      className={cx(
                        "w-full px-3 py-2.5 text-left",
                        "flex items-center justify-between gap-3",
                        "transition-colors duration-200",
                        "hover:bg-white/[0.05]"
                      )}
                      role="option"
                      aria-selected={selected}
                    >
                      <span className="min-w-0">
                        <div className="truncate text-[13px] text-zinc-100">{opt.label}</div>
                        <div className="truncate text-[12px] text-zinc-400">{opt.hint}</div>
                      </span>
                      {selected ? (
                        <span className="text-[12px] text-zinc-300">Selected</span>
                      ) : (
                        <span className="text-[12px] text-zinc-500"> </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-1">
              <div className="relative grid grid-cols-2">
                <div
                  className={cx(
                    "pointer-events-none absolute inset-y-0 left-0 w-1/2 rounded-lg",
                    "bg-white/[0.06] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]",
                    "transition-transform duration-300 ease-out"
                  )}
                  style={{ transform: tab === "process" ? "translateX(0%)" : "translateX(100%)" }}
                  aria-hidden="true"
                />

                <button
                  type="button"
                  onClick={() => setTab("process")}
                  className={cx(
                    "relative z-10 rounded-lg px-3 py-2 text-[13px] font-medium",
                    "transition-colors duration-200",
                    tab === "process" ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-200"
                  )}
                >
                  Process
                </button>
                <button
                  type="button"
                  onClick={() => setTab("owner")}
                  className={cx(
                    "relative z-10 rounded-lg px-3 py-2 text-[13px] font-medium",
                    "transition-colors duration-200",
                    tab === "owner" ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-200"
                  )}
                >
                  Owner
                </button>
              </div>
            </div>

            {/* Tab content (light motion on switch) */}
            <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-zinc-950/35">
              <div
                className="transition-transform duration-300 ease-out"
                style={{ transform: tab === "process" ? "translateX(0%)" : "translateX(-50%)" }}
              >
                <div className="grid w-[200%] grid-cols-2">
                  <div className="p-3">
                    <div className="text-[12px] uppercase tracking-[0.18em] text-zinc-500">Process</div>
                    <div className="mt-2 space-y-1">
                      <Row label="Intake" count={14} dotClassName="bg-sky-400/70" active />
                      <Row label="Verification" count={6} dotClassName="bg-amber-300/70" />
                      <Row label="Decision" count={3} dotClassName="bg-emerald-300/70" />
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-[12px] uppercase tracking-[0.18em] text-zinc-500">Owner</div>
                    <div className="mt-2 space-y-1">
                      <Row label="Assigned to you" count={9} dotClassName="bg-indigo-300/70" active />
                      <Row label="Unassigned" count={21} dotClassName="bg-white/25" />
                      <Row label="Team queue" count={34} dotClassName="bg-sky-300/60" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Accordions */}
          <div className="mt-4 space-y-3">
            <AccordionSection title="Submitted applications" defaultOpen>
              <div className="space-y-1">
                {submittedRows.map((r, idx) => (
                  <Row
                    key={r.label}
                    label={r.label}
                    count={r.count}
                    dotClassName={r.dotClassName}
                    active={idx === 0}
                  />
                ))}
              </div>
            </AccordionSection>

            <AccordionSection title="List" defaultOpen={false}>
              <div className="space-y-1">
                <Row label="Total" count={totalCount} dotClassName="bg-white/25" active />
              </div>
            </AccordionSection>
          </div>

          {/* Footer hint */}
          <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
            <div className="text-[12px] text-zinc-400">Admin sidebar proof</div>
            <div className="text-[12px] text-zinc-300">v0</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

