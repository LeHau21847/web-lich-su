import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '../store/dataStore';
import { useAuthStore } from '../store/authStore';
import { Edit, Save, Trash2, LogOut, X, Plus, ToggleLeft, ToggleRight, CheckCircle2 } from 'lucide-react';
import type { Option } from '../types';

export function Admin() {
  const navigate = useNavigate();
  const { exams, updateQuestion, updateExamTitle, toggleShuffleExam, addExam, deleteExam, addQuestion, deleteQuestion } = useDataStore();


  const { logout, username } = useAuthStore();
  
  const [selectedExamId, setSelectedExamId] = useState<string>(exams[0]?.id || '');
  const selectedExam = exams.find(e => e.id === selectedExamId);

  // Edit Exam State
  const [isEditingExam, setIsEditingExam] = useState(false);
  const [editExamTitleState, setEditExamTitleState] = useState('');
  const [editExamTime, setEditExamTime] = useState(0);
  const [editExamLevel, setEditExamLevel] = useState<'THCS' | 'THPT'>('THCS');

  // Edit Question State
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editQuestionContent, setEditQuestionContent] = useState('');
  const [editOptions, setEditOptions] = useState<Option[]>([]);
  const [editCorrectId, setEditCorrectId] = useState('');

  const handleEditExamClick = () => {
    if (!selectedExam) return;
    setEditExamTitleState(selectedExam.title);
    setEditExamTime(selectedExam.timeLimit / 60);
    setEditExamLevel(selectedExam.level);
    setIsEditingExam(true);
  };

  const handleSaveExam = () => {
    if (selectedExam) {
      updateExamTitle(selectedExam.id, editExamTitleState, editExamTime * 60, editExamLevel);
    }
    setIsEditingExam(false);
  };

  const handleEditQuestionClick = (q: any) => {
    setEditingQuestionId(q.id);
    setEditQuestionContent(q.content);
    setEditOptions(q.options);
    setEditCorrectId(q.correctOptionId);
  };

  const handleSaveQuestion = (examId: string, qId: string) => {
    const q = selectedExam?.questions.find(x => x.id === qId);
    if (q) {
      updateQuestion(examId, qId, { 
        ...q, 
        content: editQuestionContent,
        options: editOptions,
        correctOptionId: editCorrectId
      });
    }
    setEditingQuestionId(null);
  };

  const handleOptionChange = (optId: string, newContent: string) => {
    setEditOptions(prev => prev.map(o => o.id === optId ? { ...o, content: newContent } : o));
  };

  const handleDeleteExam = (examId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa vĩnh viễn đề thi này không?')) {
      deleteExam(examId);
      if (selectedExamId === examId) {
        setSelectedExamId(exams.length > 1 ? exams.find(e => e.id !== examId)?.id || '' : '');
      }
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="font-bold text-lg hidden sm:block">Admin Panel - Quản lý Đề thi</h1>
          </div>
          <div className="flex items-center gap-6">
             <span className="text-sm font-medium text-slate-300 hidden md:block">Xin chào, {username}</span>
             <button 
               onClick={() => { logout(); navigate('/login'); }}
               className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 rounded-lg text-sm font-medium transition-colors"
             >
               <LogOut className="w-4 h-4" />
               Đăng xuất
             </button>
          </div>
        </div>
      </header>


      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-4 py-3 bg-slate-100 border-b border-slate-200 font-semibold text-slate-700">
              Danh sách đề thi
            </div>
            <div className="divide-y divide-slate-100">
              {exams.map(exam => (
                <button
                  key={exam.id}
                  onClick={() => { setSelectedExamId(exam.id); setIsEditingExam(false); setEditingQuestionId(null); }}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                    selectedExamId === exam.id ? 'bg-primary-50 text-primary-700 font-semibold border-l-4 border-primary-500' : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'
                  }`}
                >
                  {exam.title}
                </button>
              ))}
            </div>
            <div className="p-3 border-t border-slate-100 bg-slate-50">
              <button
                onClick={() => {
                  addExam();
                  // Vừa thêm xong, exam mới sẽ nằm ở cuối, ta có thể tự động chọn nó bằng cách 
                  // đợi render hoặc chọn ở lần render sau, ở đây ta cứ render bình thường.
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 transition-colors border border-primary-200 border-dashed"
              >
                <Plus className="w-4 h-4" />
                Tạo đề mới
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          {selectedExam ? (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start mb-6 pb-6 border-b border-slate-100 gap-4">
                {isEditingExam ? (
                  <div className="flex-1 w-full space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">Tên đề thi</label>
                      <input 
                        type="text" 
                        value={editExamTitleState} 
                        onChange={e => setEditExamTitleState(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg font-bold text-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">Cấp bậc</label>
                        <select 
                          value={editExamLevel} 
                          onChange={e => setEditExamLevel(e.target.value as any)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="THCS">Trung học cơ sở</option>
                          <option value="THPT">Trung học phổ thông</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase">Thời gian (phút)</label>
                        <input 
                          type="number" 
                          value={editExamTime} 
                          onChange={e => setEditExamTime(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{selectedExam.title}</h2>
                    <div className="flex gap-4 mt-2 text-sm text-slate-500">
                      <span>Cấp bậc: <strong className="text-slate-700">{selectedExam.level === 'THCS' ? 'Trung học cơ sở' : 'Trung học phổ thông'}</strong></span>
                      <span>Thời gian: <strong className="text-slate-700">{selectedExam.timeLimit / 60} phút</strong></span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 shrink-0 items-center">
                  <button 
                    onClick={() => toggleShuffleExam(selectedExam.id)}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-semibold transition-colors ${selectedExam.isShuffled ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200' : 'text-slate-500 bg-slate-50 hover:bg-slate-100 border-slate-200'}`}
                    title="Nếu bật, học sinh khi làm bài sẽ nhận được bộ câu hỏi và đáp án được xáo trộn."
                  >
                    {selectedExam.isShuffled ? <ToggleRight className="w-5 h-5 text-emerald-500" /> : <ToggleLeft className="w-5 h-5" />}
                    Trộn đề: {selectedExam.isShuffled ? 'ĐANG BẬT' : 'ĐANG TẮT'}
                  </button>

                  {isEditingExam ? (
                    <>
                      <button onClick={handleSaveExam} className="flex items-center gap-2 px-4 py-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-semibold transition-colors">
                        <Save className="w-4 h-4" /> Lưu
                      </button>
                      <button onClick={() => setIsEditingExam(false)} className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-semibold transition-colors">
                        <X className="w-4 h-4" /> Hủy
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={handleEditExamClick} className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-semibold transition-colors">
                        <Edit className="w-4 h-4" />
                        Sửa thông tin
                      </button>
                      <button 
                        onClick={() => handleDeleteExam(selectedExam.id)}
                        className="flex items-center gap-2 px-4 py-2 text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg text-sm font-semibold transition-colors"
                        title="Xóa đề thi này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-8">
                {selectedExam.questions.map((q, idx) => (
                  <div key={q.id} className={`p-5 rounded-xl border ${editingQuestionId === q.id ? 'border-primary-300 bg-primary-50/30 shadow-sm' : 'border-slate-200 bg-slate-50/50'}`}>
                    <div className="flex justify-between items-start mb-4">
                      
                      {editingQuestionId === q.id ? (
                        <div className="flex-1 mr-4">
                          <label className="block text-xs font-semibold text-primary-600 mb-1 uppercase">Nội dung câu hỏi</label>
                          <textarea 
                            value={editQuestionContent}
                            onChange={e => setEditQuestionContent(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 min-h-[80px]"
                          />
                        </div>
                      ) : (
                        <h4 className="font-semibold text-slate-800 flex-1">
                          Câu {idx + 1}: {q.content}
                        </h4>
                      )}

                      <div className="flex gap-2 shrink-0">
                         {editingQuestionId === q.id ? (
                           <>
                             <button onClick={() => handleSaveQuestion(selectedExam.id, q.id)} className="flex items-center gap-2 px-3 py-1.5 text-white bg-primary-600 hover:bg-primary-700 rounded-lg text-sm font-medium shadow-sm"><Save className="w-4 h-4" /> Lưu</button>
                             <button onClick={() => setEditingQuestionId(null)} className="flex items-center gap-2 px-3 py-1.5 text-slate-600 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 text-sm font-medium shadow-sm"><X className="w-4 h-4" /> Hủy</button>
                           </>
                         ) : (
                           <button onClick={() => handleEditQuestionClick(q)} className="p-1.5 text-slate-400 hover:text-primary-600 rounded bg-white border border-slate-200 shadow-sm"><Edit className="w-4 h-4" /></button>
                         )}
                         <button onClick={() => { if(window.confirm('Xóa câu hỏi này?')) deleteQuestion(selectedExam.id, q.id) }} className="p-1.5 text-slate-400 hover:text-rose-600 rounded bg-white border border-slate-200 shadow-sm"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(editingQuestionId === q.id ? editOptions : q.options).map(opt => (
                        <div 
                          key={opt.id} 
                          className={`px-4 py-3 rounded-lg border text-sm flex items-center gap-3 transition-colors ${
                            (editingQuestionId === q.id ? editCorrectId === opt.id : q.correctOptionId === opt.id)
                              ? 'bg-emerald-50 border-emerald-200' 
                              : 'bg-white border-slate-200'
                          }`}
                        >
                          <span className={`font-bold w-6 shrink-0 ${(editingQuestionId === q.id ? editCorrectId === opt.id : q.correctOptionId === opt.id) ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {opt.id}.
                          </span>
                          
                          {editingQuestionId === q.id ? (
                            <input 
                              type="text"
                              value={opt.content}
                              onChange={(e) => handleOptionChange(opt.id, e.target.value)}
                              className="flex-1 px-2 py-1 border border-slate-200 rounded focus:ring-1 focus:ring-primary-500 bg-white"
                            />
                          ) : (
                            <span className={(q.correctOptionId === opt.id) ? 'text-emerald-800 font-medium' : 'text-slate-600'}>{opt.content}</span>
                          )}

                          {editingQuestionId === q.id ? (
                            <button
                              onClick={() => setEditCorrectId(opt.id)}
                              className={`p-1.5 rounded-full transition-colors shrink-0 ${editCorrectId === opt.id ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400 hover:bg-emerald-100 hover:text-emerald-600'}`}
                              title="Đặt làm đáp án đúng"
                            >
                              <CheckCircle2 className="w-5 h-5" />
                            </button>
                          ) : (
                            q.correctOptionId === opt.id && <span className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded shrink-0">ĐÁP ÁN ĐÚNG</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => addQuestion(selectedExam.id)}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 transition-colors border-2 border-primary-200 border-dashed"
                >
                  <Plus className="w-5 h-5" />
                  Thêm câu hỏi mới
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500">
              Vui lòng chọn một đề thi để xem chi tiết
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
