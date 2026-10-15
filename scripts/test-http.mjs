import assert from 'node:assert/strict';
const base = 'http://127.0.0.1:4321';
for (const route of ['/', '/explore', '/events', '/clubs', '/hangouts', '/food', '/marketplace', '/roadmap', '/about', '/feedback']) {
  const res = await fetch(base + route, { signal: AbortSignal.timeout(10_000) });
  assert.equal(res.status, 200, route);
  const html = await res.text();
  assert.match(html, /lang="zh-Hant-TW"/);
  assert.equal([...html.matchAll(/<h1[ >]/g)].length, 1, route);
  assert.match(html, /非官方專案/);
  if (route === '/feedback') {
    assert.match(html, /<form[^>]*method="post"/);
    assert.match(html, /<button[^>]*id="feedback-submit"[^>]*disabled/);
  }
}
const health = await fetch(base + '/api/health');
assert.equal(health.status, 200);
assert.deepEqual(await health.json(), { ok: true, service: 'aeust-life-api' });
const res = await fetch(base + '/api/feedback', {
  method: 'POST', headers: { Origin: base, 'Content-Type': 'application/json' },
  body: JSON.stringify({ type: 'idea', content: 'HTTP 代理整合測試：期待更多校園交流的機會。', website: '' }),
});
assert.equal(res.status, 201);
assert.deepEqual(await res.json(), { ok: true });
console.log('HTTP: 10 pages, form fallback, health proxy and real feedback write passed.');
