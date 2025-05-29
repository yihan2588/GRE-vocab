
export interface Word {
  id: string;
  text: string;
  definition?: string; // Will be fetched dynamically
  exampleSentence?: string; // Will be fetched dynamically
  synonyms?: string[]; // Optional, from ExploredWord
  antonyms?: string[]; // Optional, from ExploredWord
}

export enum WordStatus {
  NEW = 'new',
  LEARNING = 'learning',
  REVIEWING = 'reviewing',
  MASTERED = 'mastered',
}

export interface LearnedWordEntry {
  wordId: string;
  status: WordStatus;
  lastReviewedDate: string | null; // ISO string
  nextReviewDate: string | null; // ISO string
  currentIntervalIndex: number; // Index in EBBINGHAUS_INTERVALS
  timesCorrectStraight: number; // Number of times answered correctly in a row
  totalTimesReviewed: number;
}

// Details fetched from Gemini for exploration or initial learning
export interface ExploredWord {
  text: string;
  definition: string;
  exampleSentence: string;
  synonyms: string[]; // Make these required for the type, can be empty array
  antonyms: string[]; // Make these required for the type, can be empty array
}

export interface GeminiEvaluationResult {
  isCorrect: boolean;
  feedback: string;
  confidence?: number; // Optional: if Gemini can provide a confidence score
}

export type AppView = 'dashboard' | 'learn' | 'review' | 'explore' | 'all_words';
