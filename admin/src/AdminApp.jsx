import { useState } from 'react';
import Management from '../../frontend/src/pages/Management/Management.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import '../../frontend/src/styles/global.css';
import './login.css';

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('adminAuth') === 'true';
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function navigate(page, id) {
    const siteUrl = import.meta.env.DEV ? 'http://localhost:5173' : (import.meta.env.VITE_PUBLIC_SITE_URL || 'https://he-thong-duong-sach.vercel.app');
    if (page === 'home') {
      window.location.href = siteUrl;
    } else if (page === 'stall-detail') {
      window.location.href = siteUrl + `?page=stall-detail&id=${encodeURIComponent(id)}`;
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-box">
          <div className="login-brand">
            <span className="brand-icon">DS</span>
            <div>
              <strong>ĐIỀU HÀNH ĐƯỜNG SÁCH</strong>
              <small>Đăng nhập Quản trị viên</small>
            </div>
          </div>
          <form onSubmit={async (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;

            setLoading(true);
            setError('');

            try {
              const res = await fetch('http://localhost:4000/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
              });

              if (res.ok) {
                const data = await res.json();
                setIsAuthenticated(true);
                localStorage.setItem('adminAuth', 'true');
              } else {
                const errData = await res.json();
                setError(errData.message || 'Tên đăng nhập hoặc mật khẩu không đúng');
              }
            } catch (err) {
              setError('Không thể kết nối đến máy chủ');
            } finally {
              setLoading(false);
            }
          }}>
            {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <div className="form-group">
              <label>Tên đăng nhập</label>
              <input type="text" name="username" placeholder="Nhập tài khoản quản trị..." required defaultValue="admin" disabled={loading} />
            </div>
            <div className="form-group">
              <label>Mật khẩu</label>
              <input type="password" name="password" placeholder="••••••••" required defaultValue="duongsach@2026" disabled={loading} />
            </div>
            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập Quản trị viên'}
            </button>
          </form>
          <button className="login-back" onClick={() => navigate('home')}>← Quay lại cổng bạn đọc</button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Management navigate={navigate} />
    </ErrorBoundary>
  );
}
