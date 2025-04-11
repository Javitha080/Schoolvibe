import React, { useState, useEffect } from 'react';
import { simulateLoading } from '@/lib/utils/loadingUtils';
import SchoolLogoSrc from '@/assets/images/school-logo.svg';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [dayNightState, setDayNightState] = useState('night');
  
  useEffect(() => {
    // Start loading simulation
    simulateLoading(
      (currentProgress) => {
        setProgress(currentProgress);
        
        // Start day/night transition at 50% progress
        if (currentProgress >= 50 && dayNightState === 'night') {
          setDayNightState('transitioning');
          
          // Complete transition after animation duration
          setTimeout(() => {
            setDayNightState('day');
          }, 2000);
        }
      },
      () => {
        // Loading complete, component will unmount
      }
    );
  }, [dayNightState]);
  
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[9999] bg-light-bg dark:bg-dark-bg flex flex-col justify-center items-center transition-opacity duration-500">
      <div className="w-32 h-32 rounded-full relative overflow-hidden mb-5">
        {/* Night sky background */}
        <div 
          className={`w-full h-full absolute bg-gradient-to-b from-[#0F1C4D] to-[#1F2D4D] transition-opacity duration-2000 ${
            dayNightState === 'night' ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
        
        {/* Day sky background */}
        <div 
          className={`w-full h-full absolute bg-gradient-to-b from-[#80C6FF] to-[#E9F7FF] transition-opacity duration-2000 ${
            dayNightState === 'day' ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
        
        {/* Moon */}
        <div 
          className={`w-full h-full bg-[#C7C7C7] rounded-full absolute transition-transform duration-2000 ${
            dayNightState === 'night' ? 'translate-y-0' : '-translate-y-32'
          }`}
        ></div>
        
        {/* Sun */}
        <div 
          className={`w-full h-full bg-accent rounded-full absolute transition-transform duration-2000 ${
            dayNightState === 'day' ? 'translate-y-0' : 'translate-y-32'
          }`}
        ></div>
      </div>
      
      <img 
        src={SchoolLogoSrc} 
        alt="School Logo" 
        className="w-24 h-24 mb-4 dark:filter dark:invert" 
      />
      
      <div className="relative w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="font-poppins text-sm text-gray-600 dark:text-gray-300">
        Loading... {Math.floor(progress)}%
      </p>
    </div>
  );
}
