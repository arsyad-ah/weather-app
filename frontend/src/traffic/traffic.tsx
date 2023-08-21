import React, { useState, useEffect } from "react";
import { fetchImageUrl } from '../shared/datafetcher'
import { Dayjs } from "dayjs";

interface TrafficDisplayProps {
  datetime: Dayjs | null;
  location: string;
}

const TrafficDisplay: React.FC<TrafficDisplayProps> = ({
  datetime,
  location,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>();

  const handleFetchTrafficUrl = async (location: string) => {
    const fetchedImageUrl = await fetchImageUrl(location);
    setImageUrl(fetchedImageUrl);
  };

  console.log(datetime?.tz('Asia/Singapore'))
  useEffect(() => {
    if (location) {handleFetchTrafficUrl(location)}}, [location]);

  return (

    <div>
      <h2>Traffic Image</h2>
      <p>{`Location: ${location}`}</p>
      { imageUrl ? (<img src={imageUrl} alt="Traffic" width="500" height="300"/>) 
        : <p>Please select location and date & time</p>}
    </div>
  );
};

export default TrafficDisplay;
