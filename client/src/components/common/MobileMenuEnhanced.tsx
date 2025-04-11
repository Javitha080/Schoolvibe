import { useRef, useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Calendar, ChevronDown, ChevronRight, GraduationCap, Home, Image, Info, Mail, Menu, Newspaper, Phone, Search, X } from 'lucide-react';
import { SCHOOL_CONTACT, SCHOOL_NAME, SOCIAL_MEDIA, SECTION_IDS } from '@/lib/constants';
import { useTheme } from '@/hooks/use-theme';
import SchoolLogoSrc from '@assets/1000160383-removebg-preview.png';

// Extend window interface for anime.js
declare global {
  interface Window {
    anime: any;
  }
}

// Access anime from window object if it exists
const anime = typeof window !== 'undefined' ? window.anime : undefined;

interface MobileMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
}

export default function MobileMenu({ isOpen, closeMenu }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const [expandedSections, setExpandedSections] = useState({
    about: false,
    academic: false,
  });
  const { theme, toggleTheme: themeToggle } = useTheme();
  
  // Close the menu when clicking outside - improved version
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Check if the click is on the overlay/backdrop
      if ((e.target as Element).classList.contains('mobile-menu-backdrop')) {
        closeMenu();
        return;
      }
      
      // Check if the element or any of its parents have the menu-btn id
      let isMenuBtn = false;
      let targetEl = e.target as HTMLElement;
      
      // Walk up the DOM to check if we clicked on the menu button
      while (targetEl && !isMenuBtn) {
        if (targetEl.id === 'menu-btn') {
          isMenuBtn = true;
        }
        targetEl = targetEl.parentElement as HTMLElement;
      }
      
      // Close if clicking outside the menu and not on the menu button
      if (menuRef.current && 
          !menuRef.current.contains(e.target as Node) && 
          !isMenuBtn) {
        closeMenu();
      }
    };
    
    // Small delay to prevent immediate closing when the menu is just opened
    if (isOpen) {
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeMenu]);
  
  // Close menu with escape key
  useEffect(() => {
    const handleEscKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscKeydown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
    };
  }, [isOpen, closeMenu]);
  
  // Disable body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Apply animation to menu items when menu opens
  useEffect(() => {
    if (!navItemsRef.current || !isOpen || !anime) return;
    
    const navItems = navItemsRef.current.querySelectorAll('.mobile-nav-item');
    
    anime.timeline({
      easing: 'easeOutQuad',
    })
    .add({
      targets: navItems,
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 500,
      delay: anime.stagger(50, {start: 300}),
    });
    
  }, [isOpen]);
  
  const toggleSection = (section: 'about' | 'academic') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
    
    // Animate the chevron with anime.js
    if (anime) {
      const aboutChevron = document.querySelector(`.chevron-about`);
      const academicChevron = document.querySelector(`.chevron-academic`);
      
      if (section === 'about' && aboutChevron) {
        anime({
          targets: aboutChevron,
          rotateZ: expandedSections.about ? [180, 0] : [0, 180],
          duration: 400,
          easing: 'easeOutQuad'
        });
      }
      
      if (section === 'academic' && academicChevron) {
        anime({
          targets: academicChevron,
          rotateZ: expandedSections.academic ? [180, 0] : [0, 180],
          duration: 400,
          easing: 'easeOutQuad'
        });
      }
    }
  };
  
  const toggleTheme = () => {
    themeToggle();
  };
  
  // Apply ripple effect
  useEffect(() => {
    if (!navItemsRef.current || !anime) return;
    
    const handleRipple = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      
      // Create a ripple element
      const ripple = document.createElement('span');
      const rect = target.getBoundingClientRect();
      
      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.className = 'absolute rounded-full pointer-events-none bg-primary/20 dark:bg-primary/30';
      
      target.appendChild(ripple);
      
      // Animate the ripple
      anime({
        targets: ripple,
        scale: [0, 1],
        opacity: [0.6, 0],
        duration: 800,
        easing: 'easeOutExpo',
        complete: () => {
          ripple.remove();
        }
      });
    };
    
    const attachRippleToButtons = () => {
      const buttons = navItemsRef.current?.querySelectorAll('button, a') || [];
      buttons.forEach(button => {
        button.addEventListener('click', handleRipple as EventListener);
      });
      
      return () => {
        buttons.forEach(button => {
          button.removeEventListener('click', handleRipple as EventListener);
        });
      };
    };
    
    const cleanup = attachRippleToButtons();
    
    return () => {
      cleanup();
    };
  }, [navItemsRef.current, expandedSections]);
  
  return (
    <>
      {/* Overlay with improved backdrop blur */}
      <div 
        className={`mobile-menu-backdrop fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
        onClick={closeMenu}
      />
      
      {/* Mobile menu with glassmorphism effect */}
      <div 
        ref={menuRef}
        className={`mobile-menu mobile-menu-content fixed top-0 right-0 h-full w-[75%] max-w-[320px] glassmorphism z-60 shadow-2xl transform ${
          isOpen ? 'translate-x-0 open' : 'translate-x-full'
        } transition-transform duration-500 ease-in-out overflow-hidden`}
      >
        {/* Background decorative elements - enhanced with more dynamic styling */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/5 blur-3xl -mr-24 -mt-24 pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-accent/5 blur-3xl -ml-24 -mb-24 pointer-events-none animate-pulse-custom"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
        
        <div className="flex flex-col h-full relative z-10">
          {/* Header - with improved glassmorphism */}
          <div className="relative px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-200 dark:border-gray-800 glassmorphism">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 relative overflow-hidden rounded-full border-2 border-accent/20 shadow-md bg-black flex items-center justify-center">
                  <img 
                    src={SchoolLogoSrc}
                    alt={SCHOOL_NAME}
                    className="w-full h-full p-1 object-contain animate-float"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 mix-blend-overlay rounded-full"></div>
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Homagama</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 tracking-wider">MAHA VIDYALAYA</p>
                </div>
              </div>
              
              <button 
                onClick={closeMenu}
                className="p-1.5 sm:p-2 rounded-full text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cinematic-light"
                aria-label="Close menu"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
            
            {/* Search Bar - with glass effect */}
            <div className="mt-4 sm:mt-6 relative">
              <input 
                type="search" 
                placeholder="Search the website..." 
                className="w-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 rounded-lg py-2 sm:py-2.5 px-4 pl-9 sm:pl-10 focus:ring-2 focus:ring-primary outline-none transition-all text-xs sm:text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
            </div>
          </div>
          
          {/* Navigation - with improved spacing and animations */}
          <div className="flex-1 overflow-y-auto py-4 px-4">
            <nav ref={navItemsRef} className="flex flex-col space-y-2">
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
                  className="group w-full relative overflow-hidden pl-3 sm:pl-4 pr-2 sm:pr-3 py-2.5 sm:py-3 text-gray-800 dark:text-gray-200 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors flex items-center justify-between glassmorphism cinematic-light"
                  onClick={() => toggleSection('about')}
                >
                  <div className="flex items-center">
                    <span className="nav-icon inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-primary/10 text-primary mr-2 sm:mr-3 transition-transform">
                      <Info size={16} />
                    </span>
                    <span className="font-medium text-sm sm:text-base">About Us</span>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`chevron-icon chevron-about text-gray-400 transition-transform duration-300 transform ${
                      expandedSections.about ? 'rotate-180' : 'rotate-0'
                    }`} 
                  />
                  <div className="absolute left-0 top-0 h-full w-1 bg-primary transform scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100"></div>
                </button>
                
                <div className={`submenu-about pl-4 sm:pl-6 pr-2 mt-1 mb-1 overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedSections.about ? 'max-h-[200px] opacity-100 animate-fade-in' : 'max-h-0 opacity-0'
                }`}>
                  <div className="py-1 pl-7 sm:pl-9 border-l-2 border-primary/30 dark:border-primary/20 space-y-1">
                    <MobileSubNavItem href={`/#${SECTION_IDS.about}`} label="Overview" onClick={closeMenu} className="submenu-item" />
                    <MobileSubNavItem href={`/#${SECTION_IDS.history}`} label="School History" onClick={closeMenu} className="submenu-item" />
                    <MobileSubNavItem href={`/#${SECTION_IDS.principal}`} label="Principal's Message" onClick={closeMenu} className="submenu-item" />
                    <MobileSubNavItem href={`/#${SECTION_IDS.facilities}`} label="Facilities" onClick={closeMenu} className="submenu-item" />
                  </div>
                </div>
              </div>
              
              {/* Academic Section - with glassmorphism and Japanese box style */}
              <div className="mobile-nav-item section-academic mb-2">
                <button 
                  className="group w-full relative overflow-hidden pl-3 sm:pl-4 pr-2 sm:pr-3 py-2.5 sm:py-3 text-gray-800 dark:text-gray-200 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors flex items-center justify-between glassmorphism cinematic-light"
                  onClick={() => toggleSection('academic')}
                >
                  <div className="flex items-center">
                    <span className="nav-icon inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-primary/10 text-primary mr-2 sm:mr-3 transition-transform">
                      <GraduationCap size={16} />
                    </span>
                    <span className="font-medium text-sm sm:text-base">Academic</span>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`chevron-icon chevron-academic text-gray-400 transition-transform duration-300 transform ${
                      expandedSections.academic ? 'rotate-180' : 'rotate-0'
                    }`} 
                  />
                  <div className="absolute left-0 top-0 h-full w-1 bg-primary transform scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100"></div>
                </button>
                
                <div className={`submenu-academic pl-4 sm:pl-6 pr-2 mt-1 mb-1 overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedSections.academic ? 'max-h-[200px] opacity-100 animate-fade-in' : 'max-h-0 opacity-0'
                }`}>
                  <div className="py-1 pl-7 sm:pl-9 border-l-2 border-primary/30 dark:border-primary/20 space-y-1">
                    <MobileSubNavItem href={`/#${SECTION_IDS.programs}`} label="Programs" onClick={closeMenu} className="submenu-item" />
                    <MobileSubNavItem href={`/#${SECTION_IDS.curriculum}`} label="Curriculum" onClick={closeMenu} className="submenu-item" />
                    <MobileSubNavItem href={`/#${SECTION_IDS.exams}`} label="Examinations" onClick={closeMenu} className="submenu-item" />
                    <MobileSubNavItem href={`/#${SECTION_IDS.achievements}`} label="Achievements" onClick={closeMenu} className="submenu-item" />
                  </div>
                </div>
              </div>
              
              {/* Other Menu Items */}
              <MobileNavItem 
                href={`/#${SECTION_IDS.admissions}`} 
                icon={<GraduationCap size={16} />}
                label="Admissions" 
                onClick={closeMenu}
              />
              
              <MobileNavItem 
                href={`/#${SECTION_IDS.gallery}`} 
                icon={<Image size={16} />}
                label="Gallery" 
                onClick={closeMenu}
              />
              
              <MobileNavItem 
                href={`/#${SECTION_IDS.news}`} 
                icon={<Newspaper size={16} />}
                label="News & Events" 
                onClick={closeMenu}
              />
              
              <MobileNavItem 
                href={`/#${SECTION_IDS.contact}`} 
                icon={<Mail size={16} />}
                label="Contact Us" 
                onClick={closeMenu}
              />
              
              <MobileNavItem 
                href={`/#${SECTION_IDS.calendar}`} 
                icon={<Calendar size={16} />}
                label="School Calendar" 
                onClick={closeMenu}
              />
              
              {/* Theme Switcher - with glass effect */}
              <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 glassmorphism rounded-lg">
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
                  <button
                    onClick={toggleTheme}
                    className={`relative inline-flex h-5 sm:h-6 w-9 sm:w-11 items-center rounded-full transition-colors focus:outline-none ${
                      theme === 'dark' ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`${
                        theme === 'dark' ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'
                      } inline-block h-3 sm:h-4 w-3 sm:w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </button>
                </div>
              </div>
            </nav>
          </div>
          
          {/* Contact Info & Social - with glass effect */}
          <div className="px-4 sm:px-6 py-4 sm:py-6 border-t border-gray-200 dark:border-gray-800 glassmorphism">
            <div className="space-y-3 sm:space-y-4">
              {/* Quick Contact */}
              <div className="space-y-2">
                <div className="flex items-center text-xs sm:text-sm">
                  <Phone size={12} className="text-primary mr-2" />
                  <a href={`tel:${SCHOOL_CONTACT.phone[0]}`} className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                    {SCHOOL_CONTACT.phone[0]}
                  </a>
                </div>
                <div className="flex items-center text-xs sm:text-sm">
                  <Mail size={12} className="text-primary mr-2" />
                  <a href={`mailto:${SCHOOL_CONTACT.email[0]}`} className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors truncate">
                    {SCHOOL_CONTACT.email[0]}
                  </a>
                </div>
              </div>
              
              {/* Social Media - with improved hover effects */}
              <div>
                <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400 mb-2">Follow Us</p>
                <div className="flex items-center space-x-2">
                  {SOCIAL_MEDIA.map((item, index) => (
                    <a
                      key={index}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 text-gray-600 dark:text-gray-300 transition-all cinematic-light"
                    >
                      <i className={`fab fa-${item.icon} text-xs sm:text-sm`}></i>
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
      className="mobile-nav-item group relative overflow-hidden bg-white/5 dark:bg-white/5 pl-3 sm:pl-4 pr-2 sm:pr-3 py-2.5 sm:py-3 text-gray-800 dark:text-gray-200 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors japanese-box"
      onClick={onClick}
    >
      <div className="flex items-center">
        <span className="nav-icon inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-primary/10 text-primary mr-2 sm:mr-3 transition-transform">
          {icon}
        </span>
        <span className="font-medium text-sm sm:text-base">{label}</span>
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