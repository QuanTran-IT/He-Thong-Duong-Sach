import { useState, useEffect } from 'react';
import { stalls } from '../../data/content.js';
import './management.css';
import './management-overrides.css';

const proposalSeed = [
    { id: 'SK-026', partner: 'Nhà Xuất Bản Kim Đồng', title: 'Triển lãm minh họa sách tranh thiếu nhi', date: 'Thứ 3, 08:30 - 11:30', place: 'Sân khấu B', priority: 'Thường', status: 'approved', submitted: '14/09/2026 16:20', summary: 'Trưng bày minh họa, đọc sách và hoạt động sáng tạo dành cho bạn đọc nhỏ tuổi.', equipment: ['Bàn giới thiệu x2', 'Micro không dây x1'], note: 'Đã kiểm tra lịch và thiết bị, phù hợp với không gian.' },
    { id: 'SK-025', partner: 'Nhà Xuất Bản Trẻ', title: 'Tọa đàm "Sài Gòn - Ký ức qua từng trang sách xưa"', date: 'Thứ 5, 09:00 - 11:30', place: 'Sân khấu A', priority: 'Ưu tiên', status: 'rejected', submitted: '14/09/2026 15:05', summary: 'Buổi trò chuyện cùng nhà văn hóa và các nhà sưu tầm tư liệu cổ về thành phố.', equipment: ['Micro không dây x2', 'Bàn diễn giả x1'], note: 'Không đủ điều kiện tổ chức trong tuần này do lịch sân khấu.' },
    { id: 'SK-024', partner: 'Hiệu sách Nhã Nam', title: 'Đêm hội sách & Đêm thơ Di sản văn hóa TP.HCM', date: 'Thứ 7, 18:30 - 21:30', place: 'Sân khấu A', priority: 'Trọng điểm', status: 'approved', submitted: '13/09/2026 10:40', summary: 'Đêm đọc thơ, giao lưu tác giả và giới thiệu các ấn phẩm về di sản thành phố.', equipment: ['Đèn sân khấu x4', 'Bàn diễn giả x2'], note: 'Đã duyệt sau khi đối chiếu lịch biểu diễn.' },
    { id: 'SK-023', partner: 'Phương Nam Book Store', title: 'Giao lưu ký tặng: "Hồi ức Sài Gòn & Hương vị cà phê"', date: 'Thứ 7, 19:00 - 21:00', place: 'Sân khấu B', priority: 'Trọng điểm', status: 'pending', submitted: '14/09/2026 18:30', summary: 'Gặp gỡ tác giả, ký tặng và trải nghiệm không gian cà phê sách.', equipment: ['Micro không dây x2', 'Bàn ký tặng x1'], note: '' },
    { id: 'SK-022', partner: 'Cà Phê Sách Dưới Tán Me', title: 'Workshop: Thưởng thức cà phê phin truyền thống & Đọc sách', date: 'Chủ nhật, 09:00 - 11:00', place: 'Gian hàng Cà Phê Sách', priority: 'Thường', status: 'pending', submitted: '14/09/2026 18:30', summary: 'Hướng dẫn pha chế cà phê phin mộc cho bạn đọc, kết hợp giới thiệu ấn phẩm về văn hóa thưởng trà và cà phê Sài Gòn.', equipment: ['Micro không dây x2', 'Bàn đại biểu có khăn phủ x2'], note: '' }
];

const scheduleItems = [
    { day: 'Thứ 3', date: '15/09/2026', title: 'Giao lưu tác giả: "Sài Gòn - Ký ức qua từng trang sách xưa"', time: '09:00 - 11:30', place: 'Sân khấu A (Gần cổng Công xã Paris)', partner: 'NXB Trẻ', priority: 'Thường', color: 'blue' },
    { day: 'Thứ 7', date: '19/09/2026', title: 'Workshop: Nghệ thuật đóng sách thủ công & Sửa chữa trang sách cũ', time: '14:30 - 17:00', place: 'Khu Không gian Trải nghiệm Sáng tạo', partner: 'Phương Nam Book Store', priority: 'Ưu tiên', color: 'gold' },
    { day: 'Thứ 3', date: '22/09/2026', title: 'Ra mắt sách mới: "Thành phố dưới những tán cây xanh"', time: '09:30 - 11:00', place: 'Sân khấu B (Gần cổng Hai Bà Trưng)', partner: 'Hiệu sách Nhã Nam', priority: 'Thường', color: 'blue' },
    { day: 'Thứ 3', date: '22/09/2026', title: 'Hoạt động trải nghiệm: Khám phá sách thực tế ảo AR', time: '14:30 - 17:00', place: 'Khu Trải nghiệm FPT Corner', partner: 'Phương Nam Book Store', priority: 'Thường', color: 'blue' }
];

const feedbackSeed = [
    { id: 'FB-01', name: 'Nguyễn Trần Vy', email: 'vynguyen@email.com', subject: 'Góp ý về không gian đọc sách', date: '19/09/2026', status: 'pending', content: 'Gần đây khu vực ghế đá số 3 bị hỏng, mong BQL sớm khắc phục.' },
    { id: 'FB-02', name: 'Lê Hoàng Hải', email: 'hai.le@email.com', subject: 'Cảm ơn sự hỗ trợ', date: '18/09/2026', status: 'resolved', content: 'Tôi đã tìm lại được đồ để quên nhờ sự giúp đỡ của bảo vệ Đường Sách.' },
    { id: 'FB-03', name: 'Trần Kim Lân', email: 'lan.tran@email.com', subject: 'Về hoạt động dịp cuối tuần', date: '17/09/2026', status: 'acknowledged', content: 'Tôi thấy âm thanh sự kiện cuối tuần qua hơi lớn, ảnh hưởng đến trải nghiệm đọc.' },
];

const logsSeed = [
    { id: 1, time: '10:45 - 19/09/2026', action: 'Admin duyệt sự kiện', detail: 'Hồ sơ SK-024 (Đêm hội sách & Đêm thơ Di sản) đã được chuyển sang Đã duyệt.', user: 'Lê Văn Quản', type: 'success' },
    { id: 2, time: '09:12 - 19/09/2026', action: 'Góp ý mới', detail: 'Nguyễn Trần Vy vừa gửi một góp ý mới về không gian đọc sách.', user: 'Hệ thống', type: 'info' },
    { id: 3, time: '16:30 - 18/09/2026', action: 'Cập nhật gian hàng', detail: 'Gian hàng Phương Nam Book City vừa cập nhật giờ hoạt động.', user: 'Đối tác', type: 'warning' },
    { id: 4, time: '08:00 - 18/09/2026', action: 'Đăng nhập', detail: 'Quản trị viên Lê Văn Quản đăng nhập vào hệ thống.', user: 'Lê Văn Quản', type: 'neutral' },
];

function statusText(status) {
    return status === 'approved' ? 'Đã duyệt' : status === 'rejected' ? 'Từ chối' : 'Chờ duyệt';
}

function feedbackStatusText(status) {
    if (status === 'resolved') return 'Đã giải quyết';
    if (status === 'acknowledged') return 'Đã ghi nhận';
    return 'Chờ phản hồi';
}

export default function Management({ navigate }) {
    const [view, setView] = useState('proposals');
    const [fabOpen, setFabOpen] = useState(false);
    
    // States
    const [proposals, setProposals] = useState(proposalSeed);
    const [selectedId, setSelectedId] = useState('SK-022');
    const [proposalFilter, setProposalFilter] = useState('all');
    
    const [eventSearch, setEventSearch] = useState('');
    const [stallSearch, setStallSearch] = useState('');
    
    const [managedStalls, setManagedStalls] = useState(stalls || []);
    const [feedbacks, setFeedbacks] = useState(feedbackSeed);
    const [events, setEvents] = useState(scheduleItems);
    
    // Modal states
    const [showStallModal, setShowStallModal] = useState(false);
    const [editingStall, setEditingStall] = useState(null);
    const [stallForm, setStallForm] = useState({ name: '', type: 'Sách Văn Học', books: 0 });
    
    const [showEventModal, setShowEventModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [eventForm, setEventForm] = useState({ proposalId: '', day: 'Thứ 7', date: '', time: '09:00 - 11:00', color: 'blue' });
    
    const [decisionNote, setDecisionNote] = useState('');

    const selected = proposals.find((proposal) => proposal.id === selectedId) || proposals[0];
    const filteredProposals = proposalFilter === 'all' ? proposals : proposals.filter((proposal) => proposal.status === proposalFilter);
    const filteredEvents = events.filter((event) => `${event?.title} ${event?.partner} ${event?.place}`.toLowerCase().includes(eventSearch.toLowerCase()));
    const filteredStalls = managedStalls.filter((stall) => `${stall?.name} ${stall?.type}`.toLowerCase().includes(stallSearch.toLowerCase()));
    
    const pendingCount = proposals.filter((proposal) => proposal.status === 'pending').length;
    const approvedCount = proposals.filter((proposal) => proposal.status === 'approved').length;

    useEffect(() => {
        setDecisionNote(selected?.note || '');
    }, [selected?.id]);

    function decide(status) {
        if (status === 'rejected' && !decisionNote.trim()) {
            alert('Vui lòng nhập lý do từ chối vào ô "Ý kiến phê duyệt / Hướng dẫn điều phối"!');
            return;
        }
        setProposals((items) => items.map((proposal) => proposal.id === selected?.id ? { ...proposal, status, note: decisionNote } : proposal));
    }

    function handleStallSubmit(e) {
        e.preventDefault();
        if (editingStall) {
            setManagedStalls(items => items.map(s => s.name === editingStall.name ? { ...stallForm } : s));
        } else {
            setManagedStalls([...managedStalls, { ...stallForm }]);
        }
        setShowStallModal(false);
    }

    function openEditModal(stall) {
        setEditingStall(stall);
        setStallForm({ name: stall.name, type: stall.type, books: stall.books || 0 });
        setShowStallModal(true);
    }

    function openAddModal() {
        setEditingStall(null);
        setStallForm({ name: '', type: 'Sách Tổng Hợp', books: 0 });
        setShowStallModal(true);
    }
    
    function openAddEventModal() {
        setEditingEvent(null);
        setEventForm({ proposalId: '', day: 'Thứ 7', date: '', time: '09:00 - 11:00', color: 'blue' });
        setShowEventModal(true);
    }

    function openEditEventModal(event) {
        setEditingEvent(event);
        const prop = proposals.find(p => p.title === event.title);
        setEventForm({
            proposalId: prop ? prop.id : '',
            day: event.day || 'Thứ 7',
            date: event.date || '',
            time: event.time || '',
            color: event.color || 'blue'
        });
        setShowEventModal(true);
    }

    function handleEventSubmit(e) {
        e.preventDefault();
        
        let baseEvent = editingEvent;
        if (eventForm.proposalId) {
            const prop = proposals.find(p => p.id === eventForm.proposalId);
            if (prop) {
                baseEvent = {
                    title: prop.title,
                    place: prop.place,
                    partner: prop.partner,
                    priority: prop.priority,
                };
            }
        }

        if (!baseEvent) {
            alert('Vui lòng chọn một hồ sơ đã duyệt.');
            return;
        }
        
        const newEvent = {
            ...baseEvent,
            day: eventForm.day,
            date: eventForm.date,
            time: eventForm.time,
            color: eventForm.color
        };
        
        if (editingEvent) {
            setEvents(events.map(ev => ev.title === editingEvent.title ? newEvent : ev));
        } else {
            setEvents([...events, newEvent]);
        }
        
        setShowEventModal(false);
    }

    function changeFeedbackStatus(id, newStatus) {
        setFeedbacks(items => items.map(fb => fb.id === id ? { ...fb, status: newStatus } : fb));
    }

    function renderProposals() {
        if (!selected) return null;
        return <section className="management-panel-grid"><div className="management-list-panel"><div className="management-panel-heading"><div><h2>Hàng đợi đề xuất</h2><span>{proposals.length} hồ sơ</span></div><div className="management-filters"><button className={proposalFilter === 'all' ? 'active' : ''} onClick={() => setProposalFilter('all')}>Tất cả</button><button className={proposalFilter === 'pending' ? 'active' : ''} onClick={() => setProposalFilter('pending')}>Chờ duyệt ({pendingCount})</button><button className={proposalFilter === 'approved' ? 'active' : ''} onClick={() => setProposalFilter('approved')}>Đã duyệt</button></div></div><div className="proposal-list">{filteredProposals.map((proposal) => <button className={`proposal-card ${selected.id === proposal.id ? 'selected' : ''}`} key={proposal.id} onClick={() => setSelectedId(proposal.id)}><div className="proposal-card-top"><small>{proposal.partner}</small><span className={`priority priority-${proposal.priority === 'Ưu tiên' ? 'high' : proposal.priority === 'Trọng điểm' ? 'focus' : 'normal'}`}>{proposal.priority}</span><span className={`mini-status ${proposal.status}`}>{statusText(proposal.status)}</span></div><strong>{proposal.title}</strong><small>{proposal.date}</small><small>{proposal.place}</small></button>)}</div></div><div className="management-detail-panel"><div className="detail-meta"><span>{selected.partner}</span><small>Đã gửi: {selected.submitted}</small></div><h2>{selected.title}</h2><div className="detail-tags"><span className={`priority priority-${selected.priority === 'Ưu tiên' ? 'high' : selected.priority === 'Trọng điểm' ? 'focus' : 'normal'}`}>{selected.priority}</span><span className={`mini-status ${selected.status}`}>{statusText(selected.status)}</span></div><div className="detail-callout"><strong>Lịch trình và thiết bị hoàn toàn khả dụng</strong><p>Không phát hiện xung đột thời gian hoặc địa điểm đối với không gian đăng ký.</p></div><div className="detail-info-grid"><div><small>THỜI GIAN TỔ CHỨC</small><b>{selected.date}</b><small>DIỄN GIẢ / ĐƠN VỊ PHỐI HỢP</small><b>{selected.partner}</b></div><div><small>ĐỊA ĐIỂM ĐĂNG KÝ</small><b>{selected.place}</b><small>ĐẠI DIỆN LIÊN HỆ</small><b>Phạm Thị Lan (090 888 111)</b></div></div><div className="equipment-box"><div><small>Yêu cầu thiết bị cần cấp phát từ kho BQL:</small><span>Kho thiết bị sẵn sàng</span></div><div className="equipment-tags">{(selected.equipment || []).map((item) => <b key={item}>{item}</b>)}</div></div><div className="detail-description"><small>Mô tả tóm tắt chương trình:</small><p>{selected.summary}</p></div><label className="decision-note">Ý kiến phê duyệt / Hướng dẫn điều phối của Ban Quản lý:<textarea value={decisionNote} onChange={(e) => setDecisionNote(e.target.value)} placeholder="Nhập ghi chú xử lý (Bắt buộc nếu từ chối)..." /></label><div className="decision-actions"><button className="approve" onClick={() => decide('approved')}>Duyệt & Công bố lịch</button><button className="request" onClick={() => decide('pending')}>Yêu cầu bổ sung</button><button className="reject" onClick={() => decide('rejected')}>Từ chối</button></div></div></section>;
    }

    function renderSchedule() {
        return <section className="management-surface"><div className="surface-heading"><div><h2>Lịch trình sự kiện tuần này</h2><p>Xem phân bổ sự kiện theo từng ngày, mức độ quan trọng và trạng thái công bố.</p></div><div className="date-strip"><select defaultValue="9" className="month-picker"><option value="1">Tháng 1</option><option value="2">Tháng 2</option><option value="3">Tháng 3</option><option value="4">Tháng 4</option><option value="5">Tháng 5</option><option value="6">Tháng 6</option><option value="7">Tháng 7</option><option value="8">Tháng 8</option><option value="9">Tháng 9</option><option value="10">Tháng 10</option><option value="11">Tháng 11</option><option value="12">Tháng 12</option></select><select defaultValue="2026" className="month-picker"><option value="2026">2026</option><option value="2027">2027</option></select></div></div><div className="schedule-grid">{(events || []).map((event) => <article className={`schedule-card ${event.color}`} key={`${event.date}-${event.title}`}><div className="schedule-card-top"><b>{event.day} ({event.date})</b><span>{event.priority}</span></div><h3>{event.title}</h3><p>{event.time}</p><p>{event.place}</p><small>{event.partner}</small><footer><em>Đã công bố</em><button onClick={() => setView('events')}>Đối soát chi tiết</button></footer></article>)}</div></section>;
    }

    function renderEvents() {
        return <section className="management-surface"><div className="table-toolbar"><label><input value={eventSearch} onChange={(event) => setEventSearch(event.target.value)} placeholder="Tìm kiếm sự kiện, diễn giả, địa điểm..." /></label><select defaultValue="all"><option value="all">Tất cả mức ưu tiên</option><option>Thường</option><option>Ưu tiên</option></select><button className="create-button" onClick={openAddEventModal}>+ Thêm sự kiện</button></div><div className="management-table"><div className="table-row table-head"><span>Thời gian</span><span style={{flex: 2}}>Tên sự kiện</span><span>Gian hàng / đơn vị</span><span>Địa điểm</span><span>Trạng thái</span><span>Hành động</span></div>{(filteredEvents || []).map((event, index) => <div className="table-row" key={`${event.date}-${event.title}-${index}`}><span><b>{event.day}</b><small>{event.date} · {event.time}</small></span><span style={{flex: 2}}><strong>{event.title}</strong><small>{event.partner} tổ chức hoạt động tại Đường Sách.</small></span><span><em className="table-badge">{event.partner}</em></span><span>{event.place}</span><span><em className="published">Đã công bố</em></span><span style={{display: 'flex', gap: '8px'}}><button className="row-action" onClick={() => openEditEventModal(event)}>Sửa</button><button className="row-delete" onClick={() => setEvents(items => items.filter(e => e.title !== event.title))} style={{color: '#d74345', background: '#fdeded', borderColor: '#fad4d4'}}>Xóa</button></span></div>)}</div></section>;
    }

    function renderStalls() {
        return <section className="management-surface"><div className="table-toolbar"><label><input value={stallSearch} onChange={(event) => setStallSearch(event.target.value)} placeholder="Tìm gian hàng theo tên hoặc thể loại..." /></label><span className="toolbar-count">{(filteredStalls || []).length} gian hàng</span><button className="create-button" onClick={openAddModal}>+ Thêm gian hàng mới</button></div><div className="management-table stall-table"><div className="table-row table-head"><span>Mã số</span><span>Gian hàng & nhà xuất bản</span><span>Thể loại</span><span>Giờ hoạt động</span><span>Tình trạng</span><span>Hành động</span></div>{(filteredStalls || []).map((stall, index) => <div className="table-row" key={stall?.name}><span><em className="stall-code">B-{String(index + 1).padStart(2, '0')}</em></span><span><strong>{stall?.name}</strong><small>{stall?.type} · {stall?.books || 0} đầu sách</small></span><span><em className="table-badge">{stall?.type}</em></span><span>08:00 - 22:00</span><span><em className="published">Đang mở cửa</em></span><span><button className="row-action" onClick={() => openEditModal(stall)}>Sửa</button><button className="row-delete" onClick={() => setManagedStalls(items => items.filter(s => s.name !== stall?.name))} style={{color: '#d74345', background: '#fdeded', borderColor: '#fad4d4'}}>Xóa</button></span></div>)}</div></section>;
    }

    function renderFeedbacks() {
        return (
            <section className="management-surface">
                <div className="surface-heading">
                    <div>
                        <h2>Quản lý góp ý bạn đọc</h2>
                        <p>Danh sách lời nhắn, đánh giá, khiếu nại từ khách hàng gửi về Ban Quản lý.</p>
                    </div>
                </div>
                <div className="management-table fb-table">
                    <div className="table-row table-head">
                        <span>Khách hàng</span>
                        <span>Nội dung</span>
                        <span>Trạng thái</span>
                        <span>Hành động</span>
                    </div>
                    {feedbacks.map((fb) => (
                        <div className="table-row" key={fb.id}>
                            <span>
                                <strong>{fb.name}</strong>
                                <small>{fb.email}</small>
                                <small>{fb.date}</small>
                            </span>
                            <span style={{flex: 2}}>
                                <strong>{fb.subject}</strong>
                                <p style={{fontSize: '13px', color: '#5c7569', margin: '4px 0 0', lineHeight: 1.4}}>{fb.content}</p>
                            </span>
                            <span>
                                <em className={`mini-status ${fb.status}`}>{feedbackStatusText(fb.status)}</em>
                            </span>
                            <span className="fb-actions" style={{gap: '8px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                {fb.status === 'pending' && <button className="row-action" onClick={() => changeFeedbackStatus(fb.id, 'acknowledged')}>Đã ghi nhận</button>}
                                {fb.status !== 'resolved' && <button className="row-action" onClick={() => changeFeedbackStatus(fb.id, 'resolved')}>Đã giải quyết</button>}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    function renderActivityLogs() {
        return (
            <section className="management-surface">
                <div className="surface-heading">
                    <div>
                        <h2>Hoạt động hệ thống</h2>
                        <p>Nhật ký ghi lại các thay đổi, tương tác quan trọng của toàn bộ hệ thống Đường Sách.</p>
                    </div>
                </div>
                <div className="logs-timeline">
                    {logsSeed.map((log) => (
                        <div className={`log-item log-${log.type}`} key={log.id}>
                            <div className="log-marker"></div>
                            <div className="log-content">
                                <span className="log-time">{log.time}</span>
                                <h4>{log.action} <span className="log-user">bởi {log.user}</span></h4>
                                <p>{log.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    function handleViewChange(newView) {
        setView(newView);
        setFabOpen(false);
    }

    const navItems = [
        { key: 'proposals', label: 'Hồ sơ cần xử lý' },
        { key: 'schedule', label: 'Lịch vận hành' },
        { key: 'events', label: 'Sự kiện công bố' },
        { key: 'stalls', label: 'Danh mục gian hàng' },
        { key: 'feedbacks', label: 'Quản lý góp ý' },
        { key: 'activity-logs', label: 'Hoạt động hệ thống' }
    ];

    const icons = {
        proposals: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>,
        schedule: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>,
        events: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>,
        stalls: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/></svg>,
        feedbacks: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>,
        'activity-logs': <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
    };

    const navContent = (
        <>
            {navItems.map(item => (
                <button key={item.key} className={view === item.key ? 'active' : ''} onClick={() => setView(item.key)}>
                    {icons[item.key]}
                    <span>{item.label}</span>
                </button>
            ))}
        </>
    );

    return (
        <>
            <main className="management-dashboard">
                <aside className="management-sidebar">
                    <div className="management-brand"><span className="brand-icon">DS</span><div><strong>ĐIỀU HÀNH ĐƯỜNG SÁCH</strong><small>Không gian văn hóa đọc</small></div></div>
                    <nav className="desktop-management-nav management-nav">{navContent}</nav>
                    <div className="sidebar-bottom"><button onClick={() => navigate('home')}>← Cổng bạn đọc</button></div>
                    
                    <button
                        className={`header-hamburger${fabOpen ? ' open' : ''}`}
                        onClick={() => setFabOpen(o => !o)}
                        aria-label={fabOpen ? 'Đóng menu' : 'Mở menu'}
                        aria-expanded={fabOpen}
                    >
                        <span className="hbg-bar hbg-bar-1" />
                        <span className="hbg-bar hbg-bar-2" />
                        <span className="hbg-bar hbg-bar-3" />
                    </button>
                </aside>
                <section className="management-main">
                    <header className="management-topbar"><div><p className="eyebrow">TRUNG TÂM VẬN HÀNH</p><h1>{navItems.find(i => i.key === view)?.label}</h1><p>Bảng điều khiển hệ thống dành cho Ban Quản Lý.</p></div><div className="management-stat-chips"><span>{pendingCount} Chờ duyệt</span><span>0 Xung đột</span><span>{approvedCount} Đã lên lịch</span><span>{(managedStalls || []).length} Gian hàng</span></div></header>
                    <div className="management-content">
                        {view === 'proposals' && renderProposals()}
                        {view === 'schedule' && renderSchedule()}
                        {view === 'events' && renderEvents()}
                        {view === 'stalls' && renderStalls()}
                        {view === 'feedbacks' && renderFeedbacks()}
                        {view === 'activity-logs' && renderActivityLogs()}
                    </div>
                    <footer className="management-footer"><p>© 2026 Ban Quản lý Đường Sách TP.HCM. Hệ thống điều hành nội bộ.</p></footer>
                </section>
            </main>

            {/* Mobile Nav Menu (Client Style) */}
            {fabOpen && (
                <div className="mobile-nav-backdrop admin-nav-backdrop" onClick={() => setFabOpen(false)} aria-hidden="true" />
            )}
            <nav className={`mobile-nav-panel admin-nav-panel${fabOpen ? ' open' : ''}`} aria-label="Điều hướng quản trị">
                <div className="mobile-nav-header">
                    <span className="mobile-nav-brand">ĐIỀU HÀNH <em>DS</em></span>
                    <button className="mobile-nav-close" onClick={() => setFabOpen(false)} aria-label="Đóng menu">✕</button>
                </div>
                <div className="mobile-nav-items">
                    {navItems.map((item, i) => (
                        <button
                            key={item.key}
                            className={`mobile-nav-item${view === item.key ? ' active' : ''}`}
                            style={{ '--i': i }}
                            onClick={() => handleViewChange(item.key)}
                        >
                            <span className="mobile-nav-icon">{icons[item.key]}</span>
                            <span className="mobile-nav-label">{item.label}</span>
                        </button>
                    ))}
                </div>
                <div className="mobile-nav-footer">
                    <button className="mobile-nav-login" style={{background: '#f5f0e9', color: 'var(--navy, #173f52)', border: '1px solid #eadfd5'}} onClick={() => navigate('home')}>
                        ← Trở lại Cổng bạn đọc
                    </button>
                </div>
            </nav>

            {showStallModal && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <h2>{editingStall ? 'Chỉnh sửa Gian hàng' : 'Thêm Gian hàng mới'}</h2>
                        <form onSubmit={handleStallSubmit}>
                            <div className="form-group">
                                <label>Tên gian hàng / Nhà xuất bản</label>
                                <input type="text" value={stallForm.name} onChange={e => setStallForm({...stallForm, name: e.target.value})} required placeholder="VD: Nhà sách Nhã Nam" />
                            </div>
                            <div className="form-group">
                                <label>Thể loại / Khu vực</label>
                                <select value={stallForm.type} onChange={e => setStallForm({...stallForm, type: e.target.value})}>
                                    <option>Sách Văn Học</option>
                                    <option>Sách Kinh Tế</option>
                                    <option>Sách Thiếu Nhi</option>
                                    <option>Sách Tổng Hợp</option>
                                    <option>Văn Phòng Phẩm</option>
                                    <option>Cà Phê Sách</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Số lượng đầu sách dự kiến</label>
                                <input type="number" value={stallForm.books} onChange={e => setStallForm({...stallForm, books: e.target.value})} />
                            </div>
                            <div className="admin-modal-actions">
                                <button type="button" className="btn-outline" onClick={() => setShowStallModal(false)}>Hủy</button>
                                <button type="submit" className="create-button">{editingStall ? 'Lưu thay đổi' : 'Thêm gian hàng'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showEventModal && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <h2>{editingEvent ? 'Chỉnh Sửa Sự Kiện' : 'Thêm Sự Kiện Vào Lịch'}</h2>
                        {!editingEvent && <p style={{marginBottom: '16px', color: '#556b60', fontSize: '14px'}}>Chỉ hiển thị các hồ sơ đã được duyệt để đưa vào lịch công bố.</p>}
                        <form onSubmit={handleEventSubmit}>
                            <div className="form-group">
                                <label>Chọn hồ sơ sự kiện</label>
                                <select value={eventForm.proposalId} onChange={e => setEventForm({...eventForm, proposalId: e.target.value})} required={!editingEvent}>
                                    <option value="" disabled>-- Chọn hồ sơ đã duyệt --</option>
                                    {proposals.filter(p => p.status === 'approved').map(p => (
                                        <option key={p.id} value={p.id}>{p.id} - {p.title} ({p.partner})</option>
                                    ))}
                                </select>
                                {editingEvent && <small style={{display: 'block', marginTop: '6px', color: '#81968b'}}>Bỏ qua nếu chỉ muốn sửa giờ/ngày của sự kiện hiện tại.</small>}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className="form-group">
                                    <label>Ngày trong tuần</label>
                                    <select value={eventForm.day} onChange={e => setEventForm({...eventForm, day: e.target.value})}>
                                        <option>Thứ 2</option>
                                        <option>Thứ 3</option>
                                        <option>Thứ 4</option>
                                        <option>Thứ 5</option>
                                        <option>Thứ 6</option>
                                        <option>Thứ 7</option>
                                        <option>Chủ nhật</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Ngày tháng</label>
                                    <input type="text" value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} placeholder="VD: 25/09/2026" required />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className="form-group">
                                    <label>Khung giờ</label>
                                    <input type="text" value={eventForm.time} onChange={e => setEventForm({...eventForm, time: e.target.value})} placeholder="VD: 09:00 - 11:00" required />
                                </div>
                                <div className="form-group">
                                    <label>Nhãn màu hiển thị</label>
                                    <select value={eventForm.color} onChange={e => setEventForm({...eventForm, color: e.target.value})}>
                                        <option value="blue">Xanh (Sự kiện thường)</option>
                                        <option value="gold">Vàng (Ưu tiên)</option>
                                        <option value="green">Lục (Workshop/Trải nghiệm)</option>
                                        <option value="red">Đỏ (Quan trọng)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="admin-modal-actions">
                                <button type="button" className="btn-outline" onClick={() => setShowEventModal(false)}>Hủy</button>
                                <button type="submit" className="create-button">{editingEvent ? 'Lưu thay đổi' : 'Đưa vào lịch'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
