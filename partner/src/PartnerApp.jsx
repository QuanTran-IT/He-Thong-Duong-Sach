import { useState } from 'react';
import '../../client/src/styles/global.css';
import '../../client/src/pages/Login/login.css';
import './partner.css';

export default function PartnerApp() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [view, setView] = useState('overview');
    const [fabOpen, setFabOpen] = useState(false);

    function goToClient() {
        window.location.href = import.meta.env.VITE_PUBLIC_SITE_URL || 'http://localhost:5173';
    }

    function goToAdmin() {
        window.location.href = import.meta.env.VITE_PUBLIC_ADMIN_URL || 'http://localhost:5174';
    }

    if (!isAuthenticated) {
        return (
            <div className="auth-page">
                <div className="auth-bg-circle auth-bg-circle-1" />
                <div className="auth-bg-circle auth-bg-circle-2" />

                <div className="auth-top-bar">
                    <button className="auth-back-btn" onClick={goToClient}>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>
                        Quay lại Trang chủ
                    </button>
                    <button className="auth-switch-btn" onClick={goToClient}>
                        Đăng nhập Độc giả →
                    </button>
                </div>

                <div className="auth-card">
                    <div className="auth-logo">
                        <div className="auth-logo-circle">
                            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" /></svg>
                        </div>
                        <span className="auth-badge">
                            <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                            ĐỐI TÁC &amp; TRIỂN LÃM
                        </span>
                    </div>

                    <h1 className="auth-title">Cổng Đối tác &amp; Triển lãm</h1>
                    <p className="auth-subtitle">
                        Hệ thống đăng ký sự kiện, quản trị gian hàng &amp; đề xuất hoạt động tại Đường Sách TP.HCM
                    </p>

                    <form className="auth-form" onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }}>
                        <div className="auth-field">
                            <label htmlFor="partner-username">Tài khoản đơn vị / Email đại diện</label>
                            <div className="auth-input-wrap">
                                <svg className="auth-input-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                <input id="partner-username" type="text" placeholder="doitac" required defaultValue="doitac" />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label htmlFor="partner-password">Mật khẩu bảo mật</label>
                            <div className="auth-input-wrap">
                                <svg className="auth-input-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" /></svg>
                                <input id="partner-password" type="password" placeholder="••••••••" required defaultValue="duongsach@2026" />
                            </div>
                        </div>

                        <button type="submit" className="auth-submit">
                            Đăng nhập vào Cổng Đối tác →
                        </button>

                        <button type="button" className="auth-demo-btn" onClick={() => setIsAuthenticated(true)} style={{ marginTop: '12px' }}>
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" /></svg>
                            Đăng nhập nhanh mẫu (Nhà Sách Bình Minh)
                        </button>
                    </form>

                    <div className="auth-other-portals">
                        <div className="auth-portal-links">
                            <span>Ban Quản Lý Đường Sách?</span>
                            <button onClick={goToAdmin} style={{ color: 'var(--coral, #d66d42)' }}>Đăng nhập Cổng BQL</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const navItems = [
        { key: 'overview', label: 'Tổng quan', icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /></svg> },
        { key: 'events', label: 'Sự kiện của tôi', icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" /></svg> },
        { key: 'stalls', label: 'Quản lý gian hàng', icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" /></svg> },
        { key: 'activities', label: 'Quản lý hoạt động', icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg> },
        { key: 'reports', label: 'Báo cáo & Thống kê', icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" /></svg> },
        { key: 'notifications', label: 'Thông báo', badge: '2', icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" /></svg> },
        { key: 'profile', label: 'Hồ sơ tài khoản', icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg> },
    ];

    function handleViewChange(newView) {
        setView(newView);
        setFabOpen(false);
    }

    return (
        <div className="partner-app">
            <aside className="partner-sidebar">
                <div className="partner-brand">
                    <div className="brand-logo">
                        <span className="brand-mark"></span>
                    </div>
                    <div>
                        <strong>ĐƯỜNG SÁCH</strong>
                        <small>TP.HCM • PARTNER</small>
                    </div>
                </div>

                <nav className="partner-nav">
                    {navItems.map(item => (
                        <button
                            key={item.key}
                            className={`partner-nav-item ${view === item.key ? 'active' : ''}`}
                            onClick={() => handleViewChange(item.key)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                            {item.badge && <span className="nav-badge">{item.badge}</span>}
                        </button>
                    ))}
                </nav>

                <div className="partner-sidebar-footer">
                    <strong>Đường Sách TP.HCM</strong>
                    <small>Cổng Đối tác 2026</small>
                </div>
            </aside>

            <main className="partner-main">
                <header className="partner-topbar">
                    <div className="topbar-search">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                        <input type="text" placeholder="Tìm kiếm gian hàng, hoạt động..." />
                    </div>

                    <div className="topbar-actions">
                        <button className="topbar-btn"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" /></svg></button>
                        <div className="topbar-user">
                            <div className="user-avatar">NB</div>
                            <div className="user-info">
                                <strong>Nhà Sách Bình Minh</strong>
                                <small>Đối tác / Đơn vị triển lãm</small>
                            </div>
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ opacity: 0.5 }}><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" /></svg>
                        </div>
                    </div>
                </header>

                <div className="partner-content">
                    {view === 'overview' && (
                        <div className="partner-overview">
                            <div className="overview-header">
                                <div>
                                    <h2>Xin chào, Nhà Sách Bình Minh!</h2>
                                    <p>Cổng quản lý gian hàng &amp; hoạt động triển lãm tại Đường Sách TP.HCM.</p>
                                </div>
                                <button className="btn-primary">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3 3h8v8H3zm2 2v4h4V5zm8-2h8v8h-8zm2 2v4h4V5zM3 13h8v8H3zm2 2v4h4v-4zm13 2h3v-2h-3v-2h-2v4h-4v2h6v4h2v-4h-2z" /></svg>
                                    Quét mã QR điểm danh
                                </button>
                            </div>

                            <div className="stats-cards">
                                <div className="stat-card event-card">
                                    <div className="event-info">
                                        <h3>Lễ hội Đường Sách Mùa Thu 2026</h3>
                                        <div className="event-meta">
                                            <span>📅 20 - 22 Tháng 10, 2026</span>
                                            <span>📍 Đường Sách TP.HCM</span>
                                        </div>
                                        <span className="status-badge success">✓ Đã được chấp thuận</span>
                                    </div>
                                    <button className="btn-outline">Xem chi tiết →</button>
                                </div>

                                <div className="stat-grid">
                                    <div className="stat-box">
                                        <div className="stat-val" style={{ color: '#1a4028' }}>1</div>
                                        <div className="stat-lbl">Sự kiện tham gia</div>
                                    </div>
                                    <div className="stat-box">
                                        <div className="stat-val" style={{ color: '#15803d' }}>1</div>
                                        <div className="stat-lbl">Gian hàng được phân</div>
                                    </div>
                                    <div className="stat-box">
                                        <div className="stat-val" style={{ color: '#d66d42' }}>3</div>
                                        <div className="stat-lbl">Hoạt động đề xuất</div>
                                    </div>
                                    <div className="stat-box">
                                        <div className="stat-val" style={{ color: '#1d4154' }}>856</div>
                                        <div className="stat-lbl">Tổng lượt tham gia</div>
                                    </div>
                                </div>
                            </div>

                            <div className="todo-section">
                                <div className="section-header">
                                    <h3>Việc cần làm</h3>
                                    <button className="btn-text">Xem tất cả →</button>
                                </div>
                                <div className="todo-list">
                                    <div className="todo-item critical">
                                        <div className="todo-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg></div>
                                        <div className="todo-content">
                                            <h4>Hoàn thiện thông tin gian hàng A05</h4>
                                            <p>Hạn: 15/09/2026</p>
                                        </div>
                                        <span className="todo-badge">Cần thực hiện</span>
                                    </div>
                                    <div className="todo-item warning">
                                        <div className="todo-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg></div>
                                        <div className="todo-content">
                                            <h4>Bổ sung thông tin hoạt động: Workshop Đọc Sách Cùng Trẻ</h4>
                                            <p>Hạn: 18/09/2026</p>
                                        </div>
                                        <span className="todo-badge">Chờ duyệt</span>
                                    </div>
                                    <div className="todo-item neutral">
                                        <div className="todo-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg></div>
                                        <div className="todo-content">
                                            <h4>Gửi báo cáo tổng kết sau sự kiện</h4>
                                            <p>Hạn: 25/10/2026</p>
                                        </div>
                                        <span className="todo-badge">Chưa đến hạn</span>
                                    </div>
                                </div>
                            </div>

                            <div className="quick-actions">
                                <button className="btn-secondary"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg> Đăng ký tham gia sự kiện</button>
                                <button className="btn-secondary"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" /></svg> Chọn gian hàng trên bản đồ</button>
                                <button className="btn-secondary"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg> Đề xuất hoạt động mới</button>
                            </div>
                        </div>
                    )}

                    {view === 'events' && (
                        <div className="partner-view-events">
                            <div className="overview-header">
                                <div>
                                    <h2>Sự kiện của tôi</h2>
                                    <p>Danh sách các sự kiện mà tổ chức của bạn đang tham gia hoặc đã đăng ký.</p>
                                </div>
                                <button className="btn-primary"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg> Tìm sự kiện mới</button>
                            </div>

                            <div className="partner-tabs">
                                <button className="active">Đang diễn ra (1)</button>
                                <button>Sắp tới (1)</button>
                                <button>Đã kết thúc (3)</button>
                            </div>

                            <div className="events-list">
                                <div className="event-list-card">
                                    <div className="event-list-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80')" }}></div>
                                    <div className="event-list-info">
                                        <div className="event-list-header">
                                            <h3>Lễ hội Đường Sách Mùa Thu 2026</h3>
                                            <span className="status-badge success" style={{ marginBottom: 0 }}>Đang diễn ra</span>
                                        </div>
                                        <div className="event-list-meta">
                                            <span>📅 01/10/2026 - 30/10/2026</span>
                                            <span>📍 Phố đi bộ Nguyễn Huệ</span>
                                        </div>
                                        <p className="event-list-desc">Tham gia triển lãm sách quy mô lớn với hơn 100 gian hàng và hàng chục hoạt động văn hóa nghệ thuật.</p>
                                        <div className="event-list-roles">
                                            <strong>Vai trò:</strong>
                                            <span className="role-tag">Gian hàng tiêu chuẩn (A05)</span>
                                            <span className="role-tag">Tổ chức 3 hoạt động</span>
                                        </div>
                                    </div>
                                    <div className="event-list-actions">
                                        <button className="btn-primary btn-sm">Không gian sự kiện</button>
                                        <button className="btn-outline btn-sm">Xem chi tiết</button>
                                    </div>
                                </div>

                                <div className="event-list-card">
                                    <div className="event-list-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80')" }}></div>
                                    <div className="event-list-info">
                                        <div className="event-list-header">
                                            <h3>Hội Sách Thiếu Nhi TP.HCM 2026</h3>
                                            <span className="status-badge warning" style={{ marginBottom: 0 }}>Sắp tới</span>
                                        </div>
                                        <div className="event-list-meta">
                                            <span>📅 15/12/2026 - 25/12/2026</span>
                                            <span>📍 Đường Sách TP.HCM (Nguyễn Văn Bình)</span>
                                        </div>
                                        <p className="event-list-desc">Ngày hội đọc sách và các hoạt động giáo dục đặc biệt dành riêng cho trẻ em và phụ huynh.</p>
                                        <div className="event-list-roles">
                                            <strong>Vai trò:</strong>
                                            <span className="role-tag pending">Chờ duyệt đăng ký gian hàng</span>
                                        </div>
                                    </div>
                                    <div className="event-list-actions">
                                        <button className="btn-outline btn-sm">Quản lý đăng ký</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {view === 'stalls' && (
                        <div className="partner-view-stalls">
                            <div className="overview-header">
                                <div>
                                    <h2>Thông tin gian hàng</h2>
                                    <p>Quản lý thông tin gian hàng chính thức của tổ chức tại sự kiện.</p>
                                </div>
                                <div className="header-actions">
                                    <button className="btn-outline"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" /></svg> Xem trên bản đồ</button>
                                    <button className="btn-primary"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg> Chỉnh sửa</button>
                                </div>
                            </div>
                            <div className="stall-main-card">
                                <div className="stall-cover"></div>
                                <div className="stall-details">
                                    <h3>A05 <span>• Gian hàng Nhà Sách Bình Minh</span></h3>
                                    <ul className="stall-meta-list">
                                        <li><strong>Diện tích:</strong> 3m x 3m</li>
                                        <li><strong>Khu vực:</strong> Sách thiếu nhi (Khu A)</li>
                                        <li><strong>Sự kiện:</strong> Lễ hội Đường Sách Mùa Thu 2026</li>
                                    </ul>
                                    <div className="stall-actions">
                                        <button className="btn-outline btn-sm"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" /></svg> Xem trên bản đồ</button>
                                        <button className="btn-outline btn-sm"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" /></svg> Yêu cầu đổi gian hàng</button>
                                        <button className="btn-outline btn-sm btn-danger"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" /></svg> Yêu cầu hủy gian hàng</button>
                                    </div>
                                </div>
                            </div>
                            <div className="partner-tabs-container">
                                <div className="partner-tabs">
                                    <button className="active">Thông tin chung</button>
                                    <button>Hình ảnh</button>
                                    <button>Tài liệu</button>
                                </div>
                                <div className="tab-content">
                                    <h4>Mô tả gian hàng</h4>
                                    <p>Trưng bày và giới thiệu các đầu sách thiếu nhi, sách kỹ năng sống và tổ chức các hoạt động tương tác cùng độc giả nhí.</p>
                                    <h4>Danh mục ngành hàng trưng bày</h4>
                                    <div className="tags-list">
                                        <span className="tag">Sách thiếu nhi</span>
                                        <span className="tag">Sách kỹ năng sống</span>
                                        <span className="tag">Quà tặng</span>
                                        <span className="tag">Đồ chơi giáo dục</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {view === 'activities' && (
                        <div className="partner-view-activities">
                            <div className="overview-header">
                                <div>
                                    <h2>Danh sách hoạt động</h2>
                                    <p>Khởi tạo và theo dõi các hoạt động văn hóa, workshop và tọa đàm do đối tác tổ chức.</p>
                                </div>
                                <button className="btn-primary"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg> Đề xuất hoạt động</button>
                            </div>

                            <div className="partner-tabs">
                                <button className="active">Tất cả (3)</button>
                                <button>Chờ duyệt (1)</button>
                                <button>Đã duyệt (1)</button>
                                <button>Cần chỉnh sửa (1)</button>
                                <button>Đã hủy (0)</button>
                            </div>

                            <div className="activities-list">
                                <div className="activity-card">
                                    <div className="activity-img img-1"></div>
                                    <div className="activity-info">
                                        <div className="activity-title">
                                            <span className="type-badge badge-workshop">WORKSHOP</span>
                                            <h4>Workshop: Đọc sách cùng trẻ</h4>
                                        </div>
                                        <div className="activity-meta">
                                            <span>📅 21/10/2026 • ⏰ 14:00 - 15:30 (1.5 giờ)</span>
                                            <span>📍 Khu Workshop A</span>
                                            <span>👥 Số người: 50</span>
                                        </div>
                                    </div>
                                    <div className="activity-status">
                                        <span className="status-badge warning">⏳ Chờ duyệt</span>
                                        <div className="activity-actions">
                                            <button className="btn-outline btn-sm"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg> Xem</button>
                                            <button className="btn-outline btn-sm"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg> Chỉnh sửa</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="activity-card">
                                    <div className="activity-img img-2"></div>
                                    <div className="activity-info">
                                        <div className="activity-title">
                                            <span className="type-badge badge-talkshow">TALKSHOW</span>
                                            <h4>Giao lưu tác giả: Trần Minh</h4>
                                        </div>
                                        <div className="activity-meta">
                                            <span>📅 20/10/2026 • ⏰ 10:00 - 11:00 (1.0 giờ)</span>
                                            <span>📍 Sân khấu chính</span>
                                            <span>👥 Số người: 100</span>
                                        </div>
                                    </div>
                                    <div className="activity-status">
                                        <span className="status-badge success">✓ Đã duyệt</span>
                                        <div className="activity-actions">
                                            <button className="btn-outline btn-sm"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg> Xem</button>
                                            <button className="btn-primary btn-sm"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" /></svg> Điểm danh</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="activity-card needs-attention">
                                    <div className="activity-img img-3"></div>
                                    <div className="activity-info">
                                        <div className="activity-title">
                                            <span className="type-badge badge-minigame">MINIGAME</span>
                                            <h4>Mini game: Thử thách kiến thức sách</h4>
                                        </div>
                                        <div className="activity-meta">
                                            <span>📅 22/10/2026 • ⏰ 09:00 - 10:00 (1.0 giờ)</span>
                                            <span>📍 Gian hàng A05</span>
                                            <span>👥 Số người: 30</span>
                                        </div>
                                        <div className="activity-note">
                                            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                                            Vui lòng điều chỉnh âm lượng loa mini dưới 70dB để không ảnh hưởng đến các gian hàng lân cận.
                                        </div>
                                    </div>
                                    <div className="activity-status">
                                        <span className="status-badge critical">⚠ Cần chỉnh sửa</span>
                                        <div className="activity-actions">
                                            <button className="btn-outline btn-sm"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg> Xem</button>
                                            <button className="btn-outline btn-sm"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg> Chỉnh sửa</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {view === 'reports' && (
                        <div className="partner-view-reports">
                            <div className="overview-header">
                                <div>
                                    <h2>Thống kê sau sự kiện</h2>
                                    <p>Báo cáo hiệu quả tham gia gian hàng và các hoạt động tương tác độc giả.</p>
                                </div>
                                <div className="header-actions">
                                    <select className="partner-select">
                                        <option>Lễ hội Đường Sách Mùa Thu 2026</option>
                                    </select>
                                    <button className="btn-outline"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" /></svg> Xuất báo cáo</button>
                                </div>
                            </div>

                            <div className="stat-grid reports-grid">
                                <div className="stat-box">
                                    <div className="stat-val">856</div>
                                    <div className="stat-lbl">Tổng lượt tham gia</div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-val" style={{ color: 'var(--coral, #d66d42)' }}>2</div>
                                    <div className="stat-lbl">Hoạt động tổ chức</div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-val" style={{ color: '#15803d' }}>92%</div>
                                    <div className="stat-lbl">Tỷ lệ tham dự</div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-val" style={{ color: '#b45309' }}>★ 4.8</div>
                                    <div className="stat-lbl">Đánh giá trung bình</div>
                                </div>
                            </div>

                            <div className="charts-container">
                                <div className="chart-box">
                                    <h3>Lượt tham gia theo hoạt động</h3>
                                    <div className="bar-chart">
                                        <div className="bar-row">
                                            <div className="bar-label">Giao lưu tác giả <span>186 lượt</span></div>
                                            <div className="bar-track"><div className="bar-fill" style={{ width: '93%', background: '#556b60' }}></div></div>
                                        </div>
                                        <div className="bar-row">
                                            <div className="bar-label">Workshop đọc sách <span>145 lượt</span></div>
                                            <div className="bar-track"><div className="bar-fill" style={{ width: '72%', background: '#c9a84c' }}></div></div>
                                        </div>
                                        <div className="bar-row">
                                            <div className="bar-label">Mini game trí thức <span>98 lượt</span></div>
                                            <div className="bar-track"><div className="bar-fill" style={{ width: '49%', background: '#c9a84c' }}></div></div>
                                        </div>
                                    </div>
                                    <div className="chart-axis">
                                        <span>0</span><span>50</span><span>100</span><span>150</span><span>200</span>
                                    </div>
                                </div>
                                <div className="chart-box">
                                    <h3>Đánh giá hoạt động</h3>
                                    <div className="donut-chart-container">
                                        <div className="donut-chart">
                                            <div className="donut-center">
                                                <strong>4.8</strong>
                                                <span>/ 5.0</span>
                                            </div>
                                        </div>
                                        <div className="chart-legend">
                                            <div className="legend-item"><span className="dot c-5"></span> 5 sao <span className="pct">68%</span></div>
                                            <div className="legend-item"><span className="dot c-4"></span> 4 sao <span className="pct">22%</span></div>
                                            <div className="legend-item"><span className="dot c-3"></span> 3 sao <span className="pct">8%</span></div>
                                            <div className="legend-item"><span className="dot c-1"></span> 1-2 sao <span className="pct">2%</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {view === 'profile' && (
                        <div className="partner-view-profile">
                            <div className="overview-header">
                                <div>
                                    <h2>Thông tin tổ chức</h2>
                                    <p>Hồ sơ pháp lý, thông tin đại diện và tài khoản đối tác triển lãm.</p>
                                </div>
                                <button className="btn-primary"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg> Chỉnh sửa</button>
                            </div>
                            <div className="profile-card">
                                <div className="profile-avatar">B</div>
                                <div className="profile-info">
                                    <h3>Nhà Sách Bình Minh</h3>
                                    <div className="profile-contacts">
                                        <span><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg> binhminh@books.com</span>
                                        <span><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg> 0909 123 456</span>
                                        <span><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c1.96-1.66 3.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" /></svg> https://binhminhbooks.vn</span>
                                    </div>
                                </div>
                            </div>
                            <div className="partner-tabs-container">
                                <div className="partner-tabs">
                                    <button className="active">Thông tin chung</button>
                                    <button>Người liên hệ</button>
                                    <button>Tài khoản</button>
                                    <button>Bảo mật</button>
                                </div>
                                <div className="tab-content profile-details">
                                    <div className="detail-row">
                                        <div className="detail-label">Tên tổ chức:</div>
                                        <div className="detail-value"><strong>Nhà Sách Bình Minh</strong></div>
                                    </div>
                                    <div className="detail-row">
                                        <div className="detail-label">Mô tả:</div>
                                        <div className="detail-value">Nhà Sách Bình Minh mang đến những cuốn sách chất lượng, lan tỏa tri thức và văn hóa đọc cho mọi người.</div>
                                    </div>
                                    <div className="detail-row">
                                        <div className="detail-label">Địa chỉ:</div>
                                        <div className="detail-value">123 Nguyễn Văn Cừ, Quận 1, TP.HCM</div>
                                    </div>
                                    <div className="detail-row">
                                        <div className="detail-label">Website:</div>
                                        <div className="detail-value"><a href="#">https://binhminhbooks.vn</a></div>
                                    </div>
                                    <div className="detail-row">
                                        <div className="detail-label">Danh mục ngành hàng:</div>
                                        <div className="detail-value">
                                            <div className="tags-list">
                                                <span className="tag">Sách thiếu nhi</span>
                                                <span className="tag">Giáo dục</span>
                                                <span className="tag">Sách kỹ năng sống</span>
                                                <span className="tag">Quà tặng</span>
                                                <span className="tag">Đồ chơi giáo dục</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {view === 'notifications' && (
                        <div className="partner-view-notifications">
                            <div className="overview-header">
                                <div>
                                    <h2>Thông báo</h2>
                                    <p>Cập nhật phê duyệt, phản hồi gian hàng và lịch trình từ Ban Quản lý.</p>
                                </div>
                                <div className="header-actions">
                                    <select className="partner-select">
                                        <option>Tất cả</option>
                                        <option>Chưa đọc</option>
                                    </select>
                                    <button className="btn-outline"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg> Đánh dấu đã đọc</button>
                                </div>
                            </div>

                            <div className="notification-list">
                                <div className="notification-item unread">
                                    <div className="noti-icon success"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" /></svg></div>
                                    <div className="noti-content">
                                        <p>Hoạt động <strong>"Workshop: Đọc sách cùng trẻ"</strong> đã được duyệt lịch trình sơ bộ.</p>
                                        <span className="noti-time">2 giờ trước</span>
                                    </div>
                                    <button className="btn-outline btn-sm">Xem <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" /></svg></button>
                                </div>
                                <div className="notification-item unread">
                                    <div className="noti-icon info"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" /></svg></div>
                                    <div className="noti-content">
                                        <p>Ban tổ chức yêu cầu bổ sung danh sách nhân sự trực tại gian hàng <strong>A05</strong>.</p>
                                        <span className="noti-time">1 ngày trước</span>
                                    </div>
                                    <button className="btn-outline btn-sm">Xem <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" /></svg></button>
                                </div>
                                <div className="notification-item">
                                    <div className="noti-icon success"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg></div>
                                    <div className="noti-content">
                                        <p>Có <strong>25 người</strong> đăng ký mới tham gia tọa đàm "Giao lưu tác giả Trần Minh".</p>
                                        <span className="noti-time">2 ngày trước</span>
                                    </div>
                                    <button className="btn-outline btn-sm">Xem <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" /></svg></button>
                                </div>
                                <div className="notification-item">
                                    <div className="noti-icon warning"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg></div>
                                    <div className="noti-content">
                                        <p><strong>Nhắc nhở:</strong> Hạn nộp danh mục sách giảm giá cho lễ hội trước ngày 30/09.</p>
                                        <span className="noti-time">3 ngày trước</span>
                                    </div>
                                </div>
                                <div className="notification-item">
                                    <div className="noti-icon system"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" /></svg></div>
                                    <div className="noti-content">
                                        <p>Sự kiện <strong>"Lễ hội Đường Sách Mùa Thu 2026"</strong> đã chính thức mở cổng đăng ký gian hàng.</p>
                                        <span className="noti-time">1 tuần trước</span>
                                    </div>
                                    <button className="btn-outline btn-sm">Xem <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" /></svg></button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main>

            {/* Mobile FAB Navigation */}
            {fabOpen && <div className="mobile-fab-overlay admin-fab-overlay" onClick={() => setFabOpen(false)} aria-hidden="true" />}
            <div className="mobile-fab-container admin-fab-container">
                <nav className={`mobile-fab-menu admin-fab-menu${fabOpen ? ' open' : ''}`} aria-label="Quản trị điều hướng">
                    {navItems.map((item, i) => (
                        <button
                            key={item.key}
                            className={`fab-nav-item admin-fab-item${view === item.key ? ' active' : ''}`}
                            style={{ '--i': i }}
                            onClick={() => handleViewChange(item.key)}
                            tabIndex={fabOpen ? 0 : -1}
                        >
                            <span className="fab-item-icon">{item.icon}</span>
                            <span className="fab-item-label">{item.label}</span>
                        </button>
                    ))}
                </nav>
                <button
                    className={`mobile-fab-btn admin-fab-btn${fabOpen ? ' open' : ''}`}
                    onClick={() => setFabOpen(o => !o)}
                    aria-label={fabOpen ? 'Đóng menu' : 'Mở menu'}
                    aria-expanded={fabOpen}
                >
                    <span className="fab-bar fab-bar-1" />
                    <span className="fab-bar fab-bar-2" />
                    <span className="fab-bar fab-bar-3" />
                </button>
            </div>
        </div>
    );
}
