import { useState } from 'react';

export default function Header({ page, navigate, query, setQuery, language, toggleLanguage, isAuthenticated, onLogout }) {
    const [navOpen, setNavOpen] = useState(false);

    const links = language === 'vi'
        ? [['home', 'Trang chủ'], ['events', 'Sự kiện'], ['map', 'Bản đồ'], ['heritage', 'Di sản'], ['feedback', 'Góp ý']]
        : [['home', 'Home'], ['events', 'Events'], ['map', 'Map'], ['heritage', 'Heritage'], ['feedback', 'Feedback']];
    const searchPlaceholder = language === 'vi' ? 'Tìm gian hàng, sách hoặc sự kiện...' : 'Search stalls, books or events...';

    function handleNavClick(key) {
        navigate(key);
        setNavOpen(false);
    }

    const icons = {
        home: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
        events: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>,
        map: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>,
        heritage: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 3L2 8v2h20V8L12 3zM2 20v2h20v-2H2zm4-9h3v6H6v-6zm5 0h3v6h-3v-6zm5 0h3v6h-3v-6z"/></svg>,
        feedback: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v16l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
    };

    const desktopNavContent = links.map(([key, label]) => (
        <button
            key={key}
            className={`nav-btn nav-btn-${key} ${page === key || (page === 'heritage-detail' && key === 'heritage') ? 'active' : ''}`}
            onClick={() => navigate(key)}
            aria-label={label}
        >
            {icons[key]}
            <span>{label}</span>
        </button>
    ));

    return (
        <>
            <header className="header">
                <button className="brand" onClick={() => navigate('home')}>
                    <span className="brand-mark" />
                    Đường Sách <em>TP.HCM</em>
                </button>

                {/* Desktop nav */}
                <nav className="desktop-nav">{desktopNavContent}</nav>

                {/* Desktop tools */}
                <div className="header-tools">
                    {page !== 'home' && (
                        <label className="search">
                            <span>⌕</span>
                            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={searchPlaceholder} />
                        </label>
                    )}
                    <button className="language" onClick={toggleLanguage} aria-label="Chuyển ngôn ngữ">
                        {language === 'vi' ? 'VI / EN' : 'EN / VI'}
                    </button>
                    {isAuthenticated ? (
                        <div className="header-user-menu">
                            <button className="header-user-btn" aria-label="Tài khoản">
                                <span className="user-avatar">Đ</span>
                                <span className="user-name">Độc giả</span>
                            </button>
                            <button className="header-logout-btn" onClick={onLogout} title="Đăng xuất">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
                            </button>
                        </div>
                    ) : (
                        <button className="header-login-btn" onClick={() => navigate('login')}>
                            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                            {language === 'vi' ? 'Đăng nhập' : 'Login'}
                        </button>
                    )}

                    {/* Mobile hamburger - inside header */}
                    <button
                        id="mobile-menu-btn"
                        className={`header-hamburger${navOpen ? ' open' : ''}`}
                        onClick={() => setNavOpen(o => !o)}
                        aria-label={navOpen ? 'Đóng menu' : 'Mở menu'}
                        aria-expanded={navOpen}
                    >
                        <span className="hbg-bar hbg-bar-1" />
                        <span className="hbg-bar hbg-bar-2" />
                        <span className="hbg-bar hbg-bar-3" />
                    </button>
                </div>
            </header>

            {/* Mobile fullscreen overlay menu */}
            {navOpen && (
                <div className="mobile-nav-backdrop" onClick={() => setNavOpen(false)} aria-hidden="true" />
            )}
            <nav className={`mobile-nav-panel${navOpen ? ' open' : ''}`} aria-label="Điều hướng di động">
                <div className="mobile-nav-header">
                    <span className="mobile-nav-brand">Đường Sách <em>TP.HCM</em></span>
                    <button className="mobile-nav-close" onClick={() => setNavOpen(false)} aria-label="Đóng menu">✕</button>
                </div>
                <div className="mobile-nav-items">
                    {links.map(([key, label], i) => (
                        <button
                            key={key}
                            className={`mobile-nav-item${page === key || (page === 'heritage-detail' && key === 'heritage') ? ' active' : ''}`}
                            style={{ '--i': i }}
                            onClick={() => handleNavClick(key)}
                        >
                            <span className="mobile-nav-icon">{icons[key]}</span>
                            <span className="mobile-nav-label">{label}</span>
                            <svg className="mobile-nav-arrow" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
                        </button>
                    ))}
                </div>
                <div className="mobile-nav-footer">
                    {isAuthenticated ? (
                        <button className="mobile-nav-login" style={{background: '#f5f0e9', color: 'var(--navy, #173f52)', border: '1px solid #eadfd5'}} onClick={() => { onLogout(); setNavOpen(false); }}>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
                            Đăng xuất
                        </button>
                    ) : (
                        <button className="mobile-nav-login" onClick={() => { navigate('login'); setNavOpen(false); }}>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                            Đăng nhập / Đăng ký
                        </button>
                    )}
                    <button
                        className="mobile-nav-lang"
                        onClick={() => { toggleLanguage(); setNavOpen(false); }}
                    >
                        🌐 {language === 'vi' ? 'Switch to English' : 'Chuyển Tiếng Việt'}
                    </button>
                </div>
            </nav>
        </>
    );
}
