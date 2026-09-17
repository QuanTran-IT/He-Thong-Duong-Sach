export default function Header({ page, navigate, query, setQuery, language, toggleLanguage }) {
    const links = language === 'vi'
        ? [['home', 'Trang chủ'], ['events', 'Sự kiện'], ['map', 'Bản đồ'], ['heritage', 'Di sản'], ['feedback', 'Góp ý']]
        : [['home', 'Home'], ['events', 'Events'], ['map', 'Map'], ['heritage', 'Heritage'], ['feedback', 'Feedback']];
    const searchPlaceholder = language === 'vi' ? 'Tìm gian hàng, sách hoặc sự kiện...' : 'Search stalls, books or events...';
    function goToAdmin() {
        window.location.href = import.meta.env.VITE_PUBLIC_ADMIN_URL || 'http://localhost:5174';
    }
    const icons = {
        home: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
        events: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>,
        map: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>,
        heritage: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 3L2 8v2h20V8L12 3zM2 20v2h20v-2H2zm4-9h3v6H6v-6zm5 0h3v6h-3v-6zm5 0h3v6h-3v-6z"/></svg>,
        feedback: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v16l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
    };
    
    const navContent = links.map(([key, label]) => <button className={page === key || (page === 'heritage-detail' && key === 'heritage') ? 'active' : ''} onClick={() => navigate(key)} key={key}>{icons[key]}<span>{label}</span></button>);
    return (
        <>
            <header className="header">
                <button className="brand" onClick={() => navigate('home')}><span className="brand-mark" />Đường Sách <em>TP.HCM</em></button>
                <nav className="desktop-nav">{navContent}</nav>
                <div className="header-tools">
                    {page !== 'home' && <label className="search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={searchPlaceholder} /></label>}
                    <button className="language" onClick={toggleLanguage} aria-label="Chuyển ngôn ngữ">{language === 'vi' ? 'VI / EN' : 'EN / VI'}</button>
                    <button className="admin-btn" style={{ marginLeft: '10px', background: '#d96f4e', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }} onClick={goToAdmin}>{language === 'vi' ? 'Đăng nhập Quản trị viên' : 'Admin Login'}</button>
                </div>
            </header>
            <nav className="mobile-bottom-nav">{navContent}</nav>
        </>
    );
}
