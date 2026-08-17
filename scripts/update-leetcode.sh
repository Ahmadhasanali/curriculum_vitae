#!/usr/bin/env bash
set -euo pipefail

# Update leetcode.json secara aman. Hosting: self-host (nginx).
# Gunakan path node sesuai server; fallback ke node di PATH.
NODE_BIN="${NODE_BIN:-node}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT_FILE="${SCRIPT_DIR}/../data/leetcode.json"

if ! command -v "$NODE_BIN" >/dev/null 2>&1; then
  echo "[update-leetcode] ERROR: node tidak ditemukan. Set NODE_BIN=/path/to/node" >&2
  exit 1
fi

"$NODE_BIN" "${SCRIPT_DIR}/fetch-leetcode.mjs" --out "$OUT_FILE"
echo "[update-leetcode] OK: $(date -Is)"
