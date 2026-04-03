#!/usr/bin/env node
/**
 * Generates sw.js with full precache list from build output.
 * Run after `next build`.
 */

import { readdirSync, writeFileSync } from 'fs';
import { join, relative } from 'path';

const OUT_DIR = join(process.cwd(), 'out');
const SW_PATH = join(OUT_DIR, 'sw.js');
const BASE = '/usa-plan';

const EXTENSIONS = new Set(['.webp', '.woff2', '.js', '.css', '.html', '.json', '.png']);

function walk(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'images-original') continue;
      results.push(...walk(full));
    } else {
      const ext = entry.name.substring(entry.name.lastIndexOf('.'));
      if (EXTENSIONS.has(ext)) {
        results.push(BASE + '/' + relative(OUT_DIR, full));
      }
    }
  }
  return results;
}

const files = walk(OUT_DIR);
const version = 'usa-plan-v' + Date.now();

const sw = [
  "const CACHE_NAME = '" + version + "';",
  '',
  'const PRECACHE_URLS = ' + JSON.stringify(files, null, 2) + ';',
  '',
  '// Install: precache everything',
  'self.addEventListener("install", (event) => {',
  '  event.waitUntil(',
  '    caches.open(CACHE_NAME).then((cache) => {',
  '      console.log("[SW] Precaching", PRECACHE_URLS.length, "files");',
  '      return cache.addAll(PRECACHE_URLS);',
  '    })',
  '  );',
  '  self.skipWaiting();',
  '});',
  '',
  '// Activate: delete old caches',
  'self.addEventListener("activate", (event) => {',
  '  event.waitUntil(',
  '    caches.keys().then((keys) =>',
  '      Promise.all(',
  '        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))',
  '      )',
  '    )',
  '  );',
  '  self.clients.claim();',
  '});',
  '',
  '// Fetch: cache-first for everything',
  'self.addEventListener("fetch", (event) => {',
  '  const { request } = event;',
  '  if (request.method !== "GET") return;',
  '  if (new URL(request.url).origin !== self.location.origin) return;',
  '',
  '  event.respondWith(',
  '    caches.match(request).then(',
  '      (cached) =>',
  '        cached ||',
  '        fetch(request).then((response) => {',
  '          if (response.ok) {',
  '            const clone = response.clone();',
  '            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));',
  '          }',
  '          return response;',
  '        }).catch(() => caches.match("/usa-plan/"))',
  '    )',
  '  );',
  '});',
].join('\n');

writeFileSync(SW_PATH, sw);
console.log('Generated sw.js: ' + files.length + ' files to precache, version: ' + version);
