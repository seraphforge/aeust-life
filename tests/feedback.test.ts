import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateFeedback } from '../shared/feedback.ts';

const good = { type: 'idea', content: '希望能找到更多跨系交流的機會。', website: '' };
test('valid input is trimmed and accepted', () => {
  assert.deepEqual(validateFeedback({ ...good, content: `  ${good.content}  ` }), { ok: true, value: good });
});
test('10 and 2000 Unicode code points are accepted', () => {
  for (const length of [10, 2000]) assert.equal(validateFeedback({ ...good, content: '🙂'.repeat(length) }).ok, true);
});
test('rejects invalid types, missing fields, unknown fields and honeypots', () => {
  for (const input of [null, [], 'text', {}, { ...good, type: 'admin' }, { ...good, email: 'private' }, { ...good, website: 'spam' }, { type: 'idea', content: good.content }, { ...good, content: 100 }]) {
    assert.equal(validateFeedback(input).ok, false);
  }
});
test('rejects blank, short, long, control and malformed Unicode content', () => {
  for (const content of [' '.repeat(30), '短', 'a'.repeat(9), 'a'.repeat(2001), '🙂'.repeat(2001), 'abc\0defghijk', 'abc\ud800defghijk']) {
    assert.equal(validateFeedback({ ...good, content }).ok, false);
  }
});
test('content remains plain text including markup and SQL metacharacters', () => {
  const content = "<script>alert('hello')</script>'; DROP TABLE feedback; --";
  assert.deepEqual(validateFeedback({ ...good, content }), { ok: true, value: { ...good, content } });
});
