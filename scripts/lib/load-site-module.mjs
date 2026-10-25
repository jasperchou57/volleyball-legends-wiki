import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, extname, resolve } from "node:path";
import ts from "typescript";

// Read the same evaluated TypeScript exports as Next, including merged JSON codes.
export function loadSiteModule(filename, cache = new Map()) {
  const path = resolve(filename);
  if (cache.has(path)) return cache.get(path).exports;
  const module = { exports: {} };
  cache.set(path, module);
  const nativeRequire = createRequire(path);
  const localRequire = (specifier) => {
    if (specifier.startsWith(".")) {
      const base = resolve(dirname(path), specifier);
      const target = extname(base) ? base : [base + ".ts", base + ".json"].find(existsSync);
      if (target?.endsWith(".ts")) return loadSiteModule(target, cache);
      if (target?.endsWith(".json")) return JSON.parse(readFileSync(target, "utf8"));
    }
    return nativeRequire(specifier);
  };
  const { outputText } = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2021, esModuleInterop: true }, fileName: path,
  });
  new Function("require", "module", "exports", outputText)(localRequire, module, module.exports);
  return module.exports;
}
