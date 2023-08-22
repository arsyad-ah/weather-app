const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const csv = require('csv-parser');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  const csvFilePath = 'LocationMetadata.csv';

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', async (row) => {
      try {
        const { name, latitude, longitude, update_timestamp } = row;

        await prisma.locationMetadata.create({
          data: {
            name,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            update_timestamp: new Date(update_timestamp),
          },
        });
      } catch (error) {
        console.error('Error seeding row:', row);
        console.error(error);
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
