const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, 'step-announcement.js'), 'utf8'), context);

test('announces genuine step and lesson changes, not initial or repeated renders', () => {
  const region = { textContent: '' };
  const announce = context.createStepAnnouncer(region);
  announce('First lesson', 1, 8, 'Start');
  assert.equal(region.textContent, '');
  announce('First lesson', 2, 8, 'Route');
  assert.equal(region.textContent, 'First lesson. Step 2 of 8: Route');
  region.textContent = 'unchanged';
  announce('First lesson', 2, 8, 'Route');
  assert.equal(region.textContent, 'unchanged');
  announce('Second lesson', 1, 7, 'Begin');
  assert.equal(region.textContent, 'Second lesson. Step 1 of 7: Begin');
});

test('provides an initially empty polite live region', () => {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  assert.match(html, /id="stepAnnouncement"[^>]*aria-live="polite"[^>]*><\/div>/);
});
