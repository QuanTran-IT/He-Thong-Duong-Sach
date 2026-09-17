import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

const events = [
  { id: 'SK-026', title: 'Thành phố kể chuyện', date: '17/09/2026', time: '14:30', location: 'Sân khấu trung tâm', status: 'pending' },
  { id: 'SK-025', title: 'Đọc sách cùng bé', date: '15/09/2026', time: '09:00', location: 'Khu đọc thiếu nhi', status: 'pending' },
  { id: 'SK-024', title: 'Phiên chợ sách cũ', date: '19/09/2026', time: '08:00', location: 'Khu trưng bày', status: 'pending' }
];

app.get('/api/health', (_request, response) => response.json({ ok: true, service: 'duong-sach-api' }));
app.get('/api/events', (_request, response) => response.json(events));
app.post('/api/events/:id/decision', (request, response) => {
  const event = events.find((item) => item.id === request.params.id);
  const { decision, reason = '' } = request.body;
  if (!event) return response.status(404).json({ message: 'Không tìm thấy hồ sơ.' });
  if (!['approved', 'rejected'].includes(decision)) return response.status(400).json({ message: 'Quyết định không hợp lệ.' });
  if (decision === 'rejected' && !reason.trim()) return response.status(400).json({ message: 'Từ chối hồ sơ cần có lý do.' });
  event.status = decision;
  event.reason = reason.trim();
  return response.json(event);
});

app.listen(port, () => console.log(`Đường Sách API đang chạy tại http://localhost:${port}`));
