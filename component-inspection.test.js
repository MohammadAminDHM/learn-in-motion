const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');

const context = vm.createContext({});
context.document = { getElementById: () => ({ setAttribute() {} }) };
for (const file of ['course.js', 'expanded.js', 'scene-profiles.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, file), 'utf8'), context);
}
vm.runInContext(fs.readFileSync(path.join(__dirname, 'diagram.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'scene-special.js'), 'utf8'), context);
const describeComponent = (lesson, id) => context.componentDescription(lesson, id);

test('uses the identity of a component rather than its position', () => {
  assert.match(describeComponent('How a Request Travels', 'client'), /request/i);
  assert.match(describeComponent('How a Request Travels', 'db'), /database/i);
  assert.notEqual(describeComponent('How a Request Travels', 'client'), describeComponent('How a Request Travels', 'db'));
});

test('does not reuse descriptions for unknown lessons or components', () => {
  assert.equal(describeComponent('How a Request Travels', 'unknown'), 'No component-specific explanation is available for this lesson yet.');
  assert.equal(describeComponent('toString', 'client'), 'No component-specific explanation is available for this lesson yet.');
});

test('every lesson and inspectable component has an explanation', () => {
  const missing = vm.runInContext(`curriculum.flatMap((category, categoryIndex) => category.lessons.flatMap(lesson => {
    const special = lesson.title === 'Back-of-the-Envelope Math' ? ['users','app','cache','cdn'] :
      lesson.title === 'CI/CD & Deployments' ? ['laptop','ci','production','users'] : null;
    const nodes = special || (sceneProfileLayout(lesson) || diagramLayouts[categoryIndex]).nodes.map(node => node[0]);
    return nodes.filter(id => componentDescription(lesson.title, id).includes('No component-specific explanation')).map(id => lesson.title + ': ' + id);
  }))`, context);
  assert.deepEqual(Array.from(missing), []);
});

test('all actually rendered inspect targets are covered across steps and failure modes', () => {
  const missing = vm.runInContext(`curriculum.flatMap((category, categoryIndex) => category.lessons.flatMap(lesson => {
    const sceneLesson = {...lesson, category, categoryIndex, steps: Array(8).fill({})};
    const results = [];
    for (let step = 0; step < 8; step++) for (const failure of [false, true]) {
      const html = diagramMarkup(sceneLesson, step, failure, 2).html;
      for (const match of html.matchAll(/data-inspect="([^"]+)"/g)) {
        if (componentDescription(lesson.title, match[1]).includes('No component-specific explanation')) results.push(lesson.title + ': ' + match[1]);
      }
    }
    return results;
  }))`, context);
  assert.deepEqual(Array.from(missing), []);
});
