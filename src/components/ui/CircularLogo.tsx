'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

interface CircularLogoProps {
  /** Diameter of the circular logo in pixels */
  size?: number;
  /** Whether to apply hover glow + scale effect (for nav use) */
  hoverEffect?: boolean;
  className?: string;
}

/**
 * CircularLogo — displays the Uniq Turn logo inside a circular badge.
 *
 * The image container uses border-radius: 50% + overflow: hidden + object-fit: cover
 * so the logo is truly CLIPPED into a circle — not just bordered. The image fills
 * the circular container edge-to-edge with no rectangular corners or background
 * peeking out beyond the circle's curve.
 *
 * NOTE: object-fit: cover scales the image to fill the circle completely.
 * object-position: center ensures the focal point of the logo is centered.
 */
export default function CircularLogo({ size = 40, hoverEffect = false, className = '' }: CircularLogoProps) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  // 3D tilt state for cursor-following effect
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useRef(false);
  const isTouch = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    isTouch.current = window.matchMedia('(hover: none)').matches;
    // Small delay so entrance animation is visible after mount
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  const isAnimated = !prefersReduced.current;

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverEffect || prefersReduced.current || isTouch.current) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Normalised -0.5..+0.5 from centre
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    // rotateX: tilt up/down (±10°), rotateY: tilt left/right (±10°)
    setTilt({ rx: -ny * 20, ry: nx * 20 });
  }, [hoverEffect]);

  const onMouseLeave = useCallback(() => {
    setHovered(false);
    setTilt({ rx: 0, ry: 0 });
  }, []);

  const onMouseEnter = useCallback(() => {
    if (hoverEffect) setHovered(true);
  }, [hoverEffect]);

  // Entrance: scale 0.9 → 1, opacity 0 → 1, 400ms ease-out
  const entranceStyle: React.CSSProperties = isAnimated
    ? {
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.4s ease-out, transform 0.2s ease-out, filter 0.2s ease-out',
      }
    : {};

  // 3D tilt transform — applied when hovered and hoverEffect enabled
  const tiltTransform = hoverEffect && hovered && isAnimated && !isTouch.current
    ? `perspective(400px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.06)`
    : mounted
    ? 'perspective(400px) rotateX(0deg) rotateY(0deg) scale(1)'
    : 'perspective(400px) rotateX(0deg) rotateY(0deg) scale(0.9)';

  const glowFilter =
    hoverEffect && hovered && isAnimated
      ? 'drop-shadow(0 0 6px rgba(94,195,232,0.7)) drop-shadow(0 0 12px rgba(127,232,196,0.4))'
      : undefined;

  const combinedStyle: React.CSSProperties = {
    ...entranceStyle,
    transform: tiltTransform,
    filter: glowFilter,
    willChange: hoverEffect ? 'transform' : undefined,
  };

  // Inner padding: logo sits inset so the circular mask doesn't clip the mark
  const innerInset = Math.max(2, Math.round(size * 0.08));

  return (
    <div
      ref={containerRef}
      className={`relative flex-shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        ...combinedStyle,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      aria-hidden="true"
    >
      {/* Accent gradient ring */}
      <div
        style={{
          position: 'absolute',
          inset: -1.5,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #5EC3E8, #7FE8C4)',
          transition: isAnimated ? 'opacity 0.2s ease-out' : undefined,
          opacity: hoverEffect && hovered ? 1 : 0.75,
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      {/* Dark separator ring so gradient doesn't bleed into the image */}
      <div
        style={{
          position: 'absolute',
          inset: 0.5,
          borderRadius: '50%',
          background: '#0A0A0F',
          zIndex: 1,
        }}
        aria-hidden="true"
      />
      {/* Circular image container — overflow:hidden + border-radius:50% clips image to circle */}
      <div
        style={{
          position: 'absolute',
          inset: innerInset,
          borderRadius: '50%',
          overflow: 'hidden',
          zIndex: 2,
          background: '#0A0A0F',
        }}
      >
        <Image
          src="/assets/images/Uniq_Turn_PP-1787905113147.png"
          alt="Uniq Turn Education & Skills Hub"
          fill
          sizes={`${size}px`}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          priority
        />
      </div>
    </div>
  );
}
