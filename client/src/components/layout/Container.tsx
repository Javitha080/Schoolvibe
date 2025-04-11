import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const maxWidthClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full',
};

export default function Container({ 
  children, 
  className, 
  as: Component = 'div',
  maxWidth = 'full'
}: ContainerProps) {
  return (
    <Component className={cn(
      'container mx-auto px-4',
      maxWidth !== 'full' && maxWidthClasses[maxWidth],
      className
    )}>
      {children}
    </Component>
  );
}
