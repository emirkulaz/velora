# Velora Web PWA — nginx (+ opsiyonel /api proxy)
# Build context: Velora repo root
#
# Docker Compose (aynı network, /api proxy):
#   docker build -f deploy/web.Dockerfile .
#
# Railway (ayrı API servisi, SPA-only nginx):
#   docker build -f deploy/web.Dockerfile \
#     --build-arg NGINX_CONF=deploy/nginx.spa.conf \
#     --build-arg VITE_API_URL=https://YOUR-API.up.railway.app \
#     .
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY velora-web/package.json velora-web/package-lock.json ./
RUN npm ci
COPY velora-web/ ./
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:1.27-alpine AS runner
# Official image: /docker-entrypoint.d/20-envsubst-on-templates.sh
# substitutes ${PORT} in /etc/nginx/templates/*.template
ENV PORT=80
ARG NGINX_CONF=deploy/nginx.conf
COPY ${NGINX_CONF} /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
