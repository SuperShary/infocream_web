
import React, { useState } from 'react';
import { useContent } from '@/contexts/ContentContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Search, Loader2 } from 'lucide-react';

const QuestionInput = () => {
  const { contentItems, processing, processQuestion } = useContent();
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      await processQuestion(question.trim());
    }
  };

  const isDisabled = contentItems.length === 0 || processing || !question.trim();

  return (
    <div className="w-full mt-6 animate-fade-in">
      <form onSubmit={handleSubmit} className="glass-card p-4 md:p-6 space-y-4">
        <h2 className="text-xl font-medium">Ask a question</h2>
        
        <Textarea
          placeholder={contentItems.length === 0 
            ? "First add some URLs to extract content..." 
            : "What would you like to know about the content you've added?"}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full resize-none bg-white/50 border-input/50 dark:bg-black/30 placeholder:text-muted-foreground/70 focus:ring-1 focus:ring-primary/30"
          rows={3}
          disabled={contentItems.length === 0}
        />
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isDisabled}
            className="group relative overflow-hidden"
          >
            {processing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Search className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
            )}
            <span>Ask Question</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuestionInput;
