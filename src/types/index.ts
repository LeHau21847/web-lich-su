export type Level = 'THCS' | 'THPT';

export interface Option {
  id: string; // A, B, C, D, E
  content: string;
}

export interface Question {
  id: string;
  content: string;
  options: Option[];
  correctOptionId: string;
}

export interface Exam {
  id: string;
  level: Level;
  title: string;
  timeLimit: number; // in seconds
  isShuffled?: boolean;
  questions: Question[];
}

export interface AnswerRecord {
  [questionId: string]: string; // questionId -> selectedOptionId
}
