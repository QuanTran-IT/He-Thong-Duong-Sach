export default function Header({ page, navigate, query, setQuery, language, toggleLanguage }) {
  const links = language === 'vi'
    ? [['home', 'Trang chủ'], ['events', 'Sự kiện'], ['map', 'Bản đồ'], ['heritage', 'Di sản'], ['feedback', 'Góp ý']]
    : [['home', 'Home'], ['events', 'Events'], ['map', 'Map'], ['heritage', 'Heritage'], ['feedback', 'Feedback']];
  const searchPlaceholder = language === 'vi' ? 'Tìm gian hàng, sách hoặc sự kiện...' : 'Search stalls, books or events...';
  return <header className="header"><button className="brand" onClick={() => navigate('home')}><span className="brand-mark" />Đường Sách <em>TP.HCM</em></button><nav>{links.map(([key, label]) => <button className={page === key || (page === 'heritage-detail' && key === 'heritage') ? 'active' : ''} onClick={() => navigate(key)} key={key}>{label}</button>)}</nav><div className="header-tools">{page !== 'home' && <label className="search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={searchPlaceholder} /></label>}<button className="language" onClick={toggleLanguage} aria-label="Chuyển ngôn ngữ">{language === 'vi' ? 'VI / EN' : 'EN / VI'}</button></div></header>;
}
