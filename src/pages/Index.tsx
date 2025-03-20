
import React from 'react';
import { ContentProvider } from '@/contexts/ContentContext';
import Header from '@/components/Header';
import UrlInput from '@/components/UrlInput';
import ContentViewer from '@/components/ContentViewer';
import QuestionInput from '@/components/QuestionInput';
import AnswerDisplay from '@/components/AnswerDisplay';

const Index = () => {
  return (
    <ContentProvider>
      <div className="min-h-screen w-full bg-gradient-to-br from-background to-secondary/30 px-4 py-8">
        <div className="container max-w-3xl mx-auto space-y-6">
          <Header />
          
          <main className="w-full flex flex-col items-center space-y-6">
            <UrlInput />
            <ContentViewer />
            <QuestionInput />
            <AnswerDisplay />
          </main>
          
          <footer className="mt-12 text-center text-xs text-muted-foreground">
            <p>Content-based Q&A Tool — Extracts and searches content from URLs</p>
          </footer>
        </div>
      </div>
    </ContentProvider>
  );
};

export default Index;
