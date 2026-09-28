'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * CharReveal — character-by-character scroll reveal for headlines.
 *
 * Props:
 *  text        — the string to reveal
 *  className   — class applied to the outer wrapper element
 *  style       — inline styles on the outer wrapper
 *  delay       — base delay in ms before the first character starts (default 0)
 *  stagger     — ms between each character (default 25)
 *  threshold   — IntersectionObserver threshold (default 0.1)
 *  isGradient  — if true, applies gradient text styling to each character span
 *  onLoad      — if true, triggers immediately on mount instead of on scroll
 *
 * Adaptive behaviour:
 *  - On mobile (hover: none): stagger is halved so reveals finish faster
 *  - On low-bandwidth (Network Information API): animation is skipped entirely
 *  - prefers-reduced-motion: instant static reveal (existing behaviour)
 */

interface CharRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  threshold?: number;
  isGradient?: boolean;
  onLoad?: boolean;
}

// Gradient style applied per-character so background-clip: text works correctly
// on inline-block spans (background-clip does NOT propagate to child elements)
const GRADIENT_CHAR_STYLE: React.CSSProperties = {
  backgroundImage: 'linear-gradient(135deg, #5EC3E8 0%, #7FE8C4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline-block',
};

export default function CharReveal({
  text,
  className,
  style,
  delay = 0,
  stagger = 25,
  isGradient = false,
  onLoad = false,
}: CharRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [revealed, setRevealed] = useState(false);
  const hasRevealed = useRef(false);
  const prefersReduced = useRef(false);
  // Effective stagger — halved on mobile for faster, battery-friendlier reveals
  const [effectiveStagger, setEffectiveStagger] = useState(stagger);

  const triggerReveal = () => {
    if (hasRevealed.current) return;
    hasRevealed.current = true;
    setRevealed(true);
  };

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect mobile and low-bandwidth
    const isMobile = window.matchMedia('(hover: none)').matches;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const isLowBandwidth =
      connection?.saveData === true ||
      ['slow-2g', '2g'].includes(connection?.effectiveType) ||
      (connection?.downlink !== undefined && connection.downlink < 1.5);

    // Low-bandwidth: skip animation entirely — reveal immediately
    if (isLowBandwidth) {
      triggerReveal();
      return;
    }

    // Mobile: halve the stagger so the full headline finishes in ~half the time
    if (isMobile) {
      setEffectiveStagger(Math.ceil(stagger / 2));
    }

    // Always reveal immediately for reduced-motion users
    if (prefersReduced.current) {
      triggerReveal();
      return;
    }

    // onLoad mode: trigger after the base delay (for hero elements)
    if (onLoad) {
      // Primary trigger: after the specified delay
      const t = setTimeout(triggerReveal, delay);
      // Hard safety fallback: force reveal after 1.5s no matter what
      const fallback = setTimeout(triggerReveal, 1500);
      return () => {
        clearTimeout(t);
        clearTimeout(fallback);
      };
    }

    // Scroll-triggered mode
    const el = containerRef.current;
    if (!el) {
      // No element ref — force reveal immediately as safety
      triggerReveal();
      return;
    }

    // Safety fallback: if IntersectionObserver never fires within 1.5s,
    // force the text visible so it's never permanently hidden
    const fallbackTimer = setTimeout(triggerReveal, 1500);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRevealed.current) {
          clearTimeout(fallbackTimer);
          triggerReveal();
          observer.disconnect();
        }
      },
      {
        // threshold 0 means fire as soon as even 1px is visible
        threshold: 0,
        // Slight negative rootMargin catches above-fold elements already visible
        rootMargin: '0px 0px -10px 0px',
      }
    );
    observer.observe(el);

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, onLoad, stagger]);

  const chars = text.split('');

  return (
    <span
      ref={containerRef}
      className={className}
      style={{
        display: 'block',
        // Container is always visible — only individual chars animate
        opacity: 1,
        ...style,
      }}
      aria-label={text}
    >
      {chars.map((ch, i) => {
        const isSpace = ch === ' ';
        const charDelay = delay + i * effectiveStagger;

        if (isSpace) {
          return (
            <span
              key={i}
              aria-hidden="true"
              style={{ display: 'inline-block', width: '0.28em' }}
            />
          );
        }

        if (isGradient) {
          // Apply gradient directly to each character span.
          // background-clip: text ONLY works on the element that has the text node
          // as a direct child — it does NOT propagate through child elements.
          // So we must set it per-character, not on a wrapper span.
          return (
            <span
              key={i}
              aria-hidden="true"
              style={{
                ...GRADIENT_CHAR_STYLE,
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0px)' : 'translateY(16px)',
                transition: revealed
                  ? `opacity 0.35s ease-out ${charDelay}ms, transform 0.35s ease-out ${charDelay}ms`
                  : 'none',
                willChange: 'opacity, transform',
              }}
            >
              {ch}
            </span>
          );
        }

        return (
          <span
            key={i}
            aria-hidden="true"
            style={{
              display: 'inline-block',
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0px)' : 'translateY(16px)',
              transition: revealed
                ? `opacity 0.35s ease-out ${charDelay}ms, transform 0.35s ease-out ${charDelay}ms`
                : 'none',
              willChange: 'opacity, transform',
            }}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
}
