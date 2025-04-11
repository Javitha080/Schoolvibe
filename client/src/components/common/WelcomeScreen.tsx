import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { SCHOOL_NAME, SCHOOL_TAGLINE, TYPED_PHRASES } from '@/lib/constants';
import { useGSAP, gsap } from '@/lib/gsap';
import { useTypingEffect } from '@/lib/utils/animation';
import SchoolLogoSrc from '@/assets/images/school-logo.png';
import { Button } from '@/components/ui/button';

export default function WelcomeScreen() {
  const [isClosing, setIsClosing] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const typedText = useTypingEffect(TYPED_PHRASES, 100, 50, 2000);

  // Determine time of day for background styling
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) {
      setTimeOfDay('morning');
    } else if (hours >= 12 && hours < 17) {
      setTimeOfDay('afternoon');
    } else if (hours >= 17 && hours < 20) {
      setTimeOfDay('evening');
    } else {
      setTimeOfDay('night');
    }
  }, []);

  // GSAP animations
  useGSAP(() => {
    const tl = gsap.timeline();

    // Initial animation
    tl.from(contentRef.current, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });

    // Create floating animation for logo
    if (contentRef.current) {
      const logo = contentRef.current.querySelector('.logo');
      gsap.to(logo, {
        y: '-=10',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
          // Store in localStorage that welcome screen has been shown
          localStorage.setItem('welcomeScreenShown', 'true');
          document.body.classList.remove('overflow-hidden');
        }
      });
    }
  };

  // Check if welcome screen has been shown before
  useEffect(() => {
    const hasBeenShown = localStorage.getItem('welcomeScreenShown') === 'true';
    
    if (hasBeenShown) {
      setIsClosing(true);
    } else {
      // Prevent scrolling when welcome screen is shown
      document.body.classList.add('overflow-hidden');
      
      // Simulate loading process
      const timer = setTimeout(() => {
        setInitialLoadComplete(true);
      }, 800);
      
      return () => {
        clearTimeout(timer);
      };
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  // Background gradient based on time of day
  const getBackgroundStyle = () => {
    switch(timeOfDay) {
      case 'morning':
        return 'bg-gradient-to-br from-amber-100 via-yellow-300 to-orange-400 dark:from-indigo-900 dark:via-purple-900 dark:to-blue-900';
      case 'afternoon':
        return 'bg-gradient-to-br from-blue-300 via-cyan-300 to-sky-500 dark:from-blue-900 dark:via-purple-900 dark:to-indigo-900';
      case 'evening':
        return 'bg-gradient-to-br from-orange-300 via-red-400 to-pink-500 dark:from-gray-900 dark:via-purple-900 dark:to-red-900';
      case 'night':
        return 'bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 dark:from-gray-900 dark:via-indigo-950 dark:to-blue-950';
      default:
        return 'bg-gradient-to-br from-blue-300 via-cyan-300 to-sky-500 dark:from-blue-900 dark:via-purple-900 dark:to-indigo-900';
    }
  };

  // Get greeting based on time of day
  const getGreeting = () => {
    switch(timeOfDay) {
      case 'morning':
        return 'Good Morning';
      case 'afternoon':
        return 'Good Afternoon';
      case 'evening':
        return 'Good Evening';
      case 'night':
        return 'Good Night';
      default:
        return 'Welcome';
    }
  };

  if (isClosing) return null;

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center ${getBackgroundStyle()} transition-all duration-1000 ease-in-out`}
    >
      <div 
        className="absolute inset-0 bg-white/10 backdrop-blur-sm dark:bg-black/10"
        style={{ animation: 'pulse 6s infinite' }}
      ></div>
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, index) => (
          <div 
            key={index}
            className="absolute rounded-full bg-white/20 dark:bg-white/10"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 15}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <div 
        ref={contentRef}
        className="relative z-10 max-w-xl mx-auto glassmorphism p-8 sm:p-12 rounded-xl shadow-2xl text-center"
      >
        <img 
          src={SchoolLogoSrc} 
          alt={SCHOOL_NAME} 
          className={`logo mx-auto w-32 h-32 mb-8 ${theme === 'dark' ? 'filter-invert' : ''}`}
        />
        
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{getGreeting()}</h1>
        <h2 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-600 font-montserrat">{SCHOOL_NAME}</h2>
        
        {/* Typing animation */}
        <div className="h-8 mb-6">
          <p className="text-xl text-gray-700 dark:text-gray-300 inline-block border-r-4 border-primary pr-1 animate-cursor-blink">
            {typedText}
          </p>
        </div>
        
        {/* Add progress indicator */}
        <div className="relative w-64 h-1 mx-auto mb-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent rounded-full"
            style={{
              width: initialLoadComplete ? '100%' : '0%',
              transition: 'width 3s cubic-bezier(0.65, 0, 0.35, 1)'
            }}
          />
        </div>
        
        <Button 
          onClick={handleClose} 
          size="lg" 
          variant="outline"
          className="relative group overflow-hidden rounded-full px-8 py-6 hover:bg-primary hover:text-white transition-all duration-300"
        >
          <span className="relative z-10">Enter Website</span>
          <span className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
        </Button>
      </div>
    </div>
  );
}