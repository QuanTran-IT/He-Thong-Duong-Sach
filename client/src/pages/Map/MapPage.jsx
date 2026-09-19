import './map.css';
import { useState } from 'react';
import { stalls } from '../../data/content.js';

export default function MapPage({ navigate }) {
  const [selectedStall, setSelectedStall] = useState(stalls[0]);

  // Positions mapped to the stalls (using percentages for responsiveness)
  const stallPositions = [
    { top: '30%', left: '40%' }, // Gian hàng A
    { top: '55%', left: '45%' }, // Gian hàng B
    { top: '75%', left: '30%' }, // Gian hàng C
  ];

  return (
    <main className="container map-page">
      <div className="page-intro">
        <p className="eyebrow">KHÁM PHÁ KHÔNG GIAN</p>
        <h1>Bản đồ Đường Sách</h1>
        <p>Chọn một gian hàng trên bản đồ để xem thông tin và đi đến trang chi tiết.</p>
      </div>
      <div className="map-layout">
        <aside className="map-filter">
          <div className="map-tabs">
            <button className="selected">Đường sách Thủ Đức</button>
          </div>
          <h3>Lọc loại điểm</h3>
          {['Gian hàng sách', 'Tiện ích & Dịch vụ', 'Không gian di sản', 'Lối đi bộ'].map((item) => (
            <label key={item}>
              <input type="checkbox" defaultChecked />
              {item}
            </label>
          ))}
        </aside>
        
        <div className="map-canvas-container">
          <div className="map-canvas-wrapper">
            <img src="/map.png" alt="Bản đồ Đường Sách Thủ Đức" className="map-image-bg" />
            
            {/* Interactive Stalls overlaid on the map */}
            <div className="map-road-overlay">
              {stalls.map((stall, index) => {
                const pos = stallPositions[index] || { top: '50%', left: '50%' };
                const isSelected = selectedStall.name === stall.name;
                return (
                  <button 
                    type="button" 
                    className={`map-stall-pin ${isSelected ? 'selected-point' : ''}`} 
                    key={stall.name} 
                    style={{ top: pos.top, left: pos.left }}
                    onClick={() => setSelectedStall(stall)} 
                    aria-label={`Xem ${stall.name}`}
                  >
                    <div className="pin-pulse" />
                    <span className="map-marker-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </span>
                    <div className="pin-tooltip">
                      <strong>{stall.name}</strong>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="map-place">
            <img src={selectedStall.image} alt="" />
            <div className="map-place-content">
              <p className="eyebrow">GIAN HÀNG ĐANG CHỌN</p>
              <h2>{selectedStall.name}</h2>
              <b>{selectedStall.type}</b>
              <p>{selectedStall.books} đầu sách đang trưng bày. Mở cửa mỗi ngày từ 8:00 đến 22:00.</p>
              <button className="primary" onClick={() => navigate('stall-detail', selectedStall.name)}>Xem chi tiết</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
