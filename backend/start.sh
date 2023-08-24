#! /bin/sh -e

sleep 10
npx prisma generate \
&& npx prisma migrate dev \
&& npm run start:dev
