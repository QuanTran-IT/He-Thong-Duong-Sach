import { useState } from 'react';
import './login.css';

export default function Login({ navigate, onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleLogin(e) {
        e.preventDefault();

        setError('');

        try {
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Đăng nhập thất bại.');
                return;
            }

            console.log('Login successful:', data.user);

            localStorage.setItem('loggedInUser', JSON.stringify(data.user));

            if (onLogin) {
                onLogin(data.user);
            }

            navigate('home');

        } catch (error) {
            console.error('Login error:', error);
            setError('Không thể kết nối đến máy chủ.');
        }
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


                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

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
