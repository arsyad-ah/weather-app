const { PrismaClient } = require('@prisma/client');
const fs = require('fs-extra');
const csv = require('csv-parser');
const axios = require('axios');
const path = require('path');
const minio = require('minio');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

function GetOneMinuteAgo() {
  const now = new Date();
  return new Date(now.getTime() - 60 * 1000);
}

async function UploadLocationMetadata() {
  const csvFilePath = 'LocationMetadata.csv';
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', async (row) => {
      try {
        const { name, latitude, longitude } = row;

        await prisma.locationMetadata.create({
          data: {
            name,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          },
        });
      } catch (error) {
        console.error('Error seeding row:', row);
        console.error(error);
      }
    })
    .on('end', () => {
      console.log(`${csvFilePath} file successfully processed`);
    });
}

async function downloadAndProcessFile(url, filename) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    // Specify temporary directory
    const tempDir = path.join(__dirname, '..', 'tmp');
    const tempFilePath = path.join(tempDir, filename);

    // Save the downloaded data to a temporary file
    await fs.ensureDir(tempDir);
    await fs.writeFile(tempFilePath, response.data);
    return tempFilePath;
  } catch (error) {
    console.error(`Error downloading: ${error}`);
  }
}

async function uploadImage(imageUrl, minioClient) {
  const bucket_name = process.env.APP_BUCKET_NAME;
  const image_folder = process.env.APP_IMAGE_FOLDER;
  const [year, month, filename] = imageUrl.split('/').slice(-3);

  // download file
  const tempFilePath = await downloadAndProcessFile(imageUrl, filename);
  const fileStream = fs.createReadStream(tempFilePath);
  const imagePath = `${image_folder}/${year}/${month}/${filename}`;
  const size = 2048;

  try {
    //upload and delete
    await minioClient.putObject(bucket_name, imagePath, fileStream, size);
    await fs.unlink(tempFilePath);
    return imagePath;
  } catch (error) {
    throw new Error(
      `Failed to upload image: ${filename} to bucket: ${bucket_name}.\n${error}`,
    );
  }
}

async function UploadTraffic() {
  const csvFilePath = 'Traffic.csv';
  const oneMinuteAgo = GetOneMinuteAgo();
  const minioClient = new minio.Client({
    endPoint: process.env.MINIO_SERVER_NAME,
    port: Number(process.env.MINIO_PORT),
    useSSL: false,
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', async (row) => {
      try {
        const {
          location_name,
          image_url,
          image_height,
          image_width,
          camera_id,
          latitude,
          longitude,
          md5,
        } = row;

        const image_path = await uploadImage(image_url, minioClient);

        await prisma.traffic.create({
          data: {
            location_name,
            image_url,
            image_height: parseInt(image_height),
            image_width: parseInt(image_width),
            camera_id,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            md5,
            image_path,
            timestamp: oneMinuteAgo,
            update_timestamp: oneMinuteAgo,
          },
        });
      } catch (error) {
        console.error('Error seeding row:', row);
        console.error(error);
      }
    })
    .on('end', () => {
      console.log(`${csvFilePath} file successfully processed`);
    });
}

async function UploadWeather() {
  const csvFilePath = 'Weather.csv';
  const oneMinuteAgo = GetOneMinuteAgo();

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', async (row) => {
      try {
        const { area, forecast } = row;

        await prisma.weather.create({
          data: {
            area,
            forecast,
            timestamp: oneMinuteAgo,
            update_timestamp: oneMinuteAgo,
          },
        });
      } catch (error) {
        console.error('Error seeding row:', row);
        console.error(error);
      }
    })
    .on('end', () => {
      console.log(`${csvFilePath} file successfully processed`);
    });
}

async function main() {
  UploadLocationMetadata();
  UploadTraffic();
  UploadWeather();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
