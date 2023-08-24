#! /bin/sh -e

sleep 10
npx prisma generate \
&& npx prisma migrate dev \
&& cd seed \
&& node seed.ts \
&& cd .. \
&& npm run start:dev
