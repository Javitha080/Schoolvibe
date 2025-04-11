import { useEffect, useRef } from 'react';

interface ScrollTriggerOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  onEnter?: () => void;
  onExit?: () => void;
}

export function useScrollTrigger<T extends HTMLElement>(options: ScrollTriggerOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    once = false,
    onEnter,
    onExit
  } = options;
  
  const ref = useRef<T>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (once && hasTriggeredRef.current) return;
            
            if (onEnter) onEnter();
            hasTriggeredRef.current = true;
          } else {
            if (onExit) onExit();
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, once, onEnter, onExit]);

  return ref;
}
