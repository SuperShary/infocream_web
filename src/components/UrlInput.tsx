
import React, { useState } from 'react';
import { useContent } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Upload, Loader2 } from 'lucide-react';

const UrlInput = () => {
  const { contentItems, loading, addUrl, removeUrl } = useContent();
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      await addUrl(url.trim());
      setUrl('');
    }
  };

  return (
    <div className="w-full animate-fade-in">
      <form onSubmit={handleSubmit} className="glass-card p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-3">
          <Input
            type="url"
            placeholder="Enter a URL to extract content (e.g., https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full flex-grow bg-white/50 border-input/50 dark:bg-black/30 placeholder:text-muted-foreground/70 focus:ring-1 focus:ring-primary/30"
          />
          <Button 
            type="submit" 
            disabled={loading || !url.trim()}
            className="relative overflow-hidden group"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
            )}
            <span>Add URL</span>
          </Button>
        </div>

        {contentItems.length > 0 && (
          <div className="mt-4 flex flex-wrap">
            {contentItems.map((item) => (
              <div key={item.id} className="url-chip">
                <span className="truncate max-w-[180px]">{item.title}</span>
                <button 
                  onClick={() => removeUrl(item.id)}
                  className="ml-2 text-primary/70 hover:text-primary transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default UrlInput;
