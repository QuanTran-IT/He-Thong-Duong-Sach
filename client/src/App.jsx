import { useEffect, useState } from 'react';

const heritagePlaces = [
  {
    id: 'buudien', name: 'Bưu điện Thành phố', area: 'Quận 1', number: '01',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1600&q=85',
    summary: 'Công trình kiến trúc tiêu biểu, lưu giữ ký ức đô thị và nhịp sống Sài Gòn qua nhiều thế hệ.',
    story: 'Bưu điện Thành phố là một dấu ấn kiến trúc đặc biệt giữa trung tâm Quận 1. Không gian này kết nối lịch sử, đời sống và những câu chuyện về một Sài Gòn luôn chuyển động.',
    introTitle: 'Dấu ấn bưu chính giữa lòng Sài Gòn',
    intro: 'Bưu điện Trung tâm Sài Gòn được xây dựng từ năm 1886 đến 1891, do kiến trúc sư Alfred Foulhoux thiết kế theo phong cách kiến trúc châu Âu kết hợp trang trí Á Đông. Công trình là biểu tượng của hệ thống bưu chính Đông Dương, nơi hàng triệu bức thư từ khắp thế giới đã đi qua.\n\nKhông chỉ là di tích kiến trúc, Bưu điện Thành phố còn là nơi lưu giữ những bản đồ cổ quý giá về Sài Gòn và Nam Kỳ, phản ánh sự phát triển đô thị qua nhiều thế kỷ. Mỗi chi tiết trang trí, từ vòm trần cao vút đến những ô cửa sổ tinh xảo, đều kể câu chuyện về một thời kỳ giao thoa văn hóa đặc biệt.',
    values: [
      { icon: 'history', title: 'Lịch sử', desc: 'Hơn 130 năm lịch sử bưu chính, gắn liền với sự phát triển của đô thị Sài Gòn hiện đại.' },
      { icon: 'culture', title: 'Văn hóa', desc: 'Biểu tượng giao thoa văn hóa Đông - Tây, nơi kết nối con người qua từng bức thư tay.' },
      { icon: 'architecture', title: 'Kiến trúc', desc: 'Phong cách kiến trúc Pháp tinh tế với vòm thép và chi tiết trang trí Á Đông độc đáo.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=85',
      'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?auto=format&fit=crop&w=600&q=85'
    ]
  },
  {
    id: 'nha-rong', name: 'Bến Nhà Rồng', area: 'Quận 4', number: '02',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1600&q=85',
    summary: 'Chứng nhân lịch sử bên dòng sông Sài Gòn, gắn với hành trình tìm đường cứu nước.',
    story: 'Bến Nhà Rồng lưu giữ nhiều tư liệu quý về lịch sử dân tộc. Công trình ven sông đưa người tham quan trở về với những cột mốc đáng nhớ của thành phố và đất nước.',
    introTitle: 'Bến cảng lịch sử bên dòng sông Sài Gòn',
    intro: 'Bến Nhà Rồng được xây dựng năm 1863, là một trong những công trình đầu tiên do người Pháp xây dựng tại Sài Gòn. Nơi đây gắn liền với sự kiện ngày 5 tháng 6 năm 1911, khi người thanh niên Nguyễn Tất Thành rời Tổ quốc ra đi tìm đường cứu nước.\n\nNgày nay, Bến Nhà Rồng là Bảo tàng Hồ Chí Minh - Chi nhánh Thành phố Hồ Chí Minh, lưu giữ hàng nghìn hiện vật và tư liệu quý giá về cuộc đời và sự nghiệp của Chủ tịch Hồ Chí Minh, cũng như lịch sử cách mạng Việt Nam.',
    values: [
      { icon: 'history', title: 'Lịch sử', desc: 'Chứng nhân hơn 160 năm lịch sử, gắn liền với hành trình cứu nước vĩ đại của dân tộc.' },
      { icon: 'culture', title: 'Văn hóa', desc: 'Không gian bảo tàng tôn vinh tinh thần yêu nước và giá trị văn hóa truyền thống.' },
      { icon: 'architecture', title: 'Kiến trúc', desc: 'Kiến trúc Pháp thuộc địa độc đáo với mái ngói đỏ và hình rồng đặc trưng trên nóc nhà.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=85',
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=85'
    ]
  },
  {
    id: 'dinh-doc-lap', name: 'Dinh Độc Lập', area: 'Quận 1', number: '03',
    image: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?auto=format&fit=crop&w=1600&q=85',
    summary: 'Không gian lịch sử ghi dấu những bước ngoặt quan trọng của Thành phố Hồ Chí Minh.',
    story: 'Dinh Độc Lập là nơi các lớp ký ức đô thị, kiến trúc hiện đại và lịch sử đương đại cùng hiện diện trong một không gian giàu giá trị.',
    introTitle: 'Biểu tượng lịch sử đương đại Việt Nam',
    intro: 'Dinh Độc Lập, còn gọi là Dinh Thống Nhất, được kiến trúc sư Ngô Viết Thụ thiết kế và xây dựng từ năm 1962 đến 1966. Công trình thể hiện sự kết hợp hài hòa giữa kiến trúc hiện đại phương Tây và triết lý phương Đông, với bố cục mặt bằng mang ý nghĩa chữ "Cát" - may mắn.\n\nDinh là chứng nhân của sự kiện lịch sử ngày 30 tháng 4 năm 1975, đánh dấu sự thống nhất đất nước. Ngày nay, nơi đây là di tích quốc gia đặc biệt, thu hút hàng triệu du khách trong và ngoài nước mỗi năm.',
    values: [
      { icon: 'history', title: 'Lịch sử', desc: 'Di tích quốc gia đặc biệt, ghi dấu sự kiện thống nhất đất nước ngày 30/4/1975.' },
      { icon: 'culture', title: 'Văn hóa', desc: 'Không gian trưng bày phong phú, phản ánh đời sống chính trị và văn hóa đương đại.' },
      { icon: 'architecture', title: 'Kiến trúc', desc: 'Kiến trúc hiện đại của KTS Ngô Viết Thụ, kết hợp triết lý Đông phương tinh tế.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=600&q=85',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=85'
    ]
  },
  {
    id: 'cho-thu-duc', name: 'Chợ Thủ Đức xưa', area: 'Thủ Đức', number: '04',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=85',
    summary: 'Nơi lưu giữ nhịp sống thương hồ, giao thương và những câu chuyện đời thường của vùng đất.',
    story: 'Từ một khu chợ quen thuộc, nơi đây trở thành ký ức chung của nhiều thế hệ cư dân Thủ Đức và là lát cắt gần gũi về đời sống thành phố.',
    introTitle: 'Ký ức thương hồ vùng đất Thủ Đức',
    intro: 'Chợ Thủ Đức là một trong những ngôi chợ lâu đời nhất vùng ven Sài Gòn, gắn liền với lịch sử phát triển của vùng đất Thủ Đức qua nhiều thế kỷ. Từ một điểm giao thương nhỏ bên bờ sông, chợ dần trở thành trung tâm kinh tế và văn hóa sầm uất.\n\nNơi đây không chỉ là không gian buôn bán mà còn là nơi lưu giữ những câu chuyện đời thường, những mối quan hệ cộng đồng bền chặt qua nhiều thế hệ người dân Thủ Đức.',
    values: [
      { icon: 'history', title: 'Lịch sử', desc: 'Lịch sử hình thành và phát triển gắn liền với vùng đất Thủ Đức qua nhiều thời kỳ.' },
      { icon: 'culture', title: 'Văn hóa', desc: 'Không gian sinh hoạt cộng đồng, nơi lưu giữ văn hóa chợ truyền thống Việt Nam.' },
      { icon: 'architecture', title: 'Kiến trúc', desc: 'Kiến trúc chợ truyền thống phương Nam với mái vòm cao và không gian mở thoáng đãng.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=85',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=85'
    ]
  },
  {
    id: 'ben-binh-dong', name: 'Bến Bình Đông', area: 'Quận 8', number: '05',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=85',
    summary: 'Không gian sông nước gắn với giao thương và mùa hoa rực rỡ mỗi dịp Tết.',
    story: 'Bến Bình Đông mang vẻ đẹp dung dị của một đô thị ven sông, nơi thuyền bè, hàng hóa và ký ức cộng đồng tạo nên bản sắc riêng.',
    introTitle: 'Bến sông rực rỡ của đô thị phương Nam',
    intro: 'Bến Bình Đông nằm dọc kênh Tàu Hủ - Bến Nghé, là một trong những bến sông lâu đời nhất Sài Gòn. Nơi đây từng là trung tâm giao thương đường thủy nhộn nhịp, kết nối Sài Gòn với các tỉnh miền Tây Nam Bộ.\n\nMỗi dịp Tết đến, bến Bình Đông lại trở thành chợ hoa xuân trên sông nổi tiếng, với hàng trăm ghe thuyền chở hoa từ miền Tây về, tạo nên cảnh tượng rực rỡ và đặc trưng của Sài Gòn.',
    values: [
      { icon: 'history', title: 'Lịch sử', desc: 'Bến sông lịch sử, chứng nhân của hoạt động giao thương đường thủy phương Nam.' },
      { icon: 'culture', title: 'Văn hóa', desc: 'Văn hóa sông nước đặc trưng, gắn với chợ hoa xuân và đời sống cộng đồng ven kênh.' },
      { icon: 'architecture', title: 'Kiến trúc', desc: 'Cảnh quan đô thị ven sông độc đáo với dãy nhà phố cổ và bến thuyền truyền thống.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=85',
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=600&q=85'
    ]
  },
  {
    id: 'lang-hoa', name: 'Làng mộc Gò Vấp', area: 'Gò Vấp', number: '06',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85',
    summary: 'Một nghề thủ công truyền thống được kể lại qua bàn tay người thợ và ký ức khu phố.',
    story: 'Làng mộc là câu chuyện về lao động, kỹ nghệ và sự tiếp nối. Những sản phẩm thủ công lưu lại dấu ấn của một cộng đồng bền bỉ giữa đô thị.',
    introTitle: 'Nghề mộc truyền thống giữa lòng đô thị',
    intro: 'Làng mộc Gò Vấp là một trong những làng nghề thủ công lâu đời nhất Sài Gòn, nơi nghệ nhân và thợ mộc đã gìn giữ kỹ thuật chạm khắc gỗ tinh xảo qua nhiều thế hệ. Những sản phẩm nội thất, tượng gỗ và đồ trang trí từ làng mộc mang đậm bản sắc nghệ thuật phương Nam.\n\nDù đô thị hóa nhanh chóng, làng mộc Gò Vấp vẫn âm thầm tồn tại, là minh chứng cho sức sống bền bỉ của nghề thủ công truyền thống trong lòng thành phố hiện đại.',
    values: [
      { icon: 'history', title: 'Lịch sử', desc: 'Lịch sử làng nghề trải dài hơn trăm năm, gắn với cộng đồng thợ mộc di cư phương Nam.' },
      { icon: 'culture', title: 'Văn hóa', desc: 'Văn hóa làng nghề truyền thống, nơi kỹ năng và đam mê được truyền từ đời này sang đời khác.' },
      { icon: 'architecture', title: 'Kiến trúc', desc: 'Không gian xưởng mộc đặc trưng với kiến trúc nhà phố kết hợp khu sản xuất thủ công.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?auto=format&fit=crop&w=600&q=85',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=85'
    ]
  }
];

const stalls = [
  { name: 'Gian hàng A', type: 'Văn học & Nghệ thuật', books: '1.240', image: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=800&q=85' },
  { name: 'Gian hàng B', type: 'Khoa học & Kỹ thuật', books: '860', image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=85' },
  { name: 'Gian hàng C', type: 'Sách thiếu nhi & Giáo dục', books: '920', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=85' }
];

function Header({ page, navigate, query, setQuery, language, toggleLanguage }) {
  const links = language === 'vi' ? [['home', 'Trang chủ'], ['events', 'Sự kiện'], ['map', 'Bản đồ'], ['heritage', 'Di sản'], ['feedback', 'Góp ý']] : [['home', 'Home'], ['events', 'Events'], ['map', 'Map'], ['heritage', 'Heritage'], ['feedback', 'Feedback']];
  const searchPlaceholder = language === 'vi' ? 'Tìm gian hàng, sách hoặc sự kiện...' : 'Search stalls, books or events...';
  return <header className="header"><button className="brand" onClick={() => navigate('home')}><span className="brand-mark" />Đường Sách <em>TP.HCM</em></button><nav>{links.map(([key, label]) => <button className={page === key || (page === 'heritage-detail' && key === 'heritage') ? 'active' : ''} onClick={() => navigate(key)} key={key}>{label}</button>)}</nav><div className="header-tools">{page !== 'home' && <label className="search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={searchPlaceholder} /></label>}<button className="language" onClick={toggleLanguage} aria-label="Chuyển ngôn ngữ">{language === 'vi' ? 'VI / EN' : 'EN / VI'}</button></div></header>;
}

function Home({ navigate, query, setQuery }) {
  const filteredStalls = stalls.filter((stall) => `${stall.name} ${stall.type}`.toLowerCase().includes(query.toLowerCase()));
  return <main className="container home"><label className="large-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm gian hàng, sách hoặc sự kiện..." /></label><section className="hero"><div className="hero-copy"><p className="eyebrow">ĐƯỜNG SÁCH THÀNH PHỐ HỒ CHÍ MINH</p><h1>Một góc bình yên giữa lòng Sài Gòn</h1><p>Khám phá những đầu sách giá trị, gặp gỡ tác giả và tận hưởng nhịp sống văn hóa đầy cảm hứng.</p><button className="link-button" onClick={() => document.getElementById('stalls').scrollIntoView({ behavior: 'smooth' })}>Khám phá gian hàng →</button></div></section><div className="quick-info"><strong>THÔNG TIN NHANH:</strong><span className="pill accent">● Giờ hoạt động: 8:00 - 22:00</span><button className="pill" onClick={() => navigate('map')}>● Cách đi &amp; Bản đồ</button><span className="pill">● Tiện ích &amp; Bãi đỗ xe</span></div><section id="stalls" className="section"><div className="section-head"><div><p className="eyebrow">KHÔNG GIAN ĐỌC VÀ KHÁM PHÁ</p><h2>Gian hàng nổi bật</h2><p>Khám phá các nhà xuất bản và đơn vị phát hành sách uy tín tại Đường Sách.</p></div><button className="link-button">Tất cả gian hàng →</button></div><div className="stall-grid">{filteredStalls.map((stall) => <article className="stall" key={stall.name} onClick={() => navigate('stall-detail', stall.name)}><img src={stall.image} alt={stall.name} /><div><h3>{stall.name}</h3><span className="tag">{stall.type}</span><p>▱ Số sách: {stall.books} <button className="inline-link" onClick={(event) => { event.stopPropagation(); navigate('stall-detail', stall.name); }}>Chi tiết →</button></p></div></article>)}</div>{query && !filteredStalls.length && <p className="empty">Không tìm thấy gian hàng phù hợp.</p>}</section><section className="home-heritage"><div className="section-head"><div><p className="eyebrow">HÀNH TRÌNH KÝ ỨC</p><h2>Di sản &amp; ký ức</h2><p>Chạm vào những địa điểm làm nên câu chuyện của Thành phố Hồ Chí Minh.</p></div><button className="link-button" onClick={() => navigate('heritage')}>Xem tất cả di sản →</button></div><div className="heritage-grid">{heritagePlaces.slice(0, 3).map((place) => <HeritageCard key={place.id} place={place} onClick={() => navigate('heritage-detail', place.id)} />)}</div></section><section className="event-preview"><div className="event-intro"><p className="eyebrow">ĐỪNG BỎ LỠ</p><h2>Sự kiện sắp diễn ra</h2><p>Những buổi gặp gỡ và hoạt động hấp dẫn tại Đường Sách.</p><span className="month">THÁNG 09 - 2026</span></div><div className="event-list">{['Đọc sách cùng bé', 'Thành phố kể chuyện', 'Phiên chợ sách cũ'].map((title, index) => <article className="event-card" key={title}><b className="date">{[15, 17, 19][index]}<small>THÁNG 09</small></b><p className="event-type">{['HOẠT ĐỘNG THIẾU NHI', 'RA MẮT SÁCH', 'CỘNG ĐỒNG'][index]}</p><h3>{title}</h3><p className="muted">{['09:00 · Khu đọc thiếu nhi', '14:30 · Sân khấu trung tâm', '08:00 · Khu trưng bày'][index]}</p><span className={`event-status status-${index}`}>● {['Đang diễn ra', 'Sắp diễn ra', 'Trọng điểm'][index]}</span></article>)}</div></section><section className="map-strip"><div><p className="eyebrow">ĐẾN VỚI ĐƯỜNG SÁCH</p><h2>Đi một vòng, đọc cả thành phố.</h2><p>Ghé thăm các gian hàng, không gian đọc và những câu chuyện di sản giữa trung tâm Sài Gòn.</p></div><button className="primary" onClick={() => navigate('map')}>Mở bản đồ ↗</button></section></main>;
}

function HeritageCard({ place, onClick }) { return <button className="heritage-card" onClick={onClick}><img src={place.image} alt={place.name} /><div className="heritage-card-body"><span className="card-number">DI SẢN SỐ {place.number}</span><h3>{place.name}</h3><p>{place.summary}</p><span className="card-link">Xem câu chuyện →</span></div></button>; }

function StallDetail({ stall, navigate }) { return <main className="container stall-detail-page"><button className="back-link" onClick={() => navigate('home')}>← Trang chủ</button><div className="stall-detail-hero"><img src={stall.image} alt={stall.name} /><div><p className="eyebrow">GIAN HÀNG NỔI BẬT</p><h1>{stall.name}</h1><span className="tag">{stall.type}</span><p>Không gian tuyển chọn sách, nơi bạn đọc có thể tìm thấy những đầu sách mới, tác phẩm kinh điển và các hoạt động giao lưu theo chủ đề.</p></div></div><section className="stall-detail-content"><div><p className="eyebrow">THÔNG TIN GIAN HÀNG</p><h2>Đọc, chọn và gặp gỡ</h2><p>Gian hàng mở cửa mỗi ngày từ 8:00 đến 22:00. Đội ngũ tại gian hàng luôn sẵn sàng gợi ý sách phù hợp với sở thích và nhu cầu đọc của bạn.</p></div><div className="stall-stats"><strong>{stall.books}</strong><span>đầu sách đang trưng bày</span><strong>8:00 - 22:00</strong><span>giờ hoạt động mỗi ngày</span></div></section><section className="stall-related"><h2>Hoạt động tại gian hàng</h2><div><article><b>17/09</b><h3>Tọa đàm cùng tác giả</h3><p>Không gian sự kiện · 14:30</p></article><article><b>Cuối tuần</b><h3>Góc đọc mở</h3><p>Miễn phí · Cả ngày</p></article></div></section></main>; }

function HeritageList({ navigate }) { return <main className="container heritage-list-page"><div className="page-intro"><p className="eyebrow">HÀNH TRÌNH DI SẢN</p><h1>Đường Sách Thủ Đức · Di sản &amp; ký ức</h1><p>Khám phá những địa điểm, nghề truyền thống và câu chuyện làm nên bản sắc của thành phố.</p></div><div className="heritage-grid full-heritage-grid">{heritagePlaces.map((place) => <HeritageCard key={place.id} place={place} onClick={() => navigate('heritage-detail', place.id)} />)}</div></main>; }

function HeritageDetail({ place, navigate }) {
  const valueIcons = {
    history: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="10" y="6" width="28" height="36" rx="2" /><path d="M16 14h16M16 20h16M16 26h10" /><path d="M18 36v-6h12v6" /></svg>,
    culture: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="24" cy="20" r="10" /><path d="M24 10v20M14 20h20" /><path d="M12 36c2-4 6-6 12-6s10 2 12 6" /><path d="M18 14a8 8 0 0 1 12 0" /></svg>,
    architecture: <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 40h36M10 40V22l14-12 14 12v18" /><rect x="19" y="28" width="10" height="12" /><path d="M16 22h4v5h-4zM28 22h4v5h-4z" /></svg>
  };
  return (
    <main className="heritage-landing">
      <section className="hl-hero" style={{ backgroundImage: `url(${place.image})` }}>
        <div className="hl-hero-overlay">
          <div className="hl-hero-card">
            <p className="hl-hero-eyebrow">DI SẢN VĂN HÓA · {place.area.toUpperCase()}</p>
            <h1>{place.name}</h1>
            <p>{place.summary}</p>
            <button className="hl-hero-cta" onClick={() => document.getElementById('hl-intro').scrollIntoView({ behavior: 'smooth' })}>Khám phá di sản →</button>
          </div>
        </div>
      </section>
      <section id="hl-intro" className="hl-intro container">
        <div className="hl-intro-divider"><span>GIỚI THIỆU DI SẢN</span></div>
        <div className="hl-intro-grid">
          <div className="hl-intro-text">
            <h2>{place.introTitle}</h2>
            {place.intro.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
          </div>
          <div className="hl-intro-image">
            <img src={place.gallery[0]} alt={place.name} />
          </div>
        </div>
      </section>
      <section className="hl-values container">
        <div className="hl-intro-divider"><span>GIÁ TRỊ DI SẢN</span></div>
        <div className="hl-values-grid">
          {place.values.map((val) => (
            <article className="hl-value-card" key={val.title}>
              <div className="hl-value-icon">{valueIcons[val.icon]}</div>
              <h3>{val.title}</h3>
              <p>{val.desc}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="hl-gallery container">
        <div className="hl-intro-divider"><span>HÌNH ẢNH NỔI BẬT</span></div>
        <div className="hl-gallery-grid">
          <div className="hl-gallery-large"><img src={place.gallery[0]} alt={`${place.name} 1`} /></div>
          <div className="hl-gallery-small"><img src={place.gallery[1]} alt={`${place.name} 2`} /></div>
          <div className="hl-gallery-small"><img src={place.gallery[2]} alt={`${place.name} 3`} /></div>
        </div>
      </section>
      <section className="hl-bottom container">
        <button className="back-link" onClick={() => navigate('heritage')}>← Tất cả di sản</button>
        <button className="primary" onClick={() => navigate('feedback')}>Viết cảm nhận →</button>
      </section>
    </main>
  );
}

function MapPage() { return <main className="container map-page"><div className="page-intro"><p className="eyebrow">KHÁM PHÁ KHÔNG GIAN</p><h1>Bản đồ Đường Sách</h1><p>Tìm gian hàng, tiện ích và các điểm di sản trong hành trình của bạn.</p></div><div className="map-layout"><aside className="map-filter"><div className="map-tabs"><button className="selected">Book Street Quận 1</button><button>Book Street Thủ Đức</button></div><h3>Lọc loại điểm</h3>{['Gian hàng sách', 'Tiện ích & Dịch vụ', 'Không gian di sản', 'Lối đi bộ'].map((item) => <label key={item}><input type="checkbox" defaultChecked />{item}</label>)}</aside><div className="map-canvas"><div className="map-road"><span>Fahasa</span><span className="selected-point">Nhà Nam (Đang chọn)</span><span>NXB Trẻ</span><span>Sân khấu Văn hóa</span></div><div className="map-pin">➤ &nbsp; LỐI ĐI BỘ CHÍNH - THỦ THIÊM</div><div className="map-place"><h2>Nhà Nam Thủ Quán</h2><b>Gian hàng sách thứ 12</b><p>Không gian đọc và cà phê sách ngoài trời thoải mái.</p><button className="primary">Xem chi tiết</button></div></div></div></main>; }

function Feedback() { const [sent, setSent] = useState(false); return <main className="container feedback-page"><div className="page-intro centered"><p className="eyebrow">LẮNG NGHE ĐỂ HOÀN THIỆN HƠN</p><h1>Góp ý trải nghiệm Đường Sách</h1><p>Ý kiến của bạn giúp chúng tôi nâng cao chất lượng phục vụ và gìn giữ văn hóa đọc.</p></div><div className="feedback-layout"><aside><div className="feedback-aside-card"><h2>Dùng chung toàn Đường Sách</h2><p>Góp ý trải nghiệm chung tại Đường Sách.</p></div><div className="qr-placeholder">QR</div></aside><form className="feedback-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>Địa điểm bạn muốn góp ý<select required><option value="">Chọn địa điểm</option><option>Toàn Đường Sách</option><option>Gian hàng A</option></select></label><fieldset><legend>Mức độ hài lòng của bạn</legend><div className="rating-row">{[1, 2, 3, 4, 5].map((score) => <label key={score}><input type="radio" name="rating" required value={score} /><span>{score}</span></label>)}</div></fieldset><label>Nội dung góp ý chi tiết<textarea required placeholder="Hãy chia sẻ điều bạn hài lòng hoặc điều cần cải thiện..." /></label><label>Thông tin liên hệ <input placeholder="Email hoặc số điện thoại (không bắt buộc)" /></label><button className="primary full">Gửi góp ý trải nghiệm</button>{sent && <p className="success">✓ Gửi ý kiến đóng góp thành công. Cảm ơn bạn rất nhiều!</p>}</form></div></main>; }

function Events() { return <main className="container events"><div className="page-intro"><p className="eyebrow">LỊCH HOẠT ĐỘNG · THÁNG 09/2026</p><h1>Lịch và sự kiện</h1><p>Những cuộc gặp gỡ, buổi đọc sách và hoạt động cộng đồng đang chờ bạn tại Đường Sách.</p></div><section className="calendar"><div className="section-head"><div><p className="eyebrow">LỊCH TRONG TUẦN</p><h2>14 - 20 tháng 09, 2026</h2></div></div><div className="week">{['THỨ BA|15|Đọc sách cùng bé', 'THỨ TƯ|16|Chưa có lịch', 'THỨ NĂM|17|Thành phố kể chuyện', 'THỨ SÁU|18|Chưa có lịch', 'THỨ BẢY|19|Phiên chợ sách cũ', 'CHỦ NHẬT|20|Âm nhạc và trang sách'].map((day) => { const [name, date, title] = day.split('|'); return <article className="day" key={date}><div><span>{name}</span><b>{date}</b></div><h3>{title}</h3><p>{title === 'Chưa có lịch' ? 'Chưa có lịch đã công bố' : 'Đường sách · Không gian sự kiện'}</p></article>; })}</div></section></main>; }

function App() { const [page, setPage] = useState('home'); const [detailId, setDetailId] = useState('buudien'); const [stallName, setStallName] = useState(stalls[0].name); const [query, setQuery] = useState(''); const [language, setLanguage] = useState('vi'); function navigate(nextPage, id) { setPage(nextPage); if (nextPage === 'heritage-detail' && id) setDetailId(id); if (nextPage === 'stall-detail' && id) setStallName(id); window.scrollTo({ top: 0, behavior: 'smooth' }); } const place = heritagePlaces.find((item) => item.id === detailId) || heritagePlaces[0]; const stall = stalls.find((item) => item.name === stallName) || stalls[0]; return <><Header page={page} navigate={navigate} query={query} setQuery={setQuery} language={language} toggleLanguage={() => setLanguage((current) => current === 'vi' ? 'en' : 'vi')} />{page === 'home' && <Home navigate={navigate} query={query} setQuery={setQuery} />}{page === 'events' && <Events />}{page === 'heritage' && <HeritageList navigate={navigate} />}{page === 'heritage-detail' && <HeritageDetail place={place} navigate={navigate} />}{page === 'stall-detail' && <StallDetail stall={stall} navigate={navigate} />}{page === 'map' && <MapPage />}{page === 'feedback' && <Feedback />}<footer className="footer"><strong>Đường Sách TP.HCM</strong><span>Không gian văn hóa mở dành cho bạn đọc và cộng đồng yêu sách.</span><small>© 2026 Ban Quản lý Đường Sách</small></footer></>; }

export default App;
