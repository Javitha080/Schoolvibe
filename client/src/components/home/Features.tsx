import React, { useRef } from 'react';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import SectionHeading from '@/components/common/SectionHeading';
import { Button } from '@/components/ui/button';
import { useGSAP, gsap, ScrollTrigger } from '@/lib/gsap';

const features = [
  {
    icon: 'flask',
    title: 'Modern Laboratories',
    description: 'Well-equipped science and computer laboratories for practical learning experiences.'
  },
  {
    icon: 'book',
    title: 'Library',
    description: 'A comprehensive library with a vast collection of books, journals, and digital resources.'
  },
  {
    icon: 'futbol',
    title: 'Sports Facilities',
    description: 'Extensive sports grounds for cricket, football, basketball, and other athletic activities.'
  },
  {
    icon: 'paint-brush',
    title: 'Arts Center',
    description: 'Dedicated spaces for visual arts, music, dance, and other creative expressions.'
  },
  {
    icon: 'laptop',
    title: 'Technology Integration',
    description: 'Smart classrooms equipped with modern teaching technologies for enhanced learning.'
  },
  {
    icon: 'users',
    title: 'Counseling Services',
    description: "Professional guidance and counseling services for students' personal and academic development."
  }
];

export default function Features() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // GSAP animations
  useGSAP((gsap) => {
    if (featuresRef.current) {
      const featureItems = featuresRef.current.querySelectorAll('.feature-item');
      
      gsap.from(featureItems, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
        }
      });
    }
    
    if (ctaRef.current) {
      gsap.from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 90%',
        }
      });
    }
  }, []);

  return (
    <Section padding="xl" background="muted">
      <Container>
        <SectionHeading 
          title="School Facilities"
          subtitle="Our campus offers modern facilities that enhance the learning experience and support student development."
        />
        
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {features.map((feature, index) => (
            <div key={index} className="flex feature-item">
              <div className="flex-shrink-0 mr-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-white">
                  <i className={`fas fa-${feature.icon}`}></i>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-montserrat font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div ref={ctaRef} className="mt-16 text-center">
          <Button variant="default" size="xl">
            Explore All Facilities
          </Button>
        </div>
      </Container>
    </Section>
  );
}
