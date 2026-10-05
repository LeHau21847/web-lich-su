import { useNavigate } from 'react-router-dom';
import { useDataStore } from '../store/dataStore';
import { useExamStore } from '../store/examStore';
import { useAuthStore } from '../store/authStore';
import { useActivityStore } from '../store/activityStore';
import { BookOpen, GraduationCap, ArrowRight, LogOut, User as UserIcon, History, RotateCcw, Eye, X, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import bgHome from '../assets/bg-home.png';

export function Home() {
  const navigate = useNavigate();
  const { setCurrentExam } = useExamStore();
  const { exams } = useDataStore();
  const { logout, username } = useAuthStore();
  const { startSession, sessions } = useActivityStore();
  
  const myHistory = sessions.filter(s => s.studentName === username && s.status === 'finished');
  const [viewingSession, setViewingSession] = useState<any>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const examsPerPage = 4;

  const filteredExams = exams.filter(exam => exam.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filteredExams.length / examsPerPage);
  const currentExams = filteredExams.slice((currentPage - 1) * examsPerPage, currentPage * examsPerPage);

  const handleStartExam = (examId: string) => {
    const exam = exams.find(e => e.id === examId);
    if (exam) {
      const sessionId = startSession(username || 'Khách', exam.id, exam.title);
      setCurrentExam(exam, sessionId);
      navigate('/exam');
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-[length:100%_100%] bg-no-repeat bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${bgHome})` }}
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
          <p className="text-xl text-slate-200 max-w-2xl mx-auto font-medium mb-8">
            Nền tảng kiểm tra kiến thức lịch sử chuẩn xác, giao diện hiện đại, giúp bạn tự tin bước vào kỳ thi.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm đề thi..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-11 pr-4 py-3.5 bg-white/90 backdrop-blur-md border border-white/40 rounded-2xl text-slate-800 focus:outline-none focus:ring-4 focus:ring-primary-500/30 transition-all shadow-lg placeholder:text-slate-500 font-medium"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {currentExams.map((exam) => (
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
          {currentExams.length === 0 && (
            <div className="col-span-2 text-center py-12 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
              <p className="text-white text-lg font-medium">Không tìm thấy đề thi nào phù hợp.</p>
            </div>
          )}
        </div>

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white disabled:opacity-50 hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === i + 1 ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white disabled:opacity-50 hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Lịch sử làm bài */}
        {myHistory.length > 0 && (
          <div className="mt-16 bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
              <History className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-slate-800">Lịch sử làm bài của bạn</h2>
            </div>
            
            <div className="space-y-4">
              {myHistory.slice().reverse().map(session => (
                <div key={session.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm gap-4 hover:border-primary-300 transition-colors">
                  <div>
                    <h4 className="font-bold text-slate-800">{session.examTitle}</h4>
                    <p className="text-sm text-slate-500 mt-1">
                      Nộp bài: {new Date(session.endTime || session.startTime).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Điểm số</div>
                      <div className={`text-xl font-black ${session.score && session.score >= 5 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {session.score?.toFixed(1)}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => setViewingSession(session)}
                        className="p-2 text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-lg transition-colors"
                        title="Xem lại câu sai"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleStartExam(session.examId)}
                        className="p-2 text-primary-600 bg-primary-50 hover:bg-primary-100 hover:text-primary-700 rounded-lg transition-colors"
                        title="Làm lại đề này"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal Xem lại */}
      {viewingSession && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Chi tiết bài làm</h3>
                <p className="text-sm text-slate-500 mt-1">{viewingSession.examTitle}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-1">Điểm số</div>
                  <div className="text-3xl font-black text-primary-600">{viewingSession.score?.toFixed(1)}</div>
                </div>
                <button onClick={() => setViewingSession(null)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {(() => {
                const exam = exams.find(e => e.id === viewingSession.examId);
                if (!exam) return <div>Không tìm thấy dữ liệu đề gốc.</div>;
                
                return exam.questions.map((q, idx) => {
                  const studentAnswerId = viewingSession.answers?.[q.id];
                  const isCorrect = studentAnswerId === q.correctOptionId;
                  
                  return (
                    <div key={q.id} className={`p-5 rounded-xl border ${studentAnswerId ? (isCorrect ? 'border-emerald-200 bg-emerald-50/30' : 'border-rose-200 bg-rose-50/30') : 'border-slate-200 bg-slate-50/30'}`}>
                      <h4 className="font-semibold text-slate-800 mb-4">
                        Câu {idx + 1}: {q.content}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {q.options.map(opt => {
                          const isStudentChoice = studentAnswerId === opt.id;
                          const isActualCorrect = q.correctOptionId === opt.id;
                          
                          let className = "px-4 py-3 rounded-lg border text-sm font-medium flex justify-between items-center ";
                          if (isActualCorrect) {
                            className += "border-emerald-500 bg-emerald-100 text-emerald-800 ring-2 ring-emerald-500 ring-offset-1";
                          } else if (isStudentChoice && !isActualCorrect) {
                            className += "border-rose-500 bg-rose-100 text-rose-800";
                          } else {
                            className += "border-slate-200 bg-white text-slate-500 opacity-60";
                          }

                          return (
                            <div key={opt.id} className={className}>
                              <div className="flex gap-3">
                                <span className="font-bold">{opt.id}.</span>
                                {opt.content}
                              </div>
                              {isStudentChoice && (
                                <span className="text-xs font-black uppercase tracking-wider">Bạn chọn</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      {!studentAnswerId && <p className="mt-3 text-sm text-rose-500 font-semibold italic">Bạn đã bỏ trống câu này.</p>}
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
