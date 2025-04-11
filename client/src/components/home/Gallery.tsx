import React, { useState, useEffect, useRef } from 'react';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import SectionHeading from '@/components/common/SectionHeading';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { GALLERY_FILTERS } from '@/lib/constants';
import { useGSAP, gsap, ScrollTrigger } from '@/lib/gsap';

// Gallery items data
const galleryItems = [
  {
    id: 1,
    category: 'academics',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1170&auto=format&fit=crop',
    title: 'Interactive Classrooms',
    description: 'Engaging learning environments designed for student participation.'
  },
  {
    id: 2,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?q=80&w=1170&auto=format&fit=crop',
    title: 'Annual Sports Meet',
    description: 'Showcasing athletic talent and teamwork during our sports events.'
  },
  {
    id: 3,
    category: 'cultural',
    image: 'https://images.unsplash.com/photo-1526402978125-f1d6df91cbac?q=80&w=1170&auto=format&fit=crop',
    title: 'Cultural Festival',
    description: 'Celebrating diversity through art, music, and performances.'
  },
  {
    id: 4,
    category: 'academics',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1887&auto=format&fit=crop',
    title: 'Science Laboratory',
    description: 'State-of-the-art facilities for hands-on scientific exploration.'
  },
  {
    id: 5,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1626248801379-51a0748e0f8a?q=80&w=1170&auto=format&fit=crop',
    title: 'Cricket Tournament',
    description: 'Our cricket team showing exceptional skill and sportsmanship.'
  },
  {
    id: 6,
    category: 'cultural',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1170&auto=format&fit=crop',
    title: 'Graduation Day',
    description: 'Celebrating academic achievements and new beginnings.'
  }
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [animating, setAnimating] = useState(false);
  
  const galleryRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // GSAP animations
  useGSAP((gsap) => {
    if (filtersRef.current) {
      gsap.from(filtersRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: filtersRef.current,
          start: 'top 85%',
        }
      });
    }
    
    if (galleryRef.current) {
      const items = galleryRef.current.querySelectorAll('.gallery-item');
      
      gsap.from(items, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: galleryRef.current,
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
  
  // Filter items when activeFilter changes
  useEffect(() => {
    setAnimating(true);
    
    const timer = setTimeout(() => {
      if (activeFilter === 'all') {
        setFilteredItems(galleryItems);
      } else {
        setFilteredItems(galleryItems.filter(item => item.category === activeFilter));
      }
      setAnimating(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeFilter]);
  
  const handleFilterChange = (filter: string) => {
    if (filter !== activeFilter) {
      setActiveFilter(filter);
    }
  };

  return (
    <Section id="gallery" padding="xl" background="default">
      <Container>
        <SectionHeading 
          title="School Gallery"
          subtitle="Explore our vibrant school life through these carefully curated images."
        />
        
        {/* Gallery filters */}
        <div ref={filtersRef} className="flex flex-wrap justify-center mb-8 gap-4">
          <Tabs defaultValue="all" value={activeFilter} onValueChange={handleFilterChange}>
            <TabsList className="bg-transparent p-0">
              {GALLERY_FILTERS.map((filter) => (
                <TabsTrigger
                  key={filter.id}
                  value={filter.id}
                  active={activeFilter === filter.id}
                  pillStyle={true}
                  className="px-6 py-2 rounded-full transition-colors"
                >
                  {filter.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        {/* Gallery grid */}
        <div 
          ref={galleryRef} 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300 ${
            animating ? 'opacity-50' : 'opacity-100'
          }`}
        >
          {filteredItems.map((item) => (
            <div key={item.id} className={`gallery-item ${item.category}`}>
              <div className="japanese-box rounded-lg overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-64 object-cover transition-transform duration-700 hover:scale-110" 
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-montserrat font-bold">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div ref={ctaRef} className="mt-12 text-center">
          <Button variant="school" size="xl">
            View Full Gallery
          </Button>
        </div>
      </Container>
    </Section>
  );
}
