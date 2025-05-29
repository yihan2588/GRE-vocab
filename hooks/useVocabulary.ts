import { useContext } from 'react';
// Import the ACTUAL context and its type from the context file
import { VocabularyContext, VocabularyContextType as ActualVocabularyContextType } from '../contexts/VocabularyContext';
import { evaluateUserExplanation as evaluateUserExplanationAPI } from '../services/geminiService'; // Keep for type reference if needed elsewhere, though context provides it.

// Ensure this type alias matches or directly uses the one from VocabularyContext.tsx
// For simplicity, we'll use the imported ActualVocabularyContextType.
export type VocabularyContextType = ActualVocabularyContextType;

export const useVocabulary = (): VocabularyContextType => {
  // Use the imported VocabularyContext
  const context = useContext(VocabularyContext); 
  if (context === undefined) {
    // This error means you're trying to use useVocabulary() without a <VocabularyProvider>
    // higher up in the component tree.
    throw new Error('useVocabulary must be used within a VocabularyProvider. Ensure App is wrapped.');
  }
  return context;
};
