import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <Button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all z-50 ${
        visible ? 'opacity-100' : 'opacity-0 invisible'
      }`}
      size="icon"
      aria-label="Back to top"
    >
      <i className="fas fa-arrow-up"></i>
    </Button>
  );
}
