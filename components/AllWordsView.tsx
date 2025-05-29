import React, { useState, useEffect } from 'react';
import { AppView, Word as BareWord, WordStatus, Word as FullWordType } from '../types';
import { useVocabulary } from '../hooks/useVocabulary';
import { EBBINGHAUS_INTERVALS_DAYS } from '../constants';

type FullWord = Required<Pick<FullWordType, 'id' | 'text' | 'definition' | 'exampleSentence'>>;

interface AllWordsViewProps {
  setView: (view: AppView, params?: Record<string, any>) => void;
}

interface WordDetailState {
  isLoading: boolean;
  word: FullWord | null;
  error?: string;
}

const AllWordsView: React.FC<AllWordsViewProps> = ({ setView }) => {
  const { allWords, learnedWords, resetWordProgress, getWordWithDetails, getBareWordById } = useVocabulary();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [expandedWordDetails, setExpandedWordDetails] = useState<Record<string, WordDetailState>>({});

  const getStatusDisplay = (word: BareWord) => {
    const entry = learnedWords[word.id];
    if (!entry) return { text: 'New', color: 'bg-gray-500', nextReview: 'N/A', status: WordStatus.NEW };
    const nextReviewDate = entry.status === WordStatus.MASTERED ? 'Mastered' : (entry.nextReviewDate ? new Date(entry.nextReviewDate).toLocaleDateString() : 'N/A');
    switch (entry.status) {
      case WordStatus.LEARNING: return { text: 'Learning', color: 'bg-blue-500', nextReview: nextReviewDate, status: entry.status };
      case WordStatus.REVIEWING: return { text: 'Reviewing', color: 'bg-yellow-500', nextReview: nextReviewDate, status: entry.status };
      case WordStatus.MASTERED: return { text: 'Mastered', color: 'bg-green-500', nextReview: 'Mastered', status: entry.status };
      default: return { text: 'New', color: 'bg-gray-500', nextReview: 'N/A', status: WordStatus.NEW };
    }
  };

  const filteredAndSortedWords = allWords
    .filter(word => word.text.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const textA = a.text.toLowerCase();
      const textB = b.text.toLowerCase();
      if (sortOrder === 'asc') {
        return textA.localeCompare(textB);
      }
      return textB.localeCompare(textA);
    });

  const handleToggleDetails = async (wordId: string, isOpen: boolean) => {
    if (isOpen && (!expandedWordDetails[wordId] || (!expandedWordDetails[wordId].word && !expandedWordDetails[wordId].isLoading))) {
      setExpandedWordDetails(prev => ({ ...prev, [wordId]: { isLoading: true, word: null } }));
      try {
        const details = await getWordWithDetails(wordId);
        setExpandedWordDetails(prev => ({ ...prev, [wordId]: { isLoading: false, word: details } }));
      } catch (e) {
        setExpandedWordDetails(prev => ({ ...prev, [wordId]: { isLoading: false, word: null, error: "Failed to load details." } }));
      }
    }
  };


  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-indigo-400 mb-4 sm:mb-0">All Vocabulary Words ({allWords.length})</h2>
        <button
            onClick={() => setView('dashboard')}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-150"
        >
            Back to Dashboard
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search words..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          aria-label="Search all vocabulary words"
        />
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="p-3 bg-slate-600 hover:bg-slate-500 text-white font-semibold rounded-lg transition duration-150"
          aria-label={`Sort words ${sortOrder === 'asc' ? 'Z to A' : 'A to Z'}`}
        >
          Sort {sortOrder === 'asc' ? 'Z-A' : 'A-Z'}
        </button>
      </div>

      {filteredAndSortedWords.length === 0 && (
        <p className="text-slate-400 text-center py-8">No words match your search.</p>
      )}

      <div className="space-y-3">
        {filteredAndSortedWords.map(bareWord => {
          const statusInfo = getStatusDisplay(bareWord);
          const learnedEntry = learnedWords[bareWord.id];
          const detailState = expandedWordDetails[bareWord.id];

          return (
            <details 
              key={bareWord.id} 
              className="bg-slate-800 p-4 rounded-lg shadow-md border border-slate-700 group"
              onToggle={(e) => handleToggleDetails(bareWord.id, (e.target as HTMLDetailsElement).open)}
            >
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="text-xl text-cyan-400 font-medium group-hover:text-cyan-300">{bareWord.text}</span>
                <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${statusInfo.color}`}>
                    {statusInfo.text}
                    </span>
                    {learnedEntry && learnedEntry.status !== WordStatus.MASTERED && learnedEntry.nextReviewDate && (
                         <span className="text-xs text-slate-400">Next: {statusInfo.nextReview}</span>
                    )}
                    <span className="text-slate-400 group-open:rotate-90 transform transition-transform duration-200">&#9656;</span>
                </div>
              </summary>
              <div className="mt-4 pt-3 border-t border-slate-700 space-y-3">
                {detailState?.isLoading && <p className="text-slate-400">Loading details...</p>}
                {detailState?.error && <p className="text-red-400">{detailState.error}</p>}
                {detailState?.word && (
                  <>
                    <p className="text-slate-300 mb-1"><strong className="text-slate-100">Definition:</strong> {detailState.word.definition}</p>
                    <p className="text-slate-300 italic"><strong className="text-slate-100 not-italic">Example:</strong> {detailState.word.exampleSentence}</p>
                  </>
                )}
                {learnedEntry && (
                  <div className="text-xs text-slate-400">
                    <p>Last Reviewed: {learnedEntry.lastReviewedDate ? new Date(learnedEntry.lastReviewedDate).toLocaleString() : 'N/A'}</p>
                    <p>Interval: {EBBINGHAUS_INTERVALS_DAYS[learnedEntry.currentIntervalIndex]} days (Level {learnedEntry.currentIntervalIndex + 1})</p>
                    <p>Correct in a row: {learnedEntry.timesCorrectStraight}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to reset progress for "${bareWord.text}"? This word will be marked as new.`)) {
                        resetWordProgress(bareWord.id);
                        setExpandedWordDetails(prev => ({ ...prev, [bareWord.id]: { isLoading: false, word: null } }));
                      }
                    }}
                    className="text-xs bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded transition duration-150"
                  >
                    Reset Progress
                  </button>
                  {statusInfo.status !== WordStatus.MASTERED && (
                     <button
                        onClick={() => setView('review', { practiceWordId: bareWord.id })}
                        className="text-xs bg-teal-600 hover:bg-teal-700 text-white font-semibold py-1 px-3 rounded transition duration-150"
                      >
                        Practice this word
                      </button>
                  )}
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
};

export default AllWordsView;