"use client";

import Link from "next/link";
import { useState } from "react";
import { COPY } from "@/components/landing/copy";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/55">
      <div className="container-grid">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold tracking-tight text-foreground">
            Passage
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {COPY.nav.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm hover:text-foreground text-muted-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <Link
              href={COPY.nav.cta.href}
              className="hidden md:inline-flex px-4 py-2 text-sm font-medium border border-border bg-secondary/20 hover:bg-secondary/35 text-foreground transition-colors"
            >
              {COPY.nav.cta.label}
            </Link>
            <button
              className="md:hidden p-2 rounded-md hover:bg-accent text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col gap-4">
              {COPY.nav.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm hover:text-foreground text-muted-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href={COPY.nav.cta.href}
                className="inline-flex px-4 py-2 text-sm font-medium rounded-md border border-border bg-secondary/40 hover:bg-secondary/60 text-foreground transition-colors w-fit mt-2"
              >
                {COPY.nav.cta.label}
              </Link>
              <div className="pt-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
