'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/app/components/WhatsAppFAB';
import CharReveal from '@/app/components/CharReveal';
import { CourseData, getRelatedCourses } from '../data/coursesData';

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setVisible(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Accordion Item ───────────────────────────────────────────────────────────
function AccordionItem({
  title,
  children,
  defaultOpen = false,
  index = 0,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  index?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>(defaultOpen ? 'auto' : 0);

  useEffect(() => {
    if (!contentRef.current) return;
    if (open) {
      const h = contentRef.current.scrollHeight;
      setHeight(h);
      const t = setTimeout(() => setHeight('auto'), 320);
      return () => clearTimeout(t);
    } else {
      setHeight(contentRef.current.scrollHeight);
      requestAnimationFrame(() => setHeight(0));
    }
  }, [open]);

  return (
    <div
      className="border border-border rounded-xl overflow-hidden"
      style={{
        opacity: 1,
        transition: `opacity 0.4s ease ${index * 60}ms`,
      }}
    >
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-foreground text-sm sm:text-base pr-4 group-hover:text-primary transition-colors duration-150">
          {title}
        </span>
        <span
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-muted-foreground"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
          }}
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div
        ref={contentRef}
        style={{
          height: height === 'auto' ? 'auto' : `${height}px`,
          overflow: 'hidden',
          transition: 'height 0.32s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Related Course Card ──────────────────────────────────────────────────────
function RelatedCourseCard({ course, index }: { course: CourseData; index: number }) {
  const { ref, visible } = useScrollReveal(0.1);
  const categoryColors: Record<string, string> = {
    'Skill Course': '#5EC3E8',
    'Language & Visa': '#7FE8C4',
  };
  const color = categoryColors[course.category] || '#5EC3E8';

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease-out ${index * 100}ms, transform 0.5s ease-out ${index * 100}ms`,
      }}
    >
      <Link
        href={`/courses/${course.slug}`}
        className="block bg-card border border-border rounded-2xl p-6 hover:border-primary/40 group"
        style={{ transition: 'border-color 0.2s ease, box-shadow 0.2s ease' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(94,195,232,0.1)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
      >
        <span
          className="inline-block text-[10px] font-mono font-bold px-2.5 py-1 rounded-full mb-3"
          style={{ background: `${color}18`, color, border: `1px solid ${color}40` }}
        >
          {course.category}
        </span>
        <h3 className="font-bold text-foreground text-base mb-2 group-hover:text-primary transition-colors duration-150">
          {course.name}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
          {course.tagline}
        </p>
        <span className="text-sm font-semibold text-primary flex items-center gap-1">
          Learn More
          <span className="group-hover:translate-x-1 transition-transform duration-150">→</span>
        </span>
      </Link>
    </div>
  );
}

// ─── Per-course accent color map ─────────────────────────────────────────────
const COURSE_ACCENT_COLORS: Record<string, string> = {
  'ai-course':        '#22D3EE', // electric blue/cyan
  'video-editing':    '#C084FC', // violet/magenta
  'camera-mastery':   '#FBBF24', // warm amber/gold
  'digital-marketing':'#FB923C', // coral/orange
  'capcut-editing':   '#F472B6', // hot pink
  'english-language': '#60A5FA', // classic blue
  'korean-language':  '#F87171', // soft red
  'japanese-language':'#FDA4AF', // soft red/white-gray
  'ielts-pte':        '#2DD4BF', // deep teal
  'visa-guidance':    '#34D399', // trustworthy navy/green
};

// ─── Main CoursePage Component ────────────────────────────────────────────────
export default function CoursePage({ course }: { course: CourseData }) {
  const relatedCourses = getRelatedCourses(course.relatedSlugs);
  const waLink = `https://wa.me/9779746585111?text=${course.whatsappMessage}`;

  const heroReveal = useScrollReveal(0);
  const whyReveal = useScrollReveal();
  const curriculumReveal = useScrollReveal();
  const howReveal = useScrollReveal();
  const whoReveal = useScrollReveal();
  const faqReveal = useScrollReveal();
  const relatedReveal = useScrollReveal();
  const finalCtaReveal = useScrollReveal();

  // Per-course accent color — falls back to brand blue
  const accentColor = COURSE_ACCENT_COLORS[course.slug] || '#5EC3E8';
  const categoryColor = accentColor;

  return (
    <main className="min-h-screen text-foreground overflow-x-hidden relative" style={{ zIndex: 1 }}>
      <Header />

      {/* ── Hero glow tint — per-course accent color ─────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '420px',
          background: `radial-gradient(ellipse 70% 40% at 50% 0%, ${accentColor}12 0%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── BREADCRUMB ─────────────────────────────────────────────────────── */}
      <div className="pt-24 pb-0 px-6">
        <div className="max-w-[1280px] mx-auto">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-2" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors duration-150">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/#courses" className="hover:text-foreground transition-colors duration-150">Courses</Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">{course.name}</span>
          </nav>
          <Link
            href="/#courses"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-150 mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Courses
          </Link>
        </div>
      </div>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="px-6 pb-20 pt-4">
        <div ref={heroReveal.ref} className="max-w-[1280px] mx-auto">
          <div
            style={{
              opacity: heroReveal.visible ? 1 : 0,
              transform: heroReveal.visible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            }}
          >
            {/* Category Badge — accent-colored */}
            <span
              className="inline-block text-xs font-mono font-bold px-3 py-1.5 mb-6"
              style={{
                background: `${accentColor}18`,
                color: accentColor,
                border: `1px solid ${accentColor}40`,
                borderRadius: '20px',
              }}
            >
              {course.category}
            </span>

            {/* H1 Headline */}
            <h1 className="hero-headline mb-4 max-w-4xl">
              <CharReveal
                text={course.name.split(' ').slice(0, Math.ceil(course.name.split(' ').length / 2)).join(' ')}
                className="block text-foreground"
                delay={50}
                stagger={22}
                onLoad
              />
              <CharReveal
                text={course.name.split(' ').slice(Math.ceil(course.name.split(' ').length / 2)).join(' ')}
                className="block"
                isGradient
                delay={200}
                stagger={22}
                onLoad
              />
            </h1>

            {/* Tagline */}
            <p
              className="text-muted-foreground text-lg max-w-2xl mb-10 leading-relaxed"
              style={{
                opacity: heroReveal.visible ? 1 : 0,
                transform: heroReveal.visible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.5s ease-out 0.3s, transform 0.5s ease-out 0.3s',
              }}
            >
              {course.tagline}
            </p>

            {/* CTA — accent-colored gradient shift */}
            <div
              className="flex flex-wrap items-center gap-4 mb-12"
              style={{
                opacity: heroReveal.visible ? 1 : 0,
                transform: heroReveal.visible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.5s ease-out 0.45s, transform 0.5s ease-out 0.45s',
              }}
            >
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-primary-foreground font-bold text-sm ripple-hover"
                style={{
                  background: `linear-gradient(135deg, ${accentColor} 0%, #7FE8C4 100%)`,
                  borderRadius: '20px',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  boxShadow: `0 0 20px ${accentColor}30`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 28px ${accentColor}50`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${accentColor}30`;
                }}
                onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.96)'; }}
              >
                Enroll via WhatsApp →
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                Have questions? Message us
              </a>
            </div>

            {/* Stat Row */}
            <div
              className="flex flex-wrap gap-3"
              style={{
                opacity: heroReveal.visible ? 1 : 0,
                transform: heroReveal.visible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.5s ease-out 0.55s, transform 0.5s ease-out 0.55s',
              }}
            >
              {[
                { icon: '🕐', label: course.duration },
                { icon: '👥', label: course.batchSize },
                { icon: '📍', label: course.format },
                { icon: '🎓', label: course.certificate },
              ].map((stat, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border text-sm text-muted-foreground"
                  style={{ borderRadius: '20px' }}
                >
                  <span>{stat.icon}</span>
                  <span className="font-medium">{stat.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY THIS COURSE ────────────────────────────────────────────────── */}
      <section className="px-6 py-20 border-t border-border">
        <div ref={whyReveal.ref} className="max-w-[1280px] mx-auto">
          <div
            style={{
              opacity: whyReveal.visible ? 1 : 0,
              transform: whyReveal.visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-card border border-border text-xs font-mono font-semibold text-muted-foreground mb-8" style={{ borderRadius: '20px' }}>
              WHY THIS COURSE
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="section-headline mb-6">
                  <span className="block text-foreground">Why learn</span>
                  <span className="block" style={{ background: `linear-gradient(135deg, ${accentColor}, #7FE8C4)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{course.name.split(' ')[0]}?</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base">{course.whyCourse}</p>
              </div>
              <div className="flex flex-col gap-4">
                {course.outcomes.map((outcome, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 bg-card border border-border"
                    style={{
                      borderRadius: '20px',
                      opacity: whyReveal.visible ? 1 : 0,
                      transform: whyReveal.visible ? 'translateX(0)' : 'translateX(16px)',
                      transition: `opacity 0.4s ease-out ${i * 80 + 200}ms, transform 0.4s ease-out ${i * 80 + 200}ms`,
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm font-bold squircle"
                      style={{ background: `${accentColor}18`, color: accentColor }}
                    >
                      {outcome.icon}
                    </span>
                    <p className="text-foreground text-sm leading-relaxed">{outcome.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ─────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 border-t border-border">
        <div ref={curriculumReveal.ref} className="max-w-[1280px] mx-auto">
          <div
            style={{
              opacity: curriculumReveal.visible ? 1 : 0,
              transform: curriculumReveal.visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-card border border-border text-xs font-mono font-semibold text-muted-foreground mb-8" style={{ borderRadius: '20px' }}>
              WHAT YOU&apos;LL LEARN
            </span>
            <h2 className="section-headline mb-12">
              <span className="block text-foreground">Course</span>
              <span className="block" style={{ background: `linear-gradient(135deg, ${accentColor}, #7FE8C4)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Curriculum</span>
            </h2>
            <div className="flex flex-col gap-3 max-w-3xl">
              {course.modules.map((mod, i) => (
                <AccordionItem key={i} title={mod.title} index={i}>
                  {mod.description}
                </AccordionItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section className="px-6 py-20 border-t border-border">
        <div ref={howReveal.ref} className="max-w-[1280px] mx-auto">
          <div
            style={{
              opacity: howReveal.visible ? 1 : 0,
              transform: howReveal.visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-card border border-border text-xs font-mono font-semibold text-muted-foreground mb-8" style={{ borderRadius: '20px' }}>
              HOW IT WORKS
            </span>
            <h2 className="section-headline mb-14">
              <span className="block text-foreground">Your path</span>
              <span className="block text-gradient">from here to hired.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {course.steps.map((step, i) => (
                <div
                  key={i}
                  className="relative bg-card border border-border p-6"
                  style={{
                    borderRadius: '24px',
                    opacity: howReveal.visible ? 1 : 0,
                    transform: howReveal.visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.5s ease-out ${i * 100}ms, transform 0.5s ease-out ${i * 100}ms`,
                  }}
                >
                  {i < course.steps.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-8 -right-3 w-6 h-px"
                      style={{ background: `linear-gradient(90deg, ${accentColor}60, transparent)` }}
                      aria-hidden="true"
                    />
                  )}
                  <div
                    className="w-10 h-10 flex items-center justify-center text-sm font-bold mb-5 squircle"
                    style={{ background: `${accentColor}18`, color: accentColor, border: `1px solid ${accentColor}40` }}
                  >
                    {step.step}
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IS IT FOR ──────────────────────────────────────────────────── */}
      <section className="px-6 py-20 border-t border-border">
        <div ref={whoReveal.ref} className="max-w-[1280px] mx-auto">
          <div
            style={{
              opacity: whoReveal.visible ? 1 : 0,
              transform: whoReveal.visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-card border border-border text-xs font-mono font-semibold text-muted-foreground mb-8" style={{ borderRadius: '20px' }}>
              WHO IS THIS FOR
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="section-headline">
                  <span className="block text-foreground">Is this course</span>
                  <span className="block text-gradient">right for you?</span>
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                {course.whoIsItFor.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3"
                    style={{
                      opacity: whoReveal.visible ? 1 : 0,
                      transform: whoReveal.visible ? 'translateX(0)' : 'translateX(-12px)',
                      transition: `opacity 0.4s ease-out ${i * 80}ms, transform 0.4s ease-out ${i * 80}ms`,
                    }}
                  >
                    <span
                      className="flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center text-xs font-bold squircle-xs"
                      style={{ background: `${accentColor}18`, color: accentColor }}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <p className="text-foreground text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 border-t border-border">
        <div ref={faqReveal.ref} className="max-w-[1280px] mx-auto">
          <div
            style={{
              opacity: faqReveal.visible ? 1 : 0,
              transform: faqReveal.visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-card border border-border text-xs font-mono font-semibold text-muted-foreground mb-8" style={{ borderRadius: '20px' }}>
              FAQ
            </span>
            <h2 className="section-headline mb-12">
              <span className="block text-foreground">Common</span>
              <span className="block text-gradient">questions answered.</span>
            </h2>
            <div className="flex flex-col gap-3 max-w-3xl">
              {course.faqs.map((faq, i) => (
                <AccordionItem key={i} title={faq.question} index={i}>
                  {faq.answer}
                </AccordionItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED COURSES ────────────────────────────────────────────────── */}
      {relatedCourses.length > 0 && (
        <section className="px-6 py-20 border-t border-border">
          <div ref={relatedReveal.ref} className="max-w-[1280px] mx-auto">
            <div
              style={{
                opacity: relatedReveal.visible ? 1 : 0,
                transform: relatedReveal.visible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
              }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-card border border-border text-xs font-mono font-semibold text-muted-foreground mb-8" style={{ borderRadius: '20px' }}>
                RELATED COURSES
              </span>
              <h2 className="section-headline mb-12">
                <span className="block text-foreground">Explore</span>
                <span className="block text-gradient">more courses.</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedCourses.map((related, i) => (
                  <RelatedCourseCard key={related.slug} course={related} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section className="px-6 py-24 border-t border-border">
        <div ref={finalCtaReveal.ref} className="max-w-[1280px] mx-auto text-center">
          <div
            style={{
              opacity: finalCtaReveal.visible ? 1 : 0,
              transform: finalCtaReveal.visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-card border border-border text-xs font-mono font-semibold text-muted-foreground mb-8" style={{ borderRadius: '20px' }}>
              READY TO START?
            </span>
            <h2 className="section-headline mb-4">
              <span className="block text-foreground">Enroll in</span>
              <span className="block text-gradient">{course.name}</span>
            </h2>
            <p className="text-muted-foreground text-base mb-12 max-w-xl mx-auto leading-relaxed">
              Batches start every month. Message us on WhatsApp to confirm your spot, ask questions, or get fee details.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 text-primary-foreground font-bold text-base ripple-hover"
                style={{
                  background: `linear-gradient(135deg, ${accentColor} 0%, #7FE8C4 100%)`,
                  borderRadius: '20px',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  boxShadow: `0 0 24px ${accentColor}35`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 36px ${accentColor}55`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${accentColor}35`;
                }}
                onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.96)'; }}
              >
                Enroll via WhatsApp →
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground font-semibold text-base hover:border-primary/50 transition-colors duration-150"
                style={{ borderRadius: '20px' }}
              >
                Have questions? Message us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </main>
  );
}
