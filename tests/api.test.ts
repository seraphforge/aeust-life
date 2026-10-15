import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../backend/src/index.ts';
import { openLocalDatabase, localLimiter } from '../scripts/sqlite-adapter.ts';
import type { Env } from '../backend/src/types.ts';

const origin = 'http://localhost:4321';
const good = { type: 'idea', content: '希望未來可以找到跨系活動資訊。', website: '' };
function setup() {
  const local = openLocalDatabase();
  const env: Env = { DB: local.db, ENVIRONMENT: 'local', ALLOWED_ORIGINS: origin, FEEDBACK_LIMITER: localLimiter(5), GLOBAL_LIMITER: localLimiter(60) };
  return { ...local, env };
}
function request(body: unknown = good, headers: Record<string, string> = {}) {
  return new Request('http://localhost:8787/api/feedback', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });
}
test('health is public, contains no binding details, has security headers', async () => {
  const { env, sqlite } = setup();
  try {
    const res = await worker.fetch(new Request('http://localhost/api/health'), env);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { ok: true, service: 'aeust-life-api' });
    assert.equal(res.headers.get('X-Content-Type-Options'), 'nosniff');
    assert.equal(res.headers.get('Cache-Control'), 'no-store');
  } finally { sqlite.close(); }
});
test('valid feedback persists via prepared SQL without returning its contents', async () => {
  const { env, sqlite } = setup();
  try {
    const content = "<script>alert(1)</script>'; DROP TABLE feedback; --";
    const res = await worker.fetch(request({ ...good, content }), env);
    assert.equal(res.status, 201);
    assert.deepEqual(await res.json(), { ok: true });
    assert.equal(res.headers.get('Access-Control-Allow-Origin'), origin);
    const row = sqlite.prepare('SELECT * FROM feedback').get();
    assert.equal(row?.content, content);
    assert.equal(row?.type, 'idea');
    assert.match(String(row?.id), /^[0-9a-f-]{36}$/);
    assert.match(String(row?.created_at), /^\d{4}-\d{2}-\d{2}T/);
    assert.equal(Object.keys(row!).length, 4);
  } finally { sqlite.close(); }
});
test('denies missing or hostile origins, no read endpoint and method restrictions', async () => {
  const { env, sqlite } = setup();
  try {
    for (const evil of ['', 'null', 'https://evil.example', origin + '.evil.example']) {
      const res = await worker.fetch(request(good, { Origin: evil }), env);
      assert.equal(res.status, 403);
      assert.equal(res.headers.get('Access-Control-Allow-Origin'), null);
    }
    assert.equal((await worker.fetch(new Request('http://localhost/api/feedback'), env)).status, 405);
    assert.equal((await worker.fetch(new Request('http://localhost/api/unknown'), env)).status, 404);
  } finally { sqlite.close(); }
});
test('preflight only permits POST and Content-Type from an allowed origin', async () => {
  const { env, sqlite } = setup();
  try {
    const options = (method: string, headers = 'content-type') => new Request('http://localhost/api/feedback', { method: 'OPTIONS', headers: { Origin: origin, 'Access-Control-Request-Method': method, 'Access-Control-Request-Headers': headers } });
    const res = await worker.fetch(options('POST'), env);
    assert.equal(res.status, 204);
    assert.equal(res.headers.get('Access-Control-Allow-Methods'), 'POST');
    assert.equal((await worker.fetch(options('DELETE'), env)).status, 403);
    assert.equal((await worker.fetch(options('POST', 'authorization'), env)).status, 403);
  } finally { sqlite.close(); }
});
test('invalid payloads and content types do not insert rows', async () => {
  const { env, sqlite } = setup();
  try {
    assert.equal((await worker.fetch(request(good, { 'Content-Type': 'text/plain' }), env)).status, 415);
    assert.equal((await worker.fetch(request({ ...good, content: '短' }), env)).status, 400);
    assert.equal((await worker.fetch(request({ ...good, website: 'spam' }), env)).status, 400);
    const malformed = new Request('http://localhost/api/feedback', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: '{' });
    assert.equal((await worker.fetch(malformed, env)).status, 400);
    assert.equal(sqlite.prepare('SELECT count(*) AS n FROM feedback').get()?.n, 0);
  } finally { sqlite.close(); }
});
test('limits request bytes even without Content-Length and rejects declared oversize', async () => {
  const { env, sqlite } = setup();
  try {
    assert.equal((await worker.fetch(request({ ...good, content: 'a'.repeat(13000) }), env)).status, 413);
    assert.equal((await worker.fetch(request(good, { 'Content-Length': '13000' }), env)).status, 413);
  } finally { sqlite.close(); }
});
test('sixth request is rate limited and not written', async () => {
  const { env, sqlite } = setup();
  try {
    for (let i = 0; i < 5; i++) assert.equal((await worker.fetch(request(), env)).status, 201);
    const res = await worker.fetch(request(), env);
    assert.equal(res.status, 429);
    assert.equal(res.headers.get('Retry-After'), '60');
    assert.equal(sqlite.prepare('SELECT count(*) AS n FROM feedback').get()?.n, 5);
  } finally { sqlite.close(); }
});
test('production fails closed without a trusted Cloudflare IP or limiter', async () => {
  const { env, sqlite } = setup();
  try {
    env.ENVIRONMENT = 'production';
    assert.equal((await worker.fetch(request(), env)).status, 503);
    const missing = { ...env, FEEDBACK_LIMITER: undefined } as unknown as Env;
    assert.equal((await worker.fetch(request(good, { 'CF-Connecting-IP': '192.0.2.1' }), missing)).status, 503);
  } finally { sqlite.close(); }
});
test('database and limiter failures produce safe errors, never false success', async () => {
  const { env, sqlite } = setup();
  try {
    const broken = { ...env, DB: { prepare() { throw new Error('SECRET_DATABASE_DETAIL'); } } };
    const res = await worker.fetch(request(), broken);
    assert.equal(res.status, 503);
    assert.equal((await res.text()).includes('SECRET_DATABASE_DETAIL'), false);
    env.GLOBAL_LIMITER = { async limit() { throw new Error('SECRET_LIMITER_DETAIL'); } };
    const limited = await worker.fetch(request(), env);
    assert.equal(limited.status, 503);
    assert.equal((await limited.text()).includes('SECRET_LIMITER_DETAIL'), false);
  } finally { sqlite.close(); }
});
test('local limiter resets after window and separates keys', async () => {
  let now = 0;
  const limit = localLimiter(1, 60_000, () => now);
  assert.equal((await limit.limit({ key: 'a' })).success, true);
  assert.equal((await limit.limit({ key: 'a' })).success, false);
  assert.equal((await limit.limit({ key: 'b' })).success, true);
  now = 60_000;
  assert.equal((await limit.limit({ key: 'a' })).success, true);
});

test('aggregate limiter rejection prevents database writes', async () => {
  const { env, sqlite } = setup();
  try {
    env.GLOBAL_LIMITER = { async limit() { return { success: false }; } };
    assert.equal((await worker.fetch(request(), env)).status, 429);
    assert.equal(sqlite.prepare('SELECT count(*) AS n FROM feedback').get()?.n, 0);
  } finally { sqlite.close(); }
});

test('unsuccessful D1 result does not report success', async () => {
  const { env, sqlite } = setup();
  try {
    env.DB = { prepare() { return { bind() { return this; }, async run() { return { success: false }; } }; } };
    assert.equal((await worker.fetch(request(), env)).status, 503);
  } finally { sqlite.close(); }
});

test('streamed oversize bodies are cancelled and invalid UTF-8 is rejected', async () => {
  const { env, sqlite } = setup();
  try {
    let cancelled = false;
    const stream = new ReadableStream({
      pull(controller) { controller.enqueue(new Uint8Array(4096).fill(97)); },
      cancel() { cancelled = true; },
    });
    const init: RequestInit & { duplex: 'half' } = { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: stream, duplex: 'half' };
    assert.equal((await worker.fetch(new Request('http://localhost/api/feedback', init), env)).status, 413);
    assert.equal(cancelled, true);
    const invalid = new Request('http://localhost/api/feedback', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: new Uint8Array([0xff, 0xfe]) });
    assert.equal((await worker.fetch(invalid, env)).status, 400);
    assert.equal(sqlite.prepare('SELECT count(*) AS n FROM feedback').get()?.n, 0);
  } finally { sqlite.close(); }
});

test('valid production request with edge IP succeeds', async () => {
  const { env, sqlite } = setup();
  try {
    env.ENVIRONMENT = 'production';
    assert.equal((await worker.fetch(request(good, { 'CF-Connecting-IP': '192.0.2.10' }), env)).status, 201);
  } finally { sqlite.close(); }
});
