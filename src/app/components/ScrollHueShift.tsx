'use client';

import React, { useEffect, useRef } from 'react';
import { useDeviceCapabilities } from '../hooks/useDeviceCapabilities';

/**
 * ScrollHueShift — ambient background glow color shifts hue as user scrolls
 * from blue-heavy (hero) to mint-heavy (CTA). Purely decorative, GPU-only.
 * Disabled on mobile and low-bandwidth devices to preserve battery.
 */
export default function ScrollHueShift() {
  const glowRef = useRef<HTMLDivElement>(null);
  const { enableHighMotion } = useDeviceCapabilities();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReduced || !enableHighMotion) return;

    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const el = glowRef?.current;
        if (!el) return;
        const scrollY = window.scrollY;
        const maxScroll = document.body?.scrollHeight - window.innerHeight;
        const progress = Math.min(scrollY / maxScroll, 1);

        // Blue (#5EC3E8) → Mint (#7FE8C4) hue shift
        // Blue hue ~200, Mint hue ~160
        const hue = 200 - progress * 40;
        const saturation = 60 + progress * 10;
        const lightness = 65 - progress * 5;

        el.style.background = `radial-gradient(ellipse at 50% 50%, hsla(${hue}, ${saturation}%, ${lightness}%, 0.04) 0%, transparent 70%)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [enableHighMotion]);

  // On mobile/low-bandwidth, render nothing (saves a composited layer)
  if (!enableHighMotion) return null;

  return (
    <div
      ref={glowRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, hsla(200, 60%, 65%, 0.04) 0%, transparent 70%)',
        willChange: 'background',
      }}
    />
  );
}
