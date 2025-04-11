import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { TYPED_PHRASES, SCHOOL_NAME, SCHOOL_DESCRIPTION, SCHOOL_STATS, SECTION_IDS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { useNumberCounter } from '@/hooks/use-number-counter';
import { useGSAP } from '@/lib/gsap';
import { Card } from '@/components/ui/card';
import { ChevronDown, Users, Award, Clock, GraduationCap, BookOpen } from 'lucide-react';
import SchoolLogoSrc from '@assets/1000160383-removebg-preview.png';

// Custom typing effect implementation
function useTypingEffect(
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

export default function Hero() {
  const typedText = useTypingEffect(TYPED_PHRASES, 80, 50, 2000);
  const studentCount = useNumberCounter(SCHOOL_STATS.students, { duration: 3000 });
  const teacherCount = useNumberCounter(SCHOOL_STATS.teachers, { duration: 2500 });
  const classroomCount = useNumberCounter(SCHOOL_STATS.classrooms, { duration: 2800 });
  const yearsCount = useNumberCounter(SCHOOL_STATS.yearsOfExcellence, { duration: 2200 });
  
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statCardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const backgroundShapesRef = useRef<HTMLDivElement>(null);
  
  // Initialize GSAP animations
  useGSAP((gsap) => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" }});
    
    // Animate background overlay
    if (overlayRef.current) {
      timeline.from(overlayRef.current, {
        opacity: 0,
        duration: 1
      });
    }
    
    // Animate background shapes
    if (backgroundShapesRef.current) {
      const shapes = backgroundShapesRef.current.children;
      timeline.from(shapes, {
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "elastic.out(1, 0.8)"
      }, "-=0.5");
    }
    
    // Animate logo
    if (logoRef.current) {
      timeline.from(logoRef.current, {
        y: -50,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)"
      }, "-=1");
    }
    
    // Main content animation with stagger
    if (contentRef.current) {
      const elements = contentRef.current.children;
      timeline.from(elements, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      }, "-=0.6");
    }
    
    // Image animation with reveal effect
    if (imageRef.current) {
      const image = imageRef.current.querySelector('img');
      const imageWrapper = imageRef.current.querySelector('.image-wrapper');
      
      if (image && imageWrapper) {
        timeline.from(imageWrapper, {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          duration: 1.2,
          ease: "power4.inOut"
        }, "-=0.8");
        
        timeline.from(image, {
          scale: 1.3,
          duration: 1.6,
          ease: "power2.out"
        }, "-=1.2");
      }
    }
    
    // Stats cards animation with stagger
    if (statCardsRef.current) {
      const cards = statCardsRef.current.querySelectorAll('.stat-card');
      timeline.from(cards, {
        y: 50,
        x: (index) => index % 2 === 0 ? -30 : 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.5");
    }
    
    // Stats counter animation
    if (statsRef.current) {
      timeline.from(statsRef.current, {
        y: 30,
        opacity: 0,
        duration: 1
      }, "-=0.3");
    }
    
    // Scroll indicator animation
    if (scrollIndicatorRef.current) {
      timeline.from(scrollIndicatorRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true
      }, "+=0.5");
    }
    
    // Set up parallax effect on scroll
    if (heroRef.current && backgroundShapesRef.current) {
      const shapes = backgroundShapesRef.current.children;
      
      gsap.to(shapes, {
        y: (index) => (index + 1) * 100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          markers: false
        }
      });
    }
    
    // Mouse move parallax effect for background shapes
    if (backgroundShapesRef.current) {
      const shapes = backgroundShapesRef.current.children;
      
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth) - 0.5;
        const yPos = (clientY / window.innerHeight) - 0.5;
        
        gsap.to(shapes, {
          x: (index) => xPos * (index + 1) * 20,
          y: (index) => yPos * (index + 1) * 20,
          duration: 1,
          ease: "power1.out"
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <section 
      id={SECTION_IDS.hero} 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background overlay with gradient */}
      <div 
        ref={overlayRef} 
        className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/0 to-white/30 dark:from-gray-900/20 dark:via-gray-900/0 dark:to-gray-900/30 z-0"
      ></div>
      
      {/* Animated background shapes */}
      <div 
        ref={backgroundShapesRef} 
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 animate-pulse-slow"></div>
        <div className="absolute top-1/4 right-0 w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-accent/10 dark:bg-accent/5 rounded-full blur-3xl translate-x-1/3 animate-pulse-slower"></div>
        <div className="absolute bottom-0 left-1/3 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-secondary/10 dark:bg-secondary/5 rounded-full blur-3xl translate-y-1/3 animate-pulse-slowest"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[25vw] h-[25vw] max-w-[300px] max-h-[300px] bg-primary/5 dark:bg-primary/3 rounded-full blur-2xl animate-float"></div>
      </div>
      
      {/* Illuminated strips - Japanese box style */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/0 via-primary/80 to-primary/0 z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-accent/0 via-accent/80 to-accent/0 z-10"></div>
      <div className="absolute top-0 left-0 h-full w-2 bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 z-10"></div>
      <div className="absolute top-0 right-0 h-full w-2 bg-gradient-to-b from-accent/0 via-accent/30 to-accent/0 z-10"></div>
      
      <div className="container mx-auto px-4 z-20 pt-24 pb-16">
        {/* Logo animation section */}
        <div 
          ref={logoRef} 
          className="flex justify-center mb-8 sm:mb-12 transition-transform duration-700 hover:scale-110"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 relative rounded-full bg-black/10 dark:bg-white/5 p-1 border border-primary/20 dark:border-primary/10 shadow-xl flex items-center justify-center overflow-hidden glassmorphism">
            <img 
              src={SchoolLogoSrc} 
              alt={SCHOOL_NAME} 
              className="w-full h-full object-contain animate-subtle-pulse filter drop-shadow-glow"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5 mix-blend-overlay rounded-full"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content Column */}
          <div className="order-2 lg:order-1 lg:col-span-5 xl:col-span-6" ref={contentRef}>
            <h5 className="text-base md:text-lg font-medium text-primary dark:text-accent mb-3 tracking-wider cinematic-text">
              Welcome to
            </h5>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 cinematic-text glass-text">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/90">{SCHOOL_NAME.split(' ')[0]}</span>
              <span className="block mt-1 lg:mt-2 text-gray-900 dark:text-gray-100">{SCHOOL_NAME.split(' ').slice(1).join(' ')}</span>
            </h1>
            <div className="relative mb-6 h-12">
              <h2 className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-200 bg-gradient-to-r from-primary/80 to-accent bg-clip-text text-transparent cinematic-text">
                {typedText}
                <span className="inline-block w-0.5 h-8 bg-primary ml-1 animate-pulse"></span>
              </h2>
            </div>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed cinematic-text">
              {SCHOOL_DESCRIPTION}
            </p>
            <div className="flex flex-wrap gap-5">
              <Button 
                className="rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white hover:from-primary/90 hover:to-primary border-0 py-6 px-8 shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1"
                size="lg" 
                asChild
              >
                <Link href={`#${SECTION_IDS.about}`}>
                  <span className="text-base">Discover More</span>
                </Link>
              </Button>
              <Button 
                className="rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 py-6 px-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                variant="outline" 
                size="lg" 
                asChild
              >
                <Link href={`#${SECTION_IDS.contact}`}>
                  <span className="text-base">Contact Us</span>
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Image Column */}
          <div className="order-1 lg:order-2 lg:col-span-7 xl:col-span-6 relative" ref={imageRef}>
            <div className="relative rounded-2xl overflow-hidden japanese-box shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 mix-blend-overlay z-10"></div>
              <div className="image-wrapper w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1471&auto=format&fit=crop"
                  alt="School campus" 
                  className="w-full h-full object-cover transition-transform duration-10000 hover:scale-110 cinematic-image"
                />
              </div>
              
              {/* Decorative frame corners */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/70"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary/70"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-accent/70"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-accent/70"></div>
            </div>
            
            {/* Floating stats cards */}
            <div ref={statCardsRef} className="absolute -bottom-16 left-0 right-0 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 px-1">
              <Card 
                className="stat-card glassmorphism p-3 sm:p-4 rounded-xl shadow-xl border border-white/20 backdrop-blur-md transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-full">
                    <Users size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Students</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">{studentCount}</p>
                  </div>
                </div>
              </Card>
              
              <Card 
                className="stat-card glassmorphism p-3 sm:p-4 rounded-xl shadow-xl border border-white/20 backdrop-blur-md transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 dark:bg-accent/20 rounded-full">
                    <GraduationCap size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Teachers</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">{teacherCount}</p>
                  </div>
                </div>
              </Card>
              
              <Card 
                className="stat-card glassmorphism p-3 sm:p-4 rounded-xl shadow-xl border border-white/20 backdrop-blur-md transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-secondary/10 dark:bg-secondary/20 rounded-full">
                    <BookOpen size={18} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Classrooms</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">{classroomCount}</p>
                  </div>
                </div>
              </Card>
              
              <Card 
                className="stat-card glassmorphism p-3 sm:p-4 rounded-xl shadow-xl border border-white/20 backdrop-blur-md transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-full">
                    <Award size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Excellence</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
                      <span>{yearsCount}</span> <span className="text-xs">years</span>
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        ref={scrollIndicatorRef} 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 tracking-wider uppercase">Scroll to explore</p>
        <div className="w-8 h-12 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-scroll-indicator"></div>
        </div>
      </div>
    </section>
  );
}
