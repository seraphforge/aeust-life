import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import type { FeedbackDatabase, RateLimiter } from '../backend/src/types.ts';

// Development/test only. This is real SQLite, not a Cloudflare D1 runtime.
export function openLocalDatabase(filename = ':memory:') {
  const sqlite = new DatabaseSync(filename);
  sqlite.exec('PRAGMA foreign_keys = ON');
  sqlite.exec(readFileSync(new URL('../database/migrations/0001_feedback.sql', import.meta.url), 'utf8'));
  const db: FeedbackDatabase = {
    prepare(sql) {
      const statement = sqlite.prepare(sql);
      let parameters: (string | number | null)[] = [];
      return {
        bind(...values) { parameters = values; return this; },
        async run() { statement.run(...parameters); return { success: true }; },
      };
    },
  };
  return { sqlite, db };
}

// Fixed-window, process-local limiter for offline development only.
export function localLimiter(max: number, period = 60_000, clock = Date.now): RateLimiter {
  const buckets = new Map<string, { count: number; expires: number }>();
  return {
    async limit({ key }) {
      const now = clock();
      for (const [entry, bucket] of buckets) if (bucket.expires <= now) buckets.delete(entry);
      const bucket = buckets.get(key) ?? { count: 0, expires: now + period };
      bucket.count += 1;
      buckets.set(key, bucket);
      return { success: bucket.count <= max };
    },
  };
}
