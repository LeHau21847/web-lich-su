import { useExamStore } from '../store/examStore';
import { cn } from '../lib/utils';
import { CheckCircle2, XCircle } from 'lucide-react';

interface GridNavigationProps {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
}

export function GridNavigation({ currentQuestionIndex, setCurrentQuestionIndex }: GridNavigationProps) {
  const { currentExam, answers, isFinished } = useExamStore();

  if (!currentExam) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6">
      <h3 className="text-lg font-semibold mb-4 text-slate-800 border-b pb-2">Danh sách câu hỏi</h3>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
        {currentExam.questions.map((q, index) => {
          const isAnswered = !!answers[q.id];
          const isCurrent = currentQuestionIndex === index;
          const isCorrect = isFinished && answers[q.id] === q.correctOptionId;
          const isWrong = isFinished && answers[q.id] && answers[q.id] !== q.correctOptionId;
          const isUnanswered = isFinished && !answers[q.id];

          return (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(index)}
              className={cn(
                "relative flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 border-2",
                isCurrent ? "border-primary-500 shadow-md ring-2 ring-primary-200 ring-offset-1" : "border-slate-200 hover:border-primary-300",
                !isFinished && isAnswered && !isCurrent ? "bg-primary-50 border-primary-200 text-primary-700" : "",
                !isFinished && !isAnswered && !isCurrent ? "bg-white text-slate-600 hover:bg-slate-50" : "",
                isFinished && isCorrect ? "bg-emerald-50 border-emerald-500 text-emerald-700" : "",
                isFinished && isWrong ? "bg-rose-50 border-rose-500 text-rose-700" : "",
                isFinished && isUnanswered ? "bg-slate-100 border-slate-300 text-slate-500" : ""
              )}
            >
              {index + 1}
              {isFinished && isCorrect && <CheckCircle2 className="w-4 h-4 absolute -top-1.5 -right-1.5 text-emerald-500 bg-white rounded-full" />}
              {isFinished && isWrong && <XCircle className="w-4 h-4 absolute -top-1.5 -right-1.5 text-rose-500 bg-white rounded-full" />}
            </button>
          );
        })}
      </div>
      
      {!isFinished && (
        <div className="mt-6 flex flex-col gap-2 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary-50 border border-primary-200"></div>
            <span>Đã làm ({Object.keys(answers).length}/{currentExam.questions.length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-white border border-slate-200"></div>
            <span>Chưa làm ({currentExam.questions.length - Object.keys(answers).length})</span>
          </div>
        </div>
      )}
      
      {isFinished && (
         <div className="mt-6 flex flex-col gap-2 text-sm text-slate-600">
         <div className="flex items-center gap-2">
           <div className="w-4 h-4 rounded bg-emerald-50 border border-emerald-500"></div>
           <span>Đúng</span>
         </div>
         <div className="flex items-center gap-2">
           <div className="w-4 h-4 rounded bg-rose-50 border border-rose-500"></div>
           <span>Sai</span>
         </div>
       </div>
      )}
    </div>
  );
}
