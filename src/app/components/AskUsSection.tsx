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

const questions = [
  { text: 'Which course is best for a total beginner?', link: 'https://wa.me/9779746585111?text=Which+course+is+best+for+a+total+beginner%3F' },
  { text: 'Do you offer weekend batches?', link: 'https://wa.me/9779746585111?text=Do+you+offer+weekend+batches%3F' },
  { text: 'Do you help with visa documentation too?', link: 'https://wa.me/9779746585111?text=Do+you+help+with+visa+documentation%3F' },
];

// Chat question with text glow on hover
function ChatQuestion({ q, typedText, tickVisible, index }: {
  q: typeof questions[0];
  typedText: string;
  tickVisible: boolean;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const prefersReduced = useRef(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const isFullyTyped = typedText.length === q.text.length;

  return (
    <a
      href={q.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-3 px-4 py-3 bg-muted border border-border rounded-2xl rounded-tl-sm group"
      style={{
        opacity: typedText.length > 0 ? 1 : 0,
        transition: 'opacity 0.3s ease, background 0.2s ease, border-color 0.2s ease',
        minHeight: '44px',
        background: hovered ? 'rgba(94,195,232,0.06)' : undefined,
        borderColor: hovered ? 'rgba(94,195,232,0.25)' : undefined,
      }}
      onMouseEnter={() => !isTouch && setHovered(true)}
      onMouseLeave={() => !isTouch && setHovered(false)}
    >
      <span
        className="text-sm"
        style={{
          // Text glow on hover — brightens the text color and adds text-shadow
          color: hovered && isFullyTyped && !prefersReduced.current ? '#F5F5F7' : '#9CA3AF',
          textShadow: hovered && isFullyTyped && !prefersReduced.current
            ? '0 0 12px rgba(94,195,232,0.5), 0 0 24px rgba(94,195,232,0.2)'
            : 'none',
          transition: 'color 0.2s ease, text-shadow 0.2s ease',
        }}
      >
        {typedText}
        {typedText.length > 0 && typedText.length < q.text.length && (
          <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 align-middle" style={{ animation: 'cursorBlink 0.7s ease-in-out infinite' }} />
        )}
      </span>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {tickVisible && (
          <span className="text-[#5EC3E8] text-xs" style={{ animation: 'fadeIn 0.3s ease' }}>✓✓</span>
        )}
        <span
          className="text-muted-foreground group-hover:text-primary transition-colors"
          style={{
            transition: 'transform 0.15s ease, color 0.15s ease',
            transform: hovered ? 'translateX(2px)' : 'translateX(0)',
          }}
        >
          →
        </span>
      </div>
    </a>
  );
}

export default function AskUsSection() {
  const { ref, visible } = useScrollReveal();
  const [typedQuestions, setTypedQuestions] = useState<string[]>(['', '', '']);
  const [tickVisible, setTickVisible] = useState<boolean[]>([false, false, false]);
  const [showTyping, setShowTyping] = useState(false);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (!visible || hasPlayed.current) return;
    hasPlayed.current = true;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setTypedQuestions(questions.map((q) => q.text));
      setTickVisible([true, true, true]);
      return;
    }

    // Show typing indicator first
    setTimeout(() => {
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
        // Type each question sequentially
        let qIdx = 0;
        const typeQuestion = () => {
          if (qIdx >= questions.length) return;
          const q = questions[qIdx];
          let charIdx = 0;
          const typeChar = () => {
            charIdx++;
            setTypedQuestions((prev) => {
              const next = [...prev];
              next[qIdx] = q.text.slice(0, charIdx);
              return next;
            });
            if (charIdx < q.text.length) {
              setTimeout(typeChar, 28);
            } else {
              // Show tick
              const qi = qIdx;
              setTimeout(() => {
                setTickVisible((prev) => { const next = [...prev]; next[qi] = true; return next; });
                qIdx++;
                setTimeout(typeQuestion, 400);
              }, 200);
            }
          };
          typeChar();
        };
        typeQuestion();
      }, 1200);
    }, 400);
  }, [visible]);

  return (
    <section id="contact" className="py-24 px-6">
      <div ref={ref} className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-24px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border text-xs font-mono font-semibold text-muted-foreground mb-6">
              <span style={{ display: 'inline-block', animation: visible ? 'emojiPop 0.5s ease-out 0.2s both' : 'none' }}>💬</span>
              ASK US ANYTHING
            </span>
            <h2 className="section-headline mb-6">
              <CharReveal
                text="Not sure which"
                className="block text-foreground"
                delay={100}
                stagger={26}
              />
              <CharReveal
                text="course fits you?"
                className="block"
                isGradient
                delay={200}
                stagger={26}
              />
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Just message us. Whether you&apos;re a complete beginner, switching careers, planning to study abroad, or need visa guidance — we&apos;ll help you find the right path. No pressure, no sales pitch.
            </p>
            <a
              href="https://wa.me/9779746585111"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-brand text-primary-foreground font-bold text-base btn-glow"
              style={{ transition: 'transform 0.15s ease', animation: 'glowBreath 4s ease-in-out infinite' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
              onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.96)'; }}
            >
              Message Us on WhatsApp →
            </a>
          </div>

          {/* Right: Chat Preview */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(24px)',
              transition: 'opacity 0.6s ease-out 0.15s, transform 0.6s ease-out 0.15s',
            }}
          >
            <div className="glass-card rounded-2xl p-6">
              {/* Chat header */}
              <div className="flex items-center gap-3 pb-4 border-b border-border mb-4">
                <div className="w-10 h-10 squircle bg-gradient-brand flex items-center justify-center text-sm font-bold text-[#0A0A0F]">UT</div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Uniq Turn</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot" />
                    <span className="text-[11px] text-muted-foreground">Online · replies fast</span>
                  </div>
                </div>
              </div>

              {/* Typing indicator */}
              {showTyping && (
                <div className="flex items-center gap-1.5 mb-3 px-3 py-2 bg-muted rounded-2xl rounded-tl-sm w-fit">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                      style={{ animation: `typingBounce 1s ease-in-out ${i * 150}ms infinite` }}
                    />
                  ))}
                </div>
              )}

              {/* Questions with glow effect */}
              <div className="flex flex-col gap-3">
                {questions.map((q, i) => (
                  <ChatQuestion
                    key={i}
                    q={q}
                    typedText={typedQuestions[i]}
                    tickVisible={tickVisible[i]}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes emojiPop {
          0% { transform: scale(0.8); }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes glowBreath {
          0%, 100% { box-shadow: 0 0 16px rgba(94,195,232,0.3); }
          50% { box-shadow: 0 0 32px rgba(94,195,232,0.6), 0 0 48px rgba(127,232,196,0.3); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes typingBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}