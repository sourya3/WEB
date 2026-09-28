'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import CharReveal from './CharReveal';
import { COURSE_ID_TO_SLUG } from '../courses/data/coursesData';

const SKILL_COURSES = [
  {
    id: 'ai',
    name: 'AI Tools Course',
    badge: 'Most Popular',
    badgeColor: '#F5C77E',
    description: 'Master practical AI tools for work, business, and creativity. Learn ChatGPT, Midjourney, automation workflows, and more — no coding required.',
    tags: ['Beginner Friendly', 'Certificate Included'],
    icon: '✦',
    curriculum: ['ChatGPT & Prompt Engineering', 'AI Image & Video Tools', 'Workflow Automation'],
  },
  {
    id: 'video',
    name: 'Video Editing Course',
    badge: 'Hands-On',
    badgeColor: '#5EC3E8',
    description: 'Professional video editing from scratch — cuts, color grading, transitions, audio mixing, and export for YouTube, Instagram, and client work.',
    tags: ['Project-Based', 'Certificate Included'],
    icon: '▶',
    curriculum: ['Premiere Pro / DaVinci Resolve', 'Color Grading & Audio', 'Client-Ready Export'],
  },
  {
    id: 'camera',
    name: 'Camera Mastery Course',
    badge: 'Beginner Friendly',
    badgeColor: '#7FE8C4',
    description: 'Learn shooting, lighting, and composition fundamentals. Go from auto mode to full manual control and shoot professional-quality photos and videos.',
    tags: ['Hands-On Shooting', 'Certificate Included'],
    icon: '◉',
    curriculum: ['Camera Settings & Modes', 'Lighting & Composition', 'Short Film Production'],
  },
  {
    id: 'marketing',
    name: 'Digital Marketing Course',
    badge: 'Career Track',
    badgeColor: '#5EC3E8',
    description: 'Social media strategy, paid ads, SEO, content marketing, and analytics — everything you need to grow brands and land marketing clients.',
    tags: ['Industry-Relevant', 'Certificate Included'],
    icon: '◈',
    curriculum: ['Social Media & SEO', 'Paid Ads (Meta/Google)', 'Analytics & Reporting'],
  },
  {
    id: 'capcut',
    name: 'CapCut Video Editing',
    badge: 'Mobile-First',
    badgeColor: '#F5C77E',
    description: 'Fast, viral-ready mobile editing for Reels, TikToks, and Shorts. Master CapCut\'s full toolkit — effects, text, transitions, and trending formats.',
    tags: ['Mobile Editing', 'Certificate Included'],
    icon: '⬡',
    curriculum: ['CapCut Interface & Tools', 'Trending Reels & Shorts', 'Effects & Text Animation'],
  },
];

const LANGUAGE_COURSES = [
  {
    id: 'english',
    name: 'English Language Classes',
    badge: 'All Levels',
    badgeColor: '#7FE8C4',
    description: 'Build confident spoken and written English for work, study, and daily life. From basic grammar to professional communication.',
    tags: ['All Levels', 'Certificate Included'],
    icon: '🌐',
    curriculum: ['Speaking & Pronunciation', 'Business English', 'Writing & Grammar'],
  },
  {
    id: 'korean',
    name: 'Korean Language Classes',
    badge: 'Beginner to Advanced',
    badgeColor: '#5EC3E8',
    description: 'Learn Hangul, conversational Korean, and grammar from scratch. Ideal for students planning to study or work in South Korea.',
    tags: ['Beginner to Advanced', 'Certificate Included'],
    icon: '🌐',
    curriculum: ['Hangul & Pronunciation', 'Conversational Korean', 'Grammar & Writing'],
  },
  {
    id: 'japanese',
    name: 'Japanese Language Classes',
    badge: 'Beginner to Advanced',
    badgeColor: '#F5C77E',
    description: 'Master Hiragana, Katakana, and basic Kanji. Build conversational skills for travel, work, or JLPT preparation.',
    tags: ['Beginner to Advanced', 'Certificate Included'],
    icon: '🌐',
    curriculum: ['Hiragana & Katakana', 'Conversational Japanese', 'JLPT Preparation'],
  },
  {
    id: 'ielts',
    name: 'IELTS / PTE Prep',
    badge: 'Test Ready',
    badgeColor: '#5EC3E8',
    description: 'Targeted preparation for IELTS and PTE exams. Practice all four skills — Reading, Writing, Listening, Speaking — with mock tests and expert feedback.',
    tags: ['Exam Focused', 'Mock Tests Included'],
    icon: '📋',
    curriculum: ['Reading & Listening', 'Writing & Speaking', 'Full Mock Tests'],
  },
  {
    id: 'visa',
    name: 'Visa Guidance',
    badge: 'Step-by-Step Support',
    badgeColor: '#7FE8C4',
    description: 'Complete visa documentation support for study and work abroad. We guide you through every step — from document preparation to interview readiness.',
    tags: ['Documentation Help', 'Interview Prep'],
    icon: '✈',
    curriculum: ['Document Preparation', 'Application Process', 'Interview Readiness'],
  },
];

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';

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

// Scramble/decode title effect
function ScrambleTitle({ text, isHovered, cardVisible }: { text: string; isHovered: boolean; cardVisible: boolean }) {
  const [displayText, setDisplayText] = useState('');
  const [charRevealed, setCharRevealed] = useState(false);
  const scrambleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasPlayed = useRef(false);
  const hasCharRevealed = useRef(false);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced.current) {
      setDisplayText(text);
      setCharRevealed(true);
    }
  }, [text]);

  // Char-reveal on first card visibility
  useEffect(() => {
    if (!cardVisible || hasCharRevealed.current || prefersReduced.current) return;
    hasCharRevealed.current = true;
    setCharRevealed(true);
    setDisplayText(text);
  }, [cardVisible, text]);

  useEffect(() => {
    if (!isHovered) {
      // Reset on hover-out
      hasPlayed.current = false;
      if (charRevealed) setDisplayText(text);
      return;
    }
    if (hasPlayed.current || prefersReduced.current) return;
    hasPlayed.current = true;

    const duration = 450;
    const start = performance.now();
    const chars = text.split('');

    if (scrambleRef.current) clearInterval(scrambleRef.current);
    scrambleRef.current = setInterval(() => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const resolvedCount = Math.floor(progress * chars.length);

      const scrambled = chars.map((ch, i) => {
        if (ch === ' ') return ' ';
        if (i < resolvedCount) return ch;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }).join('');

      setDisplayText(scrambled);

      if (progress >= 1) {
        setDisplayText(text);
        if (scrambleRef.current) clearInterval(scrambleRef.current);
      }
    }, 30);

    return () => { if (scrambleRef.current) clearInterval(scrambleRef.current); };
  }, [isHovered, text, charRevealed]);

  if (!charRevealed && !prefersReduced.current) {
    // Render individual char spans for the reveal animation
    const chars = text.split('');
    return (
      <h3
        className="font-bold text-foreground text-lg mb-2 leading-tight"
        style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '0.01em' }}
        aria-label={text}
      >
        {chars.map((ch, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={
              ch === ' '
                ? { display: 'inline-block', width: '0.28em' }
                : {
                    display: 'inline-block',
                    opacity: 0,
                    transform: 'translateY(16px)',
                  }
            }
          >
            {ch}
          </span>
        ))}
      </h3>
    );
  }

  // Once charRevealed, render individual char spans with animation
  if (charRevealed && !isHovered) {
    const chars = text.split('');
    return (
      <h3
        className="font-bold text-foreground text-lg mb-2 leading-tight"
        style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '0.01em' }}
        aria-label={text}
      >
        {chars.map((ch, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={
              ch === ' '
                ? { display: 'inline-block', width: '0.28em' }
                : {
                    display: 'inline-block',
                    opacity: 1,
                    transform: 'translateY(0px)',
                    transition: `opacity 0.35s ease-out ${i * 25}ms, transform 0.35s ease-out ${i * 25}ms`,
                  }
            }
          >
            {ch}
          </span>
        ))}
      </h3>
    );
  }

  return (
    <h3
      className="font-bold text-foreground text-lg mb-2 leading-tight"
      style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '0.01em' }}
    >
      {displayText}
    </h3>
  );
}

// Badge/pill with cursor-follow micro-tilt
function TiltBadge({ children, color, bg, border }: { children: React.ReactNode; color: string; bg: string; border: string }) {
  const badgeRef = useRef<HTMLSpanElement>(null);
  const isTouch = useRef(false);
  const prefersReduced = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none)').matches;
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    if (isTouch.current || prefersReduced.current) return;
    const badge = badgeRef.current;
    if (!badge) return;
    const rect = badge.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    const skewX = relX * 3;
    const skewY = relY * 2;
    badge.style.transform = `skew(${skewX}deg, ${skewY}deg) scale(1.03)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    if (badgeRef.current) badgeRef.current.style.transform = 'skew(0deg, 0deg) scale(1)';
  }, []);

  return (
    <span
      ref={badgeRef}
      className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full"
      style={{
        background: bg,
        color,
        border: `1px solid ${border}`,
        transition: 'transform 0.15s ease-out',
        display: 'inline-block',
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </span>
  );
}

function CourseCard({ course, index, visible }: { course: typeof SKILL_COURSES[0]; index: number; visible: boolean }) {
  const courseSlug = COURSE_ID_TO_SLUG[course.id] || '#';
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, z: 0 });
  const [iconVisible, setIconVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isTouch = useRef(false);
  const prefersReduced = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none)').matches;
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (visible) {
      setTimeout(() => setIconVisible(true), index * 100 + 200);
    }
  }, [visible, index]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch.current || prefersReduced.current || flipped) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    // rotateX: cursor Y position → tilt forward/back (±8°)
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 16; // -8 to +8
    // rotateY: cursor X position → tilt left/right (±8°)
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 16; // -8 to +8
    setTilt({ x, y, z: 10 });
  }, [flipped]);

  const onMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, z: 0 });
    setFlipped(false);
    setIsHovered(false);
  }, []);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease-out ${index * 100}ms, transform 0.5s ease-out ${index * 100}ms`,
        /* perspective on the PARENT so 3D tilt is applied in a proper 3D context */
        perspective: '900px',
        height: '320px',
      }}
    >
      <div
        ref={cardRef}
        className="relative cursor-pointer"
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: flipped
            ? `rotateY(180deg)`
            : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${tilt.z}px)`,
          transition: flipped
            ? 'transform 0.4s ease-in-out'
            : isHovered
            ? 'transform 0.08s ease-out'
            : 'transform 0.3s ease-out',
          willChange: 'transform',
        }}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={() => setFlipped(!flipped)}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-card border border-border p-6 flex flex-col ripple-hover"
          style={{ backfaceVisibility: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.2)', borderRadius: '24px' }}
        >
          <div className="flex items-start justify-between mb-4">
            <span
              className="text-2xl flex items-center justify-center w-12 h-12 squircle"
              style={{
                display: 'inline-flex',
                background: 'rgba(94,195,232,0.08)',
                border: '1px solid rgba(94,195,232,0.12)',
                transform: iconVisible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-8deg)',
                transition: `transform 0.3s cubic-bezier(0.34,1.56,0.64,1) ${index * 100 + 100}ms`,
              }}
            >
              {course.icon}
            </span>
            <TiltBadge
              color={course.badgeColor}
              bg={`${course.badgeColor}18`}
              border={`${course.badgeColor}40`}
            >
              {course.badge}
            </TiltBadge>
          </div>
          {/* Scramble title on hover-enter */}
          <ScrambleTitle text={course.name} isHovered={isHovered} cardVisible={visible} />
          <p className="text-muted-foreground text-sm leading-relaxed flex-1">{course.description}</p>
          <div className="flex flex-wrap gap-2 mt-4 mb-4">
            {course.tags.map((tag, ti) => (
              <span
                key={ti}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border"
                style={{
                  transform: iconVisible ? 'scale(1)' : 'scale(0.85)',
                  transition: `transform 0.3s ease ${index * 100 + 200 + ti * 50}ms`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            href={`/courses/${courseSlug}`}
            className="text-sm font-semibold text-primary hover:text-accent flex items-center gap-1 group"
            style={{ transition: 'color 0.15s ease' }}
            onClick={(e) => e.stopPropagation()}
          >
            Learn More →
            <span className="group-hover:translate-x-1 transition-transform duration-150" aria-hidden="true"></span>
          </Link>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-card border border-primary/30 p-6 flex flex-col"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', boxShadow: '0 4px 32px rgba(94,195,232,0.12)', borderRadius: '24px' }}
        >
          <h3 className="font-bold text-foreground text-lg mb-2">{course.name}</h3>
          <p className="text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">What you&apos;ll learn</p>
          <ul className="flex flex-col gap-3 flex-1">
            {course.curriculum.map((item, ci) => (
              <li
                key={ci}
                className="flex items-start gap-3 text-sm text-foreground"
                style={{
                  opacity: flipped ? 1 : 0,
                  transform: flipped ? 'translateX(0)' : 'translateX(-8px)',
                  transition: `opacity 0.3s ease ${ci * 80 + 200}ms, transform 0.3s ease ${ci * 80 + 200}ms`,
                }}
              >
                <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <a
            href="https://wa.me/9779746585111"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 py-3 bg-gradient-brand text-primary-foreground text-sm font-bold btn-glow ripple-hover"
            style={{ borderRadius: '20px' }}
            onClick={(e) => e.stopPropagation()}
          >
            Enroll Now →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CoursesSection() {
  const [activeTab, setActiveTab] = useState<'skill' | 'language'>('skill');
  const [tabAnimating, setTabAnimating] = useState(false);
  const { ref, visible } = useScrollReveal();
  const toggleRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const skillBtnRef = useRef<HTMLButtonElement>(null);
  const langBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateIndicator = () => {
      const btn = activeTab === 'skill' ? skillBtnRef.current : langBtnRef.current;
      const container = toggleRef.current;
      if (!btn || !container) return;
      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setIndicatorStyle({ left: btnRect.left - containerRect.left, width: btnRect.width });
    };
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeTab]);

  const switchTab = (tab: 'skill' | 'language') => {
    if (tab === activeTab) return;
    setTabAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTabAnimating(false);
    }, 150);
  };

  const courses = activeTab === 'skill' ? SKILL_COURSES : LANGUAGE_COURSES;

  return (
    <section id="courses" className="py-28 px-6">
      <div ref={ref} className="max-w-[1280px] mx-auto">
        {/* Label */}
        <div
          className="text-center mb-4"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-8px)', transition: 'opacity 0.5s ease-out, transform 0.5s ease-out' }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border text-xs font-mono font-semibold text-muted-foreground">
            <span style={{ display: 'inline-block', animation: visible ? 'emojiPop 0.5s ease-out 0.2s both' : 'none' }}>📚</span>
            OUR COURSES
          </span>
        </div>

        {/* Headline */}
        <div className="text-center mb-10">
          <h2 className="section-headline">
            <CharReveal
              text="Ten skills."
              className="block text-foreground"
              delay={100}
              stagger={26}
            />
            <CharReveal
              text="Every one built for real work."
              className="block"
              isGradient
              delay={200}
              stagger={22}
            />
          </h2>
        </div>

        {/* Toggle Pills */}
        <div className="flex justify-center mb-12" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease-out 0.3s' }}>
          <div
            ref={toggleRef}
            className="relative flex items-center gap-1 bg-card border border-border rounded-full p-1"
          >
            {/* Sliding indicator */}
            <div
              className="absolute top-1 bottom-1 rounded-full bg-gradient-brand"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                transition: 'left 0.25s ease, width 0.25s ease',
                zIndex: 0,
              }}
            />
            <button
              ref={skillBtnRef}
              onClick={() => switchTab('skill')}
              className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{
                color: activeTab === 'skill' ? '#0A0A0F' : '#9CA3AF',
                transition: 'color 0.25s ease',
              }}
            >
              🎯 Skill Courses
            </button>
            <button
              ref={langBtnRef}
              onClick={() => switchTab('language')}
              className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{
                color: activeTab === 'language' ? '#0A0A0F' : '#9CA3AF',
                transition: 'color 0.25s ease',
              }}
            >
              🌍 Languages &amp; Visa
            </button>
          </div>
        </div>

        {/* Course Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{
            opacity: tabAnimating ? 0 : 1,
            transform: tabAnimating ? 'translateY(8px)' : 'translateY(0)',
            transition: 'opacity 0.15s ease, transform 0.15s ease',
          }}
        >
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} visible={visible && !tabAnimating} />
          ))}
        </div>

        {/* Footer */}
        <div
          className="text-center mt-12"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.5s ease-out 0.6s, transform 0.5s ease-out 0.6s' }}
        >
          <p className="text-muted-foreground text-sm mb-6">Batches starting every month — no prior experience required</p>
          <a
            href="https://wa.me/9779746585111"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-brand text-primary-foreground font-bold text-sm btn-glow ripple-hover"
            style={{ borderRadius: '20px', transition: 'transform 0.15s ease' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
            onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.96)'; }}
          >
            View All Courses →
          </a>
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