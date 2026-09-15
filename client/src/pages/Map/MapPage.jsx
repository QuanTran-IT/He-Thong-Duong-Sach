import './map.css';
import { useState } from 'react';
import { stalls } from '../../data/content.js';

export default function MapPage({ navigate }) {
  const [selectedStall, setSelectedStall] = useState(stalls[0]);

  return <main className="container map-page"><div className="page-intro"><p className="eyebrow">KHÁM PHÁ KHÔNG GIAN</p><h1>Bản đồ Đường Sách</h1><p>Chọn một gian hàng trên bản đồ để xem thông tin và đi đến trang chi tiết.</p></div><div className="map-layout"><aside className="map-filter"><div className="map-tabs"><button className="selected">Book Street Quận 1</button><button>Book Street Thủ Đức</button></div><h3>Lọc loại điểm</h3>{['Gian hàng sách', 'Tiện ích & Dịch vụ', 'Không gian di sản', 'Lối đi bộ'].map((item) => <label key={item}><input type="checkbox" defaultChecked />{item}</label>)}</aside><div className="map-canvas"><div className="map-road" aria-label="Các gian hàng trên bản đồ">{stalls.map((stall, index) => <button type="button" className={`map-stall ${selectedStall.name === stall.name ? 'selected-point' : ''}`} key={stall.name} onClick={() => setSelectedStall(stall)} aria-label={`Xem ${stall.name}`}><span className="map-marker">{index + 1}</span><strong>{stall.name}</strong><small>{stall.type}</small></button>)}</div><div className="map-pin">➤ &nbsp; LỐI ĐI BỘ CHÍNH - THỦ THIÊM</div><div className="map-place"><img src={selectedStall.image} alt="" /><div className="map-place-content"><p className="eyebrow">GIAN HÀNG ĐANG CHỌN</p><h2>{selectedStall.name}</h2><b>{selectedStall.type}</b><p>{selectedStall.books} đầu sách đang trưng bày. Mở cửa mỗi ngày từ 8:00 đến 22:00.</p><button className="primary" onClick={() => navigate('stall-detail', selectedStall.name)}>Xem chi tiết gian hàng</button></div></div></div></div></main>;
}
