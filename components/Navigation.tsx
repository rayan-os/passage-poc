"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container-grid">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold tracking-tight text-zinc-900">
            Passage
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/platform" className="text-sm hover:text-zinc-900 text-zinc-600 transition-colors">
              Platform
            </Link>
            <div className="relative group">
              <button className="text-sm hover:text-zinc-900 text-zinc-600 transition-colors flex items-center gap-1">
                Solutions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-zinc-200 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link href="/solutions/government" className="block px-4 py-2 text-sm hover:bg-zinc-50 text-zinc-900">
                  Government
                </Link>
                <Link href="/solutions/employers" className="block px-4 py-2 text-sm hover:bg-zinc-50 text-zinc-900">
                  Employers
                </Link>
                <Link href="/solutions/education" className="block px-4 py-2 text-sm hover:bg-zinc-50 text-zinc-900">
                  Education
                </Link>
              </div>
            </div>
            <Link href="/trust" className="text-sm hover:text-zinc-900 text-zinc-600 transition-colors">
              Trust
            </Link>
            <Link href="/about" className="text-sm hover:text-zinc-900 text-zinc-600 transition-colors">
              About
            </Link>
            <Link href="/insights" className="text-sm hover:text-zinc-900 text-zinc-600 transition-colors">
              Insights
            </Link>
            <Link href="/contact" className="text-sm hover:text-zinc-900 text-zinc-600 transition-colors">
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden md:inline-flex px-4 py-2 text-sm font-medium border border-zinc-300 hover:bg-zinc-50 text-zinc-900 transition-colors"
            >
              Request Access
            </Link>
            <button
              className="md:hidden p-2 hover:bg-zinc-50 text-zinc-900 transition-colors"
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
          <div className="md:hidden border-t border-zinc-200 py-4">
            <div className="flex flex-col gap-4">
              <Link href="/platform" className="text-sm hover:text-zinc-900 text-zinc-600 transition-colors">
                Platform
              </Link>
              <Link href="/solutions/government" className="text-sm hover:text-zinc-900 text-zinc-600 transition-colors">
                Solutions — Government
              </Link>
              <Link href="/solutions/employers" className="text-sm hover:text-zinc-900 text-zinc-600 transition-colors">
                Solutions — Employers
              </Link>
              <Link href="/solutions/education" className="text-sm hover:text-zinc-900 text-zinc-600 transition-colors">
                Solutions — Education
              </Link>
              <Link href="/trust" className="text-sm hover:text-zinc-900 text-zinc-600 transition-colors">
                Trust
              </Link>
              <Link href="/about" className="text-sm hover:text-zinc-900 text-zinc-600 transition-colors">
                About
              </Link>
              <Link href="/insights" className="text-sm hover:text-zinc-900 text-zinc-600 transition-colors">
                Insights
              </Link>
              <Link href="/contact" className="text-sm hover:text-zinc-900 text-zinc-600 transition-colors">
                Contact
              </Link>
              <Link
                href="/contact"
                className="inline-flex px-4 py-2 text-sm font-medium border border-zinc-300 hover:bg-zinc-50 text-zinc-900 transition-colors w-fit mt-2"
              >
                Request Access
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
