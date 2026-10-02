import { useExamStore } from '../store/examStore';
import { Trophy, RotateCcw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ResultViewProps {
  onClose: () => void;
}

export function ResultView({ onClose }: ResultViewProps) {
  const { currentExam, answers, score, resetExam } = useExamStore();
  const navigate = useNavigate();

  if (!currentExam) return null;

  const totalQuestions = currentExam.questions.length;
  let correctCount = 0;
  let wrongCount = 0;
  
  currentExam.questions.forEach((q) => {
    if (answers[q.id] === q.correctOptionId) {
      correctCount++;
    } else if (answers[q.id]) {
      wrongCount++;
    }
  });

  const unansweredCount = totalQuestions - correctCount - wrongCount;

  return (
    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-300 mx-auto">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-10 text-center relative">
        <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md mb-6 shadow-inner">
          <Trophy className="w-12 h-12 text-yellow-300" />
        </div>
        
        <h2 className="text-4xl font-bold text-white mb-3">Hoàn thành bài thi!</h2>
        <p className="text-lg text-primary-100">{currentExam.title}</p>
      </div>

      <div className="p-10">
        <div className="text-center mb-10">
          <div className="text-7xl font-black text-slate-800 tracking-tight">
            {score.toFixed(1)}<span className="text-3xl text-slate-400 font-medium">/10</span>
          </div>
          <p className="text-slate-500 mt-3 text-lg font-medium">Điểm số của bạn</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
            <span className="text-emerald-700 font-bold text-3xl mb-1">{correctCount}</span>
            <span className="text-emerald-700 font-medium text-sm">Câu đúng</span>
          </div>
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-rose-50 border border-rose-100">
            <span className="text-rose-700 font-bold text-3xl mb-1">{wrongCount}</span>
            <span className="text-rose-700 font-medium text-sm">Câu sai</span>
          </div>
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-slate-600 font-bold text-3xl mb-1">{unansweredCount}</span>
            <span className="text-slate-600 font-medium text-sm">Chưa làm</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => {
              resetExam();
              navigate('/home');
            }}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors text-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Thi lại đề này
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-4 rounded-xl font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-md shadow-primary-600/20 text-lg"
          >
            Xem lại đáp án
          </button>
        </div>
        
        <button
          onClick={() => navigate('/home')}
          className="w-full mt-4 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 transition-colors text-lg"
        >
          <Home className="w-5 h-5" />
          Về trang chủ
        </button>
      </div>
    </div>
  );
}
