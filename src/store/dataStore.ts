import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Exam, Question } from '../types';
import { realMockExams } from '../data/mockData';

interface DataState {
  exams: Exam[];
  updateQuestion: (examId: string, questionId: string, newQuestion: Question) => void;
  updateExamTitle: (examId: string, title: string, timeLimit: number, level: 'THCS' | 'THPT') => void;
  toggleShuffleExam: (examId: string) => void;
  addExam: () => void;
  deleteExam: (examId: string) => void;
}

export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      exams: realMockExams,
      
      updateQuestion: (examId, questionId, newQuestion) => set((state) => ({
    exams: state.exams.map((exam) => {
      if (exam.id !== examId) return exam;
      return {
        ...exam,
        questions: exam.questions.map((q) => q.id === questionId ? newQuestion : q)
      };
    })
  })),

  updateExamTitle: (examId, title, timeLimit, level) => set((state) => ({
    exams: state.exams.map((exam) => 
      exam.id === examId ? { ...exam, title, timeLimit, level } : exam
    )
  })),

  toggleShuffleExam: (examId) => set((state) => ({
    exams: state.exams.map((exam) => 
      exam.id === examId ? { ...exam, isShuffled: !exam.isShuffled } : exam
    )
  })),

  addExam: () => set((state) => {
    const newId = `exam-custom-${Date.now()}`;
    const newExam: Exam = {
      id: newId,
      level: 'THCS',
      title: 'Đề thi mới (Chưa đặt tên)',
      timeLimit: 15 * 60,
      questions: Array.from({ length: 20 }, (_, i) => ({
        id: `q-${newId}-${i}`,
        content: `Câu hỏi số ${i + 1}`,
        options: [
          { id: 'A', content: 'Lựa chọn A' },
          { id: 'B', content: 'Lựa chọn B' },
          { id: 'C', content: 'Lựa chọn C' },
          { id: 'D', content: 'Lựa chọn D' },
          { id: 'E', content: 'Lựa chọn E' }
        ],
        correctOptionId: 'A'
      }))
    };
    return { exams: [...state.exams, newExam] };
  }),

  deleteExam: (examId) => set((state) => ({
    exams: state.exams.filter(e => e.id !== examId)
  }))
    }),
    {
      name: 'exam-data-storage',
    }
  )
);
