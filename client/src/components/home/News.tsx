import React, { useRef } from 'react';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import SectionHeading from '@/components/common/SectionHeading';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGSAP, gsap, ScrollTrigger } from '@/lib/gsap';

const newsItems = [
  {
    id: 1,
    title: 'Annual Science Exhibition Showcases Student Innovation',
    date: 'September 15, 2023',
    category: 'Event',
    image: 'https://images.unsplash.com/photo-1550305080-4e029753abcf?q=80&w=1171&auto=format&fit=crop',
    description: 'Students presented groundbreaking projects at our annual science exhibition, demonstrating creativity and scientific knowledge.'
  },
  {
    id: 2,
    title: 'Cricket Team Wins District Championship',
    date: 'August 28, 2023',
    category: 'Achievement',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1170&auto=format&fit=crop',
    description: 'Our cricket team demonstrated exceptional skill and sportsmanship to secure the district championship trophy.'
  },
  {
    id: 3,
    title: 'New Smart Classrooms Enhance Learning Experience',
    date: 'August 12, 2023',
    category: 'Update',
    image: 'https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?q=80&w=1170&auto=format&fit=crop',
    description: 'The school has upgraded five classrooms with smart technology to create interactive learning environments.'
  }
];

export default function News() {
  const newsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // GSAP animations
  useGSAP((gsap) => {
    if (newsRef.current) {
      const newsCards = newsRef.current.querySelectorAll('.news-card');
      
      gsap.from(newsCards, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: newsRef.current,
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

  const getBadgeVariant = (category: string) => {
    switch (category) {
      case 'Event':
        return 'event';
      case 'Achievement':
        return 'achievement';
      case 'Update':
        return 'update';
      default:
        return 'default';
    }
  };

  return (
    <Section id="news" padding="xl" background="default">
      <Container>
        <SectionHeading 
          title="Latest News"
          subtitle="Stay updated with the latest happenings, events, and achievements at our school."
        />
        
        <div ref={newsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((news) => (
            <Card key={news.id} glassmorphism className="overflow-hidden news-card">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
                <div className="absolute top-4 left-4">
                  <Badge variant={getBadgeVariant(news.category)}>
                    {news.category}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <i className="far fa-calendar-alt mr-2"></i>
                  <span>{news.date}</span>
                </div>
                <h3 className="text-xl font-montserrat font-bold mb-3">{news.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {news.description}
                </p>
                <a href="#" className="inline-flex items-center text-primary dark:text-accent font-medium hover:underline">
                  Read more
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </Card>
          ))}
        </div>
        
        <div ref={ctaRef} className="mt-12 text-center">
          <Button variant="school" size="xl">
            View All News
          </Button>
        </div>
      </Container>
    </Section>
  );
}
