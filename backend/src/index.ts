import type { Env } from './types.ts';
import { validateFeedback } from '../../shared/feedback.ts';

const MAX_BODY_BYTES = 12 * 1024;
const failure = '暫時無法儲存回饋，請稍後再試。';

function response(status: number, body: unknown, origin: string | null = null, extra: Record<string, string> = {}) {
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
    'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
    'Vary': 'Origin',
    ...extra,
  });
  if (origin) headers.set('Access-Control-Allow-Origin', origin);
  return new Response(status === 204 ? null : JSON.stringify(body), { status, headers });
}

function securityEvent(event: string, status: number) {
  // Never log payloads, IP addresses, request headers or raw exceptions.
  console.warn(JSON.stringify({ event, status }));
}

async function readBody(request: Request): Promise<string | null> {
  const declared = request.headers.get('Content-Length');
  if (declared && (!/^\d+$/.test(declared) || Number(declared) > MAX_BODY_BYTES)) return null;
  if (!request.body) return '';
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) { await reader.cancel(); return null; }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const path = new URL(request.url).pathname;
    if (path === '/api/health') {
      return request.method === 'GET'
        ? response(200, { ok: true, service: 'aeust-life-api' })
        : response(405, { ok: false, message: '不支援此請求方式。' }, null, { Allow: 'GET' });
    }
    if (path !== '/api/feedback') return response(404, { ok: false, message: '找不到此端點。' });
    if (!['POST', 'OPTIONS'].includes(request.method)) return response(405, { ok: false, message: '不支援此請求方式。' }, null, { Allow: 'POST, OPTIONS' });

    const origin = request.headers.get('Origin');
    const allowed = (env.ALLOWED_ORIGINS ?? '').split(',').map(value => value.trim()).filter(Boolean);
    if (!origin || origin === 'null' || !allowed.includes(origin)) {
      securityEvent('origin_rejected', 403);
      return response(403, { ok: false, message: '請從 AEUST Life 網站送出回饋。' });
    }
    if (request.method === 'OPTIONS') {
      const method = request.headers.get('Access-Control-Request-Method');
      const headers = (request.headers.get('Access-Control-Request-Headers') ?? '').toLowerCase().split(',').map(value => value.trim()).filter(Boolean);
      if (method !== 'POST' || headers.some(header => header !== 'content-type')) return response(403, { ok: false }, origin);
      return response(204, null, origin, { 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '600' });
    }

    try {
      // Cloudflare overwrites this header at its edge. Local mode is loopback-only.
      const address = request.headers.get('CF-Connecting-IP') || (env.ENVIRONMENT === 'local' ? 'loopback' : null);
      if (!address || !env.FEEDBACK_LIMITER || !env.GLOBAL_LIMITER || !env.DB) {
        securityEvent('binding_or_address_unavailable', 503);
        return response(503, { ok: false, message: failure }, origin);
      }
      const perSource = await env.FEEDBACK_LIMITER.limit({ key: `feedback:${address}` });
      const global = perSource.success ? await env.GLOBAL_LIMITER.limit({ key: 'feedback:all' }) : { success: false };
      if (!perSource.success || !global.success) {
        securityEvent('rate_limited', 429);
        return response(429, { ok: false, message: '送得有點快，請至少等一分鐘再試。' }, origin, { 'Retry-After': '60' });
      }
      if (request.headers.get('Content-Type')?.split(';')[0]?.trim().toLowerCase() !== 'application/json') {
        return response(415, { ok: false, message: '請使用 JSON 格式送出。' }, origin);
      }
      let payload: unknown;
      try {
        const body = await readBody(request);
        if (body === null) return response(413, { ok: false, message: '內容太大，請縮短後再試。' }, origin);
        payload = JSON.parse(body);
      } catch {
        return response(400, { ok: false, message: '回饋格式不正確。' }, origin);
      }
      const validation = validateFeedback(payload);
      if (!validation.ok) return response(400, { ok: false, message: validation.message }, origin);
      const result = await env.DB.prepare('INSERT INTO feedback (id, type, content) VALUES (?, ?, ?)')
        .bind(crypto.randomUUID(), validation.value.type, validation.value.content).run();
      if (!result.success) throw new Error('write_failed');
      return response(201, { ok: true }, origin);
    } catch {
      securityEvent('feedback_service_unavailable', 503);
      return response(503, { ok: false, message: failure }, origin);
    }
  },
};
