import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ShieldCheck, User } from 'lucide-react';
import bgLogin from '../assets/bg-login.png';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'admin' && password !== 'admin123') {
      setError('Mật khẩu quản trị không đúng! (Mật khẩu: admin123)');
      return;
    }
    if (!username.trim()) {
      setError('Vui lòng nhập họ tên hoặc tài khoản!');
      return;
    }
    
    login(username, role);
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/home');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 relative"
      style={{ backgroundImage: `url(${bgLogin})` }}
    >
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden relative z-10 border border-white/20">
        <div className="bg-slate-900 p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Hệ thống Ôn thi</h1>
          <p className="text-slate-400">Đăng nhập để tiếp tục</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8">
          <div className="flex gap-4 mb-8">
            <button
              type="button"
              onClick={() => { setRole('student'); setError(''); }}
              className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors ${role === 'student' ? 'bg-primary-50 text-primary-700 border-2 border-primary-500' : 'bg-slate-50 text-slate-500 border-2 border-transparent hover:bg-slate-100'}`}
            >
              <User className="w-5 h-5" /> Thí sinh
            </button>
            <button
              type="button"
              onClick={() => { setRole('admin'); setError(''); }}
              className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors ${role === 'admin' ? 'bg-slate-800 text-white border-2 border-slate-800' : 'bg-slate-50 text-slate-500 border-2 border-transparent hover:bg-slate-100'}`}
            >
              <ShieldCheck className="w-5 h-5" /> Quản trị
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {role === 'admin' ? 'Tài khoản Admin' : 'Họ và tên thí sinh'}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={role === 'admin' ? 'Nhập tài khoản...' : 'Nguyễn Văn A...'}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
              />
            </div>

            {role === 'admin' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu (Gợi ý: admin123)</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
                />
              </div>
            )}
          </div>

          {error && <div className="mt-4 text-rose-600 text-sm font-medium bg-rose-50 p-3 rounded-lg">{error}</div>}

          <button
            type="submit"
            className="w-full mt-8 py-4 rounded-xl font-bold text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30"
          >
            Đăng nhập ngay
          </button>
        </form>
      </div>
    </div>
  );
}
