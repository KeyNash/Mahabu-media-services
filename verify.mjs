import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/Nash/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const edgePath = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const baseUrl = 'http://127.0.0.1:4174/';
const widths = [320, 375, 768, 1024, 1440];
const results = [];
const browser = await chromium.launch({ executablePath: edgePath, headless: true });

async function prepareScreenshot(page) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
      window.scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 70));
    }
    window.scrollTo(0, 0);
  });
}

for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: width < 600 ? 812 : 900 },
    reducedMotion: width === 768 ? 'reduce' : 'no-preference',
    permissions: ['clipboard-read', 'clipboard-write']
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', error => pageErrors.push(error.message));
  const response = await page.goto(baseUrl, { waitUntil: 'networkidle' });
  const metrics = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    title: document.title,
    h1: document.querySelector('h1')?.textContent.trim()
  }));

  const record = {
    width,
    status: response?.status(),
    overflow: metrics.scrollWidth > metrics.innerWidth,
    title: metrics.title,
    h1: metrics.h1,
    consoleErrors,
    pageErrors
  };

  if (width === 375) {
    const menuButton = page.locator('[data-menu-toggle]');
    await menuButton.click();
    if (await menuButton.getAttribute('aria-expanded') !== 'true') throw new Error('Mobile menu did not expose expanded state');
    await menuButton.press('Escape');
    if (await menuButton.getAttribute('aria-expanded') !== 'false') throw new Error('Escape did not close mobile menu');

    const form = page.locator('[data-brief-form]');
    await form.getByLabel('Your name').fill('Verification User');
    await form.locator('select[name="type"]').selectOption({ label: 'Photography' });
    await form.getByLabel('Date or timeframe').fill('Next month');
    await form.getByLabel('Location').fill('Nairobi');
    await form.getByLabel('What should the final result achieve?').fill('Create a concise set of event images for a digital campaign.');
    const requestsBefore = await page.evaluate(() => performance.getEntriesByType('resource').filter(entry => ['fetch', 'xmlhttprequest'].includes(entry.initiatorType)).length);
    await form.getByRole('button', { name: 'Create my brief' }).click();
    const output = await page.locator('[data-brief-output]').inputValue();
    if (!output.includes('Verification User') || !output.includes('Photography')) throw new Error('Generated brief did not include submitted values');
    const requestsAfter = await page.evaluate(() => performance.getEntriesByType('resource').filter(entry => ['fetch', 'xmlhttprequest'].includes(entry.initiatorType)).length);
    if (requestsAfter !== requestsBefore) throw new Error('Brief generation unexpectedly made a network request');
    await page.locator('[data-copy-brief]').click();
    if (!await page.locator('[data-copy-status]').textContent()) throw new Error('Copy action did not expose a status');
    record.briefGeneratedLocally = true;
    record.copyStatusExposed = true;

    await page.reload({ waitUntil: 'networkidle' });
    await prepareScreenshot(page);
    await page.screenshot({ path: path.resolve('docs/screenshots/home-mobile.png'), fullPage: true });
  }

  if (width === 1440) {
    await prepareScreenshot(page);
    await page.screenshot({ path: path.resolve('docs/screenshots/home-desktop.png'), fullPage: true });
  }

  results.push(record);
  await context.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
if (results.some(result => result.status !== 200 || result.overflow || result.consoleErrors.length || result.pageErrors.length)) process.exitCode = 1;
