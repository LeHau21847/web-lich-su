import { useExamStore } from '../store/examStore';
import { cn } from '../lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface QuestionDisplayProps {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
}

export function QuestionDisplay({ currentQuestionIndex, setCurrentQuestionIndex }: QuestionDisplayProps) {
  const { currentExam, answers, setAnswer, isFinished } = useExamStore();

  if (!currentExam) return null;

  const question = currentExam.questions[currentQuestionIndex];
  const selectedOptionId = answers[question.id];
  const totalQuestions = currentExam.questions.length;

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 sm:p-10 min-h-[500px] flex flex-col transition-all duration-300">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
          Câu hỏi <span className="text-primary-600">{currentQuestionIndex + 1}</span> / {totalQuestions}
        </h2>
        {isFinished && (
          <span className={cn(
            "px-4 py-1.5 rounded-full text-sm font-semibold",
            selectedOptionId === question.correctOptionId 
              ? "bg-emerald-100 text-emerald-700" 
              : "bg-rose-100 text-rose-700"
          )}>
            {selectedOptionId === question.correctOptionId ? "Đúng" : "Sai"}
          </span>
        )}
      </div>

      <div className="text-lg text-slate-700 mb-8 font-medium leading-relaxed">
        {question.content}
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isCorrect = isFinished && option.id === question.correctOptionId;
          const isWrongSelected = isFinished && isSelected && option.id !== question.correctOptionId;

          return (
            <button
              key={option.id}
              disabled={isFinished}
              onClick={() => setAnswer(question.id, option.id)}
              className={cn(
                "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 group",
                !isFinished && !isSelected && "border-slate-200 hover:border-primary-300 hover:bg-slate-50",
                !isFinished && isSelected && "border-primary-500 bg-primary-50 ring-4 ring-primary-50",
                isFinished && isCorrect && "border-emerald-500 bg-emerald-50 text-emerald-800",
                isFinished && isWrongSelected && "border-rose-500 bg-rose-50 text-rose-800",
                isFinished && !isCorrect && !isWrongSelected && "border-slate-100 opacity-50 bg-slate-50"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg transition-colors",
                !isFinished && !isSelected && "bg-slate-100 text-slate-600 group-hover:bg-primary-100 group-hover:text-primary-600",
                !isFinished && isSelected && "bg-primary-500 text-white shadow-sm",
                isFinished && isCorrect && "bg-emerald-500 text-white",
                isFinished && isWrongSelected && "bg-rose-500 text-white",
                isFinished && !isCorrect && !isWrongSelected && "bg-slate-200 text-slate-500"
              )}>
                {option.id}
              </div>
              <span className="flex-1 text-base">{option.content}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex items-center justify-between pt-6 border-t border-slate-100">
        <button
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Câu trước
        </button>
        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === totalQuestions - 1}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          Câu tiếp
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
