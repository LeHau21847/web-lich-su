import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface StudentSession {
  id: string;
  studentName: string;
  examId: string;
  examTitle: string;
  status: 'doing' | 'finished';
  startTime: number;
  endTime?: number;
  score?: number;
  answers?: Record<string, string>; // questionId -> selectedOptionId
}

interface ActivityState {
  sessions: StudentSession[];
  startSession: (studentName: string, examId: string, examTitle: string) => string;
  finishSession: (sessionId: string, score: number, answers: Record<string, string>) => void;
  clearHistory: () => void;
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      sessions: [
        // Mock data cho đẹp ban đầu
        {
          id: 'mock-1',
          studentName: 'Nguyễn Văn A',
          examId: 'exam-1',
          examTitle: 'Đề thi thử Lịch sử THCS - Số 01',
          status: 'doing',
          startTime: Date.now() - 300000,
        },
        {
          id: 'mock-2',
          studentName: 'Trần Thị B',
          examId: 'exam-2',
          examTitle: 'Đề thi thử Lịch sử THPT Quốc Gia - Số 01',
          status: 'finished',
          startTime: Date.now() - 1500000,
          endTime: Date.now() - 300000,
          score: 8.5,
          answers: {}
        }
      ],
      
      startSession: (studentName, examId, examTitle) => {
        const sessionId = `session-${Date.now()}`;
        set((state) => ({
          sessions: [
            {
              id: sessionId,
              studentName,
              examId,
              examTitle,
              status: 'doing',
              startTime: Date.now(),
            },
            ...state.sessions
          ]
        }));
        return sessionId;
      },
      
      finishSession: (sessionId, score, answers) => set((state) => ({
        sessions: state.sessions.map(s => 
          s.id === sessionId 
            ? { ...s, status: 'finished', score, answers, endTime: Date.now() } 
            : s
        )
      })),
      
      clearHistory: () => set({ sessions: [] })
    }),
    {
      name: 'student-activity-storage',
    }
  )
);
