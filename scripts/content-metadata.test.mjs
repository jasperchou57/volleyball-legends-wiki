import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { checkContentFreshness } from "./check-content-freshness.mjs";
import { loadSiteModule } from "./lib/load-site-module.mjs";

const now = new Date("2026-10-25T04:00:00Z");
const fixture = () => ({
  latestGameUpdate: { updateNumber: 93, lastVerified: "October 24, 2026" },
  pageFreshness: { codesLastChecked: "October 24, 2026" },
  currentGameState: { updateNumber: 80, lastVerified: "July 27, 2026" },
});

test("old balance snapshot is reported separately from current announcement and codes", () => {
  const result = checkContentFreshness(fixture(), now);
  assert.deepEqual(result.errors, []);
  assert.equal(result.warnings.length, 1);
  assert.ok(result.lines.some(line => line.includes("July 27, 2026")));
  assert.ok(result.lines.some(line => line.includes("Latest announcement (Update 93): October 24, 2026")));
});

test("fresh codes cannot mask stale announcement, and vice versa", () => {
  for (const field of ["announcement", "codes"]) {
    const data = fixture();
    if (field === "announcement") data.latestGameUpdate.lastVerified = "October 10, 2026";
    else data.pageFreshness.codesLastChecked = "October 10, 2026";
    const result = checkContentFreshness(data, now);
    assert.equal(result.errors.length, 1);
    assert.match(result.errors[0], /older than 14 days/);
  }
});

test("missing, invalid and future dates fail rather than appearing fresh", () => {
  for (const value of [undefined, "", "not a date", "October 26, 2026"]) {
    const data = fixture();
    data.pageFreshness.codesLastChecked = value;
    assert.equal(checkContentFreshness(data, now).errors.length, 1);
  }
});

test("warning and failure thresholds remain 7 and 14 days", () => {
  const data = fixture();
  data.latestGameUpdate.lastVerified = "October 11, 2026";
  const result = checkContentFreshness(data, now);
  assert.equal(result.errors.length, 0);
  assert.ok(result.warnings.some(line => line.includes("older than 7 days")));
});

const { buildCodesMetadata } = loadSiteModule("src/lib/volleyball/codes-metadata.ts");
test("metadata follows update, code count and first code with the requested format", () => {
  const metadata = buildCodesMetadata(93, [{ code: "UPDATE_93" }, { code: "CURSED" }], now);
  assert.equal(metadata.title.absolute, "Volleyball Legends Codes (October 2026) - [Update 93] Working Spins");
  assert.equal(metadata.description, "All 2 working Volleyball Legends codes for Update 93 (October 2026). Redeem active codes like UPDATE_93 for free Lucky Style Spins & Ability Spins. Updated and verified daily.");
});

test("metadata rolls over at Beijing midnight and handles an empty code list", () => {
  const metadata = buildCodesMetadata(94, [], new Date("2026-10-31T16:00:00Z"));
  assert.equal(metadata.title.absolute, "Volleyball Legends Codes (November 2026) - [Update 94] Working Spins");
  assert.match(metadata.description, /^All 0 working/);
  assert.ok(!metadata.description.includes("undefined"));
});

test("the data loader preserves automated codes and their source-review date", () => {
  const data = loadSiteModule("src/data/volleyball.ts");
  const automated = JSON.parse(readFileSync("src/data/codes-automated.json", "utf8"));
  for (const code of automated.codes.filter(row => row.status === "active")) {
    assert.ok(data.activeCodes.some(row => row.code === code.code && row.reward === code.reward));
  }
  const latestReview = Math.max(...automated.codes.map(row => Date.parse(row.sourceCheckedAt)));
  const expectedDate = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(latestReview);
  assert.equal(data.pageFreshness.codesLastChecked, expectedDate);
});

