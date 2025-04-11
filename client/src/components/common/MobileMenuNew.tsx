import { useRef, useState, useEffect } from 'react';
import { Link } from 'wouter';
import { 
  Calendar, ChevronDown, ChevronRight, GraduationCap, 
  Home, Image, Info, Mail, Menu, Newspaper, Phone, 
  Search, X, BookOpen, MessageSquare, LucideIcon, Sun, Moon, 
  Globe, Award, Send, Heart, Sparkles, School
} from 'lucide-react';
import { SCHOOL_CONTACT, SCHOOL_NAME, SOCIAL_MEDIA, SECTION_IDS, SCHOOL_ADDRESS } from '@/lib/constants';
import { useTheme } from '@/hooks/use-theme';
import SchoolLogoSrc from '@assets/1000160383-removebg-preview.png';
import { useGSAP } from '@/lib/gsap';

// Extend window interface for anime.js
declare global {
  interface Window {
    anime: any;
  }
}

// Access anime from window object if it exists
const anime = typeof window !== 'undefined' ? window.anime : undefined;

// Navigation item interface (consistent with Header)
interface NavItemType {
  label: string;
  href: string;
  icon: LucideIcon;
  submenu?: NavItemType[];
}

interface MobileMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
}

export default function MobileMenu({ isOpen, closeMenu }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const { theme, toggleTheme: themeToggle } = useTheme();
  
  // Generate navigation structure (consistent with Header)
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
        { label: 'Overview', href: `/#${SECTION_IDS.about}`, icon: Info },
        { label: 'History', href: `/#${SECTION_IDS.history}`, icon: School },
        { label: 'Principal', href: `/#${SECTION_IDS.principal}`, icon: Award },
        { label: 'Facilities', href: `/#${SECTION_IDS.facilities}`, icon: Sparkles }
      ]
    },
    {
      label: 'Academic',
      href: `/#${SECTION_IDS.academic}`,
      icon: BookOpen,
      submenu: [
        { label: 'Programs', href: `/#${SECTION_IDS.programs}`, icon: BookOpen },
        { label: 'Curriculum', href: `/#${SECTION_IDS.curriculum}`, icon: Award },
        { label: 'Examinations', href: `/#${SECTION_IDS.exams}`, icon: Award },
        { label: 'Achievements', href: `/#${SECTION_IDS.achievements}`, icon: Award }
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
    if (menuRef.current && isOpen) {
      // Create animation timeline
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" }});
      
      // Menu background animation
      timeline.from(menuRef.current, {
        x: "100%",
        duration: 0.6
      });
      
      // Header elements
      const headerElements = menuRef.current.querySelectorAll('.menu-header > *');
      timeline.from(headerElements, {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4
      }, "-=0.3");
      
      // Nav items staggered animation
      if (navItemsRef.current) {
        const navItems = navItemsRef.current.querySelectorAll('.mobile-nav-item');
        timeline.from(navItems, {
          x: 30,
          opacity: 0,
          stagger: 0.05,
          duration: 0.4
        }, "-=0.2");
      }
      
      // Footer elements
      const footerElements = menuRef.current.querySelectorAll('.menu-footer > *');
      timeline.from(footerElements, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4
      }, "-=0.4");
      
      // Decorative elements with delayed animation
      const decorElements = menuRef.current.querySelectorAll('.decor-element');
      timeline.from(decorElements, {
        scale: 0.5,
        opacity: 0,
        transformOrigin: "center",
        stagger: 0.2,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.6");
    }
  }, [isOpen]);
  
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
  
  // Toggle section expansion
  const toggleSection = (label: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
    
    // Animate the chevron with anime.js
    if (anime) {
      const chevronElement = document.querySelector(`.chevron-${label.toLowerCase().replace(/\s+/g, '-')}`);
      
      if (chevronElement) {
        anime({
          targets: chevronElement,
          rotateZ: expandedSections[label] ? [180, 0] : [0, 180],
          duration: 400,
          easing: 'easeOutQuad'
        });
      }
    }
  };
  
  // Toggle theme
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
      {/* Overlay with enhanced backdrop blur */}
      <div 
        className={`mobile-menu-backdrop fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-all duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
        onClick={closeMenu}
      />
      
      {/* Mobile menu with advanced glassmorphism effect */}
      <div 
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[360px] z-[70] bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-500 ease-out overflow-hidden border-l border-white/20 dark:border-gray-800/20`}
        aria-modal="true"
        role="dialog"
        aria-label="Mobile navigation menu"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="decor-element absolute -top-20 -right-20 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
          <div className="decor-element absolute -bottom-32 -left-20 w-72 h-72 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
          <div className="decor-element absolute top-1/4 left-1/2 w-20 h-20 bg-primary/5 rounded-full blur-xl opacity-50 transform -translate-x-1/2 animate-pulse-slow"></div>
          <div className="decor-element absolute bottom-1/3 right-10 w-12 h-12 bg-accent/5 rounded-full blur-lg opacity-50 animate-pulse-custom"></div>
        </div>
        
        <div className="flex flex-col h-full relative z-10">
          {/* Header section */}
          <div className="menu-header px-5 sm:px-7 py-5 sm:py-6 border-b border-gray-200/70 dark:border-gray-800/70">
            <div className="flex items-center justify-between mb-5">
              {/* Logo and School Name */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-full flex items-center justify-center border-2 border-primary/20 shadow-lg shadow-primary/5 bg-white dark:bg-black group-hover:border-primary/40 transition-all duration-300">
                  <img 
                    src={SchoolLogoSrc} 
                    alt={SCHOOL_NAME} 
                    className="w-full h-full object-contain p-1 animate-subtle-pulse filter drop-shadow-glow"
                  />
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-white/20 to-accent/10 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500"></div>
                </div>
                
                <div>
                  <h2 className="font-bold text-lg sm:text-xl leading-none">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">{SCHOOL_NAME.split(' ')[0]}</span>
                  </h2>
                  <p className="text-xs sm:text-sm font-medium tracking-widest text-gray-600 dark:text-gray-400">
                    MAHA VIDYALAYA
                  </p>
                </div>
              </div>
              
              {/* Close button */}
              <button 
                onClick={closeMenu}
                className="p-2 rounded-lg text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <input 
                type="search" 
                placeholder="Search the website..." 
                className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-primary/30 focus:border-transparent outline-none transition-all text-sm placeholder-gray-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-5 px-3 sm:px-5">
            <nav ref={navItemsRef} className="flex flex-col space-y-1">
              {navigationItems.map((item, index) => (
                item.submenu ? (
                  <div key={index} className="mobile-nav-item mb-1">
                    <button 
                      className="group w-full relative overflow-hidden px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white rounded-lg transition-all duration-300 flex items-center justify-between"
                      onClick={() => toggleSection(item.label)}
                      aria-expanded={!!expandedSections[item.label]}
                    >
                      <div className="flex items-center">
                        <span className="nav-icon inline-flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary mr-3 transition-all">
                          <item.icon size={16} />
                        </span>
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`chevron-icon chevron-${item.label.toLowerCase().replace(/\s+/g, '-')} text-gray-400 transition-transform duration-300 transform ${
                          expandedSections[item.label] ? 'rotate-180' : 'rotate-0'
                        }`} 
                      />
                      
                      {/* Left border accent that reveals on hover */}
                      <div className="absolute left-0 top-0 h-full w-1 bg-primary transform scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100"></div>
                    </button>
                    
                    {/* Submenu */}
                    <div className={`pl-14 pr-4 mt-1 overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedSections[item.label] ? 'max-h-[250px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="py-1 space-y-1 border-l-2 border-primary/30 dark:border-primary/20 pl-4">
                        {item.submenu.map((subitem, subindex) => (
                          <Link
                            key={subindex}
                            href={subitem.href}
                            className="group flex items-center py-2 px-3 text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary rounded-md hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all"
                            onClick={closeMenu}
                          >
                            <span className="block">{subitem.label}</span>
                            <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={index}
                    href={item.href}
                    className="mobile-nav-item group relative flex items-center px-4 py-3 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
                    onClick={closeMenu}
                  >
                    <span className="nav-icon inline-flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary mr-3 transition-all group-hover:bg-primary/20 group-hover:scale-105">
                      <item.icon size={16} />
                    </span>
                    <span className="font-medium">{item.label}</span>
                    <ChevronRight size={16} className="ml-auto text-gray-400 dark:text-gray-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                )
              ))}
            </nav>
            
            {/* Theme Switcher */}
            <div className="mt-6 pt-4 border-t border-gray-200/70 dark:border-gray-800/70">
              <div className="flex items-center justify-between px-4 py-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg">
                <div className="flex items-center">
                  {theme === 'dark' ? (
                    <Moon size={18} className="text-primary mr-3" />
                  ) : (
                    <Sun size={18} className="text-primary mr-3" />
                  )}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </span>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                    theme === 'dark' ? 'bg-primary' : 'bg-gray-200'
                  }`}
                  aria-pressed={theme === 'dark'}
                >
                  <span
                    className={`${
                      theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform`}
                  />
                </button>
              </div>
            </div>
          </div>
          
          {/* Footer with contact information */}
          <div className="menu-footer p-5 border-t border-gray-200/70 dark:border-gray-800/70 bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm">
            <h4 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-3 tracking-wider">Contact Us</h4>
            
            <div className="space-y-2">
              <a 
                href={`tel:${SCHOOL_CONTACT.phone[0].replace(/[^0-9]/g,'')}`}
                className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <Phone size={14} className="text-primary mr-2 flex-shrink-0" />
                <span>{SCHOOL_CONTACT.phone[0]}</span>
              </a>
              
              <a 
                href={`mailto:${SCHOOL_CONTACT.email[0]}`}
                className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <Mail size={14} className="text-primary mr-2 flex-shrink-0" />
                <span>{SCHOOL_CONTACT.email[0]}</span>
              </a>
              
              <p className="flex items-start text-sm text-gray-700 dark:text-gray-300 mt-1">
                <MapPin size={14} className="text-primary mr-2 flex-shrink-0 mt-1" />
                <span>{SCHOOL_ADDRESS}</span>
              </p>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3 mt-4">
              {SOCIAL_MEDIA.map((item, index) => (
                <a 
                  key={index}
                  href={item.url}
                  className="w-8 h-8 rounded-full bg-white/50 dark:bg-gray-800/50 flex items-center justify-center text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all"
                  aria-label={`Social media link ${index + 1}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className={`fab fa-${item.icon}`}></i>
                </a>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-800/50 text-xs text-center text-gray-500 dark:text-gray-400">
              <p>© {new Date().getFullYear()} {SCHOOL_NAME}</p>
              <p className="flex items-center justify-center mt-1">
                <Heart size={10} className="text-primary mr-1" />
                <span>Excellence in Education</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Fix TypeScript error for MapPin
const MapPin = ({ size, className }: { size: number, className: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
};