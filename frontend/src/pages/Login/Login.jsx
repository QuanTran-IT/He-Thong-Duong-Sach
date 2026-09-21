import { useState } from 'react';
import './login.css';

export default function Login({ navigate, onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(e) {
        e.preventDefault();
        if (onLogin) onLogin();
        navigate('home');
    }

    function goToAdmin() {
        window.location.href = import.meta.env.VITE_PUBLIC_ADMIN_URL || 'http://localhost:5174';
    }

    return (
        <div className="client-login-wrapper">
            <div className="client-login-box">
                <div className="login-brand">
                    <span className="brand-icon">DS</span>
                    <div>
                        <strong>ĐƯỜNG SÁCH TP.HCM</strong>
                        <small>Cổng thông tin Độc giả</small>
                    </div>
                </div>
                
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email hoặc Tên đăng nhập</label>
                        <input 
                            type="text" 
                            placeholder="vi-du@duongsach.vn" 
                            required 
                            value={username} 
                            onChange={e => setUsername(e.target.value)} 
                        />
                    </div>
                    
                    <div className="form-group">
                        <div className="auth-field-header">
                            <label>Mật khẩu</label>
                            <button type="button" className="auth-forgot">Quên mật khẩu?</button>
                        </div>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            required 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                        />
                    </div>
                    
                    <button type="submit" className="login-submit">Đăng nhập</button>
                </form>
                
                <p className="auth-register-link">
                    Chưa có tài khoản?{' '}
                    <button onClick={() => navigate('register')}>Tạo tài khoản mới</button>
                </p>

                <div className="auth-divider"></div>

                <button className="login-admin-btn" onClick={goToAdmin}>Đăng nhập dành cho Ban Quản Lý →</button>
                <button className="login-back" onClick={() => navigate('home')}>← Trở lại Trang chủ</button>
            </div>
        </div>
    );
}
