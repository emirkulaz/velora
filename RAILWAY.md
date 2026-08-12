# VEXOR — Railway HTTPS (Cezayir / PWA)

Amaç: tarayıcıdan ve PWA’dan açılabilen `https://….railway.app` adresi.
Bu rehber **gerçek TRIKOMEX production secret’larını repoya yazmaz**; tüm gizliler Railway Variables’ta kalır.

## Mimari (önerilen)

| Servis | Dockerfile | Rol |
|--------|------------|-----|
| `Postgres` | Railway eklentisi | Ayrı boş DB (TRIKOMEX DB bağlama) |
| `velora-api` | `deploy/api.Dockerfile` | NestJS + `prisma migrate deploy` |
| `velora-web` | `deploy/web.Dockerfile` + `nginx.spa.conf` | PWA (HTTPS) |

Web, build sırasında `VITE_API_URL` ile API’nin **public HTTPS** adresini alır. API’de `CORS_ORIGIN` = Web URL.

Seed varsayılan kapalıdır (`ENABLE_PILOT_SEED` yok / false). Mevcut veri + migrate tercih edilir.

---

## 1) CLI kurulumu ve giriş

PowerShell (repo kökü `C:\Users\kanar\Desktop\Velora`):

```powershell
# Global kurulum istemezseniz npx kullanın:
npx @railway/cli login
npx @railway/cli whoami

# veya: npm install -g @railway/cli  →  railway login
```

Tarayıcıda Railway oturumu açılır. Giriş yoksa deploy **çalışmaz** — sahte URL üretilmez.

---

## 2) Proje + Postgres

```powershell
cd C:\Users\kanar\Desktop\Velora
railway init
# proje adı örn. velora-pilot

railway add --database postgres
```

Dashboard’dan da: **New Project → Empty Project → + Postgres**.

`DATABASE_URL` Postgres servisine bağlanınca API’ye **variable reference** ile gelir.

---

## 3) API servisi

Dashboard: **+ New Service → GitHub Repo** (veya CLI `railway up`) → aynı repo.

1. **Settings → Config-as-code** → `railway.api.toml`
2. **Root Directory** boş / `/` (monorepo kökü)
3. **Variables** (API servisi):

| Değişken | Değer |
|----------|--------|
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` (Railway referansı) |
| `JWT_SECRET` | Güçlü rastgele string (Railway’de üret; repoya yazma) |
| `JWT_EXPIRES_IN` | `8h` |
| `NODE_ENV` | `production` |
| `CORS_ORIGIN` | Web public URL (web deploy sonrası, örn. `https://velora-web-production-xxxx.up.railway.app`) |
| `ENABLE_DEMO_MODE` | `false` |
| `ENABLE_PILOT_SEED` | `false` |
| `DZD_PER_USD` | `240` (isteğe bağlı) |
| `OPENAI_API_KEY` | İsteğe bağlı; yoksa AI özellikler kısıtlı |

CLI ile değişken (değerleri kendin yapıştır; chate yazma):

```powershell
railway link
railway service  # api servisini seç
railway variables set NODE_ENV=production JWT_EXPIRES_IN=8h ENABLE_DEMO_MODE=false ENABLE_PILOT_SEED=false
# JWT_SECRET ve DATABASE_URL’yi dashboard’dan veya:
# railway variables set JWT_SECRET=...
```

Deploy:

```powershell
railway up --service velora-api
# veya GitHub bağlantısı varsa push yeterli
```

Public URL:

```powershell
railway domain
railway status
```

API sağlık: `https://YOUR-API.up.railway.app/health` → `{ "status": "ok" }`

---

## 4) Web (PWA) servisi

**+ New Service** → aynı repo.

1. Config-as-code: `railway.web.toml`
2. **Variables → Build** (build-arg):

| Build değişkeni | Değer |
|-----------------|--------|
| `NGINX_CONF` | `deploy/nginx.spa.conf` |
| `VITE_API_URL` | `https://YOUR-API.up.railway.app` (sonda `/` yok) |

3. Runtime: Railway `PORT` enjekte eder; nginx template `${PORT}` dinler.

Deploy sonrası:

```powershell
railway domain
```

Çıkan **Web HTTPS** adresi Emir’in Cezayir / PWA / Electron hedefidir.

API’ye geri dönüp `CORS_ORIGIN` = bu Web URL (virgülle birden fazla origin eklenebilir).

---

## 5) Seed (yalnızca opt-in, temiz pilot DB)

**TRIKOMEX production DB’sinde çalıştırma.** Yalnızca boş/pilot Postgres ve açık onay:

```powershell
# Yerel veya one-off Railway shell — ENABLE_PILOT_SEED şart
# Parolayı chate yapıştırma.
$env:ENABLE_PILOT_SEED="true"
$env:PILOT_ADMIN_PASSWORD="..."   # min 12 karakter
$env:DATABASE_URL="..."           # Railway Postgres
cd velora-api-v2
npx prisma migrate deploy
npx ts-node --transpile-only scripts/seed-pilot.ts
```

DB’de TRIKOMEX adı varsa seed **reddedilir** (kasıtlı).

Tercih: migrate + mevcut şirket verisi; seed’i atla.

---

## 6) Doğrulama listesi

- [ ] `https://API…/health` → ok  
- [ ] `https://WEB…` → giriş ekranı  
- [ ] Giriş sonrası veri (`companyId` izolasyonu bozulmamalı)  
- [ ] Chrome/Edge: **Uygulamayı yükle** (HTTPS gerekir)  
- [ ] Electron: `VELORA_APP_URL=https://WEB…` ile `npm run dist:win` (`velora-desktop/`)

---

## Ortam özeti (kopyala-yapıştır checklist)

**API (runtime)**  
`DATABASE_URL` · `JWT_SECRET` · `CORS_ORIGIN` · `NODE_ENV=production` · `ENABLE_PILOT_SEED=false` · `ENABLE_DEMO_MODE=false`

**Web (build)**  
`VITE_API_URL=https://…api…railway.app` · `NGINX_CONF=deploy/nginx.spa.conf`

**Electron / masaüstü**  
`VELORA_APP_URL=https://…web…railway.app` (API değil, Web URL)

---

## Sorun giderme

| Belirti | Olası neden |
|---------|-------------|
| CORS hatası | `CORS_ORIGIN` Web URL ile birebir değil |
| API 502 / boot loop | `DATABASE_URL` yok; migrate hata veriyor — Railway log |
| Web API’ye gitmiyor | `VITE_API_URL` build-arg yanlış / redeploy edilmedi |
| PWA yüklenmiyor | HTTP veya manifest/SW yok — yalnızca HTTPS |
| Nginx bind hatası | Eski imaj `listen 80` — güncel `deploy/web.Dockerfile` + `${PORT}` |

Yerel Docker pilot: `PILOT-DEPLOY.md` + `docker-compose.pilot.yml` (nginx `/api` proxy).
