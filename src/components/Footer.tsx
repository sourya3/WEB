'use client';

import React, { useRef, useCallback, useEffect } from 'react';

import CircularLogo from '@/components/ui/CircularLogo';

// Magnetic footer link — text shifts toward cursor
function MagneticFooterLink({ label, href, onClick }: { label: string; href: string; onClick?: () => void }) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const isTouch = useRef(false);
  const prefersReduced = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none)').matches;
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouch.current || prefersReduced.current) return;
    const link = linkRef.current;
    const text = textRef.current;
    if (!link || !text) return;
    const rect = link.getBoundingClientRect();
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
    <a
      ref={linkRef}
      href={href}
      onClick={onClick}
      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded relative"
      style={{ transition: 'color 0.15s ease' }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span ref={textRef} style={{ display: 'inline-block', transition: 'transform 0.1s ease-out' }}>
        {label}
      </span>
      <span
        ref={underlineRef}
        className="absolute -bottom-0.5 left-0 h-px bg-gradient-brand"
        style={{ width: '0%', transition: 'width 0.25s ease-out' }}
      />
    </a>
  );
}

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-border py-16 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 justify-between">
          {/* Left: Logo + tagline + socials */}
          <div className="flex flex-col gap-3 max-w-xs">
            <div className="flex items-center gap-3">
              <CircularLogo size={44} />
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-foreground text-base tracking-tight">Uniq Turn</span>
                <span className="text-muted-foreground text-[10px] font-medium tracking-wide">Education &amp; Skills Hub</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm font-medium leading-relaxed">
              Practical skills. Real careers. Kathmandu.
            </p>
            <div className="flex items-center gap-4 mt-1">
              {[
                { label: 'Instagram', href: 'https://instagram.com', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg> },
                { label: 'Facebook', href: 'https://facebook.com', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                { label: 'TikTok', href: 'https://tiktok.com', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg> },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded"
                  style={{ transition: 'color 0.15s ease, transform 0.15s ease' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.15)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Center: Nav links */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Pages</span>
            {['Courses', 'Why Us', 'Testimonials', 'Contact'].map((link) => (
              <MagneticFooterLink
                key={link}
                label={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
              />
            ))}
          </div>

          {/* Right: Contact */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Contact</span>
            <p className="text-sm text-muted-foreground leading-relaxed">CTC Mall, Sundhara<br />Kathmandu, Nepal</p>
            <a href="https://wa.me/9779746585111" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors">+977 9746585111</a>
            <a href="mailto:uniqturn.np@gmail.com" className="text-sm text-muted-foreground hover:text-accent transition-colors">uniqturn.np@gmail.com</a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs">© 2026 Uniq Turn Education &amp; Skills Hub. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}