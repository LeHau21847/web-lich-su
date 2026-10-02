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
  addQuestion: (examId: string) => void;
  deleteQuestion: (examId: string, questionId: string) => void;
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
      questions: [
        {
          id: `q-${newId}-${Date.now()}`,
          content: `Nội dung câu hỏi mới`,
          options: [
            { id: 'A', content: 'Lựa chọn A' },
            { id: 'B', content: 'Lựa chọn B' },
            { id: 'C', content: 'Lựa chọn C' },
            { id: 'D', content: 'Lựa chọn D' }
          ],
          correctOptionId: 'A'
        }
      ]
    };
    return { exams: [...state.exams, newExam] };
  }),

  deleteExam: (examId) => set((state) => ({
    exams: state.exams.filter(e => e.id !== examId)
  })),

  addQuestion: (examId) => set((state) => ({
    exams: state.exams.map(exam => {
      if (exam.id !== examId) return exam;
      const newQ: Question = {
        id: `q-custom-${Date.now()}`,
        content: 'Câu hỏi mới',
        options: [
          { id: 'A', content: 'Đáp án A' },
          { id: 'B', content: 'Đáp án B' },
          { id: 'C', content: 'Đáp án C' },
          { id: 'D', content: 'Đáp án D' }
        ],
        correctOptionId: 'A'
      };
      return { ...exam, questions: [...exam.questions, newQ] };
    })
  })),

  deleteQuestion: (examId, questionId) => set((state) => ({
    exams: state.exams.map(exam => {
      if (exam.id !== examId) return exam;
      return { ...exam, questions: exam.questions.filter(q => q.id !== questionId) };
    })
  }))
    }),
    {
      name: 'exam-data-storage',
    }
  )
);
