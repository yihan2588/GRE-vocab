import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import LearnSession from './components/LearnSession';
import ReviewSession from './components/ReviewSession';
import ExploreWord from './components/ExploreWord';
import AllWordsView from './components/AllWordsView';
import { AppView } from './types';
// useVocabulary hook is no longer called here for initialization.
// The VocabularyProvider at the root handles this.

interface ViewParams {
  practiceWordId?: string;
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [viewParams, setViewParams] = useState<ViewParams | undefined>();

  // The useVocabulary() call is removed from here.
  // Components that need vocabulary data will call useVocabulary() themselves,
  // and it will get data from the VocabularyContext.

  const setView = useCallback((view: AppView, params?: ViewParams) => {
    setCurrentView(view);
    setViewParams(params);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'learn':
        return <LearnSession setView={setView} />;
      case 'review':
        return <ReviewSession setView={setView} practiceWordId={viewParams?.practiceWordId} />;
      case 'explore':
        return <ExploreWord setView={setView} />;
      case 'all_words':
        return <AllWordsView setView={setView} />;
      case 'dashboard':
      default:
        return <Dashboard setView={setView} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100">
      <Header />
      <main className="flex-grow container mx-auto px-0 py-0 sm:px-4 sm:py-8">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
