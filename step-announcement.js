function createStepAnnouncer(region) {
  let previous = null;
  return (lesson, step, total, title) => {
    const key = JSON.stringify([lesson, step]);
    if (previous !== null && key !== previous) {
      region.textContent = `${lesson}. Step ${step} of ${total}: ${title}`;
    }
    previous = key;
  };
}
