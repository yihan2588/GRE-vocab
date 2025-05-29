
import { LearnedWordEntry, WordStatus } from '../types';
import { EBBINGHAUS_INTERVALS_DAYS } from '../constants';

export function calculateNextReviewDate(baseDate: Date, intervalDays: number): string {
  const nextDate = new Date(baseDate);
  nextDate.setDate(nextDate.getDate() + intervalDays);
  return nextDate.toISOString();
}

export function getInitialLearnedWordEntry(wordId: string): LearnedWordEntry {
  const now = new Date();
  return {
    wordId,
    status: WordStatus.LEARNING,
    lastReviewedDate: now.toISOString(),
    nextReviewDate: calculateNextReviewDate(now, EBBINGHAUS_INTERVALS_DAYS[0]),
    currentIntervalIndex: 0,
    timesCorrectStraight: 0,
    totalTimesReviewed: 0,
  };
}

export function updateLearnedWordEntry(entry: LearnedWordEntry, rememberedCorrectly: boolean): LearnedWordEntry {
  const now = new Date();
  let newIntervalIndex = entry.currentIntervalIndex;
  let newStatus = entry.status;
  let newTimesCorrectStraight = entry.timesCorrectStraight;

  if (rememberedCorrectly) {
    newTimesCorrectStraight++;
    if (newIntervalIndex < EBBINGHAUS_INTERVALS_DAYS.length - 1) {
      newIntervalIndex++;
    } else {
      newStatus = WordStatus.MASTERED; // Max interval reached
    }
  } else {
    newTimesCorrectStraight = 0;
    // Reset to a shorter interval, e.g., half of current or back to start
    newIntervalIndex = Math.max(0, newIntervalIndex - 2); 
    if (newStatus === WordStatus.MASTERED) {
      newStatus = WordStatus.REVIEWING; // No longer mastered
    }
  }
  
  const nextReviewDate = (newStatus === WordStatus.MASTERED) 
    ? null // Mastered words don't need a next review date in this simple model, or set to a very long interval
    : calculateNextReviewDate(now, EBBINGHAUS_INTERVALS_DAYS[newIntervalIndex]);

  return {
    ...entry,
    status: newStatus,
    lastReviewedDate: now.toISOString(),
    nextReviewDate,
    currentIntervalIndex: newIntervalIndex,
    timesCorrectStraight: newTimesCorrectStraight,
    totalTimesReviewed: entry.totalTimesReviewed + 1,
  };
}
