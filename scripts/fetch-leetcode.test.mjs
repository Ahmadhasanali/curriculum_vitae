import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseSolved, parseCalendar } from "./fetch-leetcode.mjs";

const solvedRes = JSON.parse(await readFile(new URL("./__fixtures__/solved.json", import.meta.url), "utf8"));
const calRes = JSON.parse(await readFile(new URL("./__fixtures__/calendar.json", import.meta.url), "utf8"));

test("parseSolved: memetakan acSubmissionNum ke {all,easy,medium,hard}", () => {
  const solved = parseSolved(solvedRes);
  assert.deepEqual(solved, { all: 9, easy: 7, medium: 2, hard: 0 });
});

test("parseSolved: struktur berubah => default 0, bukan throw", () => {
  const partial = JSON.parse(JSON.stringify(solvedRes));
  delete partial.data.matchedUser;
  const solved = parseSolved(partial);
  assert.deepEqual(solved, { all: 0, easy: 0, medium: 0, hard: 0 });
});

test("parseCalendar: submissionCalendar didecode ke YYYY-MM-DD, hanya tahun berjalan", () => {
  const now = new Date("2026-06-01T00:00:00Z");
  const year = now.getUTCFullYear();
  const cal = parseCalendar(calRes, now);
  for (const date of Object.keys(cal.calendar)) {
    assert.ok(date.startsWith(String(year)));
  }
  assert.equal(cal.calendar["2026-04-13"], 1);
});

test("parseCalendar: submissionCalendar bukan JSON => {} tanpa throw", () => {
  const bad = JSON.parse(JSON.stringify(calRes));
  bad.data.matchedUser.calendar.submission_calendar = "not-json";
  const cal = parseCalendar(bad, new Date("2026-01-01T00:00:00Z"));
  assert.deepEqual(cal.calendar, {});
});

test("parseCalendar: struktur berubah => default {streak:0,totalActiveDays:0,calendar:{}}", () => {
  const partial = JSON.parse(JSON.stringify(calRes));
  delete partial.data.matchedUser.calendar;
  const res = parseCalendar(partial, new Date("2026-01-01T00:00:00Z"));
  assert.deepEqual(res, { calendar: {}, streak: 0, totalActiveDays: 0 });
});