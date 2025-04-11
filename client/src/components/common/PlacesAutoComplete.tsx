import React, { useEffect, useRef } from 'react';

// Using Places.js globally added from CDN
declare const places: any;

interface PlacesAutoCompleteProps {
  onSelect?: (suggestion: any) => void;
  placeholder?: string;
  className?: string;
}

export default function PlacesAutoComplete({ 
  onSelect, 
  placeholder = 'Search for an address...',
  className = ''
}: PlacesAutoCompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const placesInstanceRef = useRef<any>(null);
  
  useEffect(() => {
    if (!inputRef.current || typeof places === 'undefined') return;
    
    try {
      // Initialize Algolia Places
      placesInstanceRef.current = places({
        container: inputRef.current,
        type: 'address',
        language: 'en',
        aroundLatLngViaIP: true,
        templates: {
          value: (suggestion: any) => suggestion.name
        },
        cssClasses: {
          input: 'places-autocomplete-input',
          dropdownMenu: 'places-autocomplete-dropdown'
        }
      });
      
      // Handle selection
      placesInstanceRef.current.on('change', (e: any) => {
        if (onSelect) {
          onSelect(e.suggestion);
        }
      });
    } catch (error) {
      console.error('Error initializing Algolia Places:', error);
    }
    
    // Cleanup on unmount
    return () => {
      if (placesInstanceRef.current) {
        placesInstanceRef.current.destroy();
      }
    };
  }, [onSelect]);
  
  return (
    <div className={`places-autocomplete ${className}`}>
      <input
        ref={inputRef}
        type="search"
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm text-gray-900 dark:text-gray-100"
      />
      
      {/* Custom styling for Algolia dropdown */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .places-autocomplete-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          border: 1px solid var(--color-border, #e2e8f0);
          background-color: var(--color-bg, white);
          color: var(--color-text, #1a202c);
          outline: none;
          transition: all 0.2s ease;
        }
        
        .places-autocomplete-dropdown {
          border-radius: 0.5rem;
          border: 1px solid var(--color-border, #e2e8f0);
          background-color: var(--color-bg, white);
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
          margin-top: 0.5rem;
          z-index: 100;
          overflow: hidden;
        }
        
        .ap-suggestion {
          padding: 0.75rem 1rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .ap-suggestion:hover {
          background-color: var(--color-highlight, #f7fafc);
        }
        
        /* Dark mode adjustments handled via React */
        .dark .ap-dropdown-menu {
          --color-bg: #1f2937;
          --color-text: #f3f4f6;
          --color-border: #374151;
          --color-highlight: #374151;
        }
      `
      }} />
    </div>
  );
}