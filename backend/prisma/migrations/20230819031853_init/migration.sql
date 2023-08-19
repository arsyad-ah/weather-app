-- CreateTable
CREATE TABLE "Traffic" (
    "id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "image_height" INTEGER NOT NULL,
    "image_width" INTEGER NOT NULL,
    "camera_id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "md5" TEXT NOT NULL,
    "image_path" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "update_timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Traffic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weather" (
    "id" SERIAL NOT NULL,
    "area" TEXT NOT NULL,
    "forecast" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "update_timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Weather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationMetadata" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LocationMetadata_pkey" PRIMARY KEY ("id")
);