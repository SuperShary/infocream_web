
import React from 'react';
import { useContent } from '@/contexts/ContentContext';
import { ScrollArea } from '@/components/ui/scroll-area';

const AnswerDisplay = () => {
  const { lastQuestion, lastAnswer, processing } = useContent();
  
  if (!lastQuestion && !lastAnswer) {
    return null;
  }
  
  return (
    <div className="w-full mt-6 glass-card p-4 md:p-6 space-y-4 animate-fade-in">
      <h2 className="text-xl font-medium">Answer</h2>
      
      {lastQuestion && (
        <div className="glass-panel p-3">
          <p className="text-sm font-medium">Your question:</p>
          <p className="mt-1 text-base">{lastQuestion}</p>
        </div>
      )}
      
      <div className={`glass-panel p-3 ${processing ? 'shimmer' : ''}`}>
        <p className="text-sm font-medium">Response:</p>
        {processing ? (
          <div className="mt-3 space-y-2">
            <div className="h-4 w-full rounded bg-muted/30 animate-pulse"></div>
            <div className="h-4 w-5/6 rounded bg-muted/30 animate-pulse"></div>
            <div className="h-4 w-4/6 rounded bg-muted/30 animate-pulse"></div>
          </div>
        ) : (
          <ScrollArea className="h-full max-h-[250px] mt-1 pr-4">
            <p className="text-base">{lastAnswer}</p>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default AnswerDisplay;
