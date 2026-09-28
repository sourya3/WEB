'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import CharReveal from './CharReveal';
import { useDeviceCapabilities } from '../hooks/useDeviceCapabilities';

const tickerMessages = [
  'Aayush just enrolled in Digital Marketing',
  'Priya started the AI Tools Course',
  'Rohan joined Camera Mastery',
  'Sujata enrolled in CapCut Video Editing',
  'Deepak started the Video Editing Course',
  'Anisha joined Korean Language Class',
  'Bikash enrolled in IELTS/PTE Prep',
  'Nisha started Visa Guidance',
  'Suraj joined Japanese Language Class',
];

function OdometerDigit({ digit }: { digit: string }) {
  const [animating, setAnimating] = useState(false);
  const [current, setCurrent] = useState(digit);
  const prevRef = useRef(digit);

  useEffect(() => {
    if (digit !== current) {
      prevRef.current = current;
      setAnimating(true);
      const t = setTimeout(() => { setCurrent(digit); setAnimating(false); }, 300);
      return () => clearTimeout(t);
    }
  }, [digit, current]);

  return (
    <span className="inline-block overflow-hidden relative" style={{ height: '1.2em', verticalAlign: 'bottom', minWidth: '0.65em' }}>
      <span style={{ display: 'block', transform: animating ? 'translateY(-100%)' : 'translateY(0)', transition: animating ? 'transform 0.3s cubic-bezier(0.16,1,0.3,1)' : 'none' }}>
        {current}
      </span>
      {animating && (
        <span style={{ display: 'block', position: 'absolute', top: '100%', left: 0 }}>{digit}</span>
      )}
    </span>
  );
}

function OdometerNumber({ value, suffix, isDecimal, animate, duration = 1400 }: { value: number; suffix: string; isDecimal?: boolean; animate: boolean; duration?: number }) {
  const [displayStr, setDisplayStr] = useState('0');
  const [microTick, setMicroTick] = useState(0);
  const [suffixVisible, setSuffixVisible] = useState(false);
  const rafRef = useRef<number>(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!animate || hasAnimated.current) return;
    hasAnimated.current = true;
    const start = performance.now();
    const update = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = value * eased;
      setDisplayStr(isDecimal ? current.toFixed(1) : Math.floor(current).toString());
      if (progress < 1) { rafRef.current = requestAnimationFrame(update); }
      else { setSuffixVisible(true); }
    };
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate, value, duration, isDecimal]);

  useEffect(() => {
    if (!animate || suffix !== '+') return;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setMicroTick(1);
        setTimeout(() => setMicroTick(0), 600);
      }, 9000);
      return () => clearInterval(interval);
    }, duration + 2000);
    return () => clearTimeout(timer);
  }, [animate, suffix, duration]);

  const displayValue = suffix === '+' ? (parseInt(displayStr) + microTick).toString() : displayStr;
  const chars = displayValue.split('');

  return (
    <span className="stat-number inline-flex items-end">
      {chars.map((ch, i) => <OdometerDigit key={i} digit={ch} />)}
      <span
        className="text-gradient"
        style={{
          display: 'inline-block',
          transform: suffixVisible ? 'scale(1)' : 'scale(0)',
          transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {suffix}
      </span>
    </span>
  );
}

function MagneticButton({ children, href, className, style }: { children: React.ReactNode; href: string; className?: string; style?: React.CSSProperties }) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none)').matches;
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouch.current) return;
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 60) {
      const pull = (60 - dist) / 60;
      btn.style.transform = `translate(${dx * pull * 0.3}px, ${dy * pull * 0.3}px) scale(1.04)`;
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    if (btnRef.current) btnRef.current.style.transform = 'translate(0,0) scale(1)';
  }, []);

  const onMouseDown = useCallback(() => {
    if (btnRef.current) btnRef.current.style.transform = 'scale(0.96)';
  }, []);

  const onMouseUp = useCallback(() => {
    if (btnRef.current) btnRef.current.style.transform = 'scale(1.04)';
  }, []);

  return (
    <a
      ref={btnRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={{ transition: 'transform 0.18s cubic-bezier(0.16,1,0.3,1), box-shadow 0.18s ease', ...style }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {children}
    </a>
  );
}

// Letter-level hover reaction for hero headline
function InteractiveHeadline({ text, className, style, isGradient, mousePos, sectionRect, enableCursorTracking }: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  isGradient?: boolean;
  mousePos: { x: number; y: number };
  sectionRect: React.MutableRefObject<DOMRect | null>;
  enableCursorTracking: boolean;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [letterRects, setLetterRects] = useState<DOMRect[]>([]);
  const [isTouch, setIsTouch] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [gradientAngle, setGradientAngle] = useState(135);

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);
    setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const updateRects = () => {
      if (!containerRef.current) return;
      const spans = containerRef.current.querySelectorAll<HTMLSpanElement>('[data-letter]');
      const rects: DOMRect[] = [];
      spans.forEach((s) => rects.push(s.getBoundingClientRect()));
      setLetterRects(rects);
    };
    updateRects();
    window.addEventListener('resize', updateRects);
    return () => window.removeEventListener('resize', updateRects);
  }, [text]);

  // Update gradient angle based on cursor position
  useEffect(() => {
    if (!isGradient || isTouch || prefersReduced) return;
    if (!sectionRect.current) return;
    const rect = sectionRect.current;
    const relX = mousePos.x / rect.width;
    const angle = 90 + relX * 90; // 90° to 180°
    setGradientAngle(angle);
  }, [mousePos, isGradient, isTouch, prefersReduced, sectionRect]);

  const getLetterStyle = (i: number): React.CSSProperties => {
    if (!enableCursorTracking || isTouch || prefersReduced || letterRects.length === 0 || i >= letterRects.length) {
      return { display: 'inline-block' };
    }
    const rect = letterRects[i];
    if (!rect) return { display: 'inline-block' };
    const letterCx = rect.left + rect.width / 2;
    const letterCy = rect.top + rect.height / 2;
    // mousePos is relative to section, convert to page coords
    const sRect = sectionRect.current;
    if (!sRect) return { display: 'inline-block' };
    const mousePx = mousePos.x + sRect.left;
    const mousePy = mousePos.y + sRect.top;
    const dx = mousePx - letterCx;
    const dy = mousePy - letterCy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const RADIUS = 70;
    if (dist < RADIUS) {
      const strength = (1 - dist / RADIUS);
      const scale = 1 + strength * 0.15;
      const lift = -strength * 3;
      return {
        display: 'inline-block',
        transform: `scale(${scale}) translateY(${lift}px)`,
        transition: 'transform 0.1s ease-out',
      };
    }
    return {
      display: 'inline-block',
      transform: 'scale(1) translateY(0px)',
      transition: 'transform 0.3s ease-out',
    };
  };

  const gradientStyle: React.CSSProperties = isGradient ? {
    backgroundImage: `linear-gradient(${gradientAngle}deg, #5EC3E8, #7FE8C4)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    transition: prefersReduced ? 'none' : 'background-image 0.15s ease',
  } : {};

  return (
    <span ref={containerRef} className={className} style={{ ...style, ...gradientStyle, position: 'relative', overflow: isGradient ? 'hidden' : undefined }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          data-letter={i}
          style={getLetterStyle(i)}
          aria-hidden={char === ' ' ? 'true' : undefined}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
      {isGradient && (
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: style?.opacity === 1 ? 'shimmerSweep 0.8s ease-out 600ms forwards' : 'none',
            opacity: 0,
          }}
        />
      )}
    </span>
  );
}

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [tickerIdx, setTickerIdx] = useState(0);
  const [tickerVisible, setTickerVisible] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  // Parallax depth state — normalised -0.5..+0.5 relative to hero centre
  const [parallax, setParallax] = useState({ nx: 0, ny: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const sectionRectRef = useRef<DOMRect | null>(null);
  const prefersReduced = useRef(false);
  const isTouch = useRef(false);
  const { particleCount, enableCursorTracking, enableHighMotion, isMobile, isLowBandwidth } = useDeviceCapabilities();

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    isTouch.current = window.matchMedia('(hover: none)').matches;
    const timer = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setStatsVisible(true), 700);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (prefersReduced.current || !enableHighMotion) return;
    const interval = setInterval(() => {
      setTickerVisible(false);
      setTimeout(() => {
        setTickerIdx((i) => (i + 1) % tickerMessages.length);
        setTickerVisible(true);
      }, 400);
    }, 4500);
    return () => clearInterval(interval);
  }, [enableHighMotion]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!enableCursorTracking) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    sectionRectRef.current = rect;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    setMousePos({ x: mx, y: my });
    // Normalised -0.5..+0.5 from centre
    if (!prefersReduced.current && !isTouch.current) {
      setParallax({
        nx: (mx / rect.width) - 0.5,
        ny: (my / rect.height) - 0.5,
      });
    }
  }, [enableCursorTracking]);

  const fadeUp = (delay: number, extraStyle?: React.CSSProperties): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
    ...extraStyle,
  });

  const line1Style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.6s ease-out 150ms, transform 0.6s ease-out 150ms',
  };

  const line2Style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.6s ease-out 250ms, transform 0.6s ease-out 250ms',
  };

  // Parallax shift amounts per depth plane (closest moves most)
  const canParallax = !prefersReduced.current && !isTouch.current && enableCursorTracking;
  // Plane 1: background/badge — furthest, moves least (±3px)
  const bgShift = canParallax
    ? { transform: `translate(${parallax.nx * 6}px, ${parallax.ny * 6}px)`, transition: 'transform 0.12s ease-out', willChange: 'transform' as const }
    : {};
  // Plane 2: headline — middle (±8px)
  const headlineShift = canParallax
    ? { transform: `translate(${parallax.nx * 16}px, ${parallax.ny * 16}px)`, transition: 'transform 0.1s ease-out', willChange: 'transform' as const }
    : {};
  // Plane 3: CTA buttons — closest/front (±13px)
  const ctaShift = canParallax
    ? { transform: `translate(${parallax.nx * 26}px, ${parallax.ny * 26}px)`, transition: 'transform 0.08s ease-out', willChange: 'transform' as const }
    : {};

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 sm:pt-28 pb-12 sm:pb-20 px-6 overflow-hidden"
      onMouseMove={onMouseMove}
      style={{ perspective: canParallax ? '1200px' : undefined }}
    >
      {/* Cursor spotlight — only on cursor-tracking capable devices */}
      {enableCursorTracking && (
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(94,195,232,0.06) 0%, transparent 70%)',
            left: mousePos.x - 200,
            top: mousePos.y - 200,
            transition: 'left 0.1s ease-out, top 0.1s ease-out',
            zIndex: 0,
          }}
        />
      )}

      <div className="relative z-10 max-w-[1280px] mx-auto w-full text-center">
        {/* Badge — depth plane 1 (background, moves least) */}
        <div style={{ ...bgShift, opacity: visible ? 1 : 0, transform: `${bgShift.transform ?? ''} ${visible ? '' : 'translateY(-8px)'}`.trim(), transition: `opacity 0.5s ease-out 0ms, transform 0.5s ease-out 0ms, ${bgShift.transition ?? ''}` }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-xs font-mono font-semibold text-muted-foreground mb-4 sm:mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
            1000+ STUDENTS TRAINED · 4.9★ RATED
          </span>
        </div>

        {/* Headline — depth plane 2 (middle) */}
        <div style={headlineShift}>
          <h1 className="hero-headline mb-4 sm:mb-6">
            <CharReveal
              text="Learn Skills That."
              className="block text-foreground"
              delay={150}
              stagger={25}
              onLoad
            />
            <CharReveal
              text="Actually Get You Hired."
              className="block"
              isGradient
              delay={350}
              stagger={22}
              onLoad
            />
          </h1>

          {/* Subtext */}
          <p className="hidden sm:block text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-10" style={fadeUp(350)}>
            Uniq Turn is Kathmandu&apos;s leading skills academy — offering hands-on training in <strong className="text-foreground">AI Tools, Video Editing, Camera Mastery, Digital Marketing, CapCut</strong>, plus <strong className="text-foreground">English, Korean &amp; Japanese Language Classes, IELTS/PTE Prep, and Visa Guidance</strong>. For absolute beginners to working professionals, from every job and every background.
          </p>
          <p className="sm:hidden text-muted-foreground text-base leading-snug max-w-xs mx-auto mb-7" style={fadeUp(350)}>
            Kathmandu&apos;s leading skills academy — AI, Video Editing, Digital Marketing, Languages, IELTS/PTE Prep &amp; Visa Guidance. No experience needed.
          </p>
        </div>

        {/* CTA Buttons — depth plane 3 (closest, moves most) */}
        <div style={ctaShift}>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8 sm:mb-14" style={fadeUp(450)}>
            <MagneticButton
              href="https://wa.me/9779746585111"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-brand text-primary-foreground font-bold text-base btn-glow ripple-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{ borderRadius: '20px' }}
            >
              <span>Chat on WhatsApp</span>
              <span className="arrow-nudge">→</span>
            </MagneticButton>
            <a
              href="#courses"
              onClick={(e) => { e.preventDefault(); document.querySelector('#courses')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-semibold text-base hover:border-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ripple-hover"
              style={{ borderRadius: '20px', transition: 'border-color 0.2s ease, background 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(94,195,232,0.05)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)'; }}
              onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
            >
              Explore Courses
            </a>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { value: 1000, suffix: '+', label: 'Students Trained', tooltip: 'Across all 10 courses since launch', delay: 0 },
            { value: 4.9, suffix: '★', label: 'Student Rating', tooltip: 'Average rating from student feedback', isDecimal: true, delay: 100 },
            { value: 10, suffix: '', label: 'Courses Offered', tooltip: '5 skill courses + 5 language & visa tracks', delay: 200 },
          ].map((stat, i) => (
            <StatBlock key={i} stat={stat} statsVisible={statsVisible} />
          ))}
        </div>

        {/* Enrollment Ticker — hidden on low-bandwidth/mobile to save resources */}
        {enableHighMotion && (
          <div className="mt-8 flex items-center justify-center gap-2" style={fadeUp(900)}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot" />
            <span
              className="text-xs font-mono text-muted-foreground"
              style={{
                opacity: tickerVisible ? 1 : 0,
                transform: tickerVisible ? 'translateY(0)' : 'translateY(4px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              {tickerMessages[tickerIdx]} <span className="text-muted-foreground/50 ml-1">(illustrative)</span>
            </span>
          </div>
        )}
        {!enableHighMotion && (
          <div className="mt-8 flex items-center justify-center gap-2" style={fadeUp(900)}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-xs font-mono text-muted-foreground">
              {tickerMessages[0]} <span className="text-muted-foreground/50 ml-1">(illustrative)</span>
            </span>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmerSweep {
          0% { background-position: -200% 0; opacity: 1; }
          100% { background-position: 200% 0; opacity: 0; }
        }
        .arrow-nudge {
          display: inline-block;
          animation: ${enableHighMotion ? 'arrowNudge 2s ease-in-out infinite' : 'none'};
        }
        @keyframes arrowNudge {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
      `}</style>
    </section>
  );
}

// Stat block with hover tooltip + 3D flip-in on scroll entry
function StatBlock({ stat, statsVisible }: {
  stat: { value: number; suffix: string; label: string; tooltip: string; isDecimal?: boolean; delay: number };
  statsVisible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const touchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);
    setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const handleTap = () => {
    if (!isTouch) return;
    setTouched(true);
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    touchTimerRef.current = setTimeout(() => setTouched(false), 3000);
  };

  const showTooltip = isTouch ? touched : hovered;

  // 3D flip-in: rotateY 90→0 when statsVisible becomes true
  // Only when not prefers-reduced-motion
  const flipStyle: React.CSSProperties = prefersReduced
    ? {
        opacity: statsVisible ? 1 : 0,
        transition: `opacity 0.5s ease-out ${stat.delay}ms`,
      }
    : {
        opacity: statsVisible ? 1 : 0,
        transform: statsVisible ? 'rotateY(0deg) translateZ(0px)' : 'rotateY(90deg) translateZ(0px)',
        transition: `opacity 0.4s ease-out ${stat.delay}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${stat.delay}ms`,
        willChange: 'transform',
        backfaceVisibility: 'hidden' as const,
      };

  return (
    <div
      className="glass-card rounded-2xl px-6 py-5 text-center relative cursor-default"
      style={{
        perspective: '600px',
        ...flipStyle,
      }}
      onMouseEnter={() => !isTouch && setHovered(true)}
      onMouseLeave={() => !isTouch && setHovered(false)}
      onClick={handleTap}
    >
      <OdometerNumber value={stat.value} suffix={stat.suffix} isDecimal={stat.isDecimal} animate={statsVisible} />
      <p className="text-muted-foreground text-sm mt-1 font-medium">{stat.label}</p>
      {/* Tooltip */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(100% + 8px)',
          left: '50%',
          transform: showTooltip ? 'translateX(-50%) translateY(0px)' : 'translateX(-50%) translateY(6px)',
          opacity: showTooltip ? 1 : 0,
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          pointerEvents: 'none',
          zIndex: 20,
          whiteSpace: 'nowrap',
        }}
      >
        <span
          className="text-[11px] font-medium px-3 py-1.5 rounded-lg text-foreground"
          style={{ background: '#1F2128', border: '1px solid #2A2D36', boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}
        >
          {stat.tooltip}
        </span>
        <span
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid #1F2128',
          }}
        />
      </div>
    </div>
  );
}
