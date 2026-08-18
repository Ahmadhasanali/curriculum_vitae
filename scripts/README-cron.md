# Update otomatis leetcode.json via cron

Server: self-host (nginx) di `ahmadhasan.my.id`. Butuh Node >= 18 di server.

## Pasang cron (pilih salah satu)

Harian 06:00:
    0 6 * * * /absolut/path/apps/scripts/update-leetcode.sh >> /var/log/leetcode-cv.log 2>&1

Setiap 12 jam:
    0 */12 * * * /absolut/path/apps/scripts/update-leetcode.sh >> /var/log/leetcode-cv.log 2>&1

Pasang dengan `crontab -e`. Ganti `/absolut/path` dengan lokasi deploy `apps/`.

Jika node tidak di PATH (mis. via nvm):
    0 6 * * * NODE_BIN=/home/user/.nvm/versions/node/v22/bin/node /absolut/path/apps/scripts/update-leetcode.sh >> /var/log/leetcode-cv.log 2>&1

Uji manual sekali:
    /absolut/path/apps/scripts/update-leetcode.sh
Cek: cat /absolut/path/apps/data/leetcode.json

## Kegagalan
Script exit non-0 tanpa menimpa file lama. data stale aman; site tetap tampil.
