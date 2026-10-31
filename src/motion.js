import { useEffect, useLayoutEffect, useState } from 'react';

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** True once the page has scrolled a little (used to show the nav material's edge). */
export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

/**
 * Elements with class "reveal" ease in when they enter the screen.
 * Without IntersectionObserver, or with "reduce motion" on, everything is simply shown.
 */
export function useReveal(rootRef, deps = []) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const items = [...root.querySelectorAll('.reveal')];
    if (reducedMotion() || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in'));
      return undefined;
    }
    root.classList.add('motion');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    items.filter((el) => !el.classList.contains('in')).forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
