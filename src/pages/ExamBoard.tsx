import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExamStore } from '../store/examStore';
import { Timer } from '../components/Timer';
import { GridNavigation } from '../components/GridNavigation';
import { QuestionDisplay } from '../components/QuestionDisplay';
import { ResultView } from '../components/ResultView';
import { ChevronLeft, Send } from 'lucide-react';

export function ExamBoard() {
  const navigate = useNavigate();
  const { currentExam, isFinished, submitExam } = useExamStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!currentExam) {
      navigate('/');
    }
  }, [currentExam, navigate]);

  useEffect(() => {
    if (isFinished) {
      setShowResult(true);
    }
  }, [isFinished]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isFinished) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isFinished]);

  const handleBack = () => {
    if (!isFinished) {
      if (window.confirm('Bạn đang làm bài thi. Bạn có chắc chắn muốn thoát? Kết quả sẽ không được lưu!')) {
        navigate('/home');
      }
    } else {
      navigate('/home');
    }
  };

  if (!currentExam) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBack}
              className="p-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="font-bold text-slate-800 hidden sm:block">{currentExam.title}</h1>
              <div className="text-sm font-medium text-slate-500 sm:hidden">Thi trắc nghiệm</div>
            </div>
          </div>
          <Timer />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 flex flex-col lg:flex-row gap-8">
        {showResult ? (
          <div className="flex-1 flex justify-center items-center">
            <ResultView onClose={() => setShowResult(false)} />
          </div>
        ) : (
          <>
            {/* Left side: Question Board */}
            <div className="flex-1 w-full lg:w-2/3 flex flex-col min-w-0">
              <QuestionDisplay 
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
              />
            </div>

            {/* Right side: Navigation Grid */}
            <div className="w-full lg:w-80 lg:shrink-0 flex flex-col gap-6">
              <GridNavigation 
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
              />

              {!isFinished && (
                <button
                  onClick={() => {
                    if (window.confirm('Bạn có chắc chắn muốn nộp bài?')) {
                      submitExam();
                    }
                  }}
                  className="w-full py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-primary-600 transition-colors shadow-lg shadow-primary-600/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Nộp bài thi
                </button>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
