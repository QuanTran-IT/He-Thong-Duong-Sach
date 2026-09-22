const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  await page.goto('http://localhost:5174/');
  
  console.log('Clicking login...');
  await page.click('button[type="submit"]');
  
  await new Promise(r => setTimeout(r, 1000));
  
  console.log('Done');
  await browser.close();
})();
