const { JSDOM, VirtualConsole } = require('jsdom');
const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, 'dist', 'index.html'), 'utf8');

const virtualConsole = new VirtualConsole();
virtualConsole.on('error', (err) => {
  console.error('Browser ERROR:', err);
});
virtualConsole.on('log', (log) => {
  console.log('Browser LOG:', log);
});

const dom = new JSDOM(indexHtml, {
  url: 'http://localhost:4173/',
  runScripts: 'dangerously',
  resources: 'usable',
  virtualConsole
});

dom.window.addEventListener('load', () => {
  console.log("Loaded window");
  setTimeout(() => {
    // Try to trigger login
    const form = dom.window.document.querySelector('form');
    if (form) {
      console.log("Found login form, submitting...");
      form.dispatchEvent(new dom.window.Event('submit', { cancelable: true, bubbles: true }));
      setTimeout(() => {
        console.log("After submit innerHTML length:", dom.window.document.body.innerHTML.length);
        console.log(dom.window.document.body.innerHTML.substring(0, 500));
      }, 500);
    } else {
      console.log("No form found");
    }
  }, 500);
});
