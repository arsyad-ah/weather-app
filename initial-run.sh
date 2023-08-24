#! /bin/sh -e

echo "Running initial run and setup" \
&& docker-compose up -d \
&& sleep 5 \
&& docker-compose ps | grep "Up (healthy)"

sleep 20 \
&& cd backend \
&& echo "Seeding DB" \
&& sh seed.sh
echo "Seeding completed"
