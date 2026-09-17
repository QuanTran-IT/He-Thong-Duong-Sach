import { useState } from 'react';
import Management from '../../client/src/pages/Management/Management.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import '../../client/src/styles/global.css';
import './login.css';

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function navigate(page, id) {
    const siteUrl = import.meta.env.VITE_PUBLIC_SITE_URL || 'https://he-thong-duong-sach.vercel.app';
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
              <small>Đăng nhập hệ thống</small>
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }}>
            <div className="form-group">
              <label>Tên đăng nhập</label>
              <input type="text" placeholder="Nhập tài khoản quản trị..." required />
            </div>
            <div className="form-group">
              <label>Mật khẩu</label>
              <input type="password" placeholder="••••••••" required />
            </div>
            <button type="submit" className="login-submit">Đăng nhập</button>
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