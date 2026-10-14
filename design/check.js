// Capture diagnostics for static design studies, not production behavior.
window.addEventListener("load", async () => {
  await window.galleryLayoutReady;
  await document.fonts.ready;
  const visibleRect = (selector) => {
    const element = document.querySelector(selector);
    if (!element) return null;
    const { x, y, width, height } = element.getBoundingClientRect();
    return { x, y, width, height };
  };
  const images = [...document.images];
  const report = {
    page: document.body.dataset.designPage,
    viewport: { width: window.innerWidth, height: window.innerHeight },
    fontLoaded: [...document.fonts].some((font) => font.family === "Manrope" && font.status === "loaded"),
    images: images.length,
    imagesLoaded: images.filter((image) => image.complete && image.naturalWidth > 0).length,
    slots: document.querySelectorAll(".photo-slot").length,
    bodyOverflow: document.documentElement.scrollWidth > window.innerWidth,
    footer: visibleRect("footer"),
    filters: visibleRect(".filters"),
    infoDirection: document.querySelector(".info-layout") ? getComputedStyle(document.querySelector(".info-layout")).flexDirection : null,
    network: visibleRect(".network"),
  };
  document.querySelector("#design-check").textContent = JSON.stringify(report);
});
