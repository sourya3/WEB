'use client';

import React, { useEffect, useRef, useState } from 'react';
import CharReveal from './CharReveal';

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref?.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReduced) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold });
    observer?.observe(el);
    return () => observer?.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const features = [
  {
    icon: '⚡',
    title: 'Hands-On Projects',
    desc: 'Learn by doing, not just watching — every course ends with a real deliverable.',
    idleAnim: 'none',
  },
  {
    icon: '🎯',
    title: 'Industry-Relevant Skills',
    desc: 'Curriculum built around what employers and clients actually need in 2026.',
    idleAnim: 'none',
  },
  {
    icon: '👥',
    title: 'Small Batch Sizes',
    desc: 'Real mentorship, not lecture-hall anonymity — every student gets attention.',
    idleAnim: 'none',
  },
  {
    icon: '🏆',
    title: 'Certificate on Completion',
    desc: 'A recognized certificate for every course you finish, ready to share.',
    idleAnim: 'none',
  },
];

export default function WhyUsSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="why-us" className="py-28 px-6">
      <div ref={ref} className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-24px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border text-xs font-mono font-semibold text-muted-foreground mb-6"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-8px)', transition: 'opacity 0.5s ease-out, transform 0.5s ease-out' }}
            >
              <span style={{ display: 'inline-block', animation: visible ? 'emojiPop 0.5s ease-out 0.2s both' : 'none' }}>💡</span>
              WHY CHOOSE US
            </span>
            <h2 className="section-headline mb-6">
              <CharReveal
                text="Why students choose"
                className="block text-foreground"
                delay={100}
                stagger={24}
              />
              <CharReveal
                text="Uniq Turn."
                className="block"
                isGradient
                delay={200}
                stagger={28}
              />
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              We built Uniq Turn because we saw too many people stuck in theory-heavy courses that never translated to real work. Every class at Uniq Turn is <strong className="text-foreground">project-based</strong>, every mentor is a working professional, and every student leaves with something they can actually show — a portfolio piece, a certificate, or a language skill that opens doors.
            </p>

            {/* Divider */}
            <div
              className="mt-8 h-px bg-gradient-brand"
              style={{
                width: visible ? '100%' : '0%',
                transition: 'width 0.5s ease-out 0.4s',
              }}
            />
          </div>

          {/* Right: Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features?.map((f, i) => (
              <div
                key={i}
                className="bg-card border border-border p-6 feature-card-hover group ripple-hover"
                style={{
                  borderRadius: '24px',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease-out ${i * 80}ms, transform 0.5s ease-out ${i * 80}ms`,
                }}
              >
                <span
                  className="text-2xl mb-3 flex items-center justify-center w-12 h-12 squircle"
                  style={{
                    display: 'inline-flex',
                    background: 'rgba(94,195,232,0.08)',
                    border: '1px solid rgba(94,195,232,0.12)',
                    transform: visible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-8deg)',
                    transition: `transform 0.3s cubic-bezier(0.34,1.56,0.64,1) ${i * 80 + 150}ms`,
                  }}
                >
                  {f?.icon}
                </span>
                <h3 className="font-bold text-foreground text-base mb-2 group-hover:text-primary transition-colors duration-150">{f?.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f?.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes emojiPop {
          0% { transform: scale(0.8); }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </section>
  );
}