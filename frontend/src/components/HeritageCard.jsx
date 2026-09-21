export default function HeritageCard({ place, onClick }) {
  return <button className="heritage-card" onClick={onClick}><img src={place.image} alt={place.name} /><div className="heritage-card-body"><span className="card-number">DI SẢN SỐ {place.number}</span><h3>{place.name}</h3><p>{place.summary}</p><span className="card-link">Xem câu chuyện →</span></div></button>;
}
