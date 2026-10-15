import { test } from 'node:test';
import assert from 'node:assert/strict';
import { submitFeedback } from '../frontend/src/scripts/submit-feedback.ts';
const input = { type: 'idea', content: '希望未來可以找到跨系活動資訊。', website: '' } as const;
test('accepts only an explicit 201 with ok true', async () => {
  assert.equal((await submitFeedback(input, async () => Response.json({ ok: true }, { status: 201 }))).ok, true);
  for (const response of [new Response('<html>proxy error</html>'), Response.json({ ok: false }, { status: 201 }), Response.json({ ok: true }), new Response(null, { status: 204 })]) {
    assert.equal((await submitFeedback(input, async () => response)).ok, false);
  }
});
test('reports offline, rate limiting and service errors without leaking responses', async () => {
  for (const status of [400, 403, 429, 503]) {
    const result = await submitFeedback(input, async () => new Response('SECRET', { status }));
    assert.equal(result.ok, false);
    assert.equal(result.message.includes('SECRET'), false);
  }
  assert.equal((await submitFeedback(input, async () => { throw new TypeError('offline'); })).ok, false);
});
test('invalid form content never reaches the API', async () => {
  let calls = 0;
  const result = await submitFeedback({ ...input, content: '短' }, async () => { calls++; return Response.json({ ok: true }, { status: 201 }); });
  assert.equal(result.ok, false);
  assert.equal(calls, 0);
});

test('slow request is aborted after 12 seconds and never reported as successful', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  let aborted = false;
  const pending = submitFeedback(input, async (_url, options) => new Promise((_resolve, reject) => {
    options?.signal?.addEventListener('abort', () => { aborted = true; reject(new Error('aborted')); });
  }));
  t.mock.timers.tick(12_000);
  assert.equal((await pending).ok, false);
  assert.equal(aborted, true);
  t.mock.timers.reset();
});
