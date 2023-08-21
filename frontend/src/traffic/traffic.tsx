import React, { useState, useEffect } from "react";
import { fetchImageUrl } from '../shared/datafetcher'
import { Dayjs } from "dayjs";
import {Paragraph} from '../shared/style'


interface TrafficDisplayProps {
  datetime: Dayjs | null;
  location: string;
  imageUrl: string | null;
  onLocationChange: (newLocation: string) => void;
}

const TrafficDisplay: React.FC<TrafficDisplayProps> = ({
  datetime,
  location,
  imageUrl,
  onLocationChange
}) => {
  const [currentLocation, setCurrentLocation] = useState<string>();

  useEffect(()=> setCurrentLocation(location))

  return (
    <div>
      <h2>Traffic Image</h2>
      {imageUrl && (
        <Paragraph>
          <p>{`Location: ${currentLocation}`}</p>
          <img src={imageUrl} alt="Traffic" width="500" height="300" />
          <p>{`Correct as of: ${datetime}`}</p>
        </Paragraph>
      ) || (
        <Paragraph>Please select location and date & time</Paragraph>
      )}
    </div>
  );
};

export default TrafficDisplay;

