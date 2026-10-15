import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { openLocalDatabase } from '../scripts/sqlite-adapter.ts';

test('migration is repeatable and enforces allowed types and length', () => {
  const { sqlite } = openLocalDatabase();
  try {
    sqlite.exec(readFileSync(new URL('../database/migrations/0001_feedback.sql', import.meta.url), 'utf8'));
    const insert = sqlite.prepare('INSERT INTO feedback (id, type, content) VALUES (?, ?, ?)');
    assert.throws(() => insert.run('x', 'admin', 'a'.repeat(20)));
    assert.throws(() => insert.run('x', 'idea', 'short'));
    assert.throws(() => insert.run('x', 'idea', 'a'.repeat(2001)));
    insert.run('valid', 'idea', '🙂'.repeat(2000));
    assert.throws(() => insert.run('valid', 'idea', 'a'.repeat(10)));
    assert.equal(sqlite.prepare('SELECT count(*) AS n FROM feedback').get()?.n, 1);
  } finally { sqlite.close(); }
});
