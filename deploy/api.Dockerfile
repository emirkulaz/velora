# Velora API — pilot / production image (build context: Velora repo root)
FROM node:22-bookworm-slim AS deps
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
COPY velora-api-v2/package.json velora-api-v2/package-lock.json ./
RUN npm ci

FROM deps AS build
COPY velora-api-v2/ ./
RUN npx prisma generate && npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
COPY velora-api-v2/package.json velora-api-v2/package-lock.json ./
# prisma CLI migrate için production image’da da gerekir
RUN npm ci --omit=dev && npm install prisma@6.19.0 ts-node@10.9.2 typescript@5.7.3 --no-save
COPY --from=build /app/dist ./dist
COPY --from=build /app/generated ./generated
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/scripts/seed-pilot.ts ./scripts/seed-pilot.ts
COPY deploy/api-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 3001
ENTRYPOINT ["/entrypoint.sh"]
