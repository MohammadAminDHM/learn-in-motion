const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');

const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname, 'diagram.js'), 'utf8'), context);

test('frames sparse early scenes around their visible nodes', () => {
  const frame = vm.runInContext("diagramViewBox({nodes:[['client',120,286]],layout:{kind:'journey'}},0,false)", context);
  const [x, y, width, height] = frame.split(' ').map(Number);
  assert.ok(width < 1000);
  assert.ok(x < 120 && x + width > 120);
  assert.ok(y < 286 && y + height > 286);
});

test('preserves the full canvas for decorated, special and failure scenes', () => {
  for (const expression of [
    "diagramViewBox({nodes:[['a',120,286]],layout:{kind:'journey'}},2,false)",
    "diagramViewBox({nodes:[],layout:{kind:'math'}},0,false)",
    "diagramViewBox({nodes:[['a',120,286]],layout:{kind:'journey'}},0,true)"
  ]) assert.equal(vm.runInContext(expression, context), '0 0 1000 500');
});
