import { heritagePlaces } from '../../data/content.js';
import HeritageCard from '../../components/HeritageCard.jsx';
import './heritage.css';

export default function HeritageList({ navigate }) {
  return <main className="container heritage-list-page"><div className="page-intro"><p className="eyebrow">HÀNH TRÌNH DI SẢN</p><h1>Đường Sách Thủ Đức · Di sản &amp; ký ức</h1><p>Khám phá những địa điểm, nghề truyền thống và câu chuyện làm nên bản sắc của thành phố.</p></div><div className="heritage-grid full-heritage-grid">{heritagePlaces.map((place) => <HeritageCard key={place.id} place={place} onClick={() => navigate('heritage-detail', place.id)} />)}</div></main>;
}
