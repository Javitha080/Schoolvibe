import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to animate number counting
 * @param endValue The final value to count to
 * @param duration Duration of the animation in milliseconds
 * @param startDelay Delay before starting the animation in milliseconds
 * @returns The current animated value
 */
export function useCountUp(endValue: number, duration: number = 2000, startDelay: number = 0) {
  const [count, setCount] = useState(0);
  const countRef = useRef({ value: 0, rafId: 0 });
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (startTimeRef.current === null) {
          startTimeRef.current = timestamp;
        }

        const elapsedTime = timestamp - startTimeRef.current;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = Math.floor(progress * endValue);
        
        countRef.current.value = currentValue;
        setCount(currentValue);

        if (progress < 1) {
          countRef.current.rafId = requestAnimationFrame(animate);
        }
      };

      countRef.current.rafId = requestAnimationFrame(animate);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(countRef.current.rafId);
    };
  }, [endValue, duration, startDelay]);

  return count;
}

/**
 * Custom hook for typing animation effect
 * @param texts Array of strings to type
 * @param typeSpeed Speed of typing in milliseconds
 * @param deleteSpeed Speed of deleting in milliseconds
 * @param delayBetweenTexts Delay between typing different texts
 * @returns Current displayed text
 */
export function useTypingEffect(
  texts: string[],
  typeSpeed: number = 80,
  deleteSpeed: number = 50,
  delayBetweenTexts: number = 2000
) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  
  useEffect(() => {
    if (texts.length === 0) return;
    
    let timeout: NodeJS.Timeout;
    
    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, delayBetweenTexts);
      return () => clearTimeout(timeout);
    }
    
    const text = texts[currentIndex];
    
    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(text.substring(0, currentText.length - 1));
        }, deleteSpeed);
      }
    } else {
      if (currentText === text) {
        setIsWaiting(true);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(text.substring(0, currentText.length + 1));
        }, typeSpeed);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [texts, currentText, currentIndex, isDeleting, isWaiting, typeSpeed, deleteSpeed, delayBetweenTexts]);
  
  return currentText;
}

/**
 * Custom hook for parallax effect on scroll
 * @param intensity How strong the parallax effect should be (0-1)
 * @returns Ref to attach to the element and the current y offset
 */
export function useParallaxEffect(intensity: number = 0.5) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const handleScroll = () => {
      if (!ref.current) return;
      
      const elementTop = ref.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const relativePosition = elementTop / windowHeight;
      
      // Calculate parallax offset
      const newOffset = relativePosition * intensity * 100;
      setOffset(newOffset);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial calculation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [intensity]);

  return { ref, offset };
}
