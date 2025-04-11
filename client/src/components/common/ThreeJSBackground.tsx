import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/use-theme';

// Using THREE.js globally added from CDN
declare const THREE: any;

// Extend Window interface
declare global {
  interface Window {
    mouseX: number;
    mouseY: number;
  }
}

export default function ThreeJSBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // Store mouse position for interactive effects
  // Set initial values
  if (typeof window !== 'undefined') {
    window.mouseX = window.mouseX || 0;
    window.mouseY = window.mouseY || 0;
  }
  
  useEffect(() => {
    if (!containerRef.current || typeof THREE === 'undefined') return;
    
    // Initialize scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Clear previous canvas if it exists
    if (containerRef.current.querySelector('canvas')) {
      containerRef.current.querySelector('canvas')?.remove();
    }
    
    containerRef.current.appendChild(renderer.domElement);
    
    // Create particle geometry
    const particleCount = 1500; // Reduced count for better performance
    const particles = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    
    // Set particle positions and sizes
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Distribute particles in a 3D space
      particlePositions[i3] = (Math.random() - 0.5) * 10;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      // Vary particle sizes
      particleSizes[i] = Math.random() * 5;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    // Create particle material
    const particleMaterial = new THREE.PointsMaterial({
      color: isDarkMode ? 0xffffff : 0x000000,
      size: 0.05,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    // Create particle system
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    // Position camera
    camera.position.z = 5;
    
    // Track mouse movement for interactive effects
    const handleMouseMove = (event: MouseEvent) => {
      // Calculate normalized device coordinates (-1 to +1)
      window.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      window.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate particle system slowly
      particleSystem.rotation.x += 0.0005;
      particleSystem.rotation.y += 0.0005;
      
      // Move particles based on mouse position
      if (window.mouseX !== undefined && window.mouseY !== undefined) {
        particleSystem.rotation.x += window.mouseY * 0.0002;
        particleSystem.rotation.y += window.mouseX * 0.0002;
      }
      
      // Render scene
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Dispose resources
      particles.dispose();
      particleMaterial.dispose();
      renderer.dispose();
      
      if (containerRef.current?.querySelector('canvas')) {
        containerRef.current.querySelector('canvas')?.remove();
      }
    };
  }, [isDarkMode]); // Re-initialize when theme changes
  
  return (
    <div 
      ref={containerRef} 
      className="three-background fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
}