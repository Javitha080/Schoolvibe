import React, { useEffect, useRef } from 'react';
import Section from '@/components/layout/Section';
import Container from '@/components/layout/Container';
import SectionHeading from '@/components/common/SectionHeading';
import { Card } from '@/components/ui/card';
import { useGSAP, gsap, ScrollTrigger } from '@/lib/gsap';

// Import Swiper
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

const testimonials = [
  {
    id: 1,
    name: 'Kanchana Perera',
    role: 'Alumni, Class of 2020',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop',
    text: '"My years at Homagama Maha Vidyalaya shaped my character and prepared me for university. The teachers were dedicated and supportive, helping me discover my potential."'
  },
  {
    id: 2,
    name: 'Lakshmi Jayawardene',
    role: 'Parent',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop',
    text: '"As a parent, I\'m impressed by the school\'s commitment to academic excellence and character development. My child has flourished in this nurturing environment."'
  },
  {
    id: 3,
    name: 'Sampath Fernando',
    role: 'Mathematics Teacher',
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1170&auto=format&fit=crop',
    text: '"Teaching at Homagama Maha Vidyalaya has been rewarding. The collaborative spirit among faculty and the enthusiasm of students create an ideal learning environment."'
  },
  {
    id: 4,
    name: 'Dinesh Gunawardana',
    role: 'Alumni, Class of 2015',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop',
    text: '"The values instilled during my time at Homagama Maha Vidyalaya continue to guide me in my professional life. The school provided a solid foundation for my future success."'
  }
];

export default function Testimonials() {
  const swiperRef = useRef<HTMLDivElement>(null);
  
  // GSAP animations
  useGSAP((gsap) => {
    if (swiperRef.current) {
      gsap.from(swiperRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: swiperRef.current,
          start: 'top 85%',
        }
      });
    }
  }, []);

  return (
    <Section padding="xl" background="muted">
      <Container>
        <SectionHeading 
          title="What People Say"
          subtitle="Hear from our students, parents, and alumni about their experiences at Homagama Maha Vidyalaya."
        />
        
        {/* Testimonials slider */}
        <div ref={swiperRef} className="max-w-5xl mx-auto">
          <SwiperComponent
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="py-8"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="p-4">
                <Card glassmorphism className="p-8 h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-montserrat font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i key={star} className="fas fa-star text-accent"></i>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    {testimonial.text}
                  </p>
                </Card>
              </SwiperSlide>
            ))}
          </SwiperComponent>
        </div>
      </Container>
    </Section>
  );
}
