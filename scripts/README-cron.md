# Update otomatis leetcode.json via cron

Server: self-host (nginx via Docker) di `ahmadhasan.my.id`. Butuh Node >= 18 di server.

> **Penting**: `docker-compose.prod.yml` bind-mount `./data` ke container
> (`- ./data:/usr/share/nginx/html/data`). Jadi cron di host yang menulis
> `data/leetcode.json` langsung terlihat oleh nginx tanpa rebuild image.
> Pastikan deploy terbaru (dengan volume mount) sudah jalan.

> **Remote git**: repo di server ini memakai remote HTTPS
> (`https://github.com/Ahmadhasanali/curriculum_vitae.git`) dengan kredensial
> tersimpan — workflow deploy mengandalkan ini untuk `git pull`. Jangan
> mengganti ke SSH, karena SSH key deploy bukan key GitHub dan pull akan
> gagal dengan `Permission denied (publickey)`.

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

## Cache & fresh data

- `data/leetcode.json` di-serve dengan `Cache-Control: no-cache` (lihat
  `nginx.conf`), jadi browser/Cloudflare selalu revalidate ke origin dan
  user mendapat data terbaru begitu file di-update cron.
- HTML juga `no-cache`, jadi deploy baru langsung terlihat.
- Aset statis (`main.js?v=...`, CSS, gambar) di-cache lama (`immutable`)
  karena URL-nya berubah tiap versi.

## Kegagalan
Script exit non-0 tanpa menimpa file lama. data stale aman; site tetap tampil.
