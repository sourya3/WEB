'use client';

import React, { useEffect, useRef, useState } from 'react';

const tooltipVariants = ['Chat with us', 'We reply fast 👋', 'Got questions?'];

export default function WhatsAppFAB() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [wiggle, setWiggle] = useState(false);
  const [ping1, setPing1] = useState(false);
  const [ping2, setPing2] = useState(false);
  const [tooltipIdx, setTooltipIdx] = useState(0);
  const [tooltipFading, setTooltipFading] = useState(false);
  const wiggleFired = useRef(false);
  const bubbleFired = useRef(false);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReduced = useRef(false);
  const tooltipMorphRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Show FAB after scrolling past hero
    const onScroll = () => {
      setVisible(window.scrollY > 400);

      // Scroll-depth bubble: show when courses section reached
      if (!bubbleFired.current && !bubbleDismissed) {
        const courses = document.getElementById('courses');
        if (courses) {
          const rect = courses.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.7) {
            bubbleFired.current = true;
            setShowBubble(true);
            setTimeout(() => setShowBubble(false), 5000);
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Radar ping loop
    if (!prefersReduced.current) {
      const pingLoop = setInterval(() => {
        setPing1(true);
        setTimeout(() => setPing1(false), 1500);
        setTimeout(() => { setPing2(true); setTimeout(() => setPing2(false), 1500); }, 600);
      }, 4500);

      // Tooltip text morph every 7s
      tooltipMorphRef.current = setInterval(() => {
        setTooltipFading(true);
        setTimeout(() => {
          setTooltipIdx((i) => (i + 1) % tooltipVariants.length);
          setTooltipFading(false);
        }, 300);
      }, 7000);

      // Inactivity wiggle — fires once after 25s
      const resetInactivity = () => {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
        inactivityTimer.current = setTimeout(() => {
          if (!wiggleFired.current) {
            wiggleFired.current = true;
            setWiggle(true);
            setTimeout(() => setWiggle(false), 800);
          }
        }, 25000);
      };
      resetInactivity();
      window.addEventListener('scroll', resetInactivity, { passive: true });
      window.addEventListener('click', resetInactivity);

      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('scroll', resetInactivity);
        window.removeEventListener('click', resetInactivity);
        clearInterval(pingLoop);
        if (tooltipMorphRef.current) clearInterval(tooltipMorphRef.current);
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      };
    }

    return () => window.removeEventListener('scroll', onScroll);
  }, [bubbleDismissed]);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.8)',
        transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* Speech bubble */}
      {showBubble && !bubbleDismissed && (
        <div
          className="glass-tooltip rounded-2xl rounded-br-sm px-4 py-3 text-sm text-foreground shadow-xl max-w-[200px] text-right"
          style={{ animation: 'bubbleIn 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}
        >
          Questions? We reply fast 👋
          <button
            onClick={() => { setShowBubble(false); setBubbleDismissed(true); }}
            className="ml-2 text-muted-foreground hover:text-foreground text-xs"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      {/* Morphing Tooltip */}
      {showTooltip && (
        <div
          className="glass-tooltip rounded-xl px-3 py-2 text-xs text-foreground whitespace-nowrap shadow-lg"
          style={{ animation: 'tooltipIn 0.2s ease-out' }}
        >
          <span
            style={{
              display: 'inline-block',
              opacity: tooltipFading ? 0 : 1,
              transform: tooltipFading ? 'translateY(4px)' : 'translateY(0)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          >
            {tooltipVariants[tooltipIdx]}
          </span>
        </div>
      )}

      {/* FAB */}
      <div className="relative">
        {/* Radar pings */}
        {ping1 && (
          <div
            className="absolute inset-0 rounded-full border-2 border-green-400"
            style={{ animation: 'radarPing 1.5s ease-out forwards' }}
          />
        )}
        {ping2 && (
          <div
            className="absolute inset-0 rounded-full border-2 border-green-400 opacity-60"
            style={{ animation: 'radarPing 1.5s ease-out 0.2s forwards' }}
          />
        )}

        <a
          href="https://wa.me/9779746585111"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
          style={{
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            animation: wiggle ? 'attentionWiggle 0.8s ease-in-out' : 'none',
            transition: 'transform 0.15s ease',
          }}
          onMouseEnter={() => { setShowTooltip(true); }}
          onMouseLeave={() => { setShowTooltip(false); }}
          onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.92)'; }}
          onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'; }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}