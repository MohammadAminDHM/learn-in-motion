function isCourseSearchShortcut(event) {
  return !event.defaultPrevented && !event.isComposing && !event.altKey && !event.shiftKey &&
    Boolean(event.ctrlKey || event.metaKey) && !(event.ctrlKey && event.metaKey) &&
    event.key.toLowerCase() === 'k';
}

function shouldIgnoreShortcut(event) {
  if (event.defaultPrevented || event.isComposing ||
      event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) return true;

  const target = event.target;
  if (target?.isContentEditable) return true;
  return Boolean(target?.closest?.(
    'button, input, select, textarea, a[href], summary, audio[controls], video[controls], ' +
    '[contenteditable]:not([contenteditable="false"]), [role="button"], [role="link"], ' +
    '[role="slider"], [role="textbox"], [role="checkbox"], [role="radio"], ' +
    '[role="switch"], [role="combobox"], [role="listbox"], [role="menuitem"], ' +
    '[role="tab"], [role="option"], [tabindex]:not([tabindex="-1"])'
  ));
}
