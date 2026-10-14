import { expect, test } from "bun:test";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const readJSON = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));

test("the foundation exposes Bun tooling and strict TypeScript", () => {
  const pkg = readJSON("package.json");
  const { compilerOptions } = readJSON("tsconfig.json");
  expect(pkg.name).toBe("karina-gallery");
  expect(pkg.packageManager).toBe("bun@1.4.3");
  expect(pkg.dependencies.next).toBe("16.4.1");
  for (const command of ["dev", "build", "start", "lint", "typecheck", "test:unit", "test:e2e", "test"]) {
    expect(pkg.scripts[command]).toBeString();
  }
  expect(compilerOptions.strict).toBe(true);
  expect(compilerOptions.noUncheckedIndexedAccess).toBe(true);
  expect(compilerOptions.exactOptionalPropertyTypes).toBe(true);
  expect(compilerOptions.allowJs).toBe(false);
  for (const lockfile of ["package-lock.json", "yarn.lock", "pnpm-lock.yaml"]) {
    expect(existsSync(resolve(root, lockfile))).toBe(false);
  }
  expect(existsSync(resolve(root, "bun.lock"))).toBe(true);
});

test("later-stage animation packages are deferred", () => {
  const pkg = readJSON("package.json");
  const dependencies = { ...pkg.dependencies, ...pkg.devDependencies };
  for (const dependency of ["gsap", "lenis", "@studio-freight/lenis", "tailwindcss"]) {
    expect(dependencies[dependency]).toBeUndefined();
  }
});
