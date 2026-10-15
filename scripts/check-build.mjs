
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const directory = new URL('../frontend/dist/', import.meta.url);

const base = '/aeust-life/';

const routes = [
  '',
  'explore',
  'events',
  'clubs',
  'hangouts',
  'food',
  'marketplace',
  'roadmap',
  'about',
  'feedback',
];

function localFileExists(link) {
  const pathname = decodeURIComponent(
    new URL(link, 'https://example.test').pathname
  );

  if (!pathname.startsWith(base)) {
    return false;
  }

  const relative = pathname.slice(base.length);

  if (!relative) {
    return existsSync(new URL('index.html', directory));
  }

  if (relative.split('/').includes('..')) {
    return false;
  }

  const candidates = [
    relative,
    `${relative.replace(/\/$/, '')}/index.html`,
    `${relative.replace(/\/$/, '')}.html`,
  ];

  return candidates.some((candidate) => {
    return existsSync(new URL(candidate, directory));
  });
}

for (const route of routes) {
  const page = new URL(
    route ? `${route}/index.html` : 'index.html',
    directory
  );

  assert.ok(
    existsSync(page),
    `Missing built page: /${route}`
  );

  const html = readFileSync(page, 'utf8');

  assert.match(html, /lang="zh-Hant-TW"/);
  assert.match(html, /<h1(?:\s|>)/);
  assert.match(html, /id="main"/);

  if (route === 'feedback') {
    assert.match(html, /<form[^>]*method="post"/);
    assert.match(
      html,
      /<button[^>]*id="feedback-submit"[^>]*disabled/
    );
  }

  // No inline executable JavaScript.
  for (const match of html.matchAll(
    /<script\b([^>]*)>([\s\S]*?)<\/script>/g
  )) {
    assert.ok(
      /\bsrc=/.test(match[1]) ||
      /type="application\/(ld\+)?json"/.test(match[1]),
      `Inline script on /${route} violates CSP`
    );
  }

  // No inline styles or event handlers.
  assert.ok(
    !/<style\b|\sstyle=|\son(?:click|load|error|submit)=/.test(html),
    `Inline CSS/handlers on /${route} violate CSP`
  );

  // Check root-relative links against GitHub Pages base.
  for (const match of html.matchAll(
    /(?:href|src)="(\/(?!\/)[^"#?]*)/g
  )) {
    const link = match[1];

    assert.ok(
      localFileExists(link),
      `Broken local URL ${link} on /${route}`
    );
  }
}

assert.ok(
  existsSync(new URL('_headers', directory)),
  'Missing _headers file'
);

console.log(
  `Built HTML verified: ${routes.length} routes, local links, CSP compatibility and landmarks.`
);

console.log(fileURLToPath(directory));
