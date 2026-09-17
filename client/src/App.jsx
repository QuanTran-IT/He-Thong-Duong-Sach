import { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { heritagePlaces, stalls } from './data/content.js';
import Home from './pages/Home/Home.jsx';
import Events from './pages/Events/Events.jsx';
import MapPage from './pages/Map/MapPage.jsx';
import Feedback from './pages/Feedback/Feedback.jsx';
import HeritageList from './pages/Heritage/HeritageList.jsx';
import HeritageDetail from './pages/Heritage/HeritageDetail.jsx';
import StallDetail from './pages/Stall/StallDetail.jsx';

export default function App() {
    const searchParams = new URLSearchParams(window.location.search);
    const initialPage = searchParams.get('page') || 'home';
    const initialId = searchParams.get('id') || null;

    const [page, setPage] = useState(initialPage);
    const [detailId, setDetailId] = useState(initialPage === 'heritage-detail' && initialId ? initialId : 'buudien');
    const [stallName, setStallName] = useState(initialPage === 'stall-detail' && initialId ? initialId : stalls[0].name);
    const [query, setQuery] = useState('');
    const [language, setLanguage] = useState('vi');

    function navigate(nextPage, id) {
        setPage(nextPage);
        if (nextPage === 'heritage-detail' && id) setDetailId(id);
        if (nextPage === 'stall-detail' && id) setStallName(id);
        
        // Update URL
        const url = new URL(window.location.href);
        url.searchParams.set('page', nextPage);
        if (id) url.searchParams.set('id', id);
        else url.searchParams.delete('id');
        window.history.pushState({}, '', url);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const place = heritagePlaces.find((item) => item.id === detailId) || heritagePlaces[0];
    const stall = stalls.find((item) => item.name === stallName) || stalls[0];
    const pageContent = {
        home: <Home navigate={navigate} query={query} setQuery={setQuery} />,
        events: <Events />,
        map: <MapPage navigate={navigate} />,
        feedback: <Feedback />,
        heritage: <HeritageList navigate={navigate} />,
        'heritage-detail': <HeritageDetail place={place} navigate={navigate} />,
        'stall-detail': <StallDetail stall={stall} navigate={navigate} />
    }[page] || <Home navigate={navigate} query={query} setQuery={setQuery} />;

    return <><Header page={page} navigate={navigate} query={query} setQuery={setQuery} language={language} toggleLanguage={() => setLanguage((current) => current === 'vi' ? 'en' : 'vi')} />{pageContent}<Footer navigate={navigate} /></>;
}
