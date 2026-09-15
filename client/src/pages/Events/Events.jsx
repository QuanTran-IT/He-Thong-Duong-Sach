import { useState } from 'react';
import './events.css';

export default function Events() {
    const [filter, setFilter] = useState('all');
    const [registered, setRegistered] = useState([]);
    const events = [
        { date: '15', day: 'THỨ BA', title: 'Đọc sách cùng bé', type: 'Thiếu nhi', place: 'Khu đọc thiếu nhi', time: '09:00' },
        { date: '17', day: 'THỨ NĂM', title: 'Thành phố kể chuyện', type: 'Tọa đàm', place: 'Sân khấu trung tâm', time: '14:30' },
        { date: '19', day: 'THỨ BẢY', title: 'Phiên chợ sách cũ', type: 'Cộng đồng', place: 'Khu trưng bày', time: '08:00' },
        { date: '20', day: 'CHỦ NHẬT', title: 'Âm nhạc và trang sách', type: 'Biểu diễn', place: 'Sân khấu ngoài trời', time: '18:00' }
    ];
    const visibleEvents = filter === 'all' ? events : events.filter((event) => event.type === filter);
    function toggleRegistration(title) {
        setRegistered((items) => items.includes(title) ? items.filter((item) => item !== title) : [...items, title]);
    }

    return <main className="container events"><div className="page-intro"><p className="eyebrow">LỊCH HOẠT ĐỘNG · THÁNG 09/2026</p><h1>Lịch và sự kiện</h1><p>Những cuộc gặp gỡ, buổi đọc sách và hoạt động cộng đồng đang chờ bạn tại Đường Sách.</p></div><section className="calendar"><div className="section-head"><div><p className="eyebrow">LỊCH TRONG TUẦN</p><h2>14 - 20 tháng 09, 2026</h2></div><div className="event-filters" role="group" aria-label="Lọc sự kiện">{['all', 'Thiếu nhi', 'Tọa đàm', 'Cộng đồng', 'Biểu diễn'].map((item) => <button className={filter === item ? 'active' : ''} key={item} onClick={() => setFilter(item)}>{item === 'all' ? 'Tất cả' : item}</button>)}</div></div><div className="week">{visibleEvents.map((event) => <article className="day" key={event.title}><div><span>{event.day}</span><b>{event.date}</b></div><h3>{event.title}</h3><p>{event.time} · {event.place}</p><small className="event-type">{event.type}</small><button className={`event-register ${registered.includes(event.title) ? 'registered' : ''}`} onClick={() => toggleRegistration(event.title)}>{registered.includes(event.title) ? 'Đã đăng ký' : 'Đăng ký tham gia'}</button></article>)}</div>{visibleEvents.length === 0 && <p className="events-empty">Chưa có sự kiện thuộc nhóm này.</p>}</section></main>;
}
