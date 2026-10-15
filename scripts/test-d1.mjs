import { spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../', import.meta.url));
const backend = path.join(root, 'backend');
const wrangler = path.join(backend, 'tooling/node_modules/wrangler/bin/wrangler.js');
mkdirSync(path.join(root, '.local'), { recursive: true });
const state = mkdtempSync(path.join(root, '.local/d1-test-'));
const persist = path.join(state, 'state');
async function run(args) {
  return await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [wrangler, ...args], { cwd: backend, windowsHide: true, env: { ...process.env, WRANGLER_SEND_METRICS: 'false', CI: 'true' } });
    let output = '';
    child.stdout.on('data', data => { output += data; });
    child.stderr.on('data', data => { output += data; });
    child.on('error', reject);
    child.on('exit', code => code === 0 ? resolve(output) : reject(new Error(output)));
  });
}
await run(['d1', 'migrations', 'apply', 'aeust-life-local', '--local', '--persist-to', persist]);
await run(['d1', 'migrations', 'apply', 'aeust-life-local', '--local', '--persist-to', persist]);
const sqlFile = path.join(state, 'check.sql');
writeFileSync(sqlFile, "INSERT INTO feedback (id,type,content) VALUES ('d1-verification','idea','本機 D1 migration 整合測試'); SELECT count(*) AS total FROM feedback;\n", 'utf8');
const output = await run(['d1', 'execute', 'aeust-life-local', '--local', '--persist-to', persist, '--file', sqlFile, '--json']);
const data = JSON.parse(output);
assert.equal(data.at(-1)?.results?.[0]?.total, 1);
console.log('D1 local migration, reapplication and SQL persistence passed. Isolated state:', state);
