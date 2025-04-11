import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'wouter';
import { useGSAP, gsap, ScrollTrigger } from '@/lib/gsap';
import { 
  SCHOOL_NAME, 
  SCHOOL_TAGLINE, 
  SCHOOL_DESCRIPTION, 
  SCHOOL_STATS, 
  TYPED_PHRASES,
  SCHOOL_ADDRESS,
  SCHOOL_CONTACT
} from '@/lib/constants';

// Import Lucide icons
import { 
  ArrowRight, 
  GraduationCap, 
  Users, 
  Trophy, 
  Book, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronDown,
  ChevronRight,
  Globe,
  Sparkles,
  School,
  LucideIcon 
} from 'lucide-react';

// Import UI components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Container from '@/components/layout/Container';

// Import School Logo
import SchoolLogoSrc from '@/assets/images/school-logo.png';

export default function Home() {
  // Refs for sections
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const programsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Initialize GSAP and smooth scroll behavior
  useGSAP(() => {
    // Set up smooth scrolling for anchor links
    const clickHandler = (e: Event) => {
      e.preventDefault();
      
      const element = e.currentTarget as HTMLAnchorElement;
      const targetId = element.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Use GSAP for smooth scrolling
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: targetElement,
            offsetY: 80 // Account for fixed header
          },
          ease: 'power3.inOut'
        });
      }
    };
    
    // Add event listeners
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', clickHandler);
    });

    // Hero section animations
    if (heroRef.current) {
      const heroContent = heroRef.current.querySelector('.hero-content');
      const heroImage = heroRef.current.querySelector('.hero-image');
      const heroCards = heroRef.current.querySelectorAll('.hero-card');
      
      if (heroContent) {
        const elements = heroContent.children;
        gsap.fromTo(
          elements, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
        );
      }
      
      if (heroImage) {
        gsap.fromTo(
          heroImage,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, delay: 0.4, ease: 'power2.out' }
        );
      }
      
      if (heroCards.length) {
        gsap.fromTo(
          heroCards,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, delay: 0.8, ease: 'back.out(1.7)' }
        );
      }
    }

    // About section entrance animation
    if (aboutRef.current) {
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            aboutRef.current!.querySelectorAll('.about-item'),
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
          );
        },
        once: true
      });
    }

    // Stats counter animation
    if (statsRef.current) {
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            statsRef.current!.querySelectorAll('.stat-item'),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
          );
          
          // Animate counter numbers
          const counters = statsRef.current!.querySelectorAll('.stat-number');
          counters.forEach(counter => {
            const targetValue = parseInt(counter.getAttribute('data-value') || '0');
            gsap.fromTo(
              counter,
              { innerText: 0 },
              {
                innerText: targetValue,
                duration: 2,
                ease: 'power2.out',
                snap: { innerText: 1 },
                delay: 0.2,
              }
            );
          });
        },
        once: true
      });
    }

    // Programs section animations
    if (programsRef.current) {
      ScrollTrigger.create({
        trigger: programsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            programsRef.current!.querySelectorAll('.program-card'),
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.4)' }
          );
        },
        once: true
      });
    }

    // Gallery animations
    if (galleryRef.current) {
      ScrollTrigger.create({
        trigger: galleryRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            galleryRef.current!.querySelectorAll('.gallery-item'),
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out' }
          );
        },
        once: true
      });
    }

    // Events section animations
    if (eventsRef.current) {
      ScrollTrigger.create({
        trigger: eventsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            eventsRef.current!.querySelectorAll('.event-card'),
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: 'power3.out' }
          );
        },
        once: true
      });
    }

    // Contact section animations
    if (contactRef.current) {
      ScrollTrigger.create({
        trigger: contactRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            contactRef.current!.querySelectorAll('.contact-item'),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
          );
        },
        once: true
      });
    }
    
    // Initialize ScrollTrigger refresh on page load
    ScrollTrigger.refresh();
    
    return () => {
      // Clean up event listeners
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', clickHandler);
      });
    };
  }, []);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // TypeWriter effect
  const [typedText, setTypedText] = React.useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [typingSpeed, setTypingSpeed] = React.useState(100);

  useEffect(() => {
    const currentPhrase = TYPED_PHRASES[currentPhraseIndex];
    
    const handleTyping = () => {
      setTypedText(prev => {
        if (isDeleting) {
          // Deleting characters
          return prev.substring(0, prev.length - 1);
        } else {
          // Typing characters
          return currentPhrase.substring(0, prev.length + 1);
        }
      });

      // Set typing speed
      if (!isDeleting && typedText === currentPhrase) {
        // Pause at complete text
        setTimeout(() => setIsDeleting(true), 2000);
        setTypingSpeed(100);
      } else if (isDeleting && typedText === '') {
        // Move to next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((currentPhraseIndex + 1) % TYPED_PHRASES.length);
        setTypingSpeed(200);
      } else {
        // Regular typing/deleting speed
        setTypingSpeed(isDeleting ? 50 : 100);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, currentPhraseIndex, isDeleting, typingSpeed]);

  return (
    <>
      <Helmet>
        <title>{SCHOOL_NAME} - {SCHOOL_TAGLINE}</title>
        <meta name="description" content={SCHOOL_DESCRIPTION} />
        <meta property="og:title" content={`${SCHOOL_NAME} - ${SCHOOL_TAGLINE}`} />
        <meta property="og:description" content={SCHOOL_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js"></script>
      </Helmet>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        id="hero" 
        className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      >
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2"></div>
          <div className="absolute top-1/3 right-0 w-[30rem] h-[30rem] bg-accent/10 rounded-full blur-3xl translate-x-1/2"></div>
          <div className="absolute bottom-0 left-1/3 w-[25rem] h-[25rem] bg-secondary/10 rounded-full blur-3xl translate-y-1/2"></div>
        </div>
        
        <Container maxWidth="xl" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Content Column */}
            <div className="lg:col-span-6 hero-content">
              <h5 className="text-sm md:text-base text-primary dark:text-primary/90 font-medium mb-2 tracking-wider uppercase">
                Welcome to
              </h5>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-montserrat font-bold mb-4">
                <span className="text-primary">{SCHOOL_NAME.split(' ')[0]}</span>{' '}
                <span className="text-gradient">{SCHOOL_NAME.split(' ').slice(1).join(' ')}</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-medium mb-4 text-gray-700 dark:text-gray-300 h-8">
                {typedText}
                <span className="inline-block w-0.5 h-7 bg-primary ml-1 animate-cursor-blink"></span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
                {SCHOOL_DESCRIPTION}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 text-white rounded-lg"
                  asChild
                >
                  <Link href="#about">
                    Discover More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="px-6 py-2.5 border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 rounded-lg"
                  asChild
                >
                  <Link href="#contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            
            {/* Image Column */}
            <div className="lg:col-span-6 relative hero-image">
              <div className="cinematic japanese-box rounded-xl overflow-hidden h-[300px] md:h-[380px] lg:h-[480px] shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1525921429624-479b6a26d84d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="School campus" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating cards */}
              <Card 
                className="hero-card absolute -bottom-5 -left-5 p-4 rounded-lg shadow-lg glassmorphism dark:shadow-gray-900/20 max-w-[220px]"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/20 text-primary">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Students</p>
                    <p className="text-2xl font-bold">{SCHOOL_STATS.students.toLocaleString()}</p>
                  </div>
                </div>
              </Card>
              
              <Card 
                className="hero-card absolute -top-5 -right-5 p-4 rounded-lg shadow-lg glassmorphism dark:shadow-gray-900/20"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent/20 text-accent">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Excellence</p>
                    <p className="text-xl font-bold">Since 1950</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Scroll down indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
            <a 
              href="#about" 
              className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              aria-label="Scroll down"
            >
              <span className="text-xs mb-2">Scroll Down</span>
              <ChevronDown className="h-6 w-6" />
            </a>
          </div>
        </Container>
      </section>

      {/* About Section */}
      <section 
        ref={aboutRef}
        id="about" 
        className="py-20 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl"></div>
        </div>
        
        <Container maxWidth="xl" className="relative z-10">
          <div className="text-center mb-12 max-w-2xl mx-auto about-item">
            <h5 className="text-primary text-sm uppercase tracking-widest font-medium mb-3">About Our School</h5>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">A Legacy of Excellence in Education</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Founded in 1950, Homagama Maha Vidyalaya has a rich history of academic excellence 
              and holistic education, shaping generations of successful individuals who contribute 
              positively to society.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Vision */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 school-card about-item">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <Sparkles className="text-primary h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-400">
                To be a center of academic excellence that nurtures well-rounded individuals 
                equipped with knowledge, skills, and values to thrive in a global society.
              </p>
            </div>
            
            {/* Mission */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 school-card about-item">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                <School className="text-accent h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-400">
                To provide quality education that fosters academic excellence, critical thinking, 
                creativity, and character development in a supportive and inclusive environment.
              </p>
            </div>
            
            {/* Values */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 school-card about-item">
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-5">
                <Globe className="text-secondary h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Our Values</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We uphold excellence, integrity, respect, responsibility, and innovation in all aspects 
                of our educational practices and community interactions.
              </p>
            </div>
          </div>
          
          {/* Principal's Message */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center about-item">
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="rounded-xl overflow-hidden img-spotlight">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80" 
                    alt="Principal" 
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 px-5 py-2 rounded-lg shadow-lg">
                  <h4 className="font-bold">Dr. Sampath Perera</h4>
                  <p className="text-sm text-primary">Principal</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <h3 className="text-2xl font-bold mb-5">Principal's Message</h3>
              <blockquote className="border-l-4 border-primary pl-4 py-2 italic text-gray-600 dark:text-gray-400 mb-6">
                "At Homagama Maha Vidyalaya, we believe in nurturing not just academic excellence, 
                but the holistic development of each student. We strive to create an environment 
                where students can discover their potential and grow into responsible citizens."
              </blockquote>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our dedicated team of educators works tirelessly to provide a nurturing and 
                stimulating learning environment that encourages curiosity, critical thinking, 
                and creativity. We focus on character development alongside academic excellence, 
                preparing our students for success in all aspects of life.
              </p>
              <Button 
                className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 text-white rounded-lg flex items-center"
              >
                Read Full Message <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="py-16 bg-gradient-to-r from-primary/90 to-secondary/90 text-white relative overflow-hidden"
      >
        {/* Overlay Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMTYgNGg0djFoLTR2LTF6bTAtMmgxdjRoLTF2LTR6bS0zMiAyaDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMTYgMGgxdjRoLTF2LTR6TTAgMzRoNHYxSDB2LTF6bTAgMmg0djFIMHYtMXptMTYgMGg0djFoLTR2LTF6bTE2LTE4aDR2MWgtNHYtMXptLTgtMmgxdjRoLTF2LTR6bTAtMTZoMXY0aC0xdi00em0tOCAxOGg0djFoLTR2LTF6bTAtMmgxdjRoLTF2LTR6bTAtMTZoMXY0aC0xdi00em0zMiAyaDR2MWgtNHYtMXptMCAyaDR2MWgtNHYtMXptLTE2IDJoNHYxaC00di0xeiIvPjwvZz48L2c+PC9zdmc+')]"></div>
        
        <Container maxWidth="xl" className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Students */}
            <div className="text-center stat-item">
              <div className="mb-4 mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-4xl font-bold mb-2 stat-number" data-value={SCHOOL_STATS.students}>0</h3>
              <p className="uppercase tracking-wider text-sm text-white/80">Students</p>
            </div>
            
            {/* Teachers */}
            <div className="text-center stat-item">
              <div className="mb-4 mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h3 className="text-4xl font-bold mb-2 stat-number" data-value={SCHOOL_STATS.teachers}>0</h3>
              <p className="uppercase tracking-wider text-sm text-white/80">Teachers</p>
            </div>
            
            {/* Classrooms */}
            <div className="text-center stat-item">
              <div className="mb-4 mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <Book className="h-8 w-8" />
              </div>
              <h3 className="text-4xl font-bold mb-2 stat-number" data-value={SCHOOL_STATS.classrooms}>0</h3>
              <p className="uppercase tracking-wider text-sm text-white/80">Classrooms</p>
            </div>
            
            {/* Years of Excellence */}
            <div className="text-center stat-item">
              <div className="mb-4 mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <Trophy className="h-8 w-8" />
              </div>
              <h3 className="text-4xl font-bold mb-2 stat-number" data-value={SCHOOL_STATS.yearsOfExcellence}>0</h3>
              <p className="uppercase tracking-wider text-sm text-white/80">Years of Excellence</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Programs Section */}
      <section 
        ref={programsRef}
        id="programs" 
        className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        
        <Container maxWidth="xl" className="relative z-10">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h5 className="text-primary text-sm uppercase tracking-widest font-medium mb-3">Academic Excellence</h5>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Educational Programs</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We offer a comprehensive range of educational programs designed to meet the diverse 
              needs and interests of our students, fostering academic excellence and holistic development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programData.map((program, index) => (
              <ProgramCard 
                key={index}
                icon={program.icon}
                title={program.title}
                description={program.description}
                className="program-card"
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery Section */}
      <section 
        ref={galleryRef}
        id="gallery" 
        className="py-20 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden"
      >
        <Container maxWidth="xl" className="relative z-10">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h5 className="text-primary text-sm uppercase tracking-widest font-medium mb-3">Campus Life</h5>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">School Gallery</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Explore the vibrant life at Homagama Maha Vidyalaya through our gallery showcasing 
              academic, cultural, and sports activities that make our school special.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="gallery-item group relative overflow-hidden rounded-xl shadow-md">
                <div className="img-highlight aspect-[4/3]">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white w-full">
                    <h3 className="font-bold">{image.title}</h3>
                    <p className="text-sm text-white/80">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button 
              variant="outline" 
              className="px-6 py-2.5 border-2 border-primary text-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 rounded-lg"
            >
              View All Photos
            </Button>
          </div>
        </Container>
      </section>

      {/* Events Section */}
      <section 
        ref={eventsRef}
        id="events" 
        className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        
        <Container maxWidth="xl" className="relative z-10">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h5 className="text-primary text-sm uppercase tracking-widest font-medium mb-3">Stay Updated</h5>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">News & Upcoming Events</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Keep up with the latest happenings, achievements, and upcoming events at 
              Homagama Maha Vidyalaya.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventsData.map((event, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 event-card"
              >
                <div className="relative h-48">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-md">
                    <div className="text-xs text-gray-500 dark:text-gray-400">{event.date}</div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div className="text-xs text-white px-2 py-1 rounded-full mr-2" style={{background: event.categoryColor}}>
                      {event.category}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {event.time}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  <Button 
                    variant="link" 
                    className="p-0 text-primary hover:text-primary/80 transition-colors flex items-center"
                  >
                    Read More <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button 
              className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 text-white rounded-lg"
            >
              View All News & Events
            </Button>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section 
        ref={contactRef}
        id="contact" 
        className="py-20 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-accent/5 blur-3xl"></div>
          <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl"></div>
        </div>
        
        <Container maxWidth="xl" className="relative z-10">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h5 className="text-primary text-sm uppercase tracking-widest font-medium mb-3">Get in Touch</h5>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We'd love to hear from you! Reach out to us for any inquiries, feedback, 
              or to learn more about admissions and our programs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md h-full">
                <h3 className="text-2xl font-bold mb-6 relative contact-item">
                  Contact Information
                  <span className="absolute bottom-0 left-0 w-16 h-1 bg-primary rounded-full -mb-2"></span>
                </h3>
                
                <div className="space-y-6 mt-8">
                  <div className="flex items-start contact-item">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Address</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {SCHOOL_ADDRESS}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start contact-item">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Phone</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {SCHOOL_CONTACT.phone[0]}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {SCHOOL_CONTACT.phone[1]}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start contact-item">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Email</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {SCHOOL_CONTACT.email[0]}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {SCHOOL_CONTACT.email[1]}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start contact-item">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Office Hours</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Monday - Friday: 8:00 AM - 3:30 PM
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Saturday: 8:00 AM - 12:30 PM
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Sunday & Holidays: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-7 contact-item">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                      placeholder="Subject of your message"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  
                  <div>
                    <Button 
                      type="submit"
                      className="w-full px-6 py-3 bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 text-white rounded-lg"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Map */}
          <div className="mt-12 rounded-xl overflow-hidden shadow-md h-[400px] contact-item">
            <iframe 
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBtLeHdh7K4bqXKUmMNVRJfMXLb-2xWOmY&q=${encodeURIComponent(SCHOOL_ADDRESS)}`} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="School Location"
            ></iframe>
          </div>
        </Container>
      </section>
    </>
  );
}

// Program Card Component
interface ProgramCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

function ProgramCard({ icon: Icon, title, description, className }: ProgramCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
        <Icon className="text-primary h-7 w-7" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
      <div className="mt-5">
        <Button 
          variant="link" 
          className="p-0 text-primary hover:text-primary/80 transition-colors flex items-center"
        >
          Learn More <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

// Program Data
const programData = [
  {
    icon: Book,
    title: "Primary Education",
    description: "Our primary education program focuses on building strong foundations in literacy, numeracy, and critical thinking skills in a nurturing environment."
  },
  {
    icon: GraduationCap,
    title: "Secondary Education",
    description: "Our comprehensive secondary curriculum prepares students for success in national examinations and builds a solid foundation for higher education."
  },
  {
    icon: Users,
    title: "STEM Program",
    description: "Our specialized STEM program emphasizes science, technology, engineering, and mathematics through hands-on learning experiences."
  },
  {
    icon: Globe,
    title: "Language Studies",
    description: "We offer comprehensive language education in Sinhala, Tamil, and English, preparing students for effective communication in our multilingual society."
  },
  {
    icon: Trophy,
    title: "Sports Excellence",
    description: "Our sports program develops physical fitness, teamwork, and leadership skills through a variety of competitive and recreational activities."
  },
  {
    icon: Sparkles,
    title: "Arts & Culture",
    description: "We foster creativity and cultural appreciation through our comprehensive arts program including visual arts, music, dance, and drama."
  }
];

// Gallery Images Data
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    alt: "Classroom",
    title: "Modern Classrooms",
    category: "Academics"
  },
  {
    src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    alt: "Science Lab",
    title: "Science Laboratory",
    category: "STEM"
  },
  {
    src: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    alt: "Sports",
    title: "Annual Sports Meet",
    category: "Sports"
  },
  {
    src: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    alt: "Library",
    title: "School Library",
    category: "Academics"
  },
  {
    src: "https://images.unsplash.com/photo-1559169389-36cc4259e467?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1191&q=80",
    alt: "Cultural Performance",
    title: "Cultural Day Performance",
    category: "Culture"
  },
  {
    src: "https://images.unsplash.com/photo-1528731708534-816fe59f90cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    alt: "Graduation",
    title: "Graduation Ceremony",
    category: "Events"
  }
];

// Events Data
const eventsData = [
  {
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Annual Science Exhibition",
    description: "Join us for our annual science exhibition showcasing innovative projects by our talented students across all grade levels. Explore interactive demonstrations, experiments, and presentations that highlight the scientific curiosity and creativity of our students.",
    date: "June 15, 2023",
    time: "9:00 AM - 4:00 PM",
    category: "Academic",
    categoryColor: "#4CAF50"
  },
  {
    image: "https://images.unsplash.com/photo-1560523159-4a9692d222f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Inter-School Sports Tournament",
    description: "Our school is hosting the annual inter-school sports tournament featuring competitions in cricket, volleyball, basketball, and athletics. Come support our talented athletes as they compete against neighboring schools.",
    date: "July 10-15, 2023",
    time: "8:00 AM - 5:00 PM",
    category: "Sports",
    categoryColor: "#2196F3"
  },
  {
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    title: "Cultural Festival 2023",
    description: "Experience the rich cultural heritage of Sri Lanka at our annual cultural festival. The event features traditional dance performances, music, art exhibitions, and culinary delights representing the diverse cultural tapestry of our nation.",
    date: "August 5, 2023",
    time: "1:00 PM - 7:00 PM",
    category: "Cultural",
    categoryColor: "#FF5722"
  }
];
