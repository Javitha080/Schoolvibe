import React, { useEffect, useRef, useState } from 'react';
import { SCHOOL_NAME } from '@/lib/constants';
// Use the globally available anime.js library from CDN
declare const anime: any;
import { useTheme } from '@/hooks/use-theme';
import SchoolLogoSrc from '@/assets/images/school-logo.png';

interface LoadingScreenProps {
  onComplete?: () => void;
  minDuration?: number;
  showLogo?: boolean;
  showText?: boolean;
  variant?: 'minimal' | 'standard' | 'elaborate';
}

export default function LoadingScreen({
  onComplete,
  minDuration = 2000,
  showLogo = true,
  showText = true,
  variant = 'standard'
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  // Simulate loading progress
  useEffect(() => {
    const startTime = Date.now();
    let animationFrame: number;
    
    const updateProgress = () => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min(100, (elapsedTime / minDuration) * 100);
      setProgress(newProgress);
      
      if (newProgress < 100) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsComplete(true);
          if (onComplete) onComplete();
        }, 500); // Delay before completing
      }
    };
    
    animationFrame = requestAnimationFrame(updateProgress);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [minDuration, onComplete]);
  
  // Apply anime.js animations
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup initial animations
    const timeline = anime.timeline({
      easing: 'easeInOutQuad',
      duration: 800
    });
    
    if (showLogo && containerRef.current) {
      const logoElement = containerRef.current.querySelector('.logo-element');
      
      timeline.add({
        targets: logoElement,
        scale: [0.5, 1],
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutElastic(1, .5)'
      });
    }
    
    if (showText && textRef.current) {
      timeline.add({
        targets: textRef.current.querySelectorAll('.text-animate'),
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(150),
        easing: 'easeOutQuad'
      }, '-=800');
    }
    
    // Progress bar animation
    if (loaderRef.current) {
      anime({
        targets: '.progress-dot',
        translateY: function() {
          return anime.random(-12, 12);
        },
        translateX: function() {
          return anime.random(-12, 12);
        },
        scale: function() {
          return anime.random(0.8, 1.5);
        },
        duration: function() {
          return anime.random(800, 1600);
        },
        easing: 'easeInOutQuad',
        complete: function(anim: any) {
          anim.restart();
        },
        delay: anime.stagger(100)
      });
    }
    
    // Exit animation
    if (isComplete && containerRef.current) {
      anime({
        targets: containerRef.current,
        opacity: [1, 0],
        duration: 500,
        easing: 'easeInOutQuad'
      });
    }
  }, [showLogo, showText, isComplete]);
  
  // Different variants
  let loadingIndicator;
  
  switch(variant) {
    case 'minimal':
      loadingIndicator = (
        <div className="w-full max-w-[140px] h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      );
      break;
      
    case 'elaborate':
      loadingIndicator = (
        <div className="relative w-32 h-32" ref={loaderRef}>
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              className="text-gray-200 dark:text-gray-800 stroke-current"
              strokeWidth="4"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
            />
            <circle 
              className="text-primary stroke-current progress-circle"
              strokeWidth="4"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
              strokeDasharray="264"
              strokeDashoffset={264 - (progress / 100) * 264}
              strokeLinecap="round"
            />
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
            {Math.round(progress)}%
          </div>
          
          {/* Animated dots */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="progress-dot absolute w-2 h-2 bg-primary rounded-full opacity-50"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ))}
          </div>
        </div>
      );
      break;
      
    default: // standard
      loadingIndicator = (
        <div className="w-full max-w-[240px]" ref={loaderRef}>
          <div className="flex justify-between mb-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Loading...</span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      );
  }
  
  if (isComplete) return null;
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-opacity duration-500"
    >
      {showLogo && (
        <div className="logo-element mb-8 transform-gpu">
          <img 
            src={SchoolLogoSrc} 
            alt={SCHOOL_NAME} 
            className={`w-24 h-24 ${theme === 'dark' ? 'filter-invert' : ''}`}
          />
        </div>
      )}
      
      {showText && (
        <div ref={textRef} className="mb-6 text-center">
          <h1 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            <span className="text-animate inline-block">{SCHOOL_NAME}</span>
          </h1>
          <p className="text-animate text-gray-600 dark:text-gray-300">
            <span className="text-animate inline-block">Preparing your experience</span>
          </p>
        </div>
      )}
      
      {loadingIndicator}
    </div>
  );
}