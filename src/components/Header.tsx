'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

import CircularLogo from '@/components/ui/CircularLogo';

const navLinks = [
  { label: 'Courses', href: '#courses' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

// Magnetic text link — text shifts toward cursor within bounding box
function MagneticNavLink({ label, href, onClick }: { label: string; href: string; onClick: () => void }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const isTouch = useRef(false);
  const prefersReduced = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none)').matches;
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouch.current || prefersReduced.current) return;
    const btn = btnRef.current;
    const text = textRef.current;
    if (!btn || !text) return;
    const rect = btn.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    text.style.transform = `translate(${relX * 5}px, ${relY * 3}px)`;
  }, []);

  const onMouseEnter = useCallback(() => {
    if (underlineRef.current) underlineRef.current.style.width = '100%';
  }, []);

  const onMouseLeave = useCallback(() => {
    if (textRef.current) textRef.current.style.transform = 'translate(0,0)';
    if (underlineRef.current) underlineRef.current.style.width = '0%';
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className="text-sm font-medium text-muted-foreground hover:text-foreground relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
      style={{ transition: 'color 0.15s ease' }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span
        ref={textRef}
        style={{ display: 'inline-block', transition: 'transform 0.1s ease-out' }}
      >
        {label}
      </span>
      <span
        ref={underlineRef}
        className="absolute -bottom-1 left-0 h-px bg-gradient-brand"
        style={{ width: '0%', transition: 'width 0.25s ease-out' }}
      />
    </button>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const mobileLinksRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setNavVisible(true); return; }
    const timer = setTimeout(() => setNavVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced) {
        mobileLinksRef.current.forEach((el, i) => {
          if (!el) return;
          el.style.opacity = '0';
          el.style.transform = 'translateY(-10px)';
          setTimeout(() => {
            if (el) {
              el.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }
          }, 60 + i * 60);
        });
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-[2px]"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #5EC3E8, #7FE8C4)',
          transition: 'width 0.05s linear',
        }}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 glass-nav border-b border-border`}
        style={{
          transition: 'background 0.2s ease, backdrop-filter 0.2s ease, padding 0.2s ease, opacity 0.4s ease, transform 0.4s ease',
          paddingTop: scrolled ? '0.75rem' : '1.25rem',
          paddingBottom: scrolled ? '0.75rem' : '1.25rem',
          opacity: navVisible ? 1 : 0,
          transform: navVisible ? 'translateY(0)' : 'translateY(-10px)',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            aria-label="UniqTurn Home"
          >
            <CircularLogo size={38} hoverEffect={true} />
            <div className="flex flex-col justify-center leading-tight">
              <span className="font-extrabold text-foreground text-base tracking-tight group-hover:text-primary transition-colors duration-150">
                Uniq Turn
              </span>
              <span className="text-muted-foreground text-[10px] font-medium tracking-wide hidden sm:block">
                Education &amp; Skills Hub
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <MagneticNavLink
                key={link.label}
                label={link.label}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
              />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/9779746585111"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-brand text-primary-foreground text-sm font-bold btn-glow ripple-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{ borderRadius: '20px', transition: 'transform 0.15s ease, box-shadow 0.15s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
              onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.96)'; }}
              onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'; }}
            >
              Enroll Now
            </a>
            <button
              className="md:hidden flex items-center justify-center w-11 h-11 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <span className="absolute block w-6 h-0.5 bg-foreground" style={{ transition: 'transform 0.25s ease, opacity 0.25s ease', transform: menuOpen ? 'rotate(45deg)' : 'translateY(-5px)' }} />
                <span className="absolute block w-6 h-0.5 bg-foreground" style={{ transition: 'opacity 0.25s ease', opacity: menuOpen ? 0 : 1 }} />
                <span className="absolute block w-6 h-0.5 bg-foreground" style={{ transition: 'transform 0.25s ease, opacity 0.25s ease', transform: menuOpen ? 'rotate(-45deg)' : 'translateY(5px)' }} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className="fixed inset-0 z-40 flex flex-col pt-24 px-6 pb-8 md:hidden glass-tooltip"
        style={{
          transition: 'opacity 0.25s ease, transform 0.25s ease',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(-8px)',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <nav className="flex flex-col gap-2 flex-1">
          {navLinks.map((link, i) => (
            <button
              key={link.label}
              ref={(el) => { mobileLinksRef.current[i] = el; }}
              onClick={() => handleNavClick(link.href)}
              className="text-left py-4 text-xl font-semibold text-foreground border-b border-border hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{ transition: 'color 0.15s ease' }}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <a
          href="https://wa.me/9779746585111"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          className="mt-8 inline-flex items-center justify-center gap-2 py-4 rounded-full bg-gradient-brand text-primary-foreground text-base font-bold btn-glow"
          style={{ transition: 'transform 0.15s ease' }}
        >
          Enroll Now
        </a>
      </div>
    </>
  );
}