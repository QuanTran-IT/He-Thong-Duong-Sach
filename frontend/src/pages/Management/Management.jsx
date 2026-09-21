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
    const [proposals, setProposals] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [proposalFilter, setProposalFilter] = useState('all');
    const [proposalSearch, setProposalSearch] = useState('');
    const [proposalPriorityFilter, setProposalPriorityFilter] = useState('all');

    const [eventSearch, setEventSearch] = useState('');
    const [stallSearch, setStallSearch] = useState('');

    const [managedStalls, setManagedStalls] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [events, setEvents] = useState([]);
    const [logs, setLogs] = useState([]);

    const fetchData = async () => {
        try {
            const [proposalsRes, eventsRes, stallsRes, feedbacksRes, logsRes] = await Promise.all([
                fetch('http://localhost:8080/api/admin/proposals'),
                fetch('http://localhost:8080/api/admin/events'),
                fetch('http://localhost:8080/api/admin/stalls'),
                fetch('http://localhost:8080/api/admin/feedbacks'),
                fetch('http://localhost:8080/api/admin/logs')
            ]);
            
            const pData = await proposalsRes.json();
            const eData = await eventsRes.json();
            const sData = await stallsRes.json();
            const fData = await feedbacksRes.json();
            const lData = await logsRes.json();

            setProposals(pData);
            if (pData.length > 0 && (!selectedId || selectedId === 'SK-022')) setSelectedId(pData[0].id);
            
            setEvents(eData.map(e => ({
                id: e.eventId,
                day: e.dayOfWeek || 'Thứ ?',
                date: e.eventDate ? new Date(e.eventDate).toLocaleDateString('en-GB') : '',
                time: `${e.timeStart} - ${e.timeEnd}`,
                title: e.title,
                place: e.place,
                partner: e.partnerName || 'BTC',
                priority: e.priority || 'Thường',
                color: e.colorTag || 'blue',
                description: e.description
            })));

            setManagedStalls(sData);

            setFeedbacks(fData.map(f => ({
                id: f.id,
                name: f.author,
                email: f.email,
                subject: 'Góp ý chung',
                date: f.date,
                status: f.status,
                content: f.content
            })));

            setLogs(lData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Modal states
    const [showStallModal, setShowStallModal] = useState(false);
    const [editingStall, setEditingStall] = useState(null);
    const [stallForm, setStallForm] = useState({ name: '', type: 'Sách Văn Học', books: 0 });

    const [showEventModal, setShowEventModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [eventConflictError, setEventConflictError] = useState('');
    const [eventForm, setEventForm] = useState({ proposalId: '', title: '', date: '', timeStart: '09:00', timeEnd: '11:00', place: '', description: '', priority: 'Thường', color: 'blue' });

    const [showProposalModal, setShowProposalModal] = useState(false);
    const [showRejectReason, setShowRejectReason] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 

    const [currentSchedulePage, setCurrentSchedulePage] = useState(1);
    const scheduleItemsPerPage = 8;
    
    const [currentEventPage, setCurrentEventPage] = useState(1);
    const eventItemsPerPage = 5;

    const [currentStallPage, setCurrentStallPage] = useState(1);
    const stallItemsPerPage = 5;
    
    const [currentFeedbackPage, setCurrentFeedbackPage] = useState(1);
    const feedbackItemsPerPage = 5;

    const [decisionNote, setDecisionNote] = useState('');

    const selected = proposals.find((proposal) => proposal.id === selectedId) || proposals[0];

    const filteredProposals = proposals.filter((proposal) => {
        const matchesStatus = proposalFilter === 'all' || proposal.status === proposalFilter;
        const matchesPriority = proposalPriorityFilter === 'all' || proposal.priority === proposalPriorityFilter;
        const matchesSearch = `${proposal.title} ${proposal.partner} ${proposal.place}`.toLowerCase().includes(proposalSearch.toLowerCase());
        return matchesStatus && matchesPriority && matchesSearch;
    });

    const filteredEvents = events.filter((event) => `${event?.title} ${event?.partner} ${event?.place}`.toLowerCase().includes(eventSearch.toLowerCase()));
    const filteredStalls = managedStalls.filter((stall) => `${stall?.name} ${stall?.type}`.toLowerCase().includes(stallSearch.toLowerCase()));

    const pendingCount = proposals.filter((proposal) => proposal.status === 'pending').length;
    const approvedCount = proposals.filter((proposal) => proposal.status === 'approved').length;

    useEffect(() => {
        setDecisionNote(selected?.note || '');
        setShowRejectReason(false);
    }, [selected?.id]);

    async function decide(status) {
        if (status === 'rejected' && !decisionNote.trim()) {
            alert('Vui lòng nhập lý do từ chối vào ô "Ý kiến phê duyệt / Hướng dẫn điều phối"!');
            return;
        }

        try {
            const endpoint = `http://localhost:8080/api/admin/proposals/${selected.id}/${status === 'approved' ? 'approve' : 'reject'}`;
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ note: decisionNote })
            });

            if (res.ok) {
                // Tự động sắp lịch nếu duyệt
                if (status === 'approved' && selected) {
                    const alreadyScheduled = events.some(e => e.title === selected.title);
                    if (!alreadyScheduled) {
                        let dayStr = 'Thứ ?';
                        let timeStr = '08:00 - 10:00';

                        if (selected.date && selected.date.includes(',')) {
                            const parts = selected.date.split(',');
                            dayStr = parts[0].trim();
                            timeStr = parts[1].trim();
                        } else if (selected.date) {
                            dayStr = selected.date;
                        }

                        let [start, end] = ['09:00', '11:00'];
                        if (timeStr.includes('-')) {
                            const parts = timeStr.split('-');
                            start = parts[0].trim();
                            end = parts[1].trim();
                        }

                        // Kiểm tra trùng lịch
                        const isConflict = events.some(ev => {
                            if (ev.place === selected.place && ev.date === '25/09/2026') { // Giả định eventDate là 25/09/2026
                                let [evStart, evEnd] = ev.time.split('-').map(s => s.trim());
                                if (start < evEnd && end > evStart) {
                                    return true;
                                }
                            }
                            return false;
                        });

                        if (isConflict) {
                            alert(`Hồ sơ đã được duyệt, nhưng KHÔNG THỂ tự động sắp lịch vì khung giờ ${start} - ${end} tại ${selected.place} đã bị TRÙNG LỊCH với một sự kiện khác. Vui lòng vào Lịch vận hành để xếp lịch thủ công!`);
                        } else {
                            const colorMap = {
                                'Thường': 'blue',
                                'Ưu tiên': 'gold',
                                'Trọng điểm': 'red'
                            };

                            const newEventPayload = {
                                proposalId: selected.id,
                                title: selected.title,
                                eventDate: '2026-09-25', // Tạm gắn một ngày giả định để lịch hoạt động hiển thị
                                dayOfWeek: dayStr,
                                timeStart: start,
                                timeEnd: end,
                                place: selected.place,
                                partnerName: selected.partner,
                                priority: selected.priority,
                                colorTag: colorMap[selected.priority] || 'blue',
                                description: selected.summary
                            };

                            await fetch('http://localhost:8080/api/admin/events', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(newEventPayload)
                            });

                            alert(`Đã tự động sắp lịch cho sự kiện "${selected.title}"!`);
                        }
                    }
                }
                
                // create system log
                await fetch('http://localhost:8080/api/admin/logs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        time: new Date().toLocaleString('en-GB'),
                        action: 'Admin ' + (status === 'approved' ? 'duyệt' : 'từ chối') + ' sự kiện',
                        user: 'Quản trị viên',
                        detail: `Hồ sơ ${selected.id} (${selected.title}) đã bị ${status === 'approved' ? 'duyệt' : 'từ chối'}.`,
                        type: status === 'approved' ? 'success' : 'warning'
                    })
                });

                fetchData();
                setShowProposalModal(false);
            }
        } catch (e) { console.error(e); }
    }

    async function handleStallSubmit(e) {
        e.preventDefault();
        const payload = { name: stallForm.name, type: stallForm.type, books: parseInt(stallForm.books) || 0 };
        try {
            if (editingStall) {
                const res = await fetch(`http://localhost:8080/api/admin/stalls/${editingStall.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (res.ok) fetchData();
            } else {
                const res = await fetch('http://localhost:8080/api/admin/stalls', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (res.ok) fetchData();
            }
            setShowStallModal(false);
        } catch (err) {
            console.error(err);
        }
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
        setEventConflictError('');
        setEventForm({ proposalId: '', title: '', date: '', timeStart: '09:00', timeEnd: '11:00', place: '', description: '', priority: 'Thường', color: 'blue' });
        setShowEventModal(true);
    }

    function openEditEventModal(event) {
        setEditingEvent(event);
        setEventConflictError('');
        const prop = proposals.find(p => p.title === event.title);

        let [start, end] = ['09:00', '11:00'];
        if (event.time && event.time.includes('-')) {
            const parts = event.time.split('-');
            start = parts[0].trim();
            end = parts[1].trim();
        }

        let formattedDate = event.date || '';
        if (formattedDate.includes('/')) {
            const [d, m, y] = formattedDate.split('/');
            formattedDate = `${y}-${m}-${d}`;
        }

        setEventForm({
            proposalId: prop ? prop.id : '',
            title: event.title || '',
            date: formattedDate,
            timeStart: start,
            timeEnd: end,
            place: event.place || '',
            description: event.description || '',
            priority: event.priority || 'Thường',
            color: event.color || 'blue'
        });
        setShowEventModal(true);
    }

    async function handleEventSubmit(e) {
        e.preventDefault();
        setEventConflictError('');

        let displayDate = eventForm.date;
        let dayOfWeek = 'Thứ ?';
        if (eventForm.date && eventForm.date.includes('-')) {
            const dObj = new Date(eventForm.date);
            const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
            dayOfWeek = days[dObj.getDay()];
            const [y, m, d] = eventForm.date.split('-');
            displayDate = `${d}/${m}/${y}`;
        }

        const place = eventForm.place;
        const newStart = eventForm.timeStart;
        const newEnd = eventForm.timeEnd;

        if (newStart >= newEnd) {
            setEventConflictError('Giờ kết thúc phải sau giờ bắt đầu.');
            return;
        }

        const isConflict = events.some(ev => {
            if (editingEvent && ev.title === editingEvent.title) return false;

            if (ev.place === place && ev.date === displayDate) {
                let [evStart, evEnd] = ev.time.split('-').map(s => s.trim());
                if (newStart < evEnd && newEnd > evStart) {
                    return true;
                }
            }
            return false;
        });

        if (isConflict) {
            setEventConflictError(`Khung giờ ${newStart} - ${newEnd} tại ${place} đã bị trùng với một sự kiện khác!`);
            return;
        }

        const payload = {
            proposalId: eventForm.proposalId || null,
            title: eventForm.title,
            eventDate: eventForm.date,
            dayOfWeek: dayOfWeek,
            timeStart: newStart,
            timeEnd: newEnd,
            place: place,
            description: eventForm.description,
            priority: eventForm.priority,
            colorTag: eventForm.color
        };

        try {
            if (editingEvent && editingEvent.id) {
                const res = await fetch(`http://localhost:8080/api/admin/events/${editingEvent.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (res.ok) fetchData();
            } else {
                const res = await fetch('http://localhost:8080/api/admin/events', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (res.ok) fetchData();
            }
            setShowEventModal(false);
        } catch (err) { console.error(err); }
    }

    async function changeFeedbackStatus(id, newStatus) {
        try {
            const res = await fetch(`http://localhost:8080/api/admin/feedbacks/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) fetchData();
        } catch (e) { console.error(e); }
    }

    function renderProposals() {
        const totalPages = Math.ceil(filteredProposals.length / itemsPerPage);
        const paginatedProposals = filteredProposals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

        return <section className="management-surface">
            <div className="surface-heading" style={{ borderBottom: 'none' }}>
                <div>
                    <h2>Hàng đợi đề xuất</h2>
                    <p>Danh sách các hồ sơ sự kiện cần được duyệt bởi Ban Quản lý.</p>
                </div>
                <div className="management-filters" style={{ marginTop: 0 }}>
                    <button className={proposalFilter === 'all' ? 'active' : ''} onClick={() => { setProposalFilter('all'); setCurrentPage(1); }}>Tất cả ({proposals.length})</button>
                    <button className={proposalFilter === 'pending' ? 'active' : ''} onClick={() => { setProposalFilter('pending'); setCurrentPage(1); }}>Chờ duyệt ({pendingCount})</button>
                    <button className={proposalFilter === 'approved' ? 'active' : ''} onClick={() => { setProposalFilter('approved'); setCurrentPage(1); }}>Đã duyệt ({approvedCount})</button>
                </div>
            </div>

            <div className="table-toolbar" style={{ paddingTop: 0 }}>
                <label>
                    <input
                        value={proposalSearch}
                        onChange={(e) => { setProposalSearch(e.target.value); setCurrentPage(1); }}
                        placeholder="Tìm kiếm sự kiện, đơn vị tổ chức, địa điểm..."
                    />
                </label>
                <select
                    value={proposalPriorityFilter}
                    onChange={(e) => { setProposalPriorityFilter(e.target.value); setCurrentPage(1); }}
                >
                    <option value="all">Tất cả mức ưu tiên</option>
                    <option value="Thường">Thường</option>
                    <option value="Ưu tiên">Ưu tiên</option>
                    <option value="Trọng điểm">Trọng điểm</option>
                </select>
            </div>

            <div className="management-table" style={{ borderTop: '1px solid #e1e8e3' }}>
                <div className="table-row table-head" style={{ gridTemplateColumns: '1.2fr 2.5fr 1.2fr 1fr 1fr' }}>
                    <span>Đơn vị tổ chức</span>
                    <span>Tên sự kiện & Thông tin</span>
                    <span>Lịch & Địa điểm</span>
                    <span style={{ textAlign: 'center' }}>Trạng thái</span>
                    <span style={{ textAlign: 'right' }}>Hành động</span>
                </div>
                {paginatedProposals.map((proposal) => (
                    <div className="table-row" key={proposal.id} style={{ gridTemplateColumns: '1.2fr 2.5fr 1.2fr 1fr 1fr', alignItems: 'center' }}>
                        <span>
                            <strong style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>{proposal.partner}</strong>
                            <small style={{ color: '#819189', fontSize: '11px' }}>Đã gửi: {proposal.submitted}</small>
                        </span>
                        <span style={{ paddingRight: '16px' }}>
                            <strong style={{ fontSize: '14px', color: '#173f52', display: 'block' }}>{proposal.title}</strong>
                            <p style={{ fontSize: '12px', color: '#5c7569', margin: '6px 0 0', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{proposal.summary}</p>
                        </span>
                        <span>
                            <span className={`priority priority-${proposal.priority === 'Ưu tiên' ? 'high' : proposal.priority === 'Trọng điểm' ? 'focus' : 'normal'}`} style={{ display: 'inline-block', marginBottom: '6px' }}>{proposal.priority}</span>
                            <small style={{ display: 'block', color: '#4a6055', fontSize: '12px', marginBottom: '2px' }}>📅 {proposal.date}</small>
                            <small style={{ display: 'block', color: '#4a6055', fontSize: '12px' }}>📍 {proposal.place}</small>
                        </span>
                        <span style={{ textAlign: 'center' }}>
                            <em className={`mini-status ${proposal.status}`} style={{ display: 'inline-block' }}>{statusText(proposal.status)}</em>
                        </span>
                        <span style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="row-action" onClick={() => { setSelectedId(proposal.id); setShowProposalModal(true); }} style={{ padding: '6px 12px', whiteSpace: 'nowrap' }}>Xem chi tiết</button>
                        </span>
                    </div>
                ))}
            </div>
            {totalPages > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '20px', padding: '16px 0' }}>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                        style={{ padding: '6px 12px', border: '1px solid #dce4e0', borderRadius: '6px', background: currentPage === 1 ? '#f5f5f5' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', color: currentPage === 1 ? '#a0a0a0' : '#173f52' }}
                    >
                        Trước
                    </button>
                    <span style={{ fontSize: '14px', color: '#5c7569', fontWeight: 500 }}>Trang {currentPage} / {totalPages}</span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                        style={{ padding: '6px 12px', border: '1px solid #dce4e0', borderRadius: '6px', background: currentPage === totalPages ? '#f5f5f5' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', color: currentPage === totalPages ? '#a0a0a0' : '#173f52' }}
                    >
                        Sau
                    </button>
                </div>
            )}
        </section>;
    }

    function renderSchedule() {
        const totalSchedulePages = Math.ceil((events || []).length / scheduleItemsPerPage);
        const paginatedSchedule = (events || []).slice((currentSchedulePage - 1) * scheduleItemsPerPage, currentSchedulePage * scheduleItemsPerPage);

        return (
            <section className="management-surface">
                <div className="surface-heading">
                    <div>
                        <h2>Lịch trình sự kiện tuần này</h2>
                        <p>Xem phân bổ sự kiện theo từng ngày, mức độ quan trọng và trạng thái công bố.</p>
                    </div>
                    <div className="date-strip">
                        <select defaultValue="9" className="month-picker">
                            <option value="1">Tháng 1</option><option value="2">Tháng 2</option><option value="3">Tháng 3</option><option value="4">Tháng 4</option><option value="5">Tháng 5</option><option value="6">Tháng 6</option><option value="7">Tháng 7</option><option value="8">Tháng 8</option><option value="9">Tháng 9</option><option value="10">Tháng 10</option><option value="11">Tháng 11</option><option value="12">Tháng 12</option>
                        </select>
                        <select defaultValue="2026" className="month-picker">
                            <option value="2026">2026</option><option value="2027">2027</option>
                        </select>
                    </div>
                </div>
                <div className="schedule-grid">
                    {paginatedSchedule.map((event) => (
                        <article className={`schedule-card ${event.color}`} key={`${event.date}-${event.title}`}>
                            <div className="schedule-card-top">
                                <b>{event.day} ({event.date})</b>
                                <span>{event.priority}</span>
                            </div>
                            <h3>{event.title}</h3>
                            <p>{event.time}</p>
                            <p>{event.place}</p>
                            <small>{event.partner}</small>
                            <footer>
                                <em>Đã công bố</em>
                                <button onClick={() => setView('events')}>Đối soát chi tiết</button>
                            </footer>
                        </article>
                    ))}
                </div>
                {totalSchedulePages > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '20px', padding: '16px 0' }}>
                        <button
                            disabled={currentSchedulePage === 1}
                            onClick={() => setCurrentSchedulePage(p => p - 1)}
                            style={{ padding: '6px 12px', border: '1px solid #dce4e0', borderRadius: '6px', background: currentSchedulePage === 1 ? '#f5f5f5' : '#fff', cursor: currentSchedulePage === 1 ? 'not-allowed' : 'pointer', color: currentSchedulePage === 1 ? '#a0a0a0' : '#173f52' }}
                        >
                            Trước
                        </button>
                        <span style={{ fontSize: '14px', color: '#5c7569', fontWeight: 500 }}>Trang {currentSchedulePage} / {totalSchedulePages}</span>
                        <button
                            disabled={currentSchedulePage === totalSchedulePages}
                            onClick={() => setCurrentSchedulePage(p => p + 1)}
                            style={{ padding: '6px 12px', border: '1px solid #dce4e0', borderRadius: '6px', background: currentSchedulePage === totalSchedulePages ? '#f5f5f5' : '#fff', cursor: currentSchedulePage === totalSchedulePages ? 'not-allowed' : 'pointer', color: currentSchedulePage === totalSchedulePages ? '#a0a0a0' : '#173f52' }}
                        >
                            Sau
                        </button>
                    </div>
                )}
            </section>
        );
    }

    function renderEvents() {
        const totalEventPages = Math.ceil((filteredEvents || []).length / eventItemsPerPage);
        const paginatedEvents = (filteredEvents || []).slice((currentEventPage - 1) * eventItemsPerPage, currentEventPage * eventItemsPerPage);

        return (
            <section className="management-surface">
                <div className="table-toolbar">
                    <label>
                        <input value={eventSearch} onChange={(e) => { setEventSearch(e.target.value); setCurrentEventPage(1); }} placeholder="Tìm kiếm sự kiện, diễn giả, địa điểm..." />
                    </label>
                    <select defaultValue="all">
                        <option value="all">Tất cả mức ưu tiên</option>
                        <option>Thường</option>
                        <option>Ưu tiên</option>
                    </select>
                </div>
                <div className="management-table">
                    <div className="table-row table-head">
                        <span>Thời gian</span>
                        <span style={{ flex: 2 }}>Tên sự kiện</span>
                        <span>Gian hàng / đơn vị</span>
                        <span>Địa điểm</span>
                        <span>Trạng thái</span>
                        <span>Hành động</span>
                    </div>
                    {paginatedEvents.map((event, index) => (
                        <div className="table-row" key={`${event.date}-${event.title}-${index}`}>
                            <span><b>{event.day}</b><small>{event.date} · {event.time}</small></span>
                            <span style={{ flex: 2 }}><strong>{event.title}</strong><small>{event.partner} tổ chức hoạt động tại Đường Sách.</small></span>
                            <span><em className="table-badge">{event.partner}</em></span>
                            <span>{event.place}</span>
                            <span><em className="published">Đã công bố</em></span>
                            <span style={{ display: 'flex', gap: '8px' }}>
                                <button className="row-action" onClick={() => openEditEventModal(event)}>Sửa</button>
                                <button className="row-delete" onClick={async () => {
                                    if(window.confirm('Bạn có chắc chắn muốn xóa sự kiện này?')) {
                                        try {
                                            await fetch(`http://localhost:8080/api/admin/events/${event.id}`, { method: 'DELETE' });
                                            fetchData();
                                        } catch(e) { console.error(e); }
                                    }
                                }} style={{ color: '#d74345', background: '#fdeded', borderColor: '#fad4d4' }}>Xóa</button>
                            </span>
                        </div>
                    ))}
                </div>
                {totalEventPages > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '20px', padding: '16px 0' }}>
                        <button
                            disabled={currentEventPage === 1}
                            onClick={() => setCurrentEventPage(p => p - 1)}
                            style={{ padding: '6px 12px', border: '1px solid #dce4e0', borderRadius: '6px', background: currentEventPage === 1 ? '#f5f5f5' : '#fff', cursor: currentEventPage === 1 ? 'not-allowed' : 'pointer', color: currentEventPage === 1 ? '#a0a0a0' : '#173f52' }}
                        >
                            Trước
                        </button>
                        <span style={{ fontSize: '14px', color: '#5c7569', fontWeight: 500 }}>Trang {currentEventPage} / {totalEventPages}</span>
                        <button
                            disabled={currentEventPage === totalEventPages}
                            onClick={() => setCurrentEventPage(p => p + 1)}
                            style={{ padding: '6px 12px', border: '1px solid #dce4e0', borderRadius: '6px', background: currentEventPage === totalEventPages ? '#f5f5f5' : '#fff', cursor: currentEventPage === totalEventPages ? 'not-allowed' : 'pointer', color: currentEventPage === totalEventPages ? '#a0a0a0' : '#173f52' }}
                        >
                            Sau
                        </button>
                    </div>
                )}
            </section>
        );
    }

    function renderStalls() {
        const totalStallPages = Math.ceil((filteredStalls || []).length / stallItemsPerPage);
        const paginatedStalls = (filteredStalls || []).slice((currentStallPage - 1) * stallItemsPerPage, currentStallPage * stallItemsPerPage);

        return (
            <section className="management-surface">
                <div className="table-toolbar">
                    <label>
                        <input value={stallSearch} onChange={(e) => { setStallSearch(e.target.value); setCurrentStallPage(1); }} placeholder="Tìm gian hàng theo tên hoặc thể loại..." />
                    </label>
                    <span className="toolbar-count">{(filteredStalls || []).length} gian hàng</span>
                    <button className="create-button" onClick={openAddModal}>+ Thêm gian hàng mới</button>
                </div>
                <div className="management-table stall-table">
                    <div className="table-row table-head">
                        <span>Mã số</span>
                        <span>Gian hàng & nhà xuất bản</span>
                        <span>Thể loại</span>
                        <span>Giờ hoạt động</span>
                        <span>Tình trạng</span>
                        <span>Hành động</span>
                    </div>
                    {paginatedStalls.map((stall, index) => {
                        const originalIndex = (currentStallPage - 1) * stallItemsPerPage + index;
                        return (
                        <div className="table-row" key={stall?.name}>
                            <span><em className="stall-code">B-{String(originalIndex + 1).padStart(2, '0')}</em></span>
                            <span><strong>{stall?.name}</strong><small>{stall?.type} · {stall?.books || 0} đầu sách</small></span>
                            <span><em className="table-badge">{stall?.type}</em></span>
                            <span>08:00 - 22:00</span>
                            <span><em className="published">Đang mở cửa</em></span>
                            <span>
                                <button className="row-action" onClick={() => openEditModal(stall)}>Sửa</button>
                                <button className="row-delete" onClick={async () => {
                                    if(window.confirm('Bạn có chắc chắn muốn xóa gian hàng này?')) {
                                        try {
                                            await fetch(`http://localhost:8080/api/admin/stalls/${stall.id}`, { method: 'DELETE' });
                                            fetchData();
                                        } catch(e) { console.error(e); }
                                    }
                                }} style={{ color: '#d74345', background: '#fdeded', borderColor: '#fad4d4' }}>Xóa</button>
                            </span>
                        </div>
                    )})}
                </div>
                {totalStallPages > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '20px', padding: '16px 0' }}>
                        <button
                            disabled={currentStallPage === 1}
                            onClick={() => setCurrentStallPage(p => p - 1)}
                            style={{ padding: '6px 12px', border: '1px solid #dce4e0', borderRadius: '6px', background: currentStallPage === 1 ? '#f5f5f5' : '#fff', cursor: currentStallPage === 1 ? 'not-allowed' : 'pointer', color: currentStallPage === 1 ? '#a0a0a0' : '#173f52' }}
                        >
                            Trước
                        </button>
                        <span style={{ fontSize: '14px', color: '#5c7569', fontWeight: 500 }}>Trang {currentStallPage} / {totalStallPages}</span>
                        <button
                            disabled={currentStallPage === totalStallPages}
                            onClick={() => setCurrentStallPage(p => p + 1)}
                            style={{ padding: '6px 12px', border: '1px solid #dce4e0', borderRadius: '6px', background: currentStallPage === totalStallPages ? '#f5f5f5' : '#fff', cursor: currentStallPage === totalStallPages ? 'not-allowed' : 'pointer', color: currentStallPage === totalStallPages ? '#a0a0a0' : '#173f52' }}
                        >
                            Sau
                        </button>
                    </div>
                )}
            </section>
        );
    }

    function renderFeedbacks() {
        const totalFeedbackPages = Math.ceil(feedbacks.length / feedbackItemsPerPage);
        const paginatedFeedbacks = feedbacks.slice((currentFeedbackPage - 1) * feedbackItemsPerPage, currentFeedbackPage * feedbackItemsPerPage);

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
                    {paginatedFeedbacks.map((fb) => (
                        <div className="table-row" key={fb.id}>
                            <span>
                                <strong>{fb.name}</strong>
                                <small>{fb.email}</small>
                                <small>{fb.date}</small>
                            </span>
                            <span style={{ flex: 2 }}>
                                <strong>{fb.subject}</strong>
                                <p style={{ fontSize: '13px', color: '#5c7569', margin: '4px 0 0', lineHeight: 1.4 }}>{fb.content}</p>
                            </span>
                            <span>
                                <em className={`mini-status ${fb.status}`}>{feedbackStatusText(fb.status)}</em>
                            </span>
                            <span className="fb-actions" style={{ gap: '8px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                {fb.status === 'pending' && <button className="row-action" onClick={() => changeFeedbackStatus(fb.id, 'acknowledged')}>Đã ghi nhận</button>}
                                {fb.status !== 'resolved' && <button className="row-action" onClick={() => changeFeedbackStatus(fb.id, 'resolved')}>Đã giải quyết</button>}
                            </span>
                        </div>
                    ))}
                </div>
                {totalFeedbackPages > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '20px', padding: '16px 0' }}>
                        <button
                            disabled={currentFeedbackPage === 1}
                            onClick={() => setCurrentFeedbackPage(p => p - 1)}
                            style={{ padding: '6px 12px', border: '1px solid #dce4e0', borderRadius: '6px', background: currentFeedbackPage === 1 ? '#f5f5f5' : '#fff', cursor: currentFeedbackPage === 1 ? 'not-allowed' : 'pointer', color: currentFeedbackPage === 1 ? '#a0a0a0' : '#173f52' }}
                        >
                            Trước
                        </button>
                        <span style={{ fontSize: '14px', color: '#5c7569', fontWeight: 500 }}>Trang {currentFeedbackPage} / {totalFeedbackPages}</span>
                        <button
                            disabled={currentFeedbackPage === totalFeedbackPages}
                            onClick={() => setCurrentFeedbackPage(p => p + 1)}
                            style={{ padding: '6px 12px', border: '1px solid #dce4e0', borderRadius: '6px', background: currentFeedbackPage === totalFeedbackPages ? '#f5f5f5' : '#fff', cursor: currentFeedbackPage === totalFeedbackPages ? 'not-allowed' : 'pointer', color: currentFeedbackPage === totalFeedbackPages ? '#a0a0a0' : '#173f52' }}
                        >
                            Sau
                        </button>
                    </div>
                )}
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
                    {logs.map((log) => (
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
        proposals: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>,
        schedule: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" /></svg>,
        events: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>,
        stalls: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" /></svg>,
        feedbacks: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" /></svg>,
        'activity-logs': <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
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

    let proposalConflictWarning = null;
    if (showProposalModal && selected && selected.status === 'pending') {
        const parts = selected.date.split(',');
        if (parts.length === 2) {
            const propDay = parts[0].trim();
            const timeRange = parts[1].split('-');
            if (timeRange.length === 2) {
                const propStart = timeRange[0].trim();
                const propEnd = timeRange[1].trim();
                const propPlace = selected.place;

                const conflictEvent = events.find(ev => {
                    if (ev.place && propPlace && (ev.place.includes(propPlace) || propPlace.includes(ev.place))) {
                        if (ev.day === propDay || (ev.date && ev.date.includes(propDay))) {
                            const evTimeParts = ev.time.split('-');
                            if (evTimeParts.length === 2) {
                                const evStart = evTimeParts[0].trim();
                                const evEnd = evTimeParts[1].trim();
                                if (propStart < evEnd && propEnd > evStart) {
                                    return true;
                                }
                            }
                        }
                    }
                    return false;
                });
                
                if (conflictEvent) {
                    proposalConflictWarning = `Hồ sơ này có thể bị trùng lịch với sự kiện đã duyệt: "${conflictEvent.title}" (${conflictEvent.time} tại ${conflictEvent.place}). Bạn nên kiểm tra lại trước khi duyệt.`;
                }
            }
        }
    }

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
                    <button className="mobile-nav-login" style={{ background: '#f5f0e9', color: 'var(--navy, #173f52)', border: '1px solid #eadfd5' }} onClick={() => navigate('home')}>
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
                                <input type="text" value={stallForm.name} onChange={e => setStallForm({ ...stallForm, name: e.target.value })} required placeholder="VD: Nhà sách Nhã Nam" />
                            </div>
                            <div className="form-group">
                                <label>Thể loại / Khu vực</label>
                                <select value={stallForm.type} onChange={e => setStallForm({ ...stallForm, type: e.target.value })}>
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
                                <input type="number" value={stallForm.books} onChange={e => setStallForm({ ...stallForm, books: e.target.value })} />
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
                        {!editingEvent && <p style={{ marginBottom: '16px', color: '#556b60', fontSize: '14px' }}>Chỉ hiển thị các hồ sơ đã được duyệt để đưa vào lịch công bố.</p>}
                        <form onSubmit={handleEventSubmit}>
                            {eventConflictError && (
                                <div style={{ padding: '10px', background: '#ffebee', color: '#c62828', borderRadius: '4px', marginBottom: '16px', fontSize: '13px', border: '1px solid #ef9a9a' }}>
                                    <strong>Cảnh báo xung đột:</strong> {eventConflictError}
                                </div>
                            )}
                            
                            <div className="form-group">
                                <label>Tên sự kiện</label>
                                <input type="text" value={eventForm.title} onChange={e => setEventForm({ ...eventForm, title: e.target.value })} required placeholder="Nhập tên sự kiện..." />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className="form-group">
                                    <label>Địa điểm</label>
                                    <input type="text" value={eventForm.place} onChange={e => setEventForm({ ...eventForm, place: e.target.value })} required placeholder="VD: Sân khấu A" />
                                </div>
                                <div className="form-group">
                                    <label>Mức quan trọng</label>
                                    <select value={eventForm.priority} onChange={e => setEventForm({ ...eventForm, priority: e.target.value })}>
                                        <option value="Thường">Thường</option>
                                        <option value="Ưu tiên">Ưu tiên</option>
                                        <option value="Trọng điểm">Trọng điểm</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label>Mô tả sự kiện</label>
                                <textarea value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value })} rows="3" placeholder="Ghi chú chi tiết về sự kiện..."></textarea>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '16px' }}>
                                <div className="form-group">
                                    <label>Ngày diễn ra</label>
                                    <input type="date" value={eventForm.date} onChange={e => setEventForm({ ...eventForm, date: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Từ giờ</label>
                                    <input type="time" value={eventForm.timeStart} onChange={e => setEventForm({ ...eventForm, timeStart: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label>Đến giờ</label>
                                    <input type="time" value={eventForm.timeEnd} onChange={e => setEventForm({ ...eventForm, timeEnd: e.target.value })} required />
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
            {showProposalModal && selected && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal proposal-detail-modal" style={{ maxWidth: '700px', width: '100%' }}>
                        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ margin: 0 }}>Chi tiết đề xuất</h2>
                            <button onClick={() => setShowProposalModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#779184' }}>✕</button>
                        </div>
                        <div className="management-detail-panel" style={{ padding: 0, border: 'none', boxShadow: 'none' }}>
                            <div className="detail-meta"><span>{selected.partner}</span><small>Đã gửi: {selected.submitted}</small></div>
                            <h2 style={{ fontSize: '24px' }}>{selected.title}</h2>
                            <div className="detail-tags" style={{ marginBottom: '16px' }}>
                                <span className={`priority priority-${selected.priority === 'Ưu tiên' ? 'high' : selected.priority === 'Trọng điểm' ? 'focus' : 'normal'}`}>{selected.priority}</span>
                                <span className={`mini-status ${selected.status}`}>{statusText(selected.status)}</span>
                            </div>

                            {proposalConflictWarning && (
                                <div style={{ padding: '12px', background: '#ffebee', color: '#c62828', borderRadius: '6px', marginBottom: '16px', border: '1px solid #ef9a9a', fontSize: '14px' }}>
                                    <strong>⚠️ Cảnh báo:</strong> {proposalConflictWarning}
                                </div>
                            )}
                            <div className="detail-info-grid">
                                <div><small>THỜI GIAN TỔ CHỨC</small><b>{selected.date}</b><small>DIỄN GIẢ / ĐƠN VỊ PHỐI HỢP</small><b>{selected.partner}</b></div>
                                <div><small>ĐỊA ĐIỂM ĐĂNG KÝ</small><b>{selected.place}</b><small>ĐẠI DIỆN LIÊN HỆ</small><b>Phạm Thị Lan (090 888 111)</b></div>
                            </div>
                            <div className="equipment-box">
                                <div><small>Yêu cầu thiết bị cần cấp phát từ kho BQL:</small><span>Kho thiết bị sẵn sàng</span></div>
                                <div className="equipment-tags">{(selected.equipment || []).map((item) => <b key={item}>{item}</b>)}</div>
                            </div>
                            <div className="detail-description"><small>Mô tả tóm tắt chương trình:</small><p>{selected.summary}</p></div>

                            {!showRejectReason ? (
                                <div className="decision-actions" style={{ marginTop: '24px' }}>
                                    <button className="approve" onClick={() => decide('approved')}>Duyệt sự kiện</button>
                                    <button className="reject" onClick={() => setShowRejectReason(true)}>Từ chối</button>
                                </div>
                            ) : (
                                <div className="decision-reject-box" style={{ marginTop: '20px', padding: '16px', background: '#fffcfc', border: '1px solid #fad4d4', borderRadius: '8px' }}>
                                    <label className="decision-note" style={{ margin: 0, color: '#c62828' }}>Vui lòng nhập lý do từ chối (Bắt buộc):
                                        <textarea
                                            value={decisionNote}
                                            onChange={(e) => setDecisionNote(e.target.value)}
                                            placeholder="Ghi chú lý do không duyệt để phản hồi cho đối tác..."
                                            autoFocus
                                            style={{ marginTop: '8px' }}
                                        />
                                    </label>
                                    <div className="decision-actions" style={{ marginTop: '12px', justifyContent: 'flex-end', borderTop: 'none', padding: 0 }}>
                                        <button className="btn-outline" onClick={() => setShowRejectReason(false)}>Hủy</button>
                                        <button className="reject" onClick={() => decide('rejected')}>Xác nhận từ chối</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {showProposalModal && selected && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal proposal-detail-modal" style={{ maxWidth: '700px', width: '100%' }}>
        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0 }}>Chi tiết đề xuất</h2>
            <button onClick={() => setShowProposalModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#779184' }}>✕</button>
        </div>
        <div className="management-detail-panel" style={{ padding: 0, border: 'none', boxShadow: 'none' }}>
            <div className="detail-meta"><span>{selected.partner}</span><small>Đã gửi: {selected.submitted}</small></div>
            <h2 style={{ fontSize: '24px' }}>{selected.title}</h2>
            <div className="detail-tags" style={{ marginBottom: '16px' }}>
                <span className={`priority priority-${selected.priority === 'Ưu tiên' ? 'high' : selected.priority === 'Trọng điểm' ? 'focus' : 'normal'}`}>{selected.priority}</span>
                <span className={`mini-status ${selected.status}`}>{statusText(selected.status)}</span>
            </div>
            <div className="detail-info-grid">
                <div><small>THỜI GIAN TỔ CHỨC</small><b>{selected.date}</b><small>DIỄN GIẢ / ĐƠN VỊ PHỐI HỢP</small><b>{selected.partner}</b></div>
                <div><small>ĐỊA ĐIỂM ĐĂNG KÝ</small><b>{selected.place}</b><small>ĐẠI DIỆN LIÊN HỆ</small><b>Phạm Thị Lan (090 888 111)</b></div>
            </div>
            <div className="equipment-box">
                <div><small>Yêu cầu thiết bị cần cấp phát từ kho BQL:</small><span>Kho thiết bị sẵn sàng</span></div>
                <div className="equipment-tags">{(selected.equipment || []).map((item) => <b key={item}>{item}</b>)}</div>
            </div>
            <div className="detail-description"><small>Mô tả tóm tắt chương trình:</small><p>{selected.summary}</p></div>

            {!showRejectReason ? (
                <div className="decision-actions" style={{ marginTop: '24px' }}>
                    <button className="approve" onClick={() => decide('approved')}>Duyệt sự kiện</button>
                    <button className="reject" onClick={() => setShowRejectReason(true)}>Từ chối</button>
                </div>
            ) : (
                <div className="decision-reject-box" style={{ marginTop: '20px', padding: '16px', background: '#fffcfc', border: '1px solid #fad4d4', borderRadius: '8px' }}>
                    <label className="decision-note" style={{ margin: 0, color: '#c62828' }}>Vui lòng nhập lý do từ chối (Bắt buộc):
                        <textarea
                            value={decisionNote}
                            onChange={(e) => setDecisionNote(e.target.value)}
                            placeholder="Ghi chú lý do không duyệt để phản hồi cho đối tác..."
                            autoFocus
                            style={{ marginTop: '8px' }}
                        />
                    </label>
                    <div className="decision-actions" style={{ marginTop: '12px', justifyContent: 'flex-end', borderTop: 'none', padding: 0 }}>
                        <button className="btn-outline" onClick={() => setShowRejectReason(false)}>Hủy</button>
                        <button className="reject" onClick={() => decide('rejected')}>Xác nhận từ chối</button>
                    </div>
                </div>
            )}
        </div>
    </div>
</div>
            )}
        </>
    );
}
