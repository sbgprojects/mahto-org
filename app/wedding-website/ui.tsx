"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Photo that falls back to a warm tinted block if it can't load. */
export function Photo({
  src,
  alt,
  sizes = "(max-width: 700px) 60vw, 25vw",
  priority,
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`lm-photo ${className}`}>
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

/** Fades children in when they scroll into view (no-JS safe). */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already visible
    el.classList.add("lm-hide");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.remove("lm-hide");
          io.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`lm-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/** Horizontally scrolling row with arrow buttons. */
export function Scroller({
  children,
  className = "",
  arrows = true,
}: {
  children: ReactNode;
  className?: string;
  arrows?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  return (
    <div className="lm-scroller-wrap">
      {arrows && (
        <div className="lm-arrows" aria-hidden={false}>
          <button type="button" className="lm-arrow" aria-label="Previous" onClick={() => go(-1)}>
            <Icon name="chev-l" />
          </button>
          <button type="button" className="lm-arrow" aria-label="Next" onClick={() => go(1)}>
            <Icon name="chev-r" />
          </button>
        </div>
      )}
      <div ref={ref} className={`lm-scroller ${className}`}>
        {children}
      </div>
    </div>
  );
}

const paths: Record<string, ReactNode> = {
  search: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>),
  heart: <path d="M12 20s-7-4.4-9.2-9A5.2 5.2 0 0 1 12 6a5.2 5.2 0 0 1 9.2 5C19 15.6 12 20 12 20Z" />,
  pin: (<><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 1 1 13 0c0 4.8-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></>),
  star: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9Z" />,
  shield: (<><path d="M12 3 5 6v5c0 4.5 3 8.2 7 10 4-1.8 7-5.5 7-10V6Z" /><path d="m9 12 2 2 4-4" /></>),
  doc: (<><path d="M7 3h7l4 4v14H7Z" /><path d="M14 3v4h4M10 12h5M10 16h5" /></>),
  link: (<><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1" /></>),
  user: (<><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></>),
  "arrow-r": <path d="M4 12h16m-6-6 6 6-6 6" />,
  "chev-l": <path d="m15 5-7 7 7 7" />,
  "chev-r": <path d="m9 5 7 7-7 7" />,
  down: <path d="m6 9 6 6 6-6" />,
  cal: (<><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>),
  people: (<><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" /><path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M18 15c2 .6 3.2 2.2 3.5 5" /></>),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  play: <path d="M8 5.5v13l11-6.5Z" />,
  ig: (<><rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17" cy="7" r=".6" /></>),
  fb: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z" />,
  yt: (<><rect x="3" y="6" width="18" height="12" rx="3.5" /><path d="m10.5 9.5 4 2.5-4 2.5Z" /></>),
  in: (<><path d="M5 9v10M5 5.2v.1M10 19V9m0 4c0-2.2 1.6-4 3.8-4S18 10.6 18 13v6" /></>),
};

export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
