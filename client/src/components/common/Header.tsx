import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import DarkModeToggle from './DarkModeToggle';
import { SCHOOL_NAME, SECTION_IDS } from '@/lib/constants';
import { 
  Menu, X, ChevronDown, Search, Bell, 
  GraduationCap, BookOpen, Phone, 
  Home, Info, Calendar, Image, Newspaper, 
  MessageSquare, LucideIcon
} from 'lucide-react';
import SchoolLogoSrc from '@assets/1000160383-removebg-preview.png';
import { useGSAP } from '@/lib/gsap';

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

// Navigation item interface
interface NavItemType {
  label: string;
  href: string;
  icon?: LucideIcon;
  submenu?: NavItemType[];
}

export default function Header({ isMenuOpen, toggleMenu }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [currentPath] = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);
  
  // Generate navigation structure
  const navigationItems: NavItemType[] = [
    {
      label: 'Home',
      href: '/',
      icon: Home
    },
    {
      label: 'About',
      href: `/#${SECTION_IDS.about}`,
      icon: Info,
      submenu: [
        { label: 'Overview', href: `/#${SECTION_IDS.about}` },
        { label: 'History', href: `/#${SECTION_IDS.history}` },
        { label: 'Principal', href: `/#${SECTION_IDS.principal}` },
        { label: 'Facilities', href: `/#${SECTION_IDS.facilities}` }
      ]
    },
    {
      label: 'Academic',
      href: `/#${SECTION_IDS.academic}`,
      icon: BookOpen,
      submenu: [
        { label: 'Programs', href: `/#${SECTION_IDS.programs}` },
        { label: 'Curriculum', href: `/#${SECTION_IDS.curriculum}` },
        { label: 'Examinations', href: `/#${SECTION_IDS.exams}` },
        { label: 'Achievements', href: `/#${SECTION_IDS.achievements}` }
      ]
    },
    {
      label: 'Admissions',
      href: `/#${SECTION_IDS.admissions}`,
      icon: GraduationCap
    },
    {
      label: 'Gallery',
      href: `/#${SECTION_IDS.gallery}`,
      icon: Image
    },
    {
      label: 'News',
      href: `/#${SECTION_IDS.news}`,
      icon: Newspaper
    },
    {
      label: 'Calendar',
      href: `/#${SECTION_IDS.calendar}`,
      icon: Calendar
    },
    {
      label: 'Contact',
      href: `/#${SECTION_IDS.contact}`,
      icon: MessageSquare
    }
  ];

  // Initialize animations with GSAP
  useGSAP((gsap) => {
    if (headerRef.current) {
      const timeline = gsap.timeline({ defaults: { ease: "power2.out" }});
      
      // Animate announcement bar
      if (announcementRef.current) {
        timeline.from(announcementRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.8
        });
      }
      
      // Logo animation
      if (logoRef.current) {
        timeline.from(logoRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.6
        }, "-=0.4");
      }
      
      // Navigation items animation with stagger
      if (navRef.current) {
        const navItems = navRef.current.querySelectorAll('.nav-item');
        timeline.from(navItems, {
          y: -15,
          opacity: 0,
          stagger: 0.07,
          duration: 0.5
        }, "-=0.3");
      }
      
      // Action buttons animation with stagger
      if (actionsRef.current) {
        const actionButtons = actionsRef.current.querySelectorAll('button');
        timeline.from(actionButtons, {
          y: -15,
          opacity: 0,
          stagger: 0.07,
          duration: 0.5
        }, "-=0.4");
      }
      
      // Scroll event for parallax and transformation effects
      gsap.to(logoRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        scale: 0.95,
        y: 5
      });
    }
  }, []);

  // Check responsive screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initialize
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Update header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    
    // Initialize
    handleScroll();
    
    // Add event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if a link is active
  const isActive = (path: string): boolean => {
    if (path === '/') {
      return currentPath === path;
    }
    
    // For hash links, check if current URL contains the hash
    if (path.includes('#') && currentPath === '/') {
      const hash = window.location.hash;
      return hash === path.substring(path.indexOf('#'));
    }
    
    return currentPath.includes(path);
  };
  
  // Toggle submenu on mobile
  const toggleSubmenu = (label: string) => {
    if (activeSubmenu === label) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(label);
    }
  };

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'shadow-lg' : 'shadow-none'
      }`}
    >
      {/* Announcement Bar */}
      <div 
        ref={announcementRef}
        className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-primary text-white py-1.5 z-10"
      >
        {/* Background animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-float"></div>
          <div className="absolute top-full right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/2 animate-pulse-slow"></div>
        </div>
        
        <div className="container mx-auto px-4 flex justify-center sm:justify-between items-center">
          <p className="text-center md:text-left text-xs sm:text-sm font-medium">
            <span className="hidden sm:inline">📣</span> School registration for new students is now open!
            {' '}
            <Link 
              href={`/#${SECTION_IDS.admissions}`} 
              className="underline font-bold hover:no-underline inline-flex items-center ml-1 group"
            >
              <span>Learn more</span>
              <ChevronDown className="w-3 h-3 ml-1 group-hover:translate-y-0.5 transition-transform" />
            </Link>
          </p>
          
          {/* Contact info - visible on larger screens */}
          <div className="hidden sm:flex items-center space-x-4 text-xs">
            <a href="tel:+94111234567" className="flex items-center hover:text-white/80 transition-colors">
              <Phone className="w-3 h-3 mr-1" />
              <span>+94 11 123 4567</span>
            </a>
            <span className="text-white/50">|</span>
            <div className="flex items-center space-x-2">
              <a href="#" className="hover:text-white/80 transition-colors" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-white/80 transition-colors" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-white/80 transition-colors" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        
        {/* Decorative bottom line */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0"></div>
      </div>
      
      {/* Main Header - Advanced Glassmorphism */}
      <div 
        className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/20 transition-all duration-500 ${
          scrolled 
            ? 'py-2 md:py-3' 
            : 'py-3 md:py-5'
        }`}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div ref={logoRef} className="flex-shrink-0">
              <Link 
                href="/" 
                className="flex items-center gap-3 group relative"
                aria-label={SCHOOL_NAME}
              >
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 overflow-hidden rounded-full flex items-center justify-center border-2 border-primary/20 shadow-lg shadow-primary/5 bg-white dark:bg-black group-hover:border-primary/40 transition-all duration-300">
                  <img 
                    src={SchoolLogoSrc} 
                    alt={SCHOOL_NAME} 
                    className="w-full h-full object-contain p-1 animate-subtle-pulse filter drop-shadow-glow"
                  />
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-white/20 to-accent/10 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500"></div>
                  
                  {/* Pulsing ring on hover */}
                  <div className="absolute -inset-0.5 rounded-full border-2 border-primary/20 dark:border-primary/40 opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-125 transition-all duration-700"></div>
                </div>
                
                <div className="transition-all duration-300 group-hover:translate-x-1">
                  <h1 className="font-bold text-lg sm:text-xl lg:text-2xl leading-none">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">{SCHOOL_NAME.split(' ')[0]}</span>
                  </h1>
                  <p className="text-xs sm:text-sm font-medium tracking-widest text-gray-600 dark:text-gray-400">
                    MAHA VIDYALAYA
                  </p>
                </div>
                
                {/* Focus ring for accessibility */}
                <div className="absolute -inset-4 rounded-full opacity-0 group-focus-visible:opacity-100 ring-2 ring-primary/30 dark:ring-primary/50 transition-opacity"></div>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div
              ref={navRef} 
              className={`hidden lg:flex items-center justify-center transition-all`}
            >
              <nav className="flex space-x-1">
                {navigationItems.map((item, index) => (
                  item.submenu ? (
                    <div key={index} className="relative group nav-item">
                      <button
                        className={`flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                          isActive(item.href)
                            ? 'text-primary shadow-sm bg-white/70 dark:bg-gray-800/70'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white hover:shadow-sm'
                        }`}
                        aria-expanded={activeSubmenu === item.label}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                          isActive(item.href) ? 'text-primary' : 'text-gray-400 dark:text-gray-500 group-hover:text-current'
                        } group-hover:rotate-180`} />
                      </button>
                      
                      {/* Dropdown */}
                      <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 translate-y-2 group-hover:translate-y-0">
                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-lg shadow-xl border border-gray-100/50 dark:border-gray-700/50 overflow-hidden">
                          {item.submenu.map((subitem, subindex) => (
                            <Link
                              key={subindex}
                              href={subitem.href}
                              className={`block px-4 py-2.5 w-full text-left transition-colors ${
                                isActive(subitem.href)
                                  ? 'bg-primary/10 text-primary font-medium'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 hover:text-gray-900 dark:hover:text-white'
                              }`}
                            >
                              <span>{subitem.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={index}
                      href={item.href}
                      className={`nav-item flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                        isActive(item.href)
                          ? 'text-primary shadow-sm bg-white/70 dark:bg-gray-800/70'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white hover:shadow-sm'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive(item.href) && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full"></span>
                      )}
                    </Link>
                  )
                ))}
              </nav>
            </div>
            
            {/* Right Side Actions */}
            <div ref={actionsRef} className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
              {/* Search Button */}
              <button 
                className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${
                  scrolled 
                    ? 'bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-700 shadow-sm backdrop-blur-md' 
                    : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm'
                }`}
                aria-label="Search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
              </button>
              
              {/* Notifications - Only on larger screens */}
              <button 
                className={`hidden sm:flex p-2 rounded-lg transition-all duration-300 ${
                  scrolled 
                    ? 'bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-700 shadow-sm backdrop-blur-md' 
                    : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm'
                }`}
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
              </button>
              
              {/* Dark Mode Toggle */}
              <DarkModeToggle />
              
              {/* Mobile Menu Button - Only on mobile */}
              {isMobile && (
                <button 
                  id="menu-btn"
                  className={`flex p-2 rounded-lg transition-all duration-300 ${
                    scrolled 
                      ? 'bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-700 shadow-sm backdrop-blur-md' 
                      : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm'
                  }`}
                  onClick={toggleMenu}
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isMenuOpen}
                >
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    {isMenuOpen ? (
                      <X className="w-5 h-5 text-primary absolute animate-fade-in" />
                    ) : (
                      <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300 absolute animate-fade-in" />
                    )}
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
