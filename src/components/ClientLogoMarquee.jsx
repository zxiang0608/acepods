import React, { useEffect, useRef } from 'react';

// Same speed as the original CSS marquee: 4 seconds per logo for one full loop.
const SECONDS_PER_LOGO = 4;
// After a drag, swipe, wheel or keyboard scroll, wait this long before auto-scrolling again.
const RESUME_DELAY_MS = 1500;

/**
 * Auto-scrolling client logo strip that visitors can also move themselves:
 * drag with the mouse, swipe with a finger, scroll with a trackpad or arrow keys.
 * The logo list is rendered twice and the scroll position wraps, so it loops forever.
 */
export default function ClientLogoMarquee({ logos, label = 'Client logos' }) {
  const scrollerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const el = scrollerRef.current;
    const track = trackRef.current;
    if (!el || !track) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pos = el.scrollLeft;
    let lastSet = pos;
    let lastUserAt = 0;
    let lastTime = performance.now();
    let hovering = false;
    let touching = false;
    let drag = null;
    let frame = 0;

    // One loop = distance from the first logo to the same logo in the second copy (includes the gap).
    const loopWidth = () => {
      const second = track.children[logos.length];
      return second ? second.offsetLeft - track.children[0].offsetLeft : 0;
    };
    const wrap = (value, half) => ((value % half) + half) % half;

    const tick = (now) => {
      const dt = Math.min(now - lastTime, 100);
      lastTime = now;
      const half = loopWidth();

      // Any change we did not make ourselves (swipe momentum, trackpad, keyboard) counts as the visitor scrolling.
      if (Math.abs(el.scrollLeft - lastSet) > 1) {
        pos = el.scrollLeft;
        lastUserAt = now;
      }

      const idle = !drag && !hovering && !touching && now - lastUserAt > RESUME_DELAY_MS;
      if (idle && !reduceMotion && half > el.clientWidth) {
        pos += (half / (logos.length * SECONDS_PER_LOGO)) * (dt / 1000);
      }

      if (half > 0) pos = wrap(pos, half);
      if (Math.abs(el.scrollLeft - pos) > 0.5) el.scrollLeft = pos;
      lastSet = el.scrollLeft;
      frame = requestAnimationFrame(tick);
    };

    const onPointerDown = (event) => {
      if (event.pointerType === 'mouse') {
        if (event.button !== 0) return;
        drag = { startX: event.clientX, startPos: pos };
        el.setPointerCapture(event.pointerId);
        el.classList.add('is-dragging');
      } else {
        touching = true;
        lastUserAt = performance.now();
      }
    };

    const onPointerMove = (event) => {
      if (!drag) return;
      pos = drag.startPos - (event.clientX - drag.startX);
      lastUserAt = performance.now();
    };

    const onPointerEnd = () => {
      touching = false;
      lastUserAt = performance.now();
      if (!drag) return;
      drag = null;
      el.classList.remove('is-dragging');
    };

    const onPointerEnter = (event) => {
      if (event.pointerType === 'mouse') hovering = true;
    };

    const onPointerLeave = (event) => {
      if (event.pointerType === 'mouse') hovering = false;
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerEnd);
    el.addEventListener('pointercancel', onPointerEnd);
    el.addEventListener('pointerenter', onPointerEnter);
    el.addEventListener('pointerleave', onPointerLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerEnd);
      el.removeEventListener('pointercancel', onPointerEnd);
      el.removeEventListener('pointerenter', onPointerEnter);
      el.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [logos.length]);

  const renderSet = (copy) =>
    logos.map((logo) => (
      <div
        key={`${logo.name}-${copy}`}
        aria-hidden={copy === 1 ? 'true' : undefined}
        className="logo-marquee-card flex min-h-[88px] min-w-[170px] shrink-0 items-center justify-center rounded-[6px] border border-[#e8e8e8] bg-[#f7f6f2] px-4 md:min-h-[98px] md:min-w-[210px] md:px-5"
      >
        <div className={`flex h-[60px] w-full items-center justify-center overflow-hidden md:h-[64px] ${logo.logoStageClass || ''}`}>
          <img
            src={logo.image}
            alt={copy === 1 ? '' : logo.name}
            width="210"
            height="64"
            draggable="false"
            className={`logo-marquee-img h-full w-full object-contain ${logo.fitClass || ''}`}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    ));

  return (
    <div
      ref={scrollerRef}
      role="region"
      aria-label={label}
      tabIndex={0}
      className="logo-marquee px-5 pb-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#145b5f]"
    >
      <div ref={trackRef} className="flex w-max gap-3 md:gap-4">
        {renderSet(0)}
        {renderSet(1)}
      </div>
    </div>
  );
}
