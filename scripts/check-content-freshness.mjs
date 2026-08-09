import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const dataPath = resolve(process.cwd(), "src/data/volleyball.ts");
const source = readFileSync(dataPath, "utf8");
const match = source.match(/lastVerified:\s*"([^"]+)"/);

if (!match) {
  console.error("Could not find currentGameState.lastVerified in src/data/volleyball.ts.");
  process.exit(1);
}

const verifiedAt = new Date(`${match[1]} UTC`);
if (Number.isNaN(verifiedAt.valueOf())) {
  console.error(`Could not parse lastVerified date: ${match[1]}`);
  process.exit(1);
}

const ageInDays = Math.floor((Date.now() - verifiedAt.valueOf()) / 86_400_000);
const warningAfterDays = 7;
const failureAfterDays = 14;

console.log(`Content snapshot: ${match[1]} (${ageInDays} days old)`);
console.log("Before publishing an update, refresh the source record, codes, affected entity pages, and freshness fields.");

if (ageInDays > failureAfterDays) {
  console.error(`Content snapshot is older than ${failureAfterDays} days. Refresh or explicitly review it before publishing.`);
  process.exit(1);
}

if (ageInDays > warningAfterDays) {
  console.warn(`Content snapshot is older than ${warningAfterDays} days and should be reviewed.`);
} else {
  console.log("Content freshness check passed.");
}
