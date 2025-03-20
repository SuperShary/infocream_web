
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

interface ContentItem {
  id: string;
  url: string;
  content: string;
  title: string;
}

interface ContentContextType {
  contentItems: ContentItem[];
  loading: boolean;
  processing: boolean;
  lastQuestion: string;
  lastAnswer: string;
  addUrl: (url: string) => Promise<void>;
  removeUrl: (id: string) => void;
  processQuestion: (question: string) => Promise<void>;
  clearAll: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [lastQuestion, setLastQuestion] = useState<string>('');
  const [lastAnswer, setLastAnswer] = useState<string>('');

  // Add new URL
  const addUrl = async (url: string) => {
    try {
      setLoading(true);
      
      // Basic validation
      if (!url.trim() || !url.startsWith('http')) {
        toast.error('Please enter a valid URL starting with http:// or https://');
        return;
      }
      
      // Check if URL already exists
      if (contentItems.some(item => item.url === url)) {
        toast.error('This URL has already been added');
        return;
      }

      // Fetch content (simulated for now)
      const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch the URL content: ${response.statusText}`);
      }
      
      const html = await response.text();
      
      // Extract text content from HTML (basic implementation)
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Remove script and style elements
      const scripts = doc.getElementsByTagName('script');
      const styles = doc.getElementsByTagName('style');
      
      while (scripts.length > 0) {
        scripts[0].parentNode?.removeChild(scripts[0]);
      }
      
      while (styles.length > 0) {
        styles[0].parentNode?.removeChild(styles[0]);
      }
      
      // Get the text content and title
      const content = doc.body.textContent?.trim() || 'No content found';
      const title = doc.title || 'Untitled Page';
      
      // Add to content items
      const newItem: ContentItem = {
        id: `content-${Date.now()}`,
        url,
        content,
        title
      };
      
      setContentItems(prev => [...prev, newItem]);
      toast.success(`Added content from ${title}`);
    } catch (error) {
      console.error('Error fetching URL:', error);
      toast.error('Failed to fetch content from the URL');
    } finally {
      setLoading(false);
    }
  };

  // Remove URL by ID
  const removeUrl = (id: string) => {
    setContentItems(prev => prev.filter(item => item.id !== id));
    toast.info('Content removed');
  };

  // Process a question against the content
  const processQuestion = async (question: string) => {
    try {
      setProcessing(true);
      setLastQuestion(question);
      
      if (contentItems.length === 0) {
        setLastAnswer('Please add some content by entering URLs first.');
        toast.error('No content to search through');
        return;
      }
      
      // Simple search implementation (to be replaced with more sophisticated approach)
      // Concatenate all the content
      const allContent = contentItems.map(item => item.content).join(' ');
      
      // Get sentences that might be relevant to the question
      const sentences = allContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
      
      // Find sentences that contain keywords from the question
      const keywords = question.toLowerCase().split(' ')
        .filter(word => word.length > 3 && !['what', 'when', 'where', 'which', 'how', 'who', 'why', 'is', 'are', 'was', 'were', 'will', 'would', 'should', 'could', 'can', 'does', 'do', 'did', 'has', 'have', 'had'].includes(word));
      
      const relevantSentences = sentences.filter(sentence => {
        const sentenceLower = sentence.toLowerCase();
        return keywords.some(keyword => sentenceLower.includes(keyword));
      });
      
      if (relevantSentences.length === 0) {
        setLastAnswer('I couldn\'t find any information related to your question in the provided content.');
      } else {
        // Format a simple answer from the relevant sentences
        const answer = `Based on the content you provided: ${relevantSentences.slice(0, 3).join('. ')}`;
        setLastAnswer(answer);
      }
    } catch (error) {
      console.error('Error processing question:', error);
      setLastAnswer('Sorry, an error occurred while processing your question.');
      toast.error('Failed to process question');
    } finally {
      setProcessing(false);
    }
  };

  // Clear all content
  const clearAll = () => {
    setContentItems([]);
    setLastQuestion('');
    setLastAnswer('');
    toast.info('All content has been cleared');
  };

  return (
    <ContentContext.Provider value={{
      contentItems,
      loading,
      processing,
      lastQuestion,
      lastAnswer,
      addUrl,
      removeUrl,
      processQuestion,
      clearAll
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
