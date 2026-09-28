'use client';

import { useEffect, useState } from 'react';

export interface DeviceCapabilities {
  /** True on touch/mobile devices (hover: none) */
  isMobile: boolean;
  /** True when navigator.connection reports slow/save-data or is 2G/slow-2g */
  isLowBandwidth: boolean;
  /** True when prefers-reduced-motion is set */
  prefersReducedMotion: boolean;
  /** Recommended particle count based on device capability */
  particleCount: number;
  /** Whether cursor-tracking / mouse-reactive effects should run */
  enableCursorTracking: boolean;
  /** Whether high-motion animations (mesh drift, ticker, etc.) should run at full rate */
  enableHighMotion: boolean;
}

/**
 * Detects device capabilities to allow adaptive animation behaviour:
 * - Reduces particle count on mobile / low-bandwidth
 * - Disables cursor-tracking on touch / low-bandwidth devices
 * - Lowers frame-rate-intensive animations on mobile
 */
export function useDeviceCapabilities(): DeviceCapabilities {
  const [caps, setCaps] = useState<DeviceCapabilities>({
    isMobile: false,
    isLowBandwidth: false,
    prefersReducedMotion: false,
    particleCount: 50,
    enableCursorTracking: true,
    enableHighMotion: true,
  });

  useEffect(() => {
    const isMobile = window.matchMedia('(hover: none)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check Network Information API for low-bandwidth detection
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const slowTypes = new Set(['slow-2g', '2g']);
    const isLowBandwidth =
      connection?.saveData === true ||
      slowTypes.has(connection?.effectiveType) ||
      (connection?.downlink !== undefined && connection.downlink < 1.5);

    // Particle count: full → mobile → low-bandwidth → reduced-motion
    let particleCount = 50;
    if (prefersReducedMotion) {
      particleCount = 0;
    } else if (isLowBandwidth) {
      particleCount = 0; // disable entirely on low-bandwidth
    } else if (isMobile) {
      particleCount = 20; // reduced count on mobile
    }

    const enableCursorTracking = !isMobile && !isLowBandwidth && !prefersReducedMotion;
    const enableHighMotion = !isMobile && !isLowBandwidth && !prefersReducedMotion;

    setCaps({
      isMobile,
      isLowBandwidth,
      prefersReducedMotion,
      particleCount,
      enableCursorTracking,
      enableHighMotion,
    });
  }, []);

  return caps;
}
