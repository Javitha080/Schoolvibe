import React, { ReactNode } from 'react';
import { useTheme } from '@/hooks/use-theme';

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  // Initialize theme
  useTheme();
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {children}
    </div>
  );
}
