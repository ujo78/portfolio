import { useRef } from 'react';
import { useInViewport } from './useInViewport';

/**
 * Reveal-on-scroll helper. Owns an element ref and reports when that element
 * has scrolled into view (once — it unobserves after the first intersection).
 *
 * The `rootMargin` default fires the reveal slightly before the element is
 * fully on screen so the motion reads as "already happening" as it enters.
 *
 * @param {Object} [options]
 * @param {string} [options.rootMargin='0px 0px -10% 0px']
 * @returns {{ ref: import('react').RefObject, visible: boolean }}
 */
export function useScrollReveal({ rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null);
  const visible = useInViewport(ref, true, { rootMargin });

  return { ref, visible };
}
