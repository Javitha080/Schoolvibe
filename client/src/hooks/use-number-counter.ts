import { useState, useEffect, useRef } from 'react';

interface NumberCounterOptions {
  startValue?: number;
  duration?: number;
  easing?: (t: number) => number;
  delay?: number;
  formatter?: (value: number) => string;
}

/**
 * A hook for animated number counting
 */
export function useNumberCounter(
  endValue: number,
  options: NumberCounterOptions = {}
) {
  const {
    startValue = 0,
    duration = 2000,
    easing = t => t, // Linear easing by default
    delay = 0,
    formatter = (value: number) => Math.round(value).toLocaleString()
  } = options;

  const [displayValue, setDisplayValue] = useState(formatter(startValue));
  const [isAnimating, setIsAnimating] = useState(false);
  const valueRef = useRef(startValue);
  const startTimeRef = useRef(0);
  const frameRef = useRef(0);

  // Reset animation when endValue changes
  useEffect(() => {
    if (isAnimating) {
      cancelAnimationFrame(frameRef.current);
    }
    
    setIsAnimating(false);
    const timeoutId = setTimeout(() => {
      setIsAnimating(true);
      startTimeRef.current = performance.now();
      valueRef.current = startValue;
      frameRef.current = requestAnimationFrame(animate);
    }, delay);
    
    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameRef.current);
    };
  }, [endValue, delay, startValue]);

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }
    
    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easing(progress);
    
    valueRef.current = startValue + (endValue - startValue) * easedProgress;
    setDisplayValue(formatter(valueRef.current));
    
    if (progress < 1) {
      frameRef.current = requestAnimationFrame(animate);
    } else {
      setIsAnimating(false);
    }
  };

  return displayValue;
}

// Easing functions
export const easings = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
};
