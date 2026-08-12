# Velora Park

Multi-tenant parking plate recognition and operations platform.

> Temporary product name. Independent from Velora ERP (`velora-api-v2` / `velora-web`).

## Architecture

```
velora-park/
  apps/
    api/            NestJS + Prisma + PostgreSQL
    web/            React + Vite + Tailwind admin console
    recognition/    Python FastAPI plate recognition service
  packages/
    shared/         Shared TypeScript types
  docker-compose.yml
```

- Browser never receives RTSP secrets.
- Recognition runs server-side (FastAPI), not in the browser.
- Providers are swappable (`DevelopmentMockProvider`, future YOLO/OCR).
- Mock results are explicitly labeled `is_mock=true` / provider `development_mock`.

## Prerequisites

- Node.js 20+
- Docker Desktop (PostgreSQL via `docker compose`)
- Python 3.11+ (for recognition service)

If Docker is not installed, start any PostgreSQL 16 instance and point `DATABASE_URL` in `.env` / `apps/api/.env` to a dedicated `velora_park` database. Do not reuse the Velora ERP database.

## Quick start

### 1) Environment

```bash
cd velora-park
cp .env.example .env
cp .env apps/api/.env
cp .env apps/recognition/.env
```

### 2) Database

```bash
npm run db:up
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
```

`db:migrate` may prompt for a migration name on first run. Use: `init`.

### 3) API

```bash
npm run dev:api
```

Health: `http://localhost:3001/api/v1/health`

### 4) Web

```bash
npm run dev:web
```

Open: `http://localhost:5174`

Demo login (seed):

- Email: `admin@demo.park`
- Password: `VeloraPark!2026`

### 5) Recognition service

```bash
cd apps/recognition
python -m venv .venv
# Windows:
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

Health: `http://localhost:8001/health`

Test image flow (mock provider):

```bash
curl -F "file=@./sample.jpg" -F "country_code=DZ" http://localhost:8001/v1/recognize
```

Ingest into API (uses `RECOGNITION_INGEST_TOKEN`):

```bash
curl -F "file=@./sample.jpg" -F "country_code=DZ" -F "camera_id=<ENTRY_CAMERA_ID>" -F "direction=ENTRY" -F "ingest=true" http://localhost:8001/v1/recognize
```

Camera id is printed by `npm run db:seed`.

## Core API routes

| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/v1/health` | Public |
| POST | `/api/v1/auth/login` | Public |
| GET | `/api/v1/auth/me` | JWT |
| GET | `/api/v1/dashboard/summary` | Tenant scoped |
| GET | `/api/v1/events` | Filters + pagination |
| GET | `/api/v1/events/review-queue` | Low-confidence queue |
| GET | `/api/v1/events/:id` | Detail |
| PATCH | `/api/v1/events/:id/correct-plate` | Operator/Admin |
| POST | `/api/v1/events/ingest` | Recognition service token |
| GET | `/api/v1/cameras` | No RTSP secrets |
| GET | `/api/v1/parking-sites` | Tenant scoped |

## Security notes

- Tenant isolation via JWT `organizationId` on every business query.
- Camera RTSP URLs are stored server-side only (`rtspUrlEncrypted`) and never returned to the web client.
- Recognition ingest uses `x-recognition-token`, not end-user JWT.
- Mock provider is blocked when `ALLOW_MOCK_PROVIDER=false` or `RECOGNITION_ENV=production`.

## Scripts

```bash
npm run build
npm run test:api
npm run lint
```

## Verification (Phase 1)

On the development machine used for scaffolding:

- `npm install` — OK
- `@velora-park/api` `tsc --noEmit` — OK
- `@velora-park/api` Jest (5 tests) — OK
- `@velora-park/api` Nest build — OK
- `@velora-park/web` production build — OK
- Docker / PostgreSQL apply — blocked here (Docker CLI not installed)
- Python recognition runtime tests — blocked here (Python not installed)

After Docker + Python are available:

```bash
npm run db:up
npm run db:migrate
npm run db:seed
npm run dev:api
npm run dev:web
npm run recognition:dev
```

## Phase roadmap (next)

1. Apply migration + seed on a running PostgreSQL
2. Live RTSP worker + dedupe hardening
3. Real YOLO/OCR provider wiring
4. Notification rules engine + CSV/PDF reports
5. S3/MinIO storage adapter activation
6. Country profile validators (TR / DZ / EU)
