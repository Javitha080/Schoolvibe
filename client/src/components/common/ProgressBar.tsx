import React, { useState, useEffect } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        const progressPercentage = (scrollTop / scrollHeight) * 100;
        setProgress(progressPercentage);
      } else {
        setProgress(0);
      }
    };
    
    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);
  
  return (
    <div 
      className="h-1 bg-gradient-to-r from-primary to-accent fixed top-0 left-0 z-[1000]" 
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    ></div>
  );
}
