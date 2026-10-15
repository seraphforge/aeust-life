import { createServer } from 'node:http';
import { Readable } from 'node:stream';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import worker from '../backend/src/index.ts';
import { openLocalDatabase, localLimiter } from './sqlite-adapter.ts';
import type { Env } from '../backend/src/types.ts';

const localDirectory = new URL('../.local/', import.meta.url);
mkdirSync(localDirectory, { recursive: true });
const { db, sqlite } = openLocalDatabase(fileURLToPath(new URL('feedback.sqlite', localDirectory)));
const env: Env = {
  DB: db,
  ENVIRONMENT: 'local',
  ALLOWED_ORIGINS: 'http://localhost:4321,http://127.0.0.1:4321',
  FEEDBACK_LIMITER: localLimiter(5),
  GLOBAL_LIMITER: localLimiter(60),
};

const server = createServer(async (incoming, outgoing) => {
  try {
    const headers = new Headers();
    for (const [name, value] of Object.entries(incoming.headers)) {
      if (value !== undefined) headers.set(name, Array.isArray(value) ? value.join(',') : value);
    }
    // Never trust a client-supplied Cloudflare header in this Node-only adapter.
    headers.set('CF-Connecting-IP', '127.0.0.1');
    const method = incoming.method ?? 'GET';
    const init: RequestInit & { duplex: 'half' } = { method, headers, duplex: 'half' };
    if (method !== 'GET' && method !== 'HEAD') init.body = Readable.toWeb(incoming) as ReadableStream<Uint8Array>;
    const request = new Request(new URL(incoming.url ?? '/', 'http://127.0.0.1:8787'), init);
    const result = await worker.fetch(request, env);
    outgoing.writeHead(result.status, Object.fromEntries(result.headers));
    outgoing.end(Buffer.from(await result.arrayBuffer()));
  } catch {
    outgoing.writeHead(500, { 'Content-Type': 'application/json', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-store' });
    outgoing.end(JSON.stringify({ ok: false, message: '本機服務暫時無法處理請求。' }));
  }
});
server.requestTimeout = 15_000;
server.headersTimeout = 10_000;
server.listen(8787, '127.0.0.1', () => {
  console.log('SQLite development API: http://127.0.0.1:8787');
  console.log('Real local storage in .local/feedback.sqlite. This is NOT Cloudflare D1.');
});
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => server.close(() => { sqlite.close(); process.exit(0); }));
}
