# Velora API

NestJS + PostgreSQL + Prisma backend for Velora.

## Setup

1. Copy `.env.example` to `.env`.
2. Put the URL-encoded PostgreSQL password into `DATABASE_URL`.
3. Run:

```powershell
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```

Swagger: http://localhost:3000/api
Health: http://localhost:3000/health
Companies: http://localhost:3000/companies
