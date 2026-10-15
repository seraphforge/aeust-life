import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Start npm run dev and either local API first. Test fixture text is stored locally.
const base = 'http://127.0.0.1:4321';
const browser = await chromium.launch(process.platform === 'win32' ? { channel: 'msedge' } : {});
const screenshots = new URL('../.local/screenshots/', import.meta.url);
mkdirSync(screenshots, { recursive: true });
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [360, 768, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    for (const route of ['/', '/explore', '/events', '/clubs', '/hangouts', '/food', '/marketplace', '/roadmap', '/about', '/feedback']) {
      const res = await page.goto(base + route);
      assert.equal(res.status(), 200, route);
      assert.equal(await page.locator('h1').count(), 1, route);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      assert.equal(overflow, false, `${width}px ${route} horizontal overflow`);
    }
    await page.goto(base);
    await page.screenshot({ path: fileURLToPath(new URL(`home-${width}.png`, screenshots)), fullPage: true });
  }
  await page.goto(base + '/feedback');
  await page.locator('#content').fill('短');
  await page.locator('#feedback-submit').click();
  assert.equal(await page.locator('#content').getAttribute('aria-invalid'), 'true');
  assert.equal(await page.locator('#content').inputValue(), '短');
  await page.locator('#content').fill('瀏覽器整合測試：希望課表之外有更多交流機會。');
  await page.locator('#feedback-submit').click();
  await page.locator('#feedback-status.success').waitFor();
  assert.equal(await page.locator('#content').inputValue(), '');
  await page.route('**/api/feedback', route => route.abort());
  const retained = '離線測試：這段文字應在送出失敗後保留下來。';
  await page.locator('#content').fill(retained);
  await page.locator('#feedback-submit').click();
  await page.locator('#feedback-status.error').waitFor();
  assert.equal(await page.locator('#content').inputValue(), retained);
  await page.goto(base);
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').textContent(), '跳到主要內容');
  assert.deepEqual(errors, []);
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const noJsPage = await noJs.newPage();
  await noJsPage.goto(base + '/feedback');
  assert.equal(await noJsPage.locator('#feedback-submit').isDisabled(), true);
  assert.equal(await noJsPage.locator('#feedback-form').getAttribute('method'), 'post');
  console.log('Browser: 30 responsive route checks, real submission, validation, offline retention, keyboard and no-JS safety passed.');
} finally { await browser.close(); }
