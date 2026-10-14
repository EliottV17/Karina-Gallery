// Browser-observed assertions for the revised visual study, not application internals.
export function inspectGallery() {
  const rect = (element) => {
    const r = element.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  };
  return {
    rows: [...document.querySelectorAll('.photo-row')].map(rect),
    groups: [...document.querySelectorAll('.photo-slot')].map((slot) => ({
      stacked: !!slot.querySelector('.stack'),
      slot: rect(slot),
      images: [...slot.querySelectorAll('img')].map((image) => ({
        ...rect(image),
        aspect: image.naturalWidth / image.naturalHeight,
        layer: Number(getComputedStyle(image).zIndex) || 0,
      })),
    })),
  };
}

export function galleryViolations(before, after, desktop) {
  const errors = [];
  const all = before.groups.flatMap((group) => group.images);
  if (before.rows.length !== 2) errors.push('two rows: expected exactly two photo rows');
  if (!all.length || all.some((image) => Math.abs(image.height - all[0].height) > 1)) {
    errors.push('uniform height: all 25 photos must have the same rendered height');
  }
  if (all.some((image) => Math.abs(image.width / image.height - image.aspect) > 0.01)) {
    errors.push('natural widths: rendered aspect ratios must match source photos without crop/stretch');
  }
  const widths = all.map((image) => Math.round(image.width));
  if (new Set(widths).size < 3) errors.push('natural widths: widths must vary with photo proportions');
  const stacks = before.groups.filter((group) => group.stacked);
  if (stacks.some((group) => group.images.some((image) => Math.abs(image.y - group.images[0].y) > 1))) {
    errors.push('aligned stacks: every image in a stack must share the same top and height');
  }
  if (stacks.some((group) => {
    const layers = [...group.images].sort((a, b) => b.layer - a.layer);
    return layers.some((image, index) => index > 0 && image.width + 1 < layers[index - 1].width);
  })) errors.push('wide images behind: widths must increase from foreground to background');
  if (desktop && before.groups.length && after) {
    const rest = before.groups[0].images;
    const hovered = after.groups[0].images;
    if (!rest.some((image, index) => hovered[index].x > image.x + 4)) {
      errors.push('hover expansion: rear photos must move farther right');
    }
    if (rest.some((image, index) => Math.abs(hovered[index].y - image.y) > 1 || Math.abs(hovered[index].height - image.height) > 1)) {
      errors.push('hover alignment: expansion must preserve image height and vertical alignment');
    }
  }
  return errors;
}
