const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('light palette is explicitly applied when dark mode is off', () => {
  const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
  assert.ok(/body:not\(\.dark\)\s*\{[^}]*--bg:\s*#f/i.test(css));
  assert.ok(/body:not\(\.dark\)\s+\.scene\s*\{[^}]*background:/i.test(css));
});
