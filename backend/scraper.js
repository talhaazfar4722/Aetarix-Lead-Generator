// backend/scraper.js
import { chromium } from 'playwright';
import axios from 'axios';
import { Lead } from './models/Lead.js';

// Helper function to crawl the website for emails
async function extractEmail(url) {
  if (!url || url === 'N/A') return 'N/A';
  try {
    const response = await axios.get(url, { 
      timeout: 5000, 
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } 
    });
    
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = response.data.match(emailRegex);
    
    return matches ? [...new Set(matches)][0] : 'Not Found';
  } catch (error) {
    return 'Secure / Unreachable';
  }
}

export async function startMapsScraping(keyword, location, io) {
  console.log(`[Scraper] Starting browser for: ${keyword} in ${location}`);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const searchQuery = encodeURIComponent(`${keyword} in ${location}`);
  
  // 🔥 FIX 1: Official Google Maps Search URL with correct template literal variable positioning
  await page.goto(`https://www.google.com/maps/search/${searchQuery}`, { waitUntil: 'domcontentloaded' });

  try {
    await page.waitForSelector('div[role="feed"]', { timeout: 12000 });
  } catch (e) {
    console.log("[Scraper] No results feed container found.");
    io.emit('scraping-finished');
    await browser.close();
    return;
  }

  // Infinite Scroll Execution
  let previousCount = 0;
  let currentCount = 0;
  const maxLeads = 10; 

  while (currentCount < maxLeads) {
    await page.evaluate(() => {
      const scrollableDiv = document.querySelector('div[role="feed"]');
      if (scrollableDiv) scrollableDiv.scrollBy(0, 1000);
    });
    
    await page.waitForTimeout(1500); 
    const elements = await page.$$('a[href*="/maps/place/"]');
    currentCount = elements.length;

    if (currentCount === previousCount) break; 
    previousCount = currentCount;
  }

  // 🔥 FIX 2: Extract links and filter unique entries to bypass duplicate card components completely
  const allLinks = await page.$$eval('a[href*="/maps/place/"]', links => links.map(a => a.href));
  const uniqueBusinessLinks = [...new Set(allLinks)].slice(0, maxLeads);

  console.log(`[Scraper] Found ${uniqueBusinessLinks.length} unique items. Processing stream sequentially...`);

  for (let i = 0; i < uniqueBusinessLinks.length; i++) {
    try {
      if (page.isClosed()) break;

      const targetUrl = uniqueBusinessLinks[i];
      
      // Select the specific unique anchor element dynamically using its exact href property
      const cardSelector = `a[href="${targetUrl}"]`;
      const cardElement = await page.locator(cardSelector).first();
      
      if (!cardElement) continue;

      await cardElement.scrollIntoViewIfNeeded().catch(() => null);
      await cardElement.hover().catch(() => null);
      await page.waitForTimeout(200);
      await cardElement.click();
      
      const titleSelector = 'h1.DUwDvf';
      await page.waitForSelector(titleSelector, { timeout: 6000 }).catch(() => null);
      await page.waitForTimeout(1200); // Allow data mapping layers to stream natively

      const businessName = await page.locator(titleSelector).first().innerText().catch(() => '');
      
      if (!businessName || businessName === "Results") {
        console.log(`[Scraper] Skipping empty state layout at row index ${i}`);
        continue;
      }

      const phoneAttr = await page.locator('button[data-item-id^="phone:tel:"]').first().getAttribute('data-item-id').catch(() => null);
      const phone = phoneAttr ? phoneAttr.replace('phone:tel:', '').trim() : 'N/A';
      
      const website = await page.locator('a[data-item-id="authority"]').first().getAttribute('href').catch(() => null);

      console.log(`[Scraper] (${i + 1}/${uniqueBusinessLinks.length}) Processed: ${businessName}`);

      let leadData = {
        name: businessName,
        phone: phone,
        website: website || 'N/A',
        email: 'Looking up...'
      };

      io.emit('live-lead', leadData);

      if (website && !website.includes('localhost')) {
        leadData.email = await extractEmail(website);
        io.emit('live-lead', leadData);
      } else {
        leadData.email = website ? 'Local Loopback' : 'No Website';
        io.emit('live-lead', leadData);
      }

      // Persist lead to MongoDB (if available)
      try {
        const parts = location.split(',').map(p => p.trim());
        let specificArea = '';
        let city = '';
        let country = '';
        if (parts.length === 3) {
          specificArea = parts[0];
          city = parts[1];
          country = parts[2];
        } else if (parts.length === 2) {
          city = parts[0];
          country = parts[1];
        } else {
          country = parts[0] || '';
        }

        const leadToSave = {
          ...leadData,
          keyword,
          specificArea,
          city,
          country
        };

        await Lead.create(leadToSave).catch(e => {
          // Ignore duplicate key errors (unique index on name+phone)
          if (e.code === 11000) return;
          console.error('Error saving lead:', e.message);
        });
      } catch (saveErr) {
        console.error('Could not persist lead:', saveErr.message);
      }

      await page.waitForTimeout(1000 + Math.random() * 1000);

    } catch (cardError) {
      console.error(`Error sorting out loop data entry ${i}:`, cardError.message);
      if (cardError.message.includes('closed') || cardError.message.includes('Target page')) {
        break;
      }
    }
  }

  console.log("[Scraper] Pipeline cycle concluded cleanly.");
  // 🔥 FIX 3: Broadcast completion message to automatically switch frontend state loading flags
  io.emit('scraping-finished'); 
  await browser.close();
}