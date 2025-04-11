import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'text' | 'avatar' | 'button' | 'image';
  width?: string | number;
  height?: string | number;
  animated?: boolean;
}

export default function Skeleton({
  className,
  variant = 'default',
  width,
  height,
  animated = true,
  ...props
}: SkeletonProps & React.HTMLAttributes<HTMLDivElement>) {
  // Get variant styles
  const variantStyles = {
    default: 'w-full h-6 rounded-md',
    card: 'w-full h-40 rounded-xl',
    text: 'h-4 w-[80%] rounded-md',
    avatar: 'h-12 w-12 rounded-full',
    button: 'h-10 w-24 rounded-md',
    image: 'w-full aspect-video rounded-md'
  };

  return (
    <div
      className={cn(
        'bg-gray-200 dark:bg-gray-800',
        animated && 'animate-shimmer',
        variantStyles[variant],
        className
      )}
      style={{
        width: width,
        height: height
      }}
      {...props}
    />
  );
}

// Skeleton for cards with title, description, and image
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-4 rounded-xl border p-4 shadow-sm', className)}>
      <Skeleton variant="image" className="h-44" />
      <Skeleton variant="text" width="60%" />
      <div className="space-y-2">
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="80%" />
      </div>
      <Skeleton variant="button" />
    </div>
  );
}

// Skeleton for news/blog items
export function NewsSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-4 rounded-xl border p-4 shadow-sm', className)}>
      <div className="flex items-center space-x-3">
        <Skeleton variant="avatar" />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="20%" />
        </div>
      </div>
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="image" className="h-52" />
    </div>
  );
}

// Skeleton for profile information
export function ProfileSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6 p-4', className)}>
      <div className="flex flex-col items-center space-y-4">
        <Skeleton variant="avatar" width={80} height={80} />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="30%" />
      </div>
      <div className="space-y-3">
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="70%" />
      </div>
    </div>
  );
}

// Skeleton for gallery items layout
export function GallerySkeleton({ count = 8, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {Array(count).fill(0).map((_, index) => (
        <Skeleton 
          key={index} 
          variant="image" 
          className="aspect-square rounded-lg" 
        />
      ))}
    </div>
  );
}

// Table skeleton
export function TableSkeleton({ 
  rows = 5, 
  columns = 4, 
  className 
}: { 
  rows?: number; 
  columns?: number; 
  className?: string 
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex space-x-4 pb-2 border-b">
        {Array(columns).fill(0).map((_, i) => (
          <Skeleton 
            key={`header-${i}`} 
            className={`h-8 ${i === 0 ? 'w-[30%]' : 'flex-1'}`}
          />
        ))}
      </div>
      
      {/* Rows */}
      {Array(rows).fill(0).map((_, rowIndex) => (
        <div 
          key={`row-${rowIndex}`} 
          className="flex space-x-4 py-3"
        >
          {Array(columns).fill(0).map((_, colIndex) => (
            <Skeleton 
              key={`cell-${rowIndex}-${colIndex}`} 
              className={`h-6 ${colIndex === 0 ? 'w-[30%]' : 'flex-1'}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Hero section skeleton
export function HeroSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col space-y-8 py-12 md:py-24", className)}>
      <div className="space-y-4 text-center">
        <Skeleton className="h-10 w-[50%] mx-auto" />
        <Skeleton className="h-6 w-[70%] mx-auto" />
        <Skeleton className="h-6 w-[60%] mx-auto" />
      </div>
      <div className="flex justify-center space-x-4">
        <Skeleton variant="button" width={120} height={46} />
        <Skeleton variant="button" width={120} height={46} />
      </div>
    </div>
  );
}

// Page loading skeleton
export function PageLoadingSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("min-h-screen space-y-8 py-6", className)}>
      {/* Header */}
      <div className="flex justify-between items-center px-4">
        <Skeleton className="h-10 w-40" />
        <div className="flex space-x-2">
          <Skeleton variant="button" width={40} />
          <Skeleton variant="button" width={40} />
          <Skeleton variant="button" width={40} />
        </div>
      </div>
      
      {/* Hero */}
      <HeroSkeleton />
      
      {/* Content sections */}
      <div className="space-y-10 px-4">
        <div className="space-y-4">
          <Skeleton className="h-8 w-60" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
        
        <div className="space-y-4">
          <Skeleton className="h-8 w-80" />
          <GallerySkeleton count={4} />
        </div>
        
        <div className="space-y-4">
          <Skeleton className="h-8 w-40" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-64 rounded-lg" />
            <div className="space-y-4">
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="50%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}