import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hovering, setHovering] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (!visible && window.innerWidth > 768) {
        setVisible(true);
      }
    };
    
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
          target.closest('a') || target.closest('button')) {
        setHovering(true);
      }
    };
    
    const handleMouseLeave = () => setHovering(false);
    
    // Add event listeners for the whole document
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter as EventListener);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter as EventListener);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [visible]);
  
  if (!visible) return null;
  
  return (
    <div 
      className={`custom-cursor hidden md:block`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${clicked ? 0.8 : hovering ? 2 : 1})`,
        width: hovering ? '40px' : '20px',
        height: hovering ? '40px' : '20px',
        background: hovering ? 'rgba(227, 36, 43, 0.2)' : 'rgba(227, 36, 43, 0.5)',
        backdropFilter: hovering ? 'invert(1)' : 'none'
      }}
    ></div>
  );
}
