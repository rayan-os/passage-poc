"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
};

export default function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const style = useMemo(() => ({ transitionDelay: `${delayMs}ms` }), [delayMs]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion via CSS, but still reveal content.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "reveal",
        visible ? "is-visible" : "",
        className ?? "",
      ].join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}

