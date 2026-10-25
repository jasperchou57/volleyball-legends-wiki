import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { loadSiteModule } from "./lib/load-site-module.mjs";

export function checkContentFreshness(data, now = new Date()) {
  const errors = [];
  const warnings = [];
  const lines = [];
  const checks = [
    { label: `Latest announcement (Update ${data.latestGameUpdate?.updateNumber})`, value: data.latestGameUpdate?.lastVerified },
    { label: "Codes source review", value: data.pageFreshness?.codesLastChecked },
    { label: `Historical balance snapshot (Update ${data.currentGameState?.updateNumber})`, value: data.currentGameState?.lastVerified, historical: true },
  ];

  for (const { label, value, historical } of checks) {
    const timestamp = typeof value === "string" && value.trim()
      ? Date.parse(/^\d{4}-\d{2}-\d{2}/.test(value) ? value : `${value} UTC`)
      : NaN;
    if (!Number.isFinite(timestamp)) {
      errors.push(`${label}: missing or invalid verification date (${String(value)}).`);
      continue;
    }
    if (timestamp > now.valueOf()) {
      errors.push(`${label}: verification date is in the future (${value}).`);
      continue;
    }
    const age = Math.floor((now.valueOf() - timestamp) / 86_400_000);
    lines.push(`${label}: ${value} (${age} days old${historical ? "; historical, separate from announcement/code freshness" : ""})`);
    if (historical) {
      if (age > 14) warnings.push("Historical balance data has not been reverified; do not describe style ratings or stats as current.");
    } else if (age > 14) {
      errors.push(`${label} is older than 14 days. Review its sources before publishing.`);
    } else if (age > 7) {
      warnings.push(`${label} is older than 7 days and should be reviewed.`);
    }
  }
  return { lines, warnings, errors };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const data = loadSiteModule(resolve("src/data/volleyball.ts"));
    const result = checkContentFreshness(data);
    result.lines.forEach(line => console.log(line));
    result.warnings.forEach(warning => console.warn(`Warning: ${warning}`));
    result.errors.forEach(error => console.error(error));
    if (result.errors.length) process.exitCode = 1;
    else console.log("Current announcement and code freshness checks passed. No verification dates were changed.");
  } catch (error) {
    console.error(`Could not read site freshness data: ${error.message}`);
    process.exitCode = 1;
  }
}
