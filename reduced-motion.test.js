const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, 'diagram.js'), 'utf8'), context);

test('SVG animation respects both user pause and reduced motion', () => {
  const calls = [];
  const diagram = {
    pauseAnimations: () => calls.push('pause'),
    unpauseAnimations: () => calls.push('play')
  };
  context.syncSvgMotion(diagram, false, true);
  context.syncSvgMotion(diagram, true, false);
  context.syncSvgMotion(diagram, false, false);
  assert.deepEqual(calls, ['pause', 'pause', 'play']);
});

test('reduced motion disables scene CSS animations and transitions', () => {
  const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
  assert.ok(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*?#scene\s+\*[\s\S]*?animation:\s*none\s*!important[\s\S]*?transition:\s*none\s*!important/.test(css));
});
