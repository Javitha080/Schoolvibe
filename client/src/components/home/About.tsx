import React, { useRef } from 'react';
import { SCHOOL_STATS } from '@/lib/constants';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import SectionHeading from '@/components/common/SectionHeading';
import { Card, CardContent } from '@/components/ui/card';
import { useNumberCounter } from '@/hooks/use-number-counter';
import { useGSAP, gsap, ScrollTrigger } from '@/lib/gsap';

export default function About() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  // Animated statistics
  const students = useNumberCounter(SCHOOL_STATS.students, { duration: 2000, delay: 300 });
  const teachers = useNumberCounter(SCHOOL_STATS.teachers, { duration: 2000, delay: 600 });
  const classrooms = useNumberCounter(SCHOOL_STATS.classrooms, { duration: 2000, delay: 900 });
  const years = useNumberCounter(SCHOOL_STATS.yearsOfExcellence, { duration: 2000, delay: 1200 });
  
  // GSAP animations
  useGSAP((gsap) => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.card');
      
      gsap.from(cards, {
        scale: 0.9,
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        }
      });
    }
    
    if (statsRef.current) {
      gsap.from(statsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
        }
      });
    }
  }, []);

  return (
    <Section id="about" padding="xl" background="default">
      <Container>
        <SectionHeading 
          title="About Our School"
          subtitle="Learn about our history, mission, and the values that drive our commitment to educational excellence."
        />
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About card 1 */}
          <Card glassmorphism className="p-6 card transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <CardContent className="p-0">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full mb-6">
                <i className="fas fa-landmark text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-montserrat font-bold mb-4">Our History</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Founded in 1950, Homagama Maha Vidyalaya has a rich history of academic excellence and producing well-rounded individuals.
              </p>
              <a href="#" className="inline-flex items-center text-primary dark:text-accent font-medium hover:underline">
                Learn more
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </CardContent>
          </Card>
          
          {/* About card 2 */}
          <Card glassmorphism className="p-6 card transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <CardContent className="p-0">
              <div className="flex items-center justify-center w-16 h-16 bg-accent/10 dark:bg-accent/20 rounded-full mb-6">
                <i className="fas fa-bullseye text-2xl text-accent"></i>
              </div>
              <h3 className="text-xl font-montserrat font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                To provide quality education that empowers students to excel academically and contribute positively to society.
              </p>
              <a href="#" className="inline-flex items-center text-primary dark:text-accent font-medium hover:underline">
                Learn more
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </CardContent>
          </Card>
          
          {/* About card 3 */}
          <Card glassmorphism className="p-6 card transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <CardContent className="p-0">
              <div className="flex items-center justify-center w-16 h-16 bg-secondary/10 dark:bg-secondary/20 rounded-full mb-6">
                <i className="fas fa-graduation-cap text-2xl text-secondary"></i>
              </div>
              <h3 className="text-xl font-montserrat font-bold mb-4">Our Approach</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We believe in a holistic approach to education that nurtures academic achievement, creativity, and character.
              </p>
              <a href="#" className="inline-flex items-center text-primary dark:text-accent font-medium hover:underline">
                Learn more
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </CardContent>
          </Card>
        </div>
        
        {/* Stats section */}
        <div ref={statsRef} className="mt-20 py-12 px-6 bg-gray-100 dark:bg-gray-800/50 rounded-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-montserrat font-bold text-primary dark:text-accent mb-2">
                {students}
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Students</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-montserrat font-bold text-primary dark:text-accent mb-2">
                {teachers}
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Teachers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-montserrat font-bold text-primary dark:text-accent mb-2">
                {classrooms}
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Classrooms</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-montserrat font-bold text-primary dark:text-accent mb-2">
                {years}
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Years of Excellence</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
