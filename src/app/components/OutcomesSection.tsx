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

// ─── Video Timeline Mockup ────────────────────────────────────────────────────
function VideoTimelineMockup({ active }: { active: boolean }) {
  const clips = [
    { w: '30%', color: '#5EC3E8', label: 'Intro' },
    { w: '20%', color: '#7FE8C4', label: 'B-Roll' },
    { w: '25%', color: '#5EC3E8', label: 'Main' },
    { w: '15%', color: '#F5C77E', label: 'Outro' },
  ];
  const [step, setStep] = useState(0);
  const [playheadPos, setPlayheadPos] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active) { setStep(0); setPlayheadPos(0); return; }
    setStep(0); setPlayheadPos(0);
    let s = 0;
    intervalRef.current = setInterval(() => {
      s++;
      setStep(s);
      if (s >= clips.length) {
        clearInterval(intervalRef.current!);
        // Playhead sweep
        let pos = 0;
        const sweep = setInterval(() => {
          pos += 2;
          setPlayheadPos(pos);
          if (pos >= 100) clearInterval(sweep);
        }, 20);
      }
    }, 400);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [active]);

  return (
    <div className="bg-[#0D0E14] rounded-xl p-4 border border-border">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-[10px] font-mono text-muted-foreground ml-2">timeline.prproj</span>
      </div>
      <div className="relative h-8 bg-muted rounded-lg overflow-hidden flex gap-1 p-1">
        {clips.map((clip, i) => (
          <div
            key={i}
            className="h-full rounded flex items-center justify-center text-[9px] font-mono font-bold text-[#0A0A0F]"
            style={{
              width: step > i ? clip.w : '0%',
              background: clip.color,
              transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1)',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {step > i ? clip.label : ''}
          </div>
        ))}
        {/* Playhead */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white opacity-80"
          style={{ left: `${playheadPos}%`, transition: 'left 0.02s linear' }}
        />
      </div>
      {/* Waveform */}
      <div className="flex items-end gap-0.5 mt-2 h-6">
        {Array.from({ length: 32 }).map((_, i) => {
          const h = Math.sin(i * 0.7) * 0.4 + 0.6;
          return (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: active ? `${h * 100}%` : '20%',
                background: 'rgba(94,195,232,0.4)',
                transition: `height 0.3s ease ${i * 20}ms`,
                animation: active ? `waveformPulse 0.8s ease-in-out ${i * 30}ms infinite alternate` : 'none',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── Social Ad Mockup ─────────────────────────────────────────────────────────
function SocialAdMockup({ active }: { active: boolean }) {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [shares, setShares] = useState(0);
  const [boostProgress, setBoostProgress] = useState(0);

  useEffect(() => {
    if (!active) { setLikes(0); setComments(0); setShares(0); setBoostProgress(0); return; }
    const targets = { likes: 2847, comments: 143, shares: 89 };
    const duration = 1500;
    const start = performance.now();
    const update = (now: number) => {
      let p = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setLikes(Math.floor(targets.likes * e));
      setComments(Math.floor(targets.comments * e));
      setShares(Math.floor(targets.shares * e));
      setBoostProgress(Math.floor(e * 78));
      if (p < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [active]);

  return (
    <div className="bg-[#0D0E14] rounded-xl p-4 border border-border">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-gradient-brand flex items-center justify-center text-[10px] font-bold text-[#0A0A0F]">UT</div>
        <div>
          <p className="text-[11px] font-semibold text-foreground">Uniq Turn</p>
          <p className="text-[9px] text-muted-foreground">Sponsored</p>
        </div>
      </div>
      <div className="bg-gradient-brand rounded-lg h-16 flex items-center justify-center mb-3">
        <span className="text-[11px] font-bold text-[#0A0A0F]">Learn AI Tools in Kathmandu →</span>
      </div>
      <div className="flex gap-4 text-[11px] font-mono mb-3">
        <span className="text-[#5EC3E8]">❤ {likes.toLocaleString()}</span>
        <span className="text-muted-foreground">💬 {comments}</span>
        <span className="text-muted-foreground">↗ {shares}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[9px] text-muted-foreground font-mono">Boosting</span>
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-brand rounded-full" style={{ width: `${boostProgress}%`, transition: 'width 0.05s linear' }} />
        </div>
        <span className="text-[9px] font-mono text-accent">{boostProgress}%</span>
      </div>
    </div>
  );
}

// ─── AI Workflow Mockup ───────────────────────────────────────────────────────
function AIWorkflowMockup({ active }: { active: boolean }) {
  const nodes = ['Input', 'AI Model', 'Process', 'Output'];
  const [activeNode, setActiveNode] = useState(-1);
  const [lineProgress, setLineProgress] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    if (!active) { setActiveNode(-1); setLineProgress([0, 0, 0]); return; }
    let n = 0;
    const advance = () => {
      setActiveNode(n);
      if (n > 0) {
        const lineIdx = n - 1;
        let p = 0;
        const sweep = setInterval(() => {
          p += 5;
          setLineProgress((prev) => { const next = [...prev]; next[lineIdx] = Math.min(p, 100); return next; });
          if (p >= 100) { clearInterval(sweep); if (n < nodes.length - 1) { n++; setTimeout(advance, 200); } }
        }, 15);
      } else {
        n++;
        setTimeout(advance, 300);
      }
    };
    advance();
  }, [active]);

  return (
    <div className="bg-[#0D0E14] rounded-xl p-4 border border-border">
      <p className="text-[10px] font-mono text-muted-foreground mb-4 uppercase tracking-widest">AI Workflow</p>
      <div className="flex items-center justify-between">
        {nodes.map((node, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-[10px] font-bold"
                style={{
                  borderColor: activeNode >= i ? '#5EC3E8' : '#1F2128',
                  background: activeNode >= i ? 'rgba(94,195,232,0.12)' : 'transparent',
                  color: activeNode >= i ? '#5EC3E8' : '#9CA3AF',
                  transition: 'all 0.3s ease',
                  boxShadow: activeNode === i ? '0 0 12px rgba(94,195,232,0.4)' : 'none',
                }}
              >
                {i + 1}
              </div>
              <span className="text-[9px] font-mono text-muted-foreground">{node}</span>
            </div>
            {i < nodes.length - 1 && (
              <div className="flex-1 h-0.5 bg-muted mx-1 overflow-hidden rounded-full">
                <div
                  className="h-full bg-gradient-brand rounded-full"
                  style={{ width: `${lineProgress[i]}%`, transition: 'width 0.02s linear' }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ─── Certificate Mockup ───────────────────────────────────────────────────────
function CertificateMockup({ active }: { active: boolean }) {
  const [shinePos, setShinePos] = useState(-100);

  useEffect(() => {
    if (!active) { setShinePos(-100); return; }
    const timer = setTimeout(() => {
      setShinePos(200);
    }, 500);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div
      className="relative bg-[#0D0E14] rounded-xl p-4 border border-border overflow-hidden"
      style={{ opacity: active ? 1 : 0.6, transition: 'opacity 0.5s ease' }}
    >
      {/* Shine sweep */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
          transform: `translateX(${shinePos}%)`,
          transition: active ? 'transform 0.8s ease-out 0.5s' : 'none',
        }}
      />
      <div className="border border-border/50 rounded-lg p-3 text-center">
        <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Certificate of Completion</p>
        <p className="text-[11px] font-bold text-foreground mb-1">IELTS Preparation Course</p>
        <div className="flex justify-center gap-0.5 mb-1">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="text-[#F5C77E] text-xs"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? 'scale(1)' : 'scale(0)',
                transition: `opacity 0.3s ease ${i * 50 + 600}ms, transform 0.3s cubic-bezier(0.34,1.56,0.64,1) ${i * 50 + 600}ms`,
              }}
            >
              ★
            </span>
          ))}
        </div>
        <p className="text-[9px] text-muted-foreground">Uniq Turn Education &amp; Skills Hub</p>
        <p className="text-[9px] text-muted-foreground">Sundhara, Kathmandu</p>
      </div>
    </div>
  );
}

const mockups = [
  { title: 'Video Editing', caption: 'A professional edit assembled by a beginner batch', component: VideoTimelineMockup },
  { title: 'Social Ad Campaign', caption: 'A live ad created in Digital Marketing class', component: SocialAdMockup },
  { title: 'AI Workflow', caption: 'An automation built in the AI Tools course', component: AIWorkflowMockup },
  { title: 'Language Certificate', caption: 'IELTS prep certificate earned after 3 months', component: CertificateMockup },
];

export default function OutcomesSection() {
  const { ref, visible } = useScrollReveal();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCards, setActiveCards] = useState<boolean[]>([false, false, false, false]);
  const loopTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!visible) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setActiveCards([true, true, true, true]); return; }

    const observers = cardRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          const startLoop = () => {
            setActiveCards((prev) => { const next = [...prev]; next[i] = true; return next; });
            loopTimers.current[i] = setTimeout(() => {
              setActiveCards((prev) => { const next = [...prev]; next[i] = false; return next; });
              setTimeout(() => startLoop(), 500);
            }, 7000);
          };
          startLoop();
        } else {
          setActiveCards((prev) => { const next = [...prev]; next[i] = false; return next; });
          clearTimeout(loopTimers.current[i]);
        }
      }, { threshold: 0.3 });
      obs.observe(el);
      return obs;
    });

    return () => {
      observers.forEach((obs) => obs?.disconnect());
      loopTimers.current.forEach((t) => clearTimeout(t));
    };
  }, [visible]);

  return (
    <section id="outcomes" className="py-24 px-6 bg-card/30">
      <div ref={ref} className="max-w-[1280px] mx-auto">
        <div
          className="text-center mb-4"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-8px)', transition: 'opacity 0.5s ease-out, transform 0.5s ease-out' }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border text-xs font-mono font-semibold text-muted-foreground">
            <span style={{ display: 'inline-block', animation: visible ? 'emojiPop 0.5s ease-out 0.2s both' : 'none' }}>🎯</span>
            REAL OUTCOMES
          </span>
        </div>
        <div className="text-center mb-12">
          <h2 className="section-headline">
            <CharReveal
              text="Not theory."
              className="block text-foreground"
              delay={100}
              stagger={28}
            />
            <CharReveal
              text="Things you can show."
              className="block"
              isGradient
              delay={200}
              stagger={24}
            />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockups.map((mockup, i) => {
            const MockupComponent = mockup.component;
            return (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="bg-card border border-border rounded-2xl p-5 feature-card-hover"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease-out ${i * 100}ms, transform 0.5s ease-out ${i * 100}ms`,
                }}
              >
                <MockupComponent active={activeCards[i]} />
                <div className="mt-4">
                  <h3 className="font-bold text-foreground text-sm mb-1">{mockup.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{mockup.caption}</p>
                </div>
              </div>
            );
          })}
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