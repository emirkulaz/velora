#!/bin/sh
set -e
echo "Applying Prisma migrations..."
./node_modules/.bin/prisma migrate deploy
echo "Starting Velora API on 0.0.0.0:${PORT:-3001}"
exec node dist/src/main.js
