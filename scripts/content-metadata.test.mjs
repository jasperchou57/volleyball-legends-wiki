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

const { buildCodesMetadata, buildCodesWebPageSchema, normalizeCodesDate, formatCodesDate } = loadSiteModule("src/lib/volleyball/codes-metadata.ts");
const code = (code, reward, releaseDate = "October 31, 2026") => ({ code, reward, releaseDate });
test("metadata uses the exact template and counts all active codes, including older batches", () => {
  const metadata = buildCodesMetadata(94, [
    code("UPDATE_94", "5 Lucky Style Spins"), code("TSO_RETURNS", "5 Lucky Style Spins"),
    code("VAMPIRES", "5 Lucky Ability Spins"), code("UPDATE_93", "5 Lucky Style Spins", "October 24, 2026"),
  ], "2026-10-31T16:00:00Z");
  assert.equal(metadata.title.absolute, "Volleyball Legends Codes (October 2026) - [Update 94] Working Spins");
  assert.equal(metadata.description, "All 4 working Volleyball Legends codes for Update 94 (October 2026). Copy the brand-new update codes to claim free Lucky Style Spins & Ability Spins before they expire!");
  assert.ok(!metadata.description.includes("verified daily"));
});

test("metadata uses the recorded update date in Eastern time and counts empty codes accurately", () => {
  for (const [iso, month] of [["2026-10-31T16:00:00Z", "October"], ["2026-11-01T03:59:59Z", "October"], ["2026-11-01T04:00:00Z", "November"]]) {
    const metadata = buildCodesMetadata(94, [], iso);
    assert.equal(metadata.title.absolute, `Volleyball Legends Codes (${month} 2026) - [Update 94] Working Spins`);
    assert.ok(!metadata.description.includes("undefined"));
    assert.ok(metadata.description.startsWith("All 0 working Volleyball Legends codes"));
  }
});

test("the data loader preserves automated codes and their source-review date", () => {
  const data = loadSiteModule("src/data/volleyball.ts");
  const automated = JSON.parse(readFileSync("src/data/codes-automated.json", "utf8"));
  for (const code of automated.codes.filter(row => row.status === "active")) {
    assert.ok(data.activeCodes.some(row => row.code === code.code && row.reward === code.reward));
  }
  const latestReview = Math.max(...automated.codes.map(row => Date.parse(row.sourceCheckedAt)));
  const expectedDate = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(latestReview);
  assert.ok(Date.parse(data.pageFreshness.codesLastChecked) >= Date.parse(expectedDate));
});


const { SECRET_EVENT_START, SECRET_EVENT_END, getSecretEventStatus, usesSecretEventRates } = loadSiteModule("src/lib/volleyball/secret-event.ts");
test("Update 94 event lasts 48 hours across Eastern DST change and stops at its deadline", () => {
  assert.equal(SECRET_EVENT_START, Date.parse("2026-10-31T15:30:00Z"));
  assert.equal(SECRET_EVENT_END, Date.parse("2026-11-02T15:30:00Z"));
  assert.equal(SECRET_EVENT_END - SECRET_EVENT_START, 48 * 60 * 60 * 1000);
  assert.equal(getSecretEventStatus(SECRET_EVENT_START - 1), "upcoming");
  assert.equal(getSecretEventStatus(SECRET_EVENT_START), "active");
  assert.equal(usesSecretEventRates("auto", SECRET_EVENT_END - 1), true);
  assert.equal(usesSecretEventRates("auto", SECRET_EVENT_END), false);
  assert.equal(getSecretEventStatus(SECRET_EVENT_END), "ended");
  assert.equal(usesSecretEventRates("event", SECRET_EVENT_END), true);
  assert.equal(usesSecretEventRates("baseline", SECRET_EVENT_START), false);
});


test("recorded dates retain their precision and metadata never invents an update time", () => {
  assert.equal(normalizeCodesDate("October 31, 2026"), "2026-10-31");
  assert.equal(normalizeCodesDate("2026-10-31"), "2026-10-31");
  assert.equal(formatCodesDate("2026-11-01", true), "November 2026");
  assert.throws(() => buildCodesMetadata(94, []));
  assert.throws(() => normalizeCodesDate("2026-11-01T00:00:00"));
  assert.throws(() => normalizeCodesDate("2026-02-30"));
  assert.throws(() => normalizeCodesDate("invalid"));
  const next = buildCodesMetadata(95, [code("EXAMPLE", "5 Lucky Style Spins")], "2026-11-07");
  assert.equal(next.title.absolute, "Volleyball Legends Codes (November 2026) - [Update 95] Working Spins");
  assert.ok(!next.description.includes("EXAMPLE"));
});

test("WebPage records content modification and source review independently", () => {
  const schema = buildCodesWebPageSchema("Codes and rewards", "2026-10-31T16:23:52Z", "2026-11-01T03:00:00Z");
  assert.equal(schema["@type"], "WebPage");
  assert.equal(schema.dateModified, "2026-10-31T16:23:52.000Z");
  assert.equal(schema.lastReviewed, "2026-10-31");
  assert.equal(schema.url, "https://www.volleyballlegends.wiki/codes");
  assert.deepEqual(JSON.parse(JSON.stringify(schema)), schema);
  assert.equal("datePublished" in schema, false);
});
