const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, 'keyboard-shortcuts.js'), 'utf8'), context);

function event(target, extra = {}) {
  return { target, defaultPrevented: false, isComposing: false, ...extra };
}

test('leaves shortcuts to native or custom interactive controls', () => {
  const control = { isContentEditable: false, closest: () => ({}) };
  assert.equal(context.shouldIgnoreShortcut(event(control)), true);
  assert.equal(context.shouldIgnoreShortcut(event({ isContentEditable: true, closest: () => null })), true);
});

test('leaves modified, handled, and composition events alone', () => {
  const page = { isContentEditable: false, closest: () => null };
  for (const extra of [{ ctrlKey: true }, { altKey: true }, { metaKey: true }, { shiftKey: true }, { defaultPrevented: true }, { isComposing: true }]) {
    assert.equal(context.shouldIgnoreShortcut(event(page, extra)), true);
  }
  assert.equal(context.shouldIgnoreShortcut(event(page)), false);
});

test('recognizes only unambiguous course search shortcuts', () => {
  const page = { closest: () => null };
  assert.equal(context.isCourseSearchShortcut(event(page, { key: 'k', ctrlKey: true })), true);
  assert.equal(context.isCourseSearchShortcut(event(page, { key: 'K', metaKey: true })), true);
  for (const extra of [
    { key: 'k' }, { key: 'k', ctrlKey: true, shiftKey: true },
    { key: 'k', ctrlKey: true, altKey: true }, { key: 'k', ctrlKey: true, isComposing: true },
    { key: 'k', ctrlKey: true, defaultPrevented: true }
  ]) assert.equal(context.isCourseSearchShortcut(event(page, extra)), false);
});
