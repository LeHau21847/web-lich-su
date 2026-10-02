import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { ExamBoard } from './pages/ExamBoard';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { useAuthStore } from './store/authStore';
import { useDataStore } from './store/dataStore';
import { useActivityStore } from './store/activityStore';

function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode, allowedRole?: 'admin' | 'student' }) {
  const { role } = useAuthStore();
  if (role === 'guest') return <Navigate to="/login" replace />;
  if (allowedRole && role !== allowedRole) return <Navigate to={role === 'admin' ? '/admin' : '/home'} replace />;
  return <>{children}</>;
}

function App() {
  useEffect(() => {
    // Tải dữ liệu ban đầu từ API local
    fetch('/api/exams').then(r => r.json()).then(exams => {
      useDataStore.setState({ exams });
    }).catch(console.error);

    fetch('/api/sessions').then(r => r.json()).then(sessions => {
      useActivityStore.setState({ sessions });
    }).catch(console.error);

    // Đồng bộ khi State thay đổi lên Server
    useDataStore.subscribe((state) => {
      fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state.exams)
      }).catch(console.error);
    });

    useActivityStore.subscribe((state) => {
      fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state.sessions)
      }).catch(console.error);
    });
    
    // Polling cho Admin để xem realtime những ai đang thi
    const interval = setInterval(() => {
      if (useAuthStore.getState().role === 'admin') {
        fetch('/api/sessions').then(r => r.json()).then(sessions => {
          useActivityStore.setState({ sessions });
        }).catch(console.error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute allowedRole="student"><Home /></ProtectedRoute>} />
        <Route path="/exam" element={<ProtectedRoute allowedRole="student"><ExamBoard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><Admin /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
