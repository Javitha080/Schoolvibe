import React from 'react';
import { Link } from 'wouter';
import { SCHOOL_NAME, SCHOOL_ADDRESS, SCHOOL_CONTACT, SOCIAL_MEDIA, SECTION_IDS } from '@/lib/constants';
import { useTheme } from '@/hooks/use-theme';
import { useScrollTrigger } from '@/hooks/use-scroll-trigger';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, Send, ExternalLink, ChevronRight, School } from 'lucide-react';
import SchoolLogoSrc from '@/assets/images/school-logo.png';

export default function Footer() {
  const { theme } = useTheme();
  const footerRef = useScrollTrigger<HTMLElement>({
    threshold: 0.1,
    once: true
  });
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      ref={footerRef} 
      className="relative bg-gray-950 text-white pt-20 pb-10 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20 -mr-24 -mt-24"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-10 -ml-24 -mb-24"></div>
      
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* School Info - Logo and Description */}
          <div className="lg:col-span-4 opacity-0 animate-slide-up delay-100" style={{animationFillMode: 'forwards'}}>
            <div className="flex flex-col items-start">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 relative mr-3 rounded-full flex items-center justify-center border-2 border-accent/20 bg-black">
                  <img 
                    src={SchoolLogoSrc}
                    alt={SCHOOL_NAME}
                    className="w-full h-full p-1 object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 mix-blend-overlay rounded-full"></div>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Homagama</span>
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm tracking-wider">MAHA VIDYALAYA</p>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-6 sm:mb-8 max-w-md leading-relaxed">
                Providing excellence in education since 1950, nurturing young minds and empowering students to become leaders of tomorrow in a supportive and inspiring environment.
              </p>
              
              <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">Follow Us</h3>
              <div className="flex space-x-2 sm:space-x-3">
                {SOCIAL_MEDIA.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url} 
                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary/80 text-gray-300 hover:text-white transition-all transform hover:-translate-y-1"
                    aria-label={`${social.icon} profile`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={`fab fa-${social.icon} text-base sm:text-lg`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="lg:col-span-2 opacity-0 animate-slide-up delay-200" style={{animationFillMode: 'forwards'}}>
            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-5 relative text-white">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-10 sm:w-12 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <FooterLink href="/" label="Home" />
              <FooterLink href={`/#${SECTION_IDS.about}`} label="About Us" />
              <FooterLink href={`/#${SECTION_IDS.academic}`} label="Academic" />
              <FooterLink href={`/#${SECTION_IDS.admissions}`} label="Admissions" />
              <FooterLink href={`/#${SECTION_IDS.gallery}`} label="Gallery" />
              <FooterLink href={`/#${SECTION_IDS.news}`} label="News" />
              <FooterLink href={`/#${SECTION_IDS.contact}`} label="Contact" />
            </ul>
          </div>
          
          {/* Programs */}
          <div className="lg:col-span-2 opacity-0 animate-slide-up delay-300" style={{animationFillMode: 'forwards'}}>
            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-5 relative text-white">
              Programs
              <span className="absolute -bottom-2 left-0 w-10 sm:w-12 h-1 bg-accent rounded-full"></span>
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <FooterLink href={`/#${SECTION_IDS.primary}`} label="Primary Education" />
              <FooterLink href={`/#${SECTION_IDS.secondary}`} label="Secondary Education" />
              <FooterLink href={`/#${SECTION_IDS.stem}`} label="STEM Program" />
              <FooterLink href={`/#${SECTION_IDS.arts}`} label="Arts & Culture" />
              <FooterLink href={`/#${SECTION_IDS.sports}`} label="Sports Excellence" />
              <FooterLink href={`/#${SECTION_IDS.activities}`} label="Extracurricular Activities" />
            </ul>
          </div>
          
          {/* Contact Information */}
          <div className="lg:col-span-4 opacity-0 animate-slide-up delay-400" style={{animationFillMode: 'forwards'}}>
            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-5 relative text-white">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-10 sm:w-12 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-800 group-hover:bg-primary/20 flex items-center justify-center mr-2 sm:mr-3 transition-colors">
                  <MapPin size={16} className="text-gray-300 group-hover:text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">{SCHOOL_ADDRESS}</p>
                  <a 
                    href={`https://maps.google.com/?q=${SCHOOL_ADDRESS}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-primary flex items-center mt-1 hover:underline"
                  >
                    <span>View on map</span>
                    <ExternalLink size={12} className="ml-1" />
                  </a>
                </div>
              </li>
              
              <li className="flex items-center group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-800 group-hover:bg-primary/20 flex items-center justify-center mr-2 sm:mr-3 transition-colors">
                  <Phone size={16} className="text-gray-300 group-hover:text-primary" />
                </div>
                <div>
                  <a href={`tel:${SCHOOL_CONTACT.phone[0]}`} className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">
                    {SCHOOL_CONTACT.phone[0]}
                  </a>
                  {SCHOOL_CONTACT.phone[1] && (
                    <a href={`tel:${SCHOOL_CONTACT.phone[1]}`} className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors block mt-1">
                      {SCHOOL_CONTACT.phone[1]}
                    </a>
                  )}
                </div>
              </li>
              
              <li className="flex items-center group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-800 group-hover:bg-primary/20 flex items-center justify-center mr-2 sm:mr-3 transition-colors">
                  <Mail size={16} className="text-gray-300 group-hover:text-primary" />
                </div>
                <a href={`mailto:${SCHOOL_CONTACT.email[0]}`} className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">
                  {SCHOOL_CONTACT.email[0]}
                </a>
              </li>
              
              <li className="flex items-center group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-800 group-hover:bg-primary/20 flex items-center justify-center mr-2 sm:mr-3 transition-colors">
                  <Clock size={16} className="text-gray-300 group-hover:text-primary" />
                </div>
                <div className="text-xs sm:text-sm text-gray-300">
                  <p className="group-hover:text-white transition-colors">Mon-Fri: 8:00 AM - 3:30 PM</p>
                  <p className="text-gray-400 text-xs mt-1">Weekends & Holidays: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 sm:p-8 mb-10 sm:mb-12 glassmorphism max-w-4xl mx-auto opacity-0 animate-slide-up delay-500" style={{animationFillMode: 'forwards'}}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="md:max-w-sm">
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">Newsletter</h3>
              <p className="text-gray-300 text-xs sm:text-sm">Subscribe to our newsletter to receive updates on school events, news, and announcements.</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-1">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 pl-10 sm:pl-12 text-sm rounded-lg border border-gray-700 bg-gray-800/40 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
                <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white rounded-lg px-4 sm:px-5 py-2 sm:py-3 text-sm font-medium flex items-center justify-center transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                <span>Subscribe</span>
                <Send size={14} className="ml-2" />
              </Button>
            </form>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-800/50 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center opacity-0 animate-slide-up delay-600" style={{animationFillMode: 'forwards'}}>
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-gray-400 text-xs sm:text-sm">
              &copy; {currentYear} {SCHOOL_NAME}. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Designed with <span className="text-primary">♥</span> for excellence in education
            </p>
          </div>
          <div className="flex space-x-3 sm:space-x-5">
            <a href="/privacy-policy" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">Privacy Policy</a>
            <a href="/terms-of-use" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">Terms of Use</a>
            <a href="/sitemap" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Footer Link Component
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-gray-400 hover:text-white transition-colors flex items-center group text-xs sm:text-sm"
      >
        <ChevronRight size={12} className="mr-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-primary" />
        <span>{label}</span>
      </Link>
    </li>
  );
}
