import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import AdminApp from './src/AdminApp.jsx';
import Management from '../client/src/pages/Management/Management.jsx';

try {
    global.window = { location: { href: '' } };
    
    console.log("Rendering AdminApp...");
    const html = renderToString(createElement(AdminApp));
    console.log("RENDER 1 (Login) SUCCESS");
    
    console.log("Rendering Management...");
    const html2 = renderToString(createElement(Management, { navigate: () => {} }));
    console.log("RENDER 2 (Management) SUCCESS");
} catch (e) {
    console.error("ERROR CAUGHT:");
    console.error(e);
}
