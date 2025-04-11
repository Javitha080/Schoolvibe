import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { SCHOOL_NAME, SCHOOL_TAGLINE, SOCIAL_MEDIA, SCHOOL_CONTACT } from '@/lib/constants';
import { useGSAP, gsap } from '@/lib/gsap';
import { Button } from '@/components/ui/button';
import { X, Home, Info, GraduationCap, Image, Newspaper, Mail, Calendar, Phone, ChevronDown, ChevronRight, Search, School } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import SchoolLogoSrc from '@/assets/images/school-logo.png';

// Use anime.js globally added from CDN
declare const anime: any;

interface MobileMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
}

export default function MobileMenu({ isOpen, closeMenu }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({
    about: false,
    academic: false,
  });

  // GSAP animations with enhanced effects
  useGSAP(() => {
    if (isOpen && menuRef.current) {
      // Menu entrance animation with glassmorphism effect
      gsap.fromTo(menuRef.current, 
        { x: '100%', opacity: 0.5, backdropFilter: 'blur(0px)' },
        { 
          x: '0%', 
          opacity: 1, 
          backdropFilter: 'blur(10px)', 
          duration: 0.5, 
          ease: 'power3.out' 
        }
      );
      
      // Create ripple effect when menu opens
      const createRipple = () => {
        if (!menuRef.current) return;
        
        const menuElement = menuRef.current;
        const menuWidth = menuElement.clientWidth;
        const menuHeight = menuElement.clientHeight;
        
        const ripple = document.createElement('div');
        ripple.className = 'absolute rounded-full bg-primary/10 z-0';
        menuElement.appendChild(ripple);
        
        gsap.fromTo(ripple, 
          { 
            width: '20px', 
            height: '20px', 
            x: menuWidth * 0.5, 
            y: menuHeight * 0.5,
            opacity: 1 
          },
          { 
            width: menuWidth * 2,
            height: menuWidth * 2,
            x: menuWidth * 0.5 - menuWidth,
            y: menuHeight * 0.5 - menuWidth,
            opacity: 0,
            duration: 1.5, 
            ease: 'power2.out',
            onComplete: () => ripple.remove()
          }
        );
      };
      
      createRipple();
      
      // Enhanced stagger animation for nav items with 3D effect
      if (navItemsRef.current) {
        const navItems = navItemsRef.current.querySelectorAll('.mobile-nav-item');
        gsap.fromTo(navItems, 
          { x: 50, opacity: 0, rotateY: -5, transformOrigin: 'left center' },
          { 
            x: 0, 
            opacity: 1, 
            rotateY: 0,
            duration: 0.4,
            stagger: 0.07,
            ease: 'back.out(1.7)',
            delay: 0.2
          }
        );
      }
    }
  }, [isOpen]);

  // Close menu on location change
  useEffect(() => {
    if (isOpen) {
      closeMenu();
    }
  }, [location, closeMenu, isOpen]);

  // Close menu when Escape key is pressed
  useEffect(() => {
    const handleEscKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscKeydown);
    
    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
    };
  }, [isOpen, closeMenu]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  // Enhanced toggleSection with anime.js animation
  const toggleSection = (section: string) => {
    // Update state
    setExpandedSections(prev => {
      const newState = {
        ...prev,
        [section]: !prev[section]
      };
      
      // Create animation with anime.js
      if (typeof anime !== 'undefined') {
        // Animate chevron rotation
        const chevronElement = document.querySelector(`.section-${section} .chevron-icon`);
        if (chevronElement) {
          anime({
            targets: chevronElement,
            rotate: newState[section] ? 180 : 0,
            duration: 400,
            easing: 'easeInOutQuad'
          });
        }
        
        // Animate submenu items when expanding
        if (newState[section]) {
          const subItems = document.querySelectorAll(`.submenu-${section} .submenu-item`);
          anime({
            targets: subItems,
            translateX: [20, 0],
            opacity: [0, 1],
            delay: anime.stagger(60),
            duration: 400,
            easing: 'easeOutQuad'
          });
        }
      }
      
      return newState;
    });
  };

  return (
    <>
      {/* Overlay */}
      <div 
        onClick={closeMenu}
        className={`fixed inset-0 bg-black/50 backdrop-blur-md z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />
      
      {/* Mobile menu with glassmorphism effect */}
      <div 
        ref={menuRef}
        className={`mobile-menu fixed top-0 right-0 h-full w-[75%] max-w-[320px] glassmorphism z-50 shadow-2xl transform ${
          isOpen ? 'translate-x-0 open' : 'translate-x-full'
        } transition-transform duration-500 ease-in-out overflow-hidden`}
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/5 blur-3xl -mr-24 -mt-24 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-accent/5 blur-3xl -ml-24 -mb-24 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
        
        <div className="flex flex-col h-full relative z-10">
          {/* Header */}
          <div className="relative px-6 py-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 relative overflow-hidden rounded-full border-2 border-accent/20 shadow-md bg-black flex items-center justify-center">
                  <img 
                    src={SchoolLogoSrc}
                    alt={SCHOOL_NAME}
                    className="w-full h-full p-1 object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 mix-blend-overlay rounded-full"></div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Homagama</span>
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 tracking-wider">MAHA VIDYALAYA</p>
                </div>
              </div>
              
              <button 
                onClick={closeMenu}
                className="p-2 rounded-full text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Search Bar */}
            <div className="mt-6 relative">
              <input 
                type="search" 
                placeholder="Search the website..." 
                className="w-full bg-gray-100 dark:bg-gray-800 border-0 rounded-lg py-2.5 px-4 pl-10 focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4 px-4">
            <nav ref={navItemsRef} className="flex flex-col space-y-0.5">
              {/* Home */}
              <MobileNavItem 
                href="/" 
                icon={<Home size={18} />}
                label="Home" 
                onClick={closeMenu}
              />
              
              {/* About Section - with glassmorphism and Japanese box style */}
              <div className="mobile-nav-item section-about mb-2">
                <button 
                  className="group w-full relative overflow-hidden pl-4 pr-3 py-3 text-gray-800 dark:text-gray-200 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors flex items-center justify-between glassmorphism cinematic-light"
                  onClick={() => toggleSection('about')}
                >
                  <div className="flex items-center">
                    <span className="nav-icon inline-flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary mr-3 transition-transform">
                      <Info size={18} />
                    </span>
                    <span className="font-medium">About Us</span>
                  </div>
                  <ChevronDown 
                    size={18} 
                    className={`chevron-icon text-gray-400 transition-transform duration-300`} 
                  />
                  <div className="absolute left-0 top-0 h-full w-1 bg-primary transform scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100"></div>
                </button>
                
                <div className={`submenu-about pl-6 pr-2 mt-1 mb-1 overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedSections.about ? 'max-h-[200px] opacity-100 animate-fade-in' : 'max-h-0 opacity-0'
                }`}>
                  <div className="py-1 pl-9 border-l-2 border-primary/30 dark:border-primary/20 space-y-1">
                    <MobileSubNavItem href="/#about" label="Overview" onClick={closeMenu} className="submenu-item" />
                    <MobileSubNavItem href="/#history" label="School History" onClick={closeMenu} className="submenu-item" />
                    <MobileSubNavItem href="/#principal" label="Principal's Message" onClick={closeMenu} className="submenu-item" />
                    <MobileSubNavItem href="/#facilities" label="Facilities" onClick={closeMenu} className="submenu-item" />
                  </div>
                </div>
              </div>
              
              {/* Academic Section - with glassmorphism and Japanese box style */}
              <div className="mobile-nav-item section-academic mb-2">
                <button 
                  className="group w-full relative overflow-hidden pl-4 pr-3 py-3 text-gray-800 dark:text-gray-200 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors flex items-center justify-between glassmorphism cinematic-light"
                  onClick={() => toggleSection('academic')}
                >
                  <div className="flex items-center">
                    <span className="nav-icon inline-flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary mr-3 transition-transform">
                      <GraduationCap size={18} />
                    </span>
                    <span className="font-medium">Academic</span>
                  </div>
                  <ChevronDown 
                    size={18} 
                    className={`chevron-icon text-gray-400 transition-transform duration-300`} 
                  />
                  <div className="absolute left-0 top-0 h-full w-1 bg-primary transform scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100"></div>
                </button>
                
                <div className={`submenu-academic pl-6 pr-2 mt-1 mb-1 overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedSections.academic ? 'max-h-[200px] opacity-100 animate-fade-in' : 'max-h-0 opacity-0'
                }`}>
                  <div className="py-1 pl-9 border-l-2 border-primary/30 dark:border-primary/20 space-y-1">
                    <MobileSubNavItem href="/#programs" label="Programs" onClick={closeMenu} className="submenu-item" />
                    <MobileSubNavItem href="/#curriculum" label="Curriculum" onClick={closeMenu} className="submenu-item" />
                    <MobileSubNavItem href="/#exams" label="Examinations" onClick={closeMenu} className="submenu-item" />
                    <MobileSubNavItem href="/#achievements" label="Achievements" onClick={closeMenu} className="submenu-item" />
                  </div>
                </div>
              </div>
              
              {/* Other Menu Items */}
              <MobileNavItem 
                href="/#admissions" 
                icon={<GraduationCap size={18} />}
                label="Admissions" 
                onClick={closeMenu}
              />
              
              <MobileNavItem 
                href="/#gallery" 
                icon={<Image size={18} />}
                label="Gallery" 
                onClick={closeMenu}
              />
              
              <MobileNavItem 
                href="/#news" 
                icon={<Newspaper size={18} />}
                label="News & Events" 
                onClick={closeMenu}
              />
              
              <MobileNavItem 
                href="/#contact" 
                icon={<Mail size={18} />}
                label="Contact Us" 
                onClick={closeMenu}
              />
              
              <MobileNavItem 
                href="/#calendar" 
                icon={<Calendar size={18} />}
                label="School Calendar" 
                onClick={closeMenu}
              />
              
              {/* Theme Switcher */}
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
                  <button
                    onClick={toggleTheme}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      theme === 'dark' ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`${
                        theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </button>
                </div>
              </div>
            </nav>
          </div>
          
          {/* Contact Info & Social */}
          <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
            <div className="space-y-4">
              {/* Quick Contact */}
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Phone size={14} className="text-primary mr-2" />
                  <a href={`tel:${SCHOOL_CONTACT.phone[0]}`} className="text-gray-600 dark:text-gray-300">
                    {SCHOOL_CONTACT.phone[0]}
                  </a>
                </div>
                <div className="flex items-center text-sm">
                  <Mail size={14} className="text-primary mr-2" />
                  <a href={`mailto:${SCHOOL_CONTACT.email[0]}`} className="text-gray-600 dark:text-gray-300">
                    {SCHOOL_CONTACT.email[0]}
                  </a>
                </div>
              </div>
              
              {/* Social Media */}
              <div>
                <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400 mb-2">Follow Us</p>
                <div className="flex items-center space-x-2">
                  {SOCIAL_MEDIA.map((item, index) => (
                    <a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 text-gray-600 dark:text-gray-300 transition-all"
                    >
                      <i className={`fab fa-${item.icon} text-sm`}></i>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Copyright */}
              <div className="text-center text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-800">
                &copy; {new Date().getFullYear()} {SCHOOL_NAME}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Mobile Navigation Item Component
interface MobileNavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

function MobileNavItem({ href, icon, label, onClick, isActive }: MobileNavItemProps) {
  // Use anime.js for advanced hover animations
  const linkRef = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    if (!linkRef.current || typeof anime === 'undefined') return;
    
    const element = linkRef.current;
    
    const handleMouseEnter = () => {
      anime({
        targets: element,
        translateX: ['0rem', '0.25rem'],
        duration: 400,
        easing: 'easeOutQuad'
      });
      
      // Scale icon with elastic animation
      anime({
        targets: element.querySelector('.nav-icon'),
        scale: [1, 1.15],
        duration: 500,
        easing: 'easeOutElastic(1, .5)'
      });
    };
    
    const handleMouseLeave = () => {
      anime({
        targets: element,
        translateX: ['0.25rem', '0rem'],
        duration: 400,
        easing: 'easeOutQuad'
      });
      
      anime({
        targets: element.querySelector('.nav-icon'),
        scale: [1.15, 1],
        duration: 300,
        easing: 'easeOutQuad'
      });
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <Link 
      ref={linkRef}
      href={href} 
      className="mobile-nav-item group relative overflow-hidden bg-white/5 dark:bg-white/5 pl-4 pr-3 py-3 text-gray-800 dark:text-gray-200 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors japanese-box"
      onClick={onClick}
    >
      <div className="flex items-center">
        <span className="nav-icon inline-flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary mr-3 transition-transform">
          {icon}
        </span>
        <span className="font-medium">{label}</span>
      </div>
      
      {/* Animated border indicator */}
      <div className="absolute left-0 top-0 h-full w-1 bg-primary transform scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100"></div>
      
      {/* Add cinematic lighting effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </Link>
  );
}

// Mobile Sub Navigation Item Component
interface MobileSubNavItemProps {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

function MobileSubNavItem({ href, label, onClick, className = '' }: MobileSubNavItemProps) {
  // Use anime.js to animate the hover effect
  const linkRef = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    if (!linkRef.current || typeof anime === 'undefined') return;
    
    const element = linkRef.current;
    
    const handleMouseEnter = () => {
      anime({
        targets: element.querySelector('.chevron-icon'),
        translateX: ['-0.5rem', '0rem'],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
      });
      
      anime({
        targets: element.querySelector('.label-text'),
        translateX: [0, '0.25rem'],
        duration: 300,
        easing: 'easeOutQuad'
      });
    };
    
    const handleMouseLeave = () => {
      anime({
        targets: element.querySelector('.chevron-icon'),
        translateX: ['0rem', '-0.5rem'],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInQuad'
      });
      
      anime({
        targets: element.querySelector('.label-text'),
        translateX: ['0.25rem', 0],
        duration: 300,
        easing: 'easeInQuad'
      });
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <Link 
      ref={linkRef}
      href={href} 
      className={`submenu-link flex items-center py-1.5 px-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors ${className}`}
      onClick={onClick}
    >
      <ChevronRight size={12} className="chevron-icon mr-1.5 opacity-0" />
      <span className="label-text">{label}</span>
    </Link>
  );
}
