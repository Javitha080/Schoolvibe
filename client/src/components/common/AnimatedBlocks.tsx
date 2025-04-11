import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';

// Using anime.js globally added from CDN
declare const anime: any;
declare const Velocity: any;

interface AnimatedBlocksProps {
  className?: string;
  count?: number;
}

export default function AnimatedBlocks({ 
  className = '',
  count = 12 
}: AnimatedBlocksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // Initialize blocks animation when component mounts
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Ensure we have references to all blocks
    const blocks = Array.from(containerRef.current.querySelectorAll('.animated-block'));
    blocksRef.current = blocks as HTMLDivElement[];
    
    // Function to initialize animation with anime.js
    const initAnimation = () => {
      if (typeof anime === 'undefined') {
        console.warn('Anime.js not loaded');
        return;
      }
      
      // Create anime.js timeline
      const timeline = anime.timeline({
        duration: 1000,
        easing: 'easeInOutQuad',
        loop: true,
        direction: 'alternate'
      });
      
      // Add animation for each block
      blocksRef.current.forEach((block, index) => {
        timeline.add({
          targets: block,
          translateY: () => anime.random(-30, 30),
          translateX: () => anime.random(-30, 30),
          rotate: () => anime.random(-15, 15),
          scale: () => anime.random(0.8, 1.2),
          opacity: [0.5, 1],
          delay: index * 100, // Stagger effect
          duration: 2000 + index * 200,
          easing: 'easeInOutQuad'
        }, index * 100); // Offset
      });
      
      return timeline;
    };
    
    // Initialize the animation
    const animation = initAnimation();
    
    // Cleanup on unmount
    return () => {
      if (animation) {
        animation.pause();
      }
    };
  }, [count, isDarkMode]);
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        'animated-blocks-container relative overflow-hidden',
        className
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'animated-block absolute rounded-full opacity-50',
            isDarkMode ? 'bg-primary-400/30' : 'bg-primary-400/20'
          )}
          style={{
            width: `${Math.floor(Math.random() * 50) + 20}px`,
            height: `${Math.floor(Math.random() * 50) + 20}px`,
            top: `${Math.floor(Math.random() * 100)}%`,
            left: `${Math.floor(Math.random() * 100)}%`,
            animationDelay: `${index * 0.1}s`,
            animationDuration: `${Math.floor(Math.random() * 10) + 10}s`
          }}
        />
      ))}
    </div>
  );
}

// Version with reflection effect
export function AnimatedBlocksWithReflection(props: AnimatedBlocksProps) {
  useEffect(() => {
    // Add reflection effect after component mounts
    const applyReflection = () => {
      const elements = document.querySelectorAll('.reflection-container .animated-block');
      elements.forEach((element) => {
        // @ts-ignore - using the global reflection.js library
        if (typeof window['Reflection'] !== 'undefined') {
          // @ts-ignore - reflection.js adds this constructor to window
          new window['Reflection'](element, {
            height: 40,
            opacity: 0.2
          });
        }
      });
    };
    
    // Slight delay to ensure DOM is ready
    const timer = setTimeout(applyReflection, 500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="reflection-container">
      <AnimatedBlocks {...props} />
    </div>
  );
}