import { useEffect } from 'react';
import { useExamStore } from '../store/examStore';
import { Clock } from 'lucide-react';
import { cn } from '../lib/utils';

export function Timer() {
  const { timeLeft, setTimeLeft, submitExam, isFinished } = useExamStore();

  useEffect(() => {
    if (isFinished || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      if (timeLeft - 1 <= 0) {
        submitExam();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isFinished, setTimeLeft, submitExam]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={cn(
      "flex items-center gap-2 font-mono text-2xl font-bold px-4 py-2 rounded-lg bg-white shadow-sm border",
      timeLeft <= 60 ? "text-red-600 border-red-200 animate-pulse" : "text-slate-700 border-slate-200"
    )}>
      <Clock className={cn("w-6 h-6", timeLeft <= 60 ? "text-red-500" : "text-slate-400")} />
      <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
    </div>
  );
}
