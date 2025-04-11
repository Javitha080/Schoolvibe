import React from 'react';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="p-1.5 sm:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
      ) : (
        <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
      )}
    </Button>
  );
}
