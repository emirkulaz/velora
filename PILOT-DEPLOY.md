# Velora temiz pilot demo (online / Docker)

Bu ortam **TRIKOMEX gerçek verisini taşımaz**. Ayrı PostgreSQL + sahte pilot şirket.

## Ne kurulur?

| Servis | Rol |
|--------|-----|
| `db` | Boş Postgres |
| `api` | NestJS + migrate deploy |
| `web` | PWA (nginx, `/api` → API) |
| `api-seed` (opsiyonel profil) | `Velora Pilot Textile` + admin |

## Giriş (seed sonrası)

- Şirket: **Velora Pilot Textile**
- E-posta: `pilot.admin@velora-pilot.test`
- Parola: `.env.pilot` içindeki `PILOT_ADMIN_PASSWORD` (log’a yazılmaz)
- İlk girişte parola değiştirme zorunlu

## Yerel / VPS (Docker)

Repo kökünde (`Velora/`):

```bash
cp .env.pilot.example .env.pilot
# POSTGRES_PASSWORD, JWT_SECRET, PILOT_ADMIN_PASSWORD doldur

docker compose -f docker-compose.pilot.yml --env-file .env.pilot up -d --build

# Temiz DB’ye pilot admin:
docker compose -f docker-compose.pilot.yml --env-file .env.pilot --profile seed run --rm api-seed
```

Aç: `http://SUNUCU:8080` (veya `PILOT_HTTP_PORT`)

HTTPS için önüne Caddy/Traefik/Cloudflare koy; PWA yükleme için HTTPS veya localhost gerekir.

## Railway / Render notu

Adım adım HTTPS (Cezayir / PWA / Electron): **[RAILWAY.md](./RAILWAY.md)**  
Config: `railway.api.toml`, `railway.web.toml`, `deploy/nginx.spa.conf`.

1. Yeni **boş** Postgres oluştur (TRIKOMEX DB’sini bağlama).
2. API’yi `deploy/api.Dockerfile` ile deploy et; `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN` set et.
3. Web’i `deploy/web.Dockerfile` + build-arg `NGINX_CONF=deploy/nginx.spa.conf` ve `VITE_API_URL=https://…api…railway.app` ile deploy et.
4. Seed yalnızca opt-in: `ENABLE_PILOT_SEED=true` + `PILOT_ADMIN_PASSWORD=...` + `npx ts-node scripts/seed-pilot.ts`  
   (DB’de TRIKOMEX adı varsa seed **reddedilir** — kasıtlı güvenlik.) Tercihen migrate + mevcut veri.

## Güvenlik

- `.env.pilot` commit edilmez
- `ENABLE_DEMO_MODE` production compose’ta `false`
- Gerçek kasa/stok import scriptleri bu ortama çalıştırma
- Pilot bitince volume’u sil:  
  `docker compose -f docker-compose.pilot.yml --env-file .env.pilot down -v`

## Script

```bash
cd velora-api-v2
# package.json: npm run pilot:seed
ENABLE_PILOT_SEED=true PILOT_ADMIN_PASSWORD='...' npx ts-node scripts/seed-pilot.ts
```
