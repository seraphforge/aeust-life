import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const directory = new URL('../frontend/dist/', import.meta.url);
const routes = ['', 'explore', 'events', 'clubs', 'hangouts', 'food', 'marketplace', 'roadmap', 'about', 'feedback'];
for (const route of routes) {
  const page = new URL(route ? `${route}/index.html` : 'index.html', directory);
  const html = readFileSync(page, 'utf8');
  assert.match(html, /lang="zh-Hant-TW"/);
  assert.match(html, /<h1[ >]/);
  assert.match(html, /id="main"/);
  assert.match(html, /非官方專案/);
  if (route === 'feedback') {
    assert.match(html, /<form[^>]*method="post"/);
    assert.match(html, /<button[^>]*id="feedback-submit"[^>]*disabled/);
  }
  // The strict deployed CSP does not allow inline executable scripts or styles.
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    assert.ok(/\bsrc=/.test(match[1]) || /type="application\/(ld\+)?json"/.test(match[1]), `Inline script on /${route} violates CSP`);
  }
  assert.ok(!/<style\b|\sstyle=|\son(?:click|load|error|submit)=/.test(html), `Inline CSS/handlers on /${route} violate CSP`);
  for (const match of html.matchAll(/(?:href|src)="(\/(?!\/)[^"#?]*)/g)) {
    const link = match[1];
    if (link === '/') continue;
    const target = new URL(`.${link}`, directory);
    assert.ok(existsSync(target) || existsSync(new URL(`.${link}/index.html`, directory)), `Broken local URL ${link} on /${route}`);
  }
}
assert.ok(existsSync(new URL('_headers', directory)));
console.log(`Built HTML verified: ${routes.length} routes, local links, CSP compatibility and landmarks.`);
console.log(fileURLToPath(directory));
