#!/bin/sh
set -e

echo "Aplicando migraciones..."
cd /migrator && ./node_modules/.bin/prisma migrate deploy

cd /app && exec node server.js
