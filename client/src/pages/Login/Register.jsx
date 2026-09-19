import { useState } from 'react';
import './login.css';

export default function Register({ navigate, onLogin }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleRegister(e) {
        e.preventDefault();
        if (onLogin) onLogin();
        navigate('home');
    }

    return (
        <div className="client-login-wrapper">
            <div className="client-login-box">
                <div className="login-brand">
                    <span className="brand-icon">DS</span>
                    <div>
                        <strong>ĐƯỜNG SÁCH TP.HCM</strong>
                        <small>Tạo tài khoản Độc giả</small>
                    </div>
                </div>
                
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Họ và tên</label>
                        <input 
                            type="text" 
                            placeholder="Nhập họ và tên..." 
                            required 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder="vi-du@duongsach.vn" 
                            required 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            required 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                        />
                    </div>
                    
                    <button type="submit" className="login-submit">Đăng ký tài khoản</button>
                </form>
                
                <p className="auth-register-link">
                    Đã có tài khoản?{' '}
                    <button onClick={() => navigate('login')}>Đăng nhập ngay</button>
                </p>

                <button className="login-back" onClick={() => navigate('home')}>← Trở lại Trang chủ</button>
            </div>
        </div>
    );
}
