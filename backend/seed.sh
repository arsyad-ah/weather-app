#! /bin/sh -e

docker exec -it backend /bin/sh -c "npx prisma generate && npx prisma migrate dev && cd seed && node seed.ts"
