'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import CircularLogo from '@/components/ui/CircularLogo';
import CharReveal from './CharReveal';

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// Particle burst canvas for click effect
function ParticleBurst({ active, onDone }: { active: boolean; onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;
    const cx = W / 2;
    const cy = H / 2;

    const COLORS = ['#5EC3E8', '#7FE8C4', '#F5C77E', '#ffffff'];
    const PARTICLE_COUNT = 40;

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; color: string; alpha: number; decay: number };
    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + Math.random() * 0.3;
      const speed = 2 + Math.random() * 4;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 2 + Math.random() * 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 1,
        decay: 0.02 + Math.random() * 0.03,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      let alive = false;
      particles.forEach((p) => {
        if (p.alpha <= 0) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.alpha -= p.decay;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      if (alive) {
        animRef.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, W, H);
        onDone();
      }
    };
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [active, onDone]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

export default function FinalCTASection() {
  const { ref, visible } = useScrollReveal();
  const [burstActive, setBurstActive] = useState(false);
  const burstFired = useRef(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const handleHeadlineClick = useCallback(() => {
    if (burstFired.current || prefersReduced) return;
    burstFired.current = true;
    setBurstActive(true);
  }, [prefersReduced]);

  const handleBurstDone = useCallback(() => {
    setBurstActive(false);
  }, []);

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div ref={ref} className="max-w-[1280px] mx-auto text-center relative z-10">
        {/* Circular logo badge — trust anchor above headline */}
        <div
          className="flex justify-center mb-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(-8px)',
            transition: 'opacity 0.5s ease-out 0ms, transform 0.5s ease-out 0ms',
          }}
        >
          <CircularLogo size={72} />
        </div>

        {/* Headline — click triggers particle burst */}
        <h2
          className="hero-headline mb-6 relative cursor-pointer select-none"
          onClick={handleHeadlineClick}
          title="Click me!"
          style={{ display: 'inline-block', width: '100%' }}
        >
          {/* Particle burst canvas */}
          {burstActive && (
            <ParticleBurst active={burstActive} onDone={handleBurstDone} />
          )}
          <CharReveal
            text="Stop scrolling."
            className="block text-foreground"
            style={{
              animation: burstActive ? 'ctaFlash 0.4s ease-out' : 'none',
            }}
            delay={0}
            stagger={26}
          />
          <CharReveal
            text="Start learning."
            className="block"
            isGradient
            style={{
              animation: burstActive ? 'ctaFlash 0.4s ease-out 0.05s' : 'none',
            }}
            delay={100}
            stagger={26}
          />
        </h2>

        {/* Subtext */}
        <p
          className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto mb-10"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)', transition: 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s' }}
        >
          10 courses. 1000+ students trained. Batches open now in Sundhara, Kathmandu.
        </p>

        {/* Buttons */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)', transition: 'opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s' }}
        >
          <a
            href="https://wa.me/9779746585111"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-brand text-primary-foreground font-bold text-base btn-glow ripple-hover"
            style={{ borderRadius: '20px', transition: 'transform 0.15s ease', animation: 'glowBreath 4s ease-in-out infinite' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
            onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.96)'; }}
          >
            Chat on WhatsApp →
          </a>
          <a
            href="https://maps.google.com/?q=CTC+Mall+Sundhara+Kathmandu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-semibold text-base ripple-hover"
            style={{ borderRadius: '20px', transition: 'border-color 0.2s ease, background 0.2s ease, transform 0.15s ease' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(94,195,232,0.5)'; (e.currentTarget as HTMLElement).style.background = 'rgba(94,195,232,0.05)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ''; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)'; }}
            onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >
            Visit Us
          </a>
        </div>

        {/* Trust line */}
        <p
          className="text-muted-foreground text-sm font-mono"
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease-out 0.45s' }}
        >
          📍 CTC Mall, Sundhara, Kathmandu &nbsp;·&nbsp; 💬 +977 9746585111 &nbsp;·&nbsp; ⭐ 4.9/5 Rating
        </p>
      </div>

      <style jsx>{`
        @keyframes glowBreath {
          0%, 100% { box-shadow: 0 0 16px rgba(94,195,232,0.3); }
          50% { box-shadow: 0 0 32px rgba(94,195,232,0.6), 0 0 48px rgba(127,232,196,0.3); }
        }
        @keyframes ctaFlash {
          0% { filter: brightness(1); }
          30% { filter: brightness(1.8) saturate(1.5); }
          100% { filter: brightness(1); }
        }
      `}</style>
    </section>
  );
}