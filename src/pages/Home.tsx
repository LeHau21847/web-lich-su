import { useNavigate } from 'react-router-dom';
import { useDataStore } from '../store/dataStore';
import { useExamStore } from '../store/examStore';
import { useAuthStore } from '../store/authStore';
import { useActivityStore } from '../store/activityStore';
import { BookOpen, GraduationCap, ArrowRight, LogOut, User as UserIcon } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();
  const { setCurrentExam } = useExamStore();
  const { exams } = useDataStore();
  const { logout, username } = useAuthStore();
  const { startSession } = useActivityStore();

  const handleStartExam = (examId: string) => {
    const exam = exams.find(e => e.id === examId);
    if (exam) {
      const sessionId = startSession(username, exam.id, exam.title);
      setCurrentExam(exam, sessionId);
      navigate('/exam');
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url('/bg-home.png')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
      
      {/* Header Info */}
      <div className="absolute top-6 right-8 z-20 flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white">
           <UserIcon className="w-4 h-4" />
           <span className="font-medium">{username}</span>
        </div>
        <button 
          onClick={() => { logout(); navigate('/login'); }}
          className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 rounded-full text-white font-medium transition-colors shadow-lg"
        >
          <LogOut className="w-4 h-4" />
          Đăng xuất
        </button>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-block p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 mb-6 shadow-2xl">
            <GraduationCap className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-md">
            Hệ thống Ôn thi <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Lịch sử</span>
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto font-medium">
            Nền tảng kiểm tra kiến thức lịch sử chuẩn xác, giao diện hiện đại, giúp bạn tự tin bước vào kỳ thi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {exams.map((exam) => (
            <div 
              key={exam.id}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 hover:scale-[1.02] transition-transform duration-300 flex flex-col group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-primary-100 text-primary-700">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">{exam.level === 'THCS' ? 'Trung học cơ sở' : 'Trung học phổ thông'}</h3>
                  <p className="text-slate-500 font-medium">{exam.questions.length} câu hỏi • {exam.timeLimit / 60} phút</p>
                </div>
              </div>
              
              <h4 className="text-xl font-semibold text-slate-700 mb-8 flex-1 leading-snug">
                {exam.title}
              </h4>
              
              <button
                onClick={() => handleStartExam(exam.id)}
                className="w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-primary-600 text-white font-bold text-lg transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-primary-600/30"
              >
                Bắt đầu thi ngay
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
