#! /bin/sh -e

export PRISMA_OUT=../shared/prisma/schema.prisma
export DATABASE_URL="postgresql://postgres:password@localhost:5432/nest?schema=public"

sleep 10
npx prisma generate --schema=$PRISMA_OUT \
&& npx prisma migrate dev --schema=$PRISMA_OUT \
&& npm run start:dev
