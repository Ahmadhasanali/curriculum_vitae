import { test } from "node:test";
import assert from "node:assert/strict";

function isValidLeetcode(data) {
  if (!data || typeof data !== "object") return false;
  const s = data.solved;
  if (!s || typeof s !== "object") return false;
  for (const k of ["all", "easy", "medium", "hard"]) {
    if (typeof s[k] !== "number" || !Number.isFinite(s[k])) return false;
  }
  return true;
}

test("valid data => true", () => {
  assert.equal(isValidLeetcode({ solved: { all: 9, easy: 7, medium: 2, hard: 0 } }), true);
});
test("solved missing => false", () => {
  assert.equal(isValidLeetcode({ username: "x" }), false);
});
test("solved.easy string => false", () => {
  assert.equal(isValidLeetcode({ solved: { all: 9, easy: "7", medium: 2, hard: 0 } }), false);
});
test("null/undefined => false", () => {
  assert.equal(isValidLeetcode(null), false);
});