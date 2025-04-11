import React, { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'muted' | 'primary' | 'secondary' | 'accent' | 'custom';
}

const paddingClasses = {
  none: '',
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-20'
};

const backgroundClasses = {
  default: 'bg-background',
  muted: 'bg-muted dark:bg-gray-900/30',
  primary: 'bg-primary/10 dark:bg-primary/20',
  secondary: 'bg-secondary/10 dark:bg-secondary/20',
  accent: 'bg-accent/10 dark:bg-accent/20',
  custom: ''
};

const Section = forwardRef<HTMLElement, SectionProps>(({
  children,
  className,
  id,
  fullHeight = false,
  padding = 'lg',
  background = 'default',
  ...props
}, ref) => {
  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        'relative overflow-hidden',
        fullHeight && 'min-h-screen flex items-center',
        paddingClasses[padding],
        backgroundClasses[background],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
});

Section.displayName = 'Section';

export default Section;
