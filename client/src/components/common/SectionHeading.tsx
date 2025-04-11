import React from 'react';
import { cn } from '@/lib/utils';
import { useScrollTrigger } from '@/hooks/use-scroll-trigger';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
  titleClassName,
  subtitleClassName
}: SectionHeadingProps) {
  const headingRef = useScrollTrigger<HTMLDivElement>({
    threshold: 0.2,
    once: true
  });

  return (
    <div 
      ref={headingRef}
      className={cn(
        'mb-16',
        centered && 'text-center',
        className
      )}
    >
      <h2 className={cn(
        'text-3xl md:text-4xl font-montserrat font-bold mb-4 opacity-0 animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-forwards',
        titleClassName
      )}>
        {title}
      </h2>
      
      <div className={cn(
        'w-24 h-1 bg-primary mb-6 opacity-0 animate-in fade-in slide-in-from-bottom-5 delay-200 duration-700 fill-mode-forwards',
        centered && 'mx-auto'
      )}></div>
      
      {subtitle && (
        <p className={cn(
          'max-w-2xl text-gray-600 dark:text-gray-400 opacity-0 animate-in fade-in slide-in-from-bottom-5 delay-400 duration-700 fill-mode-forwards',
          centered && 'mx-auto',
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
