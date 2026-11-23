const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('paused diagrams pause descendant CSS animations', () => {
  const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
  assert.match(css, /#diagram\.is-paused\s+\*\s*\{[^}]*animation-play-state\s*:\s*paused\s*!important/s);
});

test('pause toggle synchronizes the CSS pause state', () => {
  const app = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
  assert.match(app, /addEventListener\('click',\(\)=>\$\('diagram'\)\.classList\.toggle\('is-paused',paused\)\)/);
});
