'use client';

import React, { useEffect, useRef, useCallback } from 'react';

interface Ripple {
  x: number;
  y: number;
  startTime: number;
  duration: number;
}

export default function WaterRipple() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const animFrameRef = useRef<number>(0);
  const prefersReducedRef = useRef(false);
  const isLowPowerRef = useRef(false);

  useEffect(() => {
    prefersReducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const conn = nav.connection;
    isLowPowerRef.current = !!(
      conn?.saveData ||
      conn?.effectiveType === 'slow-2g' ||
      conn?.effectiveType === '2g'
    );
  }, []);

  const spawnRipple = useCallback((x: number, y: number) => {
    if (prefersReducedRef.current || isLowPowerRef.current) return;
    ripplesRef.current.push({ x, y, startTime: performance.now(), duration: 700 });
    // Keep max 6 ripples at once
    if (ripplesRef.current.length > 6) ripplesRef.current.shift();
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => spawnRipple(e.clientX, e.clientY);
    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) spawnRipple(t.clientX, t.clientY);
    };
    window.addEventListener('click', handleClick, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [spawnRipple]);

  useEffect(() => {
    if (prefersReducedRef.current || isLowPowerRef.current) return;

    const container = containerRef.current;
    if (!container) return;

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);
      const now = performance.now();
      // Remove expired ripples
      ripplesRef.current = ripplesRef.current.filter(r => now - r.startTime < r.duration);

      // Update DOM ripple elements
      const existing = container.querySelectorAll<HTMLDivElement>('[data-ripple]');
      existing.forEach(el => el.remove());

      for (const ripple of ripplesRef.current) {
        const elapsed = now - ripple.startTime;
        const progress = elapsed / ripple.duration;
        const eased = 1 - Math.pow(1 - progress, 2); // ease-out quad
        const size = eased * 280;
        const opacity = (1 - progress) * 0.35;

        const el = document.createElement('div');
        el.setAttribute('data-ripple', '1');
        el.style.cssText = `
          position: fixed;
          left: ${ripple.x - size / 2}px;
          top: ${ripple.y - size / 2}px;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          border: 1.5px solid rgba(94, 195, 232, ${opacity.toFixed(3)});
          pointer-events: none;
          z-index: 5;
          will-change: transform;
        `;
        container.appendChild(el);

        // Second ring — slightly delayed, smaller
        if (progress > 0.15) {
          const p2 = Math.max(0, (progress - 0.15) / 0.85);
          const s2 = p2 * 160;
          const o2 = (1 - p2) * 0.2;
          const el2 = document.createElement('div');
          el2.setAttribute('data-ripple', '1');
          el2.style.cssText = `
            position: fixed;
            left: ${ripple.x - s2 / 2}px;
            top: ${ripple.y - s2 / 2}px;
            width: ${s2}px;
            height: ${s2}px;
            border-radius: 50%;
            border: 1px solid rgba(127, 232, 196, ${o2.toFixed(3)});
            pointer-events: none;
            z-index: 5;
          `;
          container.appendChild(el2);
        }
      }
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 5,
        overflow: 'hidden',
      }}
    />
  );
}
