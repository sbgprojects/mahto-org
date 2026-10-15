"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade + rise when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Headline that rises word-by-word out of a mask. */
export function SplitWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease, delay: delay + i * 0.09 }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  );
}

/** Words light up one by one as the block scrolls through the viewport. */
export function ScrollWords({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return <Word key={i} word={w} range={[start, end]} progress={scrollYProgress} />;
      })}
    </p>
  );
}

/** Thin page-long thread that fills as you scroll — ties every section together. */
export function Thread() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-4 z-30 w-px bg-line md:left-8"
    >
      <motion.div
        className="h-full w-px origin-top bg-accent"
        style={{ scaleY }}
      />
    </div>
  );
}

const fallbackTints = ["#e8dfd3", "#d9e0e8", "#e6d9d3", "#dfe6d9"];

/** Stock image that degrades to a calm tinted block if the photo can't load. */
export function SafeImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 40vw",
  priority,
  tint = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  tint?: number;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{ backgroundColor: fallbackTints[tint % fallbackTints.length] }}
    >
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
