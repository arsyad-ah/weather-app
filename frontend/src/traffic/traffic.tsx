import React, { useState, useEffect } from "react";
import axios from "axios";

interface TrafficDisplayProps {
  location: string;
  datetime: string;
}

const TrafficDisplay: React.FC<TrafficDisplayProps> = ({
  datetime,
  location,
}) => {
  const [imagePath, setImagePath] = useState("");

  // const fetchData = async () =>
  //   await axios.get('localhost:3344/traffic/fetch?location_id=2')
  //     .then(response => {
  //       // Assuming the response contains the column value
  //       const bucketPath = response.data.image_path;

  //       // Construct the image path based on the column value
  //       return bucketPath;
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     })

  // const data = fetchData()
  // console.log(data);

  // useEffect(() => {
  //     // Fetch the data from the database using an API call
  //     axios.get('http://localhost:3344/traffic/fetch?location_id=2')
  //       .then(response => {
  //         // Assuming the response contains the column value
  //         const bucketPath = response.data.image_path;

  //         // Construct the image path based on the column value
  //         setImagePath(bucketPath);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching data:', error);
  //       });
  //   }, []);

  return (
    <div>
      <h2>Selected Image</h2>
      <p>{`Selected Location: ${location}`}</p>
      <img src={imagePath} alt="Traffic" />
    </div>
  );
};

export default TrafficDisplay;
