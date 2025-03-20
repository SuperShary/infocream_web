
import React, { useState } from 'react';
import { useContent } from '@/contexts/ContentContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ContentViewer = () => {
  const { contentItems } = useContent();
  const [activeTab, setActiveTab] = useState<string>(contentItems[0]?.id || '');

  // Update active tab when content items change
  React.useEffect(() => {
    if (contentItems.length > 0 && !contentItems.some(item => item.id === activeTab)) {
      setActiveTab(contentItems[0].id);
    }
  }, [contentItems, activeTab]);

  if (contentItems.length === 0) {
    return null;
  }

  return (
    <div className="w-full mt-6 glass-card overflow-hidden animate-fade-in">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b border-border/50">
          <ScrollArea className="w-full whitespace-nowrap p-4">
            <TabsList className="bg-transparent">
              {contentItems.map((item) => (
                <TabsTrigger 
                  key={item.id} 
                  value={item.id}
                  className="text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  {item.title.length > 30 ? `${item.title.substring(0, 30)}...` : item.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>
        </div>
        
        {contentItems.map((item) => (
          <TabsContent key={item.id} value={item.id} className="p-4 md:p-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  View original
                </a>
              </div>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4 bg-white/30 dark:bg-black/20">
                <div className="text-sm text-muted-foreground">
                  {item.content.length > 1000 
                    ? `${item.content.substring(0, 1000)}...` 
                    : item.content}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ContentViewer;
