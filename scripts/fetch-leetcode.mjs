#!/usr/bin/env node
import { writeFile, mkdir, rename } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const API_URL = "https://leetcode.com/graphql/";
const DEFAULT_USERNAME = "ahmadhasanali";
const DEFAULT_OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../data/leetcode.json");

function num(v, fallback = 0) {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

function countFor(list, difficulty) {
  if (!Array.isArray(list)) return 0;
  const entry = list.find((x) => x && x.difficulty === difficulty);
  return num(entry && entry.count);
}

export function parseSolved(res) {
  const data = (res && res.data) || {};
  const ms = (data.matchedUser && data.matchedUser.submit_stats) || {};
  const list = ms.acSubmissionNum;
  return {
    all: countFor(list, "All"),
    easy: countFor(list, "Easy"),
    medium: countFor(list, "Medium"),
    hard: countFor(list, "Hard"),
  };
}

function toDateKey(unixSeconds) {
  const d = new Date(unixSeconds * 1000);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseCalendar(res, now = new Date()) {
  const data = (res && res.data) || {};
  const ms = (data.matchedUser && data.matchedUser.calendar) || {};
  const year = now.getUTCFullYear();
  let map = {};
  try {
    const raw = ms.submission_calendar;
    if (typeof raw === "string" && raw) {
      const decoded = JSON.parse(raw);
      for (const key of Object.keys(decoded)) {
        const date = toDateKey(Number(key));
        if (date.startsWith(String(year))) map[date] = num(decoded[key]);
      }
    }
  } catch (_) {
    map = {};
  }
  return {
    calendar: map,
    streak: num(ms.streak),
    totalActiveDays: num(ms.total_active_days),
  };
}

async function gql(query, variables) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
      Referer: "https://leetcode.com",
      Origin: "https://leetcode.com/",
      Host: "leetcode.com",
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} from LeetCode`);
  }
  return res.json();
}

async function main() {
  const args = process.argv.slice(2);
  const outPath = resolve(args[args.indexOf("--out") + 1] || DEFAULT_OUT);
  const username = args[args.indexOf("--username") + 1] || DEFAULT_USERNAME;

  const solvedQuery = `
    query userCalendar($username: String!) {
      allQuestionsCount { difficulty count }
      matchedUser(username: $username) {
        submit_stats: submitStatsGlobal { acSubmissionNum { difficulty count } }
      }
    }`;
  const calendarQuery = `
    query userCalendar($username: String!, $year: Int) {
      matchedUser(username: $username) {
        calendar: userCalendar(year: $year) {
          active_years: activeYears
          streak
          total_active_days: totalActiveDays
          submission_calendar: submissionCalendar
        }
      }
    }`;

  const now = new Date();
  const [solvedRes, calRes] = await Promise.all([
    gql(solvedQuery, { username }),
    gql(calendarQuery, { username, year: now.getUTCFullYear() }),
  ]);

  const cal = parseCalendar(calRes, now);
  const payload = {
    username,
    fetchedAt: now.toISOString().slice(0, 10),
    solved: parseSolved(solvedRes),
    calendar: cal.calendar,
    streak: cal.streak,
    totalActiveDays: cal.totalActiveDays,
  };

  await mkdir(dirname(outPath), { recursive: true });
  const tmp = `${outPath}.tmp`;
  await writeFile(tmp, JSON.stringify(payload, null, 2) + "\n", "utf8");
  await rename(tmp, outPath);
  console.log(`OK: ${outPath} (${username}, ${payload.solved.all} solved)`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(`FAIL: ${err.message}`);
    process.exit(1);
  });
}