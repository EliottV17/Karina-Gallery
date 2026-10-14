// Render static studies through one CDP target per viewport, with sandbox intact.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, writeFile, copyFile, readFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { inspectGallery, galleryViolations } from "./layout-check.mjs";

const design = dirname(fileURLToPath(import.meta.url));
const previews = resolve(design, "../.pi/previews");
await mkdir(previews, { recursive: true });
const browser = spawn("chromium", [
  "--headless", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
  "--disable-background-networking", "--disable-component-update", "--disable-sync",
  "--hide-scrollbars", "--remote-debugging-pipe",
  // Match upstream Playwright's headless mouse capabilities; keep the sandbox enabled.
  "--blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4",
  `--user-data-dir=${resolve(previews, "chromium-design-cdp")}`,
], { stdio: ["ignore", "pipe", "pipe", "pipe", "pipe"] });
const stdoutLog = createWriteStream(resolve(previews, "render-cdp.stdout.log"));
const stderrLog = createWriteStream(resolve(previews, "render-cdp.stderr.log"));
browser.stdout.pipe(stdoutLog);
browser.stderr.pipe(stderrLog);
let sequence = 0;
let buffer = Buffer.alloc(0);
const requests = new Map();
const listeners = new Set();
const reports = [];
const violations = [];
const captures = [];
const previousReports = JSON.parse(await readFile(resolve(design, "render-checks.json"), "utf8"));

function send(method, params = {}, sessionId) {
  return new Promise((resolveRequest, reject) => {
    const id = ++sequence;
    const timeout = setTimeout(() => {
      requests.delete(id);
      reject(new Error(`CDP timeout: ${method}; no retry`));
    }, 10000);
    requests.set(id, { resolve: resolveRequest, reject, timeout });
    browser.stdio[3].write(`${JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) })}\0`);
  });
}
function nextEvent(method, sessionId) {
  return new Promise((resolveEvent, reject) => {
    const entry = { method, sessionId, resolve: resolveEvent, timeout: null };
    entry.timeout = setTimeout(() => {
      listeners.delete(entry);
      reject(new Error(`CDP event timeout: ${method}; no retry`));
    }, 10000);
    listeners.add(entry);
  });
}
browser.stdio[4].on("data", (chunk) => {
  buffer = Buffer.concat([buffer, chunk]);
  let delimiter;
  while ((delimiter = buffer.indexOf(0)) !== -1) {
    const raw = buffer.subarray(0, delimiter).toString();
    buffer = buffer.subarray(delimiter + 1);
    if (!raw) continue;
    const message = JSON.parse(raw);
    if (message.id && requests.has(message.id)) {
      const request = requests.get(message.id);
      requests.delete(message.id);
      clearTimeout(request.timeout);
      if (message.error) request.reject(new Error(JSON.stringify(message.error)));
      else request.resolve(message.result);
    }
    for (const entry of listeners) {
      if (entry.method === message.method && entry.sessionId === message.sessionId) {
        listeners.delete(entry);
        clearTimeout(entry.timeout);
        entry.resolve(message.params);
      }
    }
  }
});
browser.on("error", (error) => {
  for (const request of requests.values()) {
    clearTimeout(request.timeout);
    request.reject(error);
  }
  requests.clear();
});

try {
  await send("Browser.getVersion");
  for (const [page, device, width, height] of [
    ["gallery", "desktop", 1440, 900], ["gallery", "mobile", 390, 844],
    ["info", "desktop", 1440, 900], ["info", "mobile", 390, 844],
  ]) {
    const name = `${page}-${device}`;
    const { targetId } = await send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
    await send("Page.enable", {}, sessionId);
    await send("Emulation.setDeviceMetricsOverride", {
      width, height, deviceScaleFactor: 1, mobile: device === "mobile",
    }, sessionId);
    await send("Emulation.setTouchEmulationEnabled", {
      enabled: device === "mobile", maxTouchPoints: 1,
    }, sessionId);
    const loaded = nextEvent("Page.loadEventFired", sessionId);
    const navigation = await send("Page.navigate", {
      url: pathToFileURL(resolve(design, `${page}.html`)).href,
    }, sessionId);
    assert(!navigation.errorText, `${name}: ${navigation.errorText}`);
    await loaded;
    const evaluation = await send("Runtime.evaluate", {
      expression: `(async () => {
        await window.galleryLayoutReady;
        await document.fonts.ready;
        await Promise.all([...document.images].map(image => image.decode()));
        return JSON.parse(document.querySelector('#design-check').textContent);
      })()`,
      awaitPromise: true, returnByValue: true,
    }, sessionId);
    assert(!evaluation.exceptionDetails, JSON.stringify(evaluation.exceptionDetails));
    const report = evaluation.result.value;
    assert.deepEqual(report.viewport, { width, height }, `${name}: viewport mismatch`);
    assert(report.fontLoaded, `${name}: Manrope not loaded`);
    assert(!report.bodyOverflow, `${name}: unintended body overflow`);
    assert(report.footer.y >= 0 && report.footer.y + report.footer.height <= height + 1, `${name}: footer outside viewport`);
    if (page === "gallery") {
      assert.equal(report.images, 25);
      assert.equal(report.imagesLoaded, 25);
      assert.equal(report.slots, 13);
      const filters = report.filters;
      assert(filters.x >= 0 && filters.x + filters.width <= width, `${name}: filters clipped`);
      assert(filters.y + filters.height <= height, `${name}: filters below viewport`);
      const capabilities = await send("Runtime.evaluate", {
        expression: `({ hover: matchMedia('(hover: hover)').matches, fine: matchMedia('(pointer: fine)').matches, coarse: matchMedia('(pointer: coarse)').matches })`,
        returnByValue: true,
      }, sessionId);
      report.input = capabilities.result.value;
      assert.equal(report.input.hover, device === "desktop", `${name}: wrong hover capabilities`);
      assert.equal(report.input.fine, device === "desktop", `${name}: wrong pointer capabilities`);
      if (device === "mobile") assert(report.input.coarse, `${name}: missing touch capabilities`);
      const previous = previousReports.find((item) => item.case === name);
      assert.deepEqual(report.footer, previous.footer, `${name}: approved footer geometry changed`);
      assert.deepEqual(report.filters, previous.filters, `${name}: approved filter geometry changed`);
      const observed = await send("Runtime.evaluate", {
        expression: `(${inspectGallery.toString()})()`, returnByValue: true,
      }, sessionId);
      const before = observed.result.value;
      let after = null;
      if (device === "desktop") {
        const first = before.groups[0].images[0];
        await send("Input.dispatchMouseEvent", {
          type: "mouseMoved", x: first.x + 10, y: first.y + 10,
        }, sessionId);
        const hovered = await send("Runtime.evaluate", {
          expression: `(async () => {
            getComputedStyle(document.querySelector('.stack img')).left;
            await Promise.all(document.getAnimations().map(animation => animation.finished));
            return (${inspectGallery.toString()})();
          })()`, awaitPromise: true, returnByValue: true,
        }, sessionId);
        assert(!hovered.exceptionDetails, JSON.stringify(hovered.exceptionDetails));
        after = hovered.result.value;
        const hoverCapture = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false }, sessionId);
        captures.push({ name: "gallery-desktop-hover", png: Buffer.from(hoverCapture.data, "base64") });
        await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 1, y: 1 }, sessionId);
        await send("Runtime.evaluate", {
          expression: `(async () => {
            getComputedStyle(document.querySelector('.stack img')).left;
            await Promise.all(document.getAnimations().map(animation => animation.finished));
          })()`, awaitPromise: true,
        }, sessionId);
      }
      const errors = galleryViolations(before, after, device === "desktop");
      for (const error of errors) {
        violations.push(`${name}: ${error}`);
        console.error(`FAIL ${name}: ${error}`);
      }
      report.layout = before;
      report.hover = after;
    } else if (device === "mobile") {
      assert.equal(report.infoDirection, "column");
      assert(report.network.y + report.network.height <= report.footer.y, `${name}: networks overlap footer`);
    }
    const capture = await send("Page.captureScreenshot", {
      format: "png", captureBeyondViewport: false,
    }, sessionId);
    const png = Buffer.from(capture.data, "base64");
    assert.equal(png.readUInt32BE(16), width);
    assert.equal(png.readUInt32BE(20), height);
    if (page === "info") {
      const approved = await readFile(resolve(design, `${name}.png`));
      assert.deepEqual(png, approved, `${name}: approved Info rendering changed`);
    }
    captures.push({ name, png });
    reports.push({ case: name, ...report });
    console.log(`PASS ${name}: exact ${width}x${height}; Manrope loaded; baseline image/chrome checks passed`);
    await send("Target.closeTarget", { targetId });
  }
  assert.equal(violations.length, 0, violations.join("\n"));
  for (const { name, png } of captures) {
    const destination = resolve(design, `${name}.png`);
    try { await copyFile(destination, resolve(previews, `${name}-before-two-rows.png`)); }
    catch (error) { if (error.code !== "ENOENT") throw error; }
    await writeFile(destination, png);
  }
  await writeFile(resolve(design, "render-checks.json"), `${JSON.stringify(reports, null, 2)}\n`);
  console.log("PASS: two rows, proportional widths, aligned layers and hover verified; Info snapshots unchanged. Production scroll/filter/viewer are not implemented or tested.");
} catch (error) {
  console.error(error.stack);
  process.exitCode = 1;
} finally {
  for (const request of requests.values()) clearTimeout(request.timeout);
  for (const listener of listeners) clearTimeout(listener.timeout);
  browser.kill("SIGTERM");
  stdoutLog.end();
  stderrLog.end();
}
