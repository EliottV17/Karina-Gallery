# Review the initial layout studies

These are static visual studies for stage 2, not the Next.js application. Open `gallery.html` or `info.html` in a browser. The pages share `style.css` and use local Manrope and the existing Cloudinary-derived photo previews.

## Review order

1. Gallery on desktop: two rows, equal photo height with natural variable widths, horizontally aligned stacks, and the unchanged header/bottom filter area.
2. Gallery on mobile: the same two-row horizontal composition at a smaller photo height, with bottom filters.
3. Gallery desktop hover: rear layers spread farther right without changing height or vertical alignment.
4. Info on desktop: biography and social links side by side, without an empty portrait placeholder.
5. Info on mobile: stacked biography and social links.

Verified screenshot outputs are `gallery-desktop.png`, `gallery-mobile.png`, `info-desktop.png`, and `info-mobile.png`. Desktop uses an exact 1440 × 900 viewport; mobile uses an exact 390 × 844 viewport. All four cases passed; automated capture evidence is recorded in `render-checks.json`. Gallery was revised to two rows; the parent reviewed both new Gallery images and `gallery-desktop-hover.png`. Info screenshots are byte-identical to the approved versions. Human acceptance of the revised photo composition and explicit authorization for stage 3 remain pending.

To regenerate the studies from the project root:

```sh
node design/render.mjs
```

The renderer requires Node.js and Chromium, both already available on this machine. It sets device metrics and captures the same target through a private CDP pipe, with the browser sandbox intact. Headless mouse capabilities use the Blink settings in upstream Playwright; per-target touch emulation is explicit. Desktop must report hover/fine-pointer support, and mobile must report a coarse pointer without hover. No Playwright dependency is installed.

`layout-check.mjs` inspects the rendered DOM: exactly two rows, equal photo heights, source aspect ratios, varying widths, aligned stacks, widest layers behind, and hover expansion without vertical movement. The renderer preserves footer/filter geometry and compares Info screenshots against the approved PNGs. Captures are only replaced after all checks pass. `gallery-desktop-hover.png` is an additional desktop hover study.

The renderer exits nonzero on a failed assertion or timeout and never automatically retries. The old layout produced the expected RED (exit 1); the first corrected-layout run exposed missing headless mouse capabilities. A diagnostic confirmed that cause, and the configuration fix produced GREEN (exit 0) for all four viewports and layout rules.

The initial combined `--dump-dom`/`--screenshot` check exited 1 because the reported mobile DOM viewport was 500 px wide while the assertion used the requested 390 px. This was a capture-harness mismatch, not demonstrated filter clipping. The corrected CDP renderer passed with exit 0. Initial logs and captures are preserved under `.pi/previews/`.

## Confirmed direction

- Kanagawa Lotus background and restrained text colors.
- Manrope as the single font family.
- Full-width horizontal header with balanced sections and subtle separators.
- Bottom integrated filters, not an overlay on photos.
- Two rows of equal-height photos with widths derived from source aspect ratios, without cropping or stretching. Desktop study height is 250 px; mobile study height is 220 px.
- Six provisional three-photo groups and seven individual photos, matching the 25 numbered sources in `PLAN.md` exactly once.
- Top row uses P01, P02, P05, P06, P09, P10, P13; bottom row uses P03, P04, P07, P08, P11, P12.
- Stacks share one top/bottom alignment; wider photos sit behind narrower ones. Rear layers move farther right on mouse hover or keyboard focus, without vertical staggering.
- No geographic labels until the author supplies verified locations.
- The eventual production gallery uses vertical input to drive horizontal movement on desktop and mobile; the header and filter bar remain still during the gallery journey.
- Info stacks vertically on mobile. The portrait remains optional and absent, without a visible empty block.

## Deliberately not implemented

The filter labels are static. The photo track shows the initial two-row composition only. A preliminary CSS stack hover/focus interaction is implemented; it does not replace the eventual application. There is no GSAP scroll, fullscreen viewer, filter action, or production `/info` route. These studies do not prove production touch scrolling, the final viewer's accessibility, or production image performance. Stage 3 has not started and requires explicit user confirmation.

The header phrase “Instantes de mi vida” remains provisional. Photo captions identify draft groups or numbered images, not final series titles. Viewports other than the captured sizes still need review during implementation.

`layout.js` arranges the visual study from decoded preview aspect ratios, separating photo references from layer depth and row placement. `check.js` waits for that arrangement and exposes hidden capture diagnostics through the rendered document: font loading, image loading, track item count, layout bounds, and mobile Info direction. It is not production code. Chromium stdout/stderr and isolated profiles are retained under `.pi/previews/`; no browser sandbox is disabled.

## Assets and scope

- Manrope source: https://github.com/google/fonts/tree/main/ofl/manrope
- Font license: `assets/OFL.txt` (SIL Open Font License 1.1).
- Photo previews: `../.pi/previews/karina-initial/01.jpg` through `25.jpg`. These are design inputs, not a production delivery pipeline.
- No dependencies installed and no Next.js scaffold created.
- Git currently resolves to the parent `/home/eliott/Projects` repository; no staging, commits, or repository initialization are performed as part of these studies.
