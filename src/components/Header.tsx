
import React from 'react';
import { useContent } from '@/contexts/ContentContext';

const Header = () => {
  const { contentItems, clearAll } = useContent();
  
  return (
    <header className="w-full py-8 flex flex-col items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="inline-block px-3 py-1 mb-3 text-xs font-medium uppercase tracking-wider text-primary/80 rounded-full bg-primary/5">
          Content-Based Q&A
        </div>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          Ask questions about <span className="text-primary font-semibold">any web content</span>
        </h1>
        <p className="mt-3 text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
          Enter URLs to extract content, then ask questions about what you've imported.
        </p>
      </div>
      
      {contentItems.length > 0 && (
        <div className="mt-4 flex items-center justify-center">
          <span className="text-xs text-muted-foreground mr-2">
            {contentItems.length} {contentItems.length === 1 ? 'source' : 'sources'} loaded
          </span>
          <button 
            onClick={clearAll}
            className="text-xs text-destructive hover:text-destructive/80 transition-colors duration-200"
          >
            Clear all
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
