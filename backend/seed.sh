#! /bin/sh -e

docker exec -it backend /bin/sh -c "cd seed && node seed.ts"
