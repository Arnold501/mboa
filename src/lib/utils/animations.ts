// GSAP Animation Utilities for MBOA Sports
// All animations are registered as Svelte actions for easy reuse

import { browser } from '$app/environment';

// ─── Intersection Observer Reveal ──────────────────────────────────────────────
export function reveal(node: HTMLElement, options: { delay?: number; direction?: 'up' | 'left' | 'right' } = {}) {
  if (!browser) return;

  const { delay = 0, direction = 'up' } = options;

  const getTransform = () => {
    switch (direction) {
      case 'left': return 'translateX(-40px)';
      case 'right': return 'translateX(40px)';
      default: return 'translateY(40px)';
    }
  };

  node.style.opacity = '0';
  node.style.transform = getTransform();
  node.style.transition = `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          node.style.opacity = '1';
          node.style.transform = 'translate(0)';
          observer.unobserve(node);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}

// ─── Parallax scroll effect ────────────────────────────────────────────────────
export function parallax(node: HTMLElement, strength: number = 0.3) {
  if (!browser) return;

  let ticking = false;

  const update = () => {
    const rect = node.getBoundingClientRect();
    const scrolled = window.scrollY;
    const speed = (rect.top + scrolled) * strength;
    node.style.transform = `translateY(${speed * 0.1}px)`;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  return {
    destroy() {
      window.removeEventListener('scroll', onScroll);
    }
  };
}

// ─── Counter animation ─────────────────────────────────────────────────────────
export function countUp(node: HTMLElement, target: string) {
  if (!browser) return;

  const numericTarget = parseInt(target.replace(/\D/g, ''));
  const suffix = target.replace(/[\d]/g, '');
  let started = false;

  const animate = () => {
    const start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * numericTarget);
      node.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        animate();
        observer.disconnect();
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}

// ─── Cursor tracker ────────────────────────────────────────────────────────────
export function initCursor() {
  if (!browser) return;

  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;

  const onMouseMove = (e: MouseEvent) => {
    dotX = e.clientX;
    dotY = e.clientY;
  };

  window.addEventListener('mousemove', onMouseMove);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const loop = () => {
    ringX = lerp(ringX, dotX, 0.12);
    ringY = lerp(ringY, dotY, 0.12);
    dot.style.left = dotX + 'px';
    dot.style.top = dotY + 'px';
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(loop);
  };
  loop();

  // Hover effects
  const addHover = () => ring.style.transform = 'translate(-50%, -50%) scale(2)';
  const removeHover = () => ring.style.transform = 'translate(-50%, -50%) scale(1)';

  document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
    el.addEventListener('mouseenter', addHover);
    el.addEventListener('mouseleave', removeHover);
  });

  return () => {
    window.removeEventListener('mousemove', onMouseMove);
    dot.remove();
    ring.remove();
  };
}