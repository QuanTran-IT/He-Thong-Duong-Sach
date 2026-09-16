import Management from '../../client/src/pages/Management/Management.jsx';
import '../../client/src/styles/global.css';

export default function AdminApp() {
  function navigate(page, id) {
    if (page === 'home') {
      window.location.href = import.meta.env.VITE_PUBLIC_SITE_URL || 'http://localhost:5173';
    } else if (page === 'stall-detail') {
      window.location.href = (import.meta.env.VITE_PUBLIC_SITE_URL || 'http://localhost:5173') + `?page=stall-detail&id=${encodeURIComponent(id)}`;
    }
  }

  return <Management navigate={navigate} />;
}