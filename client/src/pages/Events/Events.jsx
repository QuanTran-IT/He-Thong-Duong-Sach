import { useState } from 'react';
import './events.css';

const eventSeed = [
    { date: '2026-09-15', title: 'Đọc sách cùng bé', type: 'Thiếu nhi', place: 'Khu đọc thiếu nhi', time: '09:00' },
    { date: '2026-09-17', title: 'Thành phố kể chuyện', type: 'Tọa đàm', place: 'Sân khấu trung tâm', time: '14:30' },
    { date: '2026-09-18', title: 'Triển lãm minh họa sách', type: 'Thiếu nhi', place: 'Sân khấu B', time: '08:30' },
    { date: '2026-09-19', title: 'Phiên chợ sách cũ', type: 'Cộng đồng', place: 'Khu trưng bày', time: '08:00' },
    { date: '2026-09-19', title: 'Ký tặng sách: Hồi ức Sài Gòn', type: 'Cộng đồng', place: 'Phương Nam Book', time: '19:00' },
    { date: '2026-09-20', title: 'Âm nhạc và trang sách', type: 'Biểu diễn', place: 'Sân khấu ngoài trời', time: '18:00' },
    { date: '2026-09-22', title: 'Ra mắt sách mới', type: 'Tọa đàm', place: 'Nhã Nam', time: '09:30' },
    { date: '2026-09-25', title: 'Ngày hội sách điện tử', type: 'Cộng đồng', place: 'Khu công nghệ', time: '10:00' }
];

const eventTypes = ['all', 'Thiếu nhi', 'Tọa đàm', 'Cộng đồng', 'Biểu diễn'];
const formatDate = (value) => new Intl.DateTimeFormat('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${value}T12:00:00`));

export default function Events() {
    const [filter, setFilter] = useState('all');
    const [monthFilter, setMonthFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('2026');
    const [registered, setRegistered] = useState([]);
    
    const visibleEvents = eventSeed.filter((event) => {
        const matchType = filter === 'all' || event.type === filter;
        
        // event.date is YYYY-MM-DD
        const eventYear = event.date.split('-')[0];
        const eventMonth = parseInt(event.date.split('-')[1], 10).toString();
        
        const matchYear = yearFilter === '' || eventYear === yearFilter;
        const matchMonth = monthFilter === '' || eventMonth === monthFilter;
        
        return matchType && matchYear && matchMonth;
    });

    function toggleRegistration(title) {
        setRegistered((items) => items.includes(title) ? items.filter((item) => item !== title) : [...items, title]);
    }

    return <main className="container events">
        <div className="page-intro">
            <p className="eyebrow">LỊCH HOẠT ĐỘNG · THÁNG 09/2026</p>
            <h1>Lịch và sự kiện</h1>
            <p>Khám phá các cuộc gặp gỡ, buổi đọc sách và hoạt động cộng đồng tại Đường Sách.</p>
        </div>
        <section className="event-cards-section">
            <div className="section-head event-cards-head">
                <div><p className="eyebrow">SỰ KIỆN SẮP DIỄN RA</p><h2>Chọn hoạt động bạn yêu thích</h2></div>
                <div className="event-filters-wrapper">
                    <select 
                        className="event-date-picker" 
                        value={monthFilter} 
                        onChange={(e) => setMonthFilter(e.target.value)} 
                        aria-label="Chọn tháng"
                    >
                        <option value="">Tất cả các tháng</option>
                        <option value="1">Tháng 1</option><option value="2">Tháng 2</option><option value="3">Tháng 3</option><option value="4">Tháng 4</option><option value="5">Tháng 5</option><option value="6">Tháng 6</option><option value="7">Tháng 7</option><option value="8">Tháng 8</option><option value="9">Tháng 9</option><option value="10">Tháng 10</option><option value="11">Tháng 11</option><option value="12">Tháng 12</option>
                    </select>
                    <select 
                        className="event-date-picker" 
                        value={yearFilter} 
                        onChange={(e) => setYearFilter(e.target.value)} 
                        aria-label="Chọn năm"
                    >
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                    </select>
                    <div className="event-filters" role="group" aria-label="Lọc sự kiện">
                        {eventTypes.map((item) => <button className={filter === item ? 'active' : ''} key={item} onClick={() => setFilter(item)}>{item === 'all' ? 'Tất cả' : item}</button>)}
                    </div>
                </div>
            </div>
            {visibleEvents.length ? <div className="event-card-grid">
                {visibleEvents.map((event) => <article className="event-card" key={event.title}>
                    <div className="event-card-date"><b>{new Date(`${event.date}T12:00:00`).getDate()}</b><span>THG {String(new Date(`${event.date}T12:00:00`).getMonth() + 1).padStart(2, '0')}</span></div>
                    <div className="event-card-content"><span className="event-type">{event.type}</span><h3>{event.title}</h3><p className="event-date-label">{formatDate(event.date)}</p><p>{event.time} · {event.place}</p></div>
                    <button className={`event-register ${registered.includes(event.title) ? 'registered' : ''}`} onClick={() => toggleRegistration(event.title)}>{registered.includes(event.title) ? 'Đã đăng ký' : 'Đăng ký tham gia'}</button>
                </article>)}
            </div> : <p className="events-empty">Chưa có sự kiện thuộc thời gian hoặc nhóm này.</p>}
        </section>
    </main>;
}
