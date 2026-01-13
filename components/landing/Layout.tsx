"use client";

import { PropsWithChildren } from "react";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: PropsWithChildren<{
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}>) {
  return (
    <section id={id} className="border-t border-border">
      <div className="container-grid py-18 md:py-24 lg:py-28">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-4">
            {eyebrow && (
              <div className="inline-flex items-center gap-2 mb-3">
                <p className="text-xs uppercase tracking-wider font-mono text-muted-foreground">{eyebrow}</p>
              </div>
            )}
            {title && (
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight leading-[1.05]">
                {title}
              </h2>
            )}
            {subtitle && <p className="mt-4 text-muted-foreground max-w-sm">{subtitle}</p>}
          </div>
          <div className="col-span-12 lg:col-span-8 mt-10 lg:mt-0">{children}</div>
        </div>
      </div>
    </section>
  );
}

