'use client';

import React, { useEffect, useRef, useState } from 'react';
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

// Key phrases to highlight per testimonial (index matches testimonials array)
const KEY_PHRASES = [
  'automating tasks at my office',
  'edited my first real client video',
  'landed my first freelance client',
  'hold basic conversations',
  'band 7.5 on my first attempt',
  'student visa approved on the first try',
];

const testimonials = [
  {
    name: 'Aarav S.',
    course: 'AI Tools Course',
    quote: 'I had zero tech background but the AI course made everything click. Within a month I was automating tasks at my office and my manager noticed. Genuinely life-changing.',
    rating: 5,
  },
  {
    name: 'Priya T.',
    course: 'Video Editing Course',
    quote: 'The hands-on approach is what sets Uniq Turn apart. I edited my first real client video after just three weeks. The mentors actually care about your progress.',
    rating: 5,
  },
  {
    name: 'Rohan K.',
    course: 'Digital Marketing Course',
    quote: 'I landed my first freelance client before the course even ended. The curriculum is exactly what the market needs — not outdated theory.',
    rating: 5,
  },
  {
    name: 'Sujata M.',
    course: 'Korean Language Class',
    quote: 'I started from zero Korean and now I can hold basic conversations. The teacher is patient and the small batch size means I actually get feedback every class.',
    rating: 5,
  },
  {
    name: 'Deepak B.',
    course: 'IELTS / PTE Prep',
    quote: 'Got a band 7.5 on my first attempt. The mock tests and personalized feedback made all the difference. Highly recommend for anyone planning to study abroad.',
    rating: 5,
  },
  {
    name: 'Anisha R.',
    course: 'Visa Guidance',
    quote: 'The visa guidance team helped me with every document and even prepared me for the interview. I got my student visa approved on the first try. Thank you Uniq Turn!',
    rating: 5,
  },
];

function StarRating({ rating, active }: { rating: number; active: boolean }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="text-[#F5C77E] text-sm"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'scale(1)' : 'scale(0)',
            transition: `opacity 0.3s ease ${i * 50}ms, transform 0.3s cubic-bezier(0.34,1.56,0.64,1) ${i * 50}ms`,
            filter: active ? 'drop-shadow(0 0 4px rgba(245,199,126,0.6))' : 'none',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function OdometerStat({ value, suffix, isDecimal, animate }: { value: number; suffix: string; isDecimal?: boolean; animate: boolean }) {
  const [display, setDisplay] = useState('0');
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!animate || hasAnimated.current) return;
    hasAnimated.current = true;
    const start = performance.now();
    const duration = 1400;
    const update = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplay(isDecimal ? (value * e).toFixed(1) : Math.floor(value * e).toString());
      if (p < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [animate, value, isDecimal]);

  return (
    <span className="stat-number text-gradient">{display}{suffix}</span>
  );
}

// Testimonial card with key-phrase highlighter sweep
function TestimonialCard({ t, i, visible, isSpotlight }: {
  t: typeof testimonials[0];
  i: number;
  visible: boolean;
  isSpotlight?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [tapped, setTapped] = useState(false);
  const touchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keyPhrase = KEY_PHRASES[i] || '';
  const prefersReduced = useRef(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const showHighlight = isTouch ? tapped : hovered;

  const handleTap = () => {
    if (!isTouch) return;
    setTapped(true);
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    touchTimerRef.current = setTimeout(() => setTapped(false), 3000);
  };

  // Render quote with highlighted key phrase
  const renderQuote = () => {
    if (!keyPhrase || prefersReduced.current) {
      return <>&ldquo;{t.quote}&rdquo;</>;
    }
    const idx = t.quote.indexOf(keyPhrase);
    if (idx === -1) return <>&ldquo;{t.quote}&rdquo;</>;
    const before = t.quote.slice(0, idx);
    const after = t.quote.slice(idx + keyPhrase.length);
    return (
      <>
        &ldquo;{before}
        <span
          className="relative inline"
          style={{ display: 'inline' }}
        >
          <span
            className="absolute inset-0 rounded-sm pointer-events-none"
            style={{
              background: 'rgba(94,195,232,0.22)',
              transformOrigin: 'left center',
              transform: showHighlight ? 'scaleX(1)' : 'scaleX(0)',
              transition: showHighlight
                ? 'transform 0.4s cubic-bezier(0.16,1,0.3,1)'
                : 'transform 0.25s ease-in',
              zIndex: 0,
            }}
          />
          <span className="relative z-10" style={{ color: showHighlight ? '#7FE8C4' : 'inherit', transition: 'color 0.3s ease' }}>
            {keyPhrase}
          </span>
        </span>
        {after}&rdquo;
      </>
    );
  };

  if (isSpotlight) {
    return (
      <div
        className="bg-card border border-border rounded-[20px] p-8 relative"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          boxShadow: '0 0 0 1px rgba(94,195,232,0.15), 0 20px 60px rgba(94,195,232,0.06)',
        }}
        onMouseEnter={() => !isTouch && setHovered(true)}
        onMouseLeave={() => !isTouch && setHovered(false)}
        onClick={handleTap}
      >
        <span className="absolute top-4 right-4 text-[10px] font-mono text-muted-foreground/60 bg-muted px-2 py-0.5 rounded-full" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease 0.2s' }}>
          Sample feedback
        </span>
        <StarRating rating={t.rating} active={visible} />
        <blockquote className="text-foreground text-lg leading-relaxed mt-4 mb-6">
          {renderQuote()}
        </blockquote>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 flex items-center justify-center text-sm font-bold text-[#0A0A0F] bg-gradient-brand flex-shrink-0"
            style={{ borderRadius: '28%' }}
          >
            {t.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-foreground text-sm">{t.name}</p>
            <p className="text-muted-foreground text-xs font-mono">{t.course}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-card border border-border rounded-[20px] p-6 feature-card-hover relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease-out ${i * 80}ms, transform 0.5s ease-out ${i * 80}ms`,
      }}
      onMouseEnter={() => !isTouch && setHovered(true)}
      onMouseLeave={() => !isTouch && setHovered(false)}
      onClick={handleTap}
    >
      <span className="absolute top-3 right-3 text-[9px] font-mono text-muted-foreground/50 bg-muted px-2 py-0.5 rounded-full" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.3s ease ${i * 80 + 200}ms` }}>
        Sample feedback
      </span>
      <StarRating rating={t.rating} active={visible} />
      <p className="text-muted-foreground text-sm leading-relaxed mt-3 mb-4">{renderQuote()}</p>
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 flex items-center justify-center text-xs font-bold text-[#0A0A0F] bg-gradient-brand flex-shrink-0"
          style={{ borderRadius: '28%' }}
        >
          {t.name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-foreground text-sm">{t.name}</p>
          <p className="text-muted-foreground text-xs font-mono">{t.course}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { ref, visible } = useScrollReveal();
  const [spotlight, setSpotlight] = useState(0);
  const [spotlightVisible, setSpotlightVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!visible) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    intervalRef.current = setInterval(() => {
      if (isPaused) return;
      setSpotlightVisible(false);
      setTimeout(() => {
        setSpotlight((s) => (s + 1) % testimonials.length);
        setSpotlightVisible(true);
      }, 400);
    }, 5500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [visible, isPaused]);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setStatsVisible(true); observer.disconnect(); } }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goTo = (i: number) => {
    setIsPaused(true);
    setSpotlightVisible(false);
    setTimeout(() => { setSpotlight(i); setSpotlightVisible(true); }, 300);
    setTimeout(() => setIsPaused(false), 8000);
  };

  const current = testimonials[spotlight];

  return (
    <section id="testimonials" className="py-24 px-6 bg-card/20">
      <div ref={ref} className="max-w-[1280px] mx-auto">
        {/* Label */}
        <div className="text-center mb-4" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-8px)', transition: 'opacity 0.5s ease-out, transform 0.5s ease-out' }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border text-xs font-mono font-semibold text-muted-foreground">
            <span style={{ display: 'inline-block', animation: visible ? 'emojiPop 0.5s ease-out 0.2s both' : 'none' }}>⭐</span>
            1000+ STUDENTS TRAINED
          </span>
        </div>

        {/* Headline */}
        <div className="text-center mb-12">
          <h2 className="section-headline">
            <CharReveal
              text="Students talk about"
              className="block text-foreground"
              delay={100}
              stagger={24}
            />
            <CharReveal
              text="real results."
              className="block"
              isGradient
              delay={200}
              stagger={28}
            />
          </h2>
        </div>

        {/* Spotlight Card */}
        <div
          className="max-w-2xl mx-auto mb-8"
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease-out 0.3s' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <TestimonialCard t={current} i={spotlight} visible={spotlightVisible} isSpotlight />
        </div>

        {/* Thumbnail Nav */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease-out 0.4s' }}>
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="px-3 py-1.5 rounded-full text-xs font-medium border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{
                background: spotlight === i ? 'rgba(94,195,232,0.12)' : 'transparent',
                borderColor: spotlight === i ? 'rgba(94,195,232,0.4)' : 'rgba(31,33,40,1)',
                color: spotlight === i ? '#5EC3E8' : '#9CA3AF',
                transition: 'all 0.2s ease',
                transform: spotlight === i ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Grid of remaining cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} i={i} visible={visible} />
          ))}
        </div>

        {/* Stats Row */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
          {[
            { value: 4.9, suffix: '★', label: 'Overall Rating', isDecimal: true },
            { value: 1000, suffix: '+', label: 'Students Trained' },
            { value: 10, suffix: '', label: 'Courses Offered' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.5s ease-out ${i * 100}ms, transform 0.5s ease-out ${i * 100}ms`,
              }}
            >
              <OdometerStat value={stat.value} suffix={stat.suffix} isDecimal={stat.isDecimal} animate={statsVisible} />
              <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
            </div>
          ))}
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