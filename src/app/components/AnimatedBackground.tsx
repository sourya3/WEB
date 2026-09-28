'use client';

import React, { useEffect, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  baseOpacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
  twinkle: boolean;
  layer: 0 | 1 | 2;
  dvx: number;
  dvy: number;
  colorR: number;
  colorG: number;
  colorB: number;
  isFeature: boolean;
  glowRadius: number;
}

interface Nebula {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  color: [number, number, number];
  alpha: number;
  driftAngle: number;
  driftSpeed: number;
  driftRadius: number;
  morphPhase: number;
  morphSpeed: number;
  originX: number;
  originY: number;
}

interface ShootingStar {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  life: number;
  decay: number;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches
      || window.innerWidth < 768;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string; downlink?: number };
    };
    const conn = nav.connection;
    const isLowBandwidth = !!(
      conn?.saveData ||
      conn?.effectiveType === 'slow-2g' ||
      conn?.effectiveType === '2g' ||
      (conn?.downlink !== undefined && conn.downlink < 1.5)
    );

    let W = 0, H = 0;
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    let scrollProgress = 0;
    let mouseX = -9999, mouseY = -9999;
    let tabVisible = true;
    let lastTime = 0;

    let scrollTicking = false;
    const onScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;
        scrollTicking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const enableCursor = !isMobile && !isLowBandwidth;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    if (enableCursor) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
    }

    const onVisibility = () => {
      tabVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibility);

    const assignStarColor = (): { r: number; g: number; b: number } => {
      const roll = Math.random();
      if (roll < 0.70) {
        const t = Math.random();
        return { r: Math.round(200 + t * 55), g: Math.round(210 + t * 45), b: 255 };
      } else if (roll < 0.90) {
        const t = Math.random();
        return { r: 255, g: Math.round(220 + t * 35), b: Math.round(140 + t * 80) };
      } else {
        const t = Math.random();
        return { r: 255, g: Math.round(100 + t * 80), b: Math.round(60 + t * 60) };
      }
    };

    // Slightly reduced star count for minimalist direction
    const starCount = isLowBandwidth ? 0 : isMobile ? 65 : 180;
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      const layer = (i % 3) as 0 | 1 | 2;
      const speedScale = layer === 0 ? 0.026 : layer === 1 ? 0.058 : 0.104;
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 0.5 + 0.5) * speedScale;
      const isTwinkle = Math.random() < 0.15; // slightly fewer twinkling stars
      const isFeature = Math.random() < 0.10; // slightly fewer feature stars
      let r: number;
      if (isFeature) {
        r = 2.8 + Math.random() * 0.9;
      } else {
        r = layer === 0
          ? 0.6 + Math.random() * 0.6
          : layer === 1
          ? 0.8 + Math.random() * 0.8
          : 1.0 + Math.random() * 1.0;
      }
      const { r: cr, g: cg, b: cb } = assignStarColor();

      const inTopBand = i % 4 === 0;
      const yPos = inTopBand
        ? Math.random() * 100
        : 100 + Math.random() * (window.innerHeight - 100);

      stars.push({
        x: Math.random() * window.innerWidth,
        y: yPos,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r,
        baseOpacity: inTopBand
          ? (layer === 0 ? Math.random() * 0.35 + 0.25
            : layer === 1 ? Math.random() * 0.40 + 0.35
            : Math.random() * 0.45 + 0.45)
          : (layer === 0 ? Math.random() * 0.28 + 0.12
            : layer === 1 ? Math.random() * 0.30 + 0.20
            : Math.random() * 0.35 + 0.28),
        twinkle: isTwinkle,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: (Math.PI * 2) / ((5000 + Math.random() * 3000)),
        layer,
        dvx: 0,
        dvy: 0,
        colorR: cr,
        colorG: cg,
        colorB: cb,
        isFeature,
        glowRadius: isFeature
          ? r * (3.5 + Math.random() * 1.5)
          : r * (2.0 + Math.random() * 1.0),
      });
    }

    // Top-band feature stars for nav blur visibility
    const topBandExtras = isLowBandwidth ? 0 : isMobile ? 3 : 8;
    for (let i = 0; i < topBandExtras; i++) {
      const layer = (i % 3) as 0 | 1 | 2;
      const speedScale = layer === 0 ? 0.026 : layer === 1 ? 0.058 : 0.104;
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 0.5 + 0.5) * speedScale;
      let r = 2.5 + Math.random() * 1.5;
      const { r: cr, g: cg, b: cb } = assignStarColor();
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * 95,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r,
        baseOpacity: 0.50 + Math.random() * 0.35,
        twinkle: true,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: (Math.PI * 2) / ((5000 + Math.random() * 3000)),
        layer,
        dvx: 0,
        dvy: 0,
        colorR: cr,
        colorG: cg,
        colorB: cb,
        isFeature: true,
        glowRadius: r * (3.5 + Math.random() * 1.5),
      });
    }

    // ── Build Nebula Clouds — REDUCED opacity for minimalist direction ─────────
    const nebulaCount = isLowBandwidth ? 0 : isMobile ? 2 : 3; // reduced from 4 to 3
    const nebulaColors: [number, number, number][] = [
      [94, 195, 232],
      [127, 232, 196],
      [123, 110, 246],
      [99, 160, 240],
    ];
    const nebulae: Nebula[] = [];
    for (let i = 0; i < nebulaCount; i++) {
      const color = nebulaColors[i % nebulaColors.length];
      const ox = (i === 0 ? 0.15 : i === 1 ? 0.75 : 0.45);
      const oy = (i === 0 ? 0.15 : i === 1 ? 0.55 : 0.80);
      nebulae.push({
        cx: ox,
        cy: oy,
        rx: isMobile ? 180 : 280 + Math.random() * 70,
        ry: isMobile ? 160 : 240 + Math.random() * 70,
        color,
        // REDUCED: 5-9% opacity range (was 8-15%) — reads as atmosphere, not foreground
        alpha: 0.05 + Math.random() * 0.04,
        driftAngle: Math.random() * Math.PI * 2,
        driftSpeed: (Math.PI * 2) / (90000 + Math.random() * 30000),
        driftRadius: isMobile ? 35 : 65 + Math.random() * 35,
        morphPhase: Math.random() * Math.PI * 2,
        morphSpeed: (Math.PI * 2) / (90000 + Math.random() * 30000),
        originX: ox,
        originY: oy,
      });
    }

    // ── Shooting Star — REDUCED frequency for minimalist direction ────────────
    const shootingStar: ShootingStar = {
      active: false,
      x: 0, y: 0, vx: 0, vy: 0,
      length: 0, life: 0, decay: 0,
    };
    // Increased interval: 30-45s (was 20-30s) — fewer simultaneous distractions
    let nextShootingStarIn = 30000 + Math.random() * 15000;
    let timeSinceLastShoot = 0;

    const spawnShootingStar = () => {
      const angle = Math.PI * (0.6 + Math.random() * 0.3);
      const speed = 0.4 + Math.random() * 0.3;
      shootingStar.active = true;
      shootingStar.x = W * (0.3 + Math.random() * 0.6);
      shootingStar.y = H * (0.05 + Math.random() * 0.2);
      shootingStar.vx = Math.cos(angle) * speed;
      shootingStar.vy = Math.sin(angle) * speed;
      shootingStar.length = 70 + Math.random() * 50; // slightly shorter
      shootingStar.life = 1.0;
      shootingStar.decay = 1 / (600 + Math.random() * 400);
    };

    const drawNebula = (n: Nebula, scrollProg: number) => {
      const px = n.cx * W + Math.cos(n.driftAngle) * n.driftRadius;
      const py = n.cy * H + Math.sin(n.driftAngle) * n.driftRadius;

      const blueBoost = (1 - scrollProg) * 0.010;
      const mintBoost = scrollProg * 0.010;
      const [r, g, b] = n.color;
      let alpha = n.alpha + (r > 150 ? blueBoost : mintBoost);

      const morphScale = 1 + Math.sin(n.morphPhase) * 0.10;
      const rx = n.rx * morphScale;
      const ry = n.ry * (2 - morphScale);

      ctx.save();
      ctx.filter = 'blur(60px)';

      const layers = [
        { offX: 0, offY: 0, scaleX: 1.0, scaleY: 1.0, alphaFactor: 1.0 },
        { offX: rx * 0.18, offY: ry * -0.12, scaleX: 0.75, scaleY: 0.65, alphaFactor: 0.55 },
        { offX: rx * -0.15, offY: ry * 0.20, scaleX: 0.60, scaleY: 0.70, alphaFactor: 0.45 },
      ];

      for (const layer of layers) {
        const lx = px + layer.offX;
        const ly = py + layer.offY;
        const lrx = rx * layer.scaleX;
        const lry = ry * layer.scaleY;
        const la = alpha * layer.alphaFactor;

        const grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, Math.max(lrx, lry));
        grad.addColorStop(0, `rgba(${r},${g},${b},${(la * 0.85).toFixed(4)})`);
        grad.addColorStop(0.4, `rgba(${r},${g},${b},${(la * 0.45).toFixed(4)})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.ellipse(lx, ly, lrx, lry, 0, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      ctx.filter = 'none';
      ctx.restore();
    };

    const drawStar = (s: Star, alpha: number) => {
      const { x, y, r, colorR: cr, colorG: cg, colorB: cb, glowRadius } = s;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
      grad.addColorStop(0,   `rgba(${cr},${cg},${cb},${alpha.toFixed(3)})`);
      grad.addColorStop(r / glowRadius, `rgba(${cr},${cg},${cb},${(alpha * 0.85).toFixed(3)})`);
      grad.addColorStop(Math.min(1, (r * 2) / glowRadius), `rgba(${cr},${cg},${cb},${(alpha * 0.3).toFixed(3)})`);
      grad.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`);
      ctx.beginPath();
      ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    };

    const drawDotGrid = () => {
      const spacing = 28;
      const dotR = 0.7;
      ctx.fillStyle = 'rgba(94,195,232,0.08)';
      for (let x = 0; x < W; x += spacing) {
        for (let y = 0; y < H; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotR, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawPlanet = () => {
      const planetR = isMobile ? 120 : 200;
      const px = W + planetR * 0.35;
      const py = H - planetR * 0.35;

      ctx.save();

      const bodyGrad = ctx.createRadialGradient(
        px - planetR * 0.2, py - planetR * 0.2, planetR * 0.1,
        px, py, planetR
      );
      bodyGrad.addColorStop(0, 'rgba(30, 35, 55, 0.85)');
      bodyGrad.addColorStop(0.6, 'rgba(15, 18, 35, 0.90)');
      bodyGrad.addColorStop(1, 'rgba(8, 10, 20, 0.95)');

      ctx.beginPath();
      ctx.arc(px, py, planetR, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      const rimOffsetX = -planetR * 0.08;
      const rimOffsetY = -planetR * 0.08;
      const rimGrad = ctx.createRadialGradient(
        px + rimOffsetX, py + rimOffsetY, planetR * 0.82,
        px + rimOffsetX, py + rimOffsetY, planetR * 1.02
      );
      rimGrad.addColorStop(0, 'rgba(94, 195, 232, 0)');
      rimGrad.addColorStop(0.5, 'rgba(94, 195, 232, 0.15)');
      rimGrad.addColorStop(0.8, 'rgba(127, 232, 196, 0.10)');
      rimGrad.addColorStop(1, 'rgba(94, 195, 232, 0)');

      ctx.beginPath();
      ctx.arc(px + rimOffsetX, py + rimOffsetY, planetR, 0, Math.PI * 2);
      ctx.fillStyle = rimGrad;
      ctx.fill();

      const atmosGrad = ctx.createRadialGradient(px, py, planetR * 0.9, px, py, planetR * 1.3);
      atmosGrad.addColorStop(0, 'rgba(94, 195, 232, 0.05)');
      atmosGrad.addColorStop(0.5, 'rgba(94, 195, 232, 0.02)');
      atmosGrad.addColorStop(1, 'rgba(94, 195, 232, 0)');

      ctx.beginPath();
      ctx.arc(px, py, planetR * 1.3, 0, Math.PI * 2);
      ctx.fillStyle = atmosGrad;
      ctx.fill();

      ctx.restore();
    };

    if (prefersReduced) {
      ctx.clearRect(0, 0, W, H);
      for (const n of nebulae) drawNebula(n, 0);
      ctx.globalAlpha = 0.03;
      drawDotGrid();
      ctx.globalAlpha = 1;
      for (const s of stars) drawStar(s, s.baseOpacity);
      drawPlanet();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      return;
    }

    const CURSOR_RADIUS = 150;
    const CURSOR_BOOST = 0.5;
    const CURSOR_DRIFT_BOOST = 0.003;

    const draw = (timestamp: number) => {
      rafRef.current = requestAnimationFrame(draw);
      if (!tabVisible) return;

      const dt = lastTime === 0 ? 16 : Math.min(timestamp - lastTime, 50);
      lastTime = timestamp;

      ctx.clearRect(0, 0, W, H);

      for (const n of nebulae) {
        n.driftAngle += n.driftSpeed * dt;
        n.morphPhase += n.morphSpeed * dt;
        drawNebula(n, scrollProgress);
      }

      ctx.save();
      ctx.globalAlpha = 0.03;
      drawDotGrid();
      ctx.restore();

      for (const s of stars) {
        if (enableCursor) {
          const dx = s.x - mouseX;
          const dy = s.y - mouseY;
          const distSq = dx * dx + dy * dy;
          const radiusSq = CURSOR_RADIUS * CURSOR_RADIUS;
          if (distSq < radiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const strength = (1 - dist / CURSOR_RADIUS) * CURSOR_BOOST;
            s.dvx += (dx / dist) * strength * CURSOR_DRIFT_BOOST * dt;
            s.dvy += (dy / dist) * strength * CURSOR_DRIFT_BOOST * dt;
          }
        }

        const decay = Math.pow(0.94, dt / 16);
        s.dvx *= decay;
        s.dvy *= decay;

        s.x += (s.vx + s.dvx) * dt;
        s.y += (s.vy + s.dvy) * dt;

        if (s.x < -s.glowRadius) s.x = W + s.glowRadius;
        else if (s.x > W + s.glowRadius) s.x = -s.glowRadius;
        if (s.y < -s.glowRadius) s.y = H + s.glowRadius;
        else if (s.y > H + s.glowRadius) s.y = -s.glowRadius;

        let alpha = s.baseOpacity;
        if (s.twinkle) {
          s.twinklePhase += s.twinkleSpeed * dt;
          const t = (Math.sin(s.twinklePhase) + 1) / 2;
          alpha = 0.4 + t * 0.6;
        }

        if (enableCursor) {
          const dx = s.x - mouseX;
          const dy = s.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_RADIUS) {
            alpha = Math.min(1, alpha + (1 - dist / CURSOR_RADIUS) * 0.5);
          }
        }

        drawStar(s, alpha);
      }

      timeSinceLastShoot += dt;
      if (!shootingStar.active && timeSinceLastShoot >= nextShootingStarIn) {
        spawnShootingStar();
        timeSinceLastShoot = 0;
        nextShootingStarIn = 30000 + Math.random() * 15000;
      }

      if (shootingStar.active) {
        shootingStar.life -= shootingStar.decay * dt;
        if (shootingStar.life <= 0) {
          shootingStar.active = false;
        } else {
          shootingStar.x += shootingStar.vx * dt;
          shootingStar.y += shootingStar.vy * dt;

          const speed = Math.sqrt(shootingStar.vx ** 2 + shootingStar.vy ** 2);
          const normVx = shootingStar.vx / (speed || 1);
          const normVy = shootingStar.vy / (speed || 1);
          const tailEndX = shootingStar.x - normVx * shootingStar.length;
          const tailEndY = shootingStar.y - normVy * shootingStar.length;

          const grad = ctx.createLinearGradient(
            shootingStar.x, shootingStar.y,
            tailEndX, tailEndY
          );
          grad.addColorStop(0, `rgba(255,255,255,${(shootingStar.life * 0.85).toFixed(3)})`);
          grad.addColorStop(0.3, `rgba(180,230,255,${(shootingStar.life * 0.45).toFixed(3)})`);
          grad.addColorStop(1, 'rgba(94,195,232,0)');

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(tailEndX, tailEndY);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5 * shootingStar.life;
          ctx.lineCap = 'round';
          ctx.stroke();
          ctx.restore();
        }
      }

      drawPlanet();
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      if (enableCursor) window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
