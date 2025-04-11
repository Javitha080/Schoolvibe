import React, { useEffect, useRef, useState } from 'react';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import SectionHeading from '@/components/common/SectionHeading';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SCHOOL_CONTACT, SCHOOL_ADDRESS } from '@/lib/constants';
import { useGSAP, gsap, ScrollTrigger } from '@/lib/gsap';

export default function Contact() {
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(true);
  
  // GSAP animations
  useGSAP((gsap) => {
    if (contactInfoRef.current) {
      gsap.from(contactInfoRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: 'top 80%',
        }
      });
    }
    
    if (contactFormRef.current) {
      gsap.from(contactFormRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: contactFormRef.current,
          start: 'top 80%',
        }
      });
    }
    
    if (mapRef.current) {
      gsap.from(mapRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top 85%',
        }
      });
    }
  }, []);

  return (
    <Section id="contact" padding="xl" background="muted">
      <Container>
        <SectionHeading 
          title="Contact Us"
          subtitle="Have questions or want to learn more? Reach out to us through any of the following channels."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact info */}
          <div ref={contactInfoRef}>
            <Card glassmorphism className="p-8">
              <h3 className="text-2xl font-montserrat font-bold mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold mb-1">Address</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {SCHOOL_ADDRESS.split(',').map((line: string, index: number) => (
                        <span key={index}>
                          {line.trim()}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold mb-1">Phone</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {SCHOOL_CONTACT.phone.map((phone: string, index: number) => (
                        <span key={index}>
                          {phone}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary">
                      <i className="fas fa-envelope"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold mb-1">Email</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {SCHOOL_CONTACT.email.map((email: string, index: number) => (
                        <span key={index}>
                          {email}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary">
                      <i className="fas fa-clock"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold mb-1">Office Hours</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {SCHOOL_CONTACT.hours.split('\n').map((line: string, index: number) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-bold mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary hover:text-white transition-colors">
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary hover:text-white transition-colors">
                    <i className="fab fa-twitter"></i>
                  </button>
                  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary hover:text-white transition-colors">
                    <i className="fab fa-instagram"></i>
                  </button>
                  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary hover:text-white transition-colors">
                    <i className="fab fa-youtube"></i>
                  </button>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Contact form */}
          <div ref={contactFormRef}>
            <Card glassmorphism className="p-8">
              <h3 className="text-2xl font-montserrat font-bold mb-6">Send Us a Message</h3>
              
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="name">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent transition-all" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent transition-all" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2" htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent transition-all" 
                    required 
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2" htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent transition-all" 
                    required
                  ></textarea>
                </div>
                
                <Button type="submit" variant="default" size="xl" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
        
        {/* Map */}
        <div ref={mapRef} className="japanese-box rounded-xl overflow-hidden h-[400px] glassmorphism w-full">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.5037630123283!2d79.9524473!3d6.8328778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae251b6851d8313%3A0xdb6af81cf19b7946!2sHomagama%20Maha%20Vidyalaya!5e0!3m2!1sen!2sus!4v1682509817417!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Homagama Maha Vidyalaya Location"
            className="rounded-xl shadow-xl"
          />
        </div>
      </Container>
    </Section>
  );
}
