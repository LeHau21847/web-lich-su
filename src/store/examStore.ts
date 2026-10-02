import { create } from 'zustand';
import type { Exam, AnswerRecord } from '../types';
import { useActivityStore } from './activityStore';

interface ExamState {
  currentExam: Exam | null;
  currentSessionId: string | null;
  answers: AnswerRecord;
  isFinished: boolean;
  score: number;
  timeLeft: number;
  setCurrentExam: (exam: Exam, sessionId: string) => void;
  setAnswer: (questionId: string, optionId: string) => void;
  submitExam: () => void;
  resetExam: () => void;
  setTimeLeft: (time: number) => void;
}

export const useExamStore = create<ExamState>((set, get) => ({
  currentExam: null,
  currentSessionId: null,
  answers: {},
  isFinished: false,
  score: 0,
  timeLeft: 0,

  setCurrentExam: (exam, sessionId) => {
    let finalExam = { ...exam };
    
    if (exam.isShuffled) {
      const shuffledQuestions = [...exam.questions].sort(() => Math.random() - 0.5);
      
      const newQuestions = shuffledQuestions.map((q) => {
        const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
        const optionIds = ['A', 'B', 'C', 'D', 'E'];
        
        const correctOpt = q.options.find(o => o.id === q.correctOptionId);
        let newCorrectId = q.correctOptionId;

        const newOptions = shuffledOptions.map((opt, idx) => {
          if (opt.content === correctOpt?.content) {
            newCorrectId = optionIds[idx];
          }
          return { ...opt, id: optionIds[idx] };
        });

        return {
          ...q,
          options: newOptions,
          correctOptionId: newCorrectId
        };
      });

      finalExam.questions = newQuestions;
    }

    set({
      currentExam: finalExam,
      currentSessionId: sessionId,
      answers: {},
      isFinished: false,
      score: 0,
      timeLeft: finalExam.timeLimit,
    });
  },

  setAnswer: (questionId, optionId) => {
    const { isFinished, answers } = get();
    if (isFinished) return;
    set({
      answers: {
        ...answers,
        [questionId]: optionId,
      },
    });
  },

  submitExam: () => {
    const { currentExam, answers, isFinished, currentSessionId } = get();
    if (!currentExam || isFinished) return;

    let correctCount = 0;
    currentExam.questions.forEach((q) => {
      if (answers[q.id] === q.correctOptionId) {
        correctCount++;
      }
    });

    const score = parseFloat(((correctCount / currentExam.questions.length) * 10).toFixed(2));

    if (currentSessionId) {
      useActivityStore.getState().finishSession(currentSessionId, score, answers);
    }

    set({
      isFinished: true,
      score,
      timeLeft: 0, // Stop timer
    });
  },

  resetExam: () => {
    const { currentExam } = get();
    if (currentExam) {
      set({
        answers: {},
        isFinished: false,
        score: 0,
        timeLeft: currentExam.timeLimit,
      });
    }
  },

  setTimeLeft: (time) => {
    set({ timeLeft: time });
  },
}));
