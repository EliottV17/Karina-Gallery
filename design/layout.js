// Arrange the visual study from decoded photo proportions, without changing assets.
window.galleryLayoutReady = (async () => {
  const track = document.querySelector('.photo-track');
  if (!track) return;
  const slots = [...track.querySelectorAll('.photo-slot')];
  await Promise.all([...track.querySelectorAll('img')].map((image) => image.decode()));
  for (const slot of slots) {
    const images = [...slot.querySelectorAll('img')];
    const aspect = (image) => image.naturalWidth / image.naturalHeight;
    const byWidth = [...images].sort((a, b) => aspect(a) - aspect(b));
    slot.style.setProperty('--slot-ratio', Math.max(...images.map(aspect)));
    slot.style.setProperty('--layer-count', Math.max(0, images.length - 1));
    byWidth.forEach((image, depth) => {
      image.style.setProperty('--depth', depth);
      image.style.zIndex = String(images.length - depth);
    });
    const stack = slot.querySelector('.stack');
    if (stack) {
      stack.tabIndex = 0;
      stack.setAttribute('aria-label', `Vista previa de grupo provisional de ${images.length} fotos`);
    }
  }
  // Each row mixes groups and individual photos; source IDs remain unchanged.
  const rowPositions = [[0, 1, 4, 5, 8, 9, 12], [2, 3, 6, 7, 10, 11]];
  const rows = rowPositions.map((positions) => {
    const row = document.createElement('div');
    row.className = 'photo-row';
    positions.forEach((index) => row.append(slots[index]));
    return row;
  });
  track.replaceChildren(...rows);
})();
