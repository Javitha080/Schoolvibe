import { useRef, useEffect } from 'react';
// Use the globally available anime.js library from CDN
declare const anime: any;

// Define types for TypeScript
type AnimeParams = any;
type AnimeInstance = any;

/**
 * Custom hook for using anime.js with React
 * @param animationParams The anime.js animation parameters
 * @param dependencies Array of dependencies to trigger animation changes
 * @returns Reference to attach to target element(s) and the anime instance
 */
export function useAnime<T extends HTMLElement>(
  animationParams: AnimeParams,
  dependencies: any[] = []
) {
  const targetRef = useRef<T | null>(null);
  const animeInstanceRef = useRef<AnimeInstance | null>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    // If we have a previous animation, pause it
    if (animeInstanceRef.current) {
      animeInstanceRef.current.pause();
    }

    // Create a new animation with the target element
    const params = { ...animationParams, targets: targetRef.current };
    animeInstanceRef.current = anime(params);

    return () => {
      if (animeInstanceRef.current) {
        animeInstanceRef.current.pause();
        animeInstanceRef.current = null;
      }
    };
  }, dependencies);

  return { targetRef, animeInstance: animeInstanceRef.current };
}

/**
 * Creates a staggered animation with anime.js for a group of elements
 * @param selector CSS selector for the elements to animate
 * @param animationParams Animation parameters
 * @param staggerDelay Delay between each element animation
 * @param autoplay Whether to play animation immediately
 * @returns anime instance
 */
export function createStaggerAnimation(
  selector: string,
  animationParams: AnimeParams,
  staggerDelay: number = 50,
  autoplay: boolean = true
): AnimeInstance {
  const animation = anime({
    targets: selector,
    ...animationParams,
    delay: anime.stagger(staggerDelay),
    autoplay
  });

  return animation;
}

/**
 * Creates a timeline animation with anime.js
 * @param timelineParams Parameters for the timeline
 * @returns Anime timeline instance
 */
export function createAnimeTimeline(timelineParams?: any): any {
  return anime.timeline(timelineParams);
}

/**
 * Creates a path drawing animation with anime.js
 * @param selector CSS selector for SVG path(s)
 * @param duration Animation duration in milliseconds
 * @param easing Easing function
 * @param delay Delay before animation starts
 * @returns anime instance
 */
export function createPathAnimation(
  selector: string,
  duration: number = 2000,
  easing: string = 'easeInOutSine',
  delay: number = 0
): AnimeInstance {
  return anime({
    targets: selector,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing,
    duration,
    delay,
    direction: 'normal',
    loop: false
  });
}

/**
 * Creates a text animation where each character animates individually
 * @param selector CSS selector for the text element
 * @param animationParams Animation parameters
 * @param staggerDelay Delay between each character animation
 * @returns anime instance
 */
export function createTextAnimation(
  selector: string,
  animationParams: AnimeParams,
  staggerDelay: number = 30
): AnimeInstance {
  // First, wrap each character in a span
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(el => {
    const text = el.textContent || '';
    el.innerHTML = text.split('').map(char => {
      if (char === ' ') {
        return '<span>&nbsp;</span>';
      }
      return `<span>${char}</span>`;
    }).join('');
  });

  // Then animate each span
  return anime({
    targets: `${selector} span`,
    ...animationParams,
    delay: anime.stagger(staggerDelay),
    loop: false
  });
}

/**
 * Creates loading animation with customizable parameters
 * @param selector CSS selector for loading element
 * @param animationParams Animation parameters
 * @returns anime instance
 */
export function createLoadingAnimation(
  selector: string,
  animationParams?: AnimeParams
): AnimeInstance {
  return anime({
    targets: selector,
    opacity: [0, 1],
    translateY: [10, 0],
    easing: 'easeOutExpo',
    duration: 600,
    delay: anime.stagger(100),
    loop: false,
    ...animationParams
  });
}

/**
 * Animates numbers counting up or down with smooth animation
 * @param selector CSS selector for number element
 * @param startValue Start value 
 * @param endValue End value
 * @param duration Duration in milliseconds
 * @param round Whether to round the number during animation
 * @returns anime instance
 */
export function createNumberAnimation(
  selector: string,
  startValue: number,
  endValue: number,
  duration: number = 2000,
  round: boolean = true
): AnimeInstance {
  return anime({
    targets: selector,
    innerHTML: [startValue, endValue],
    easing: 'easeInOutExpo',
    duration,
    round
  });
}

/**
 * Creates a reveal animation for skeleton elements
 * @param selector CSS selector for skeleton elements
 * @param duration Duration in milliseconds
 * @param delay Delay in milliseconds
 * @returns anime instance
 */
export function createSkeletonRevealAnimation(
  selector: string,
  duration: number = 800,
  delay: number = 0
): AnimeInstance {
  return anime({
    targets: selector,
    opacity: [1, 0],
    translateY: [0, -10],
    easing: 'easeInOutQuad',
    duration,
    delay: anime.stagger(100, { start: delay }),
    complete: (anim: any) => {
      // Remove skeleton elements after animation
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.parentNode?.removeChild(el);
      });
    }
  });
}