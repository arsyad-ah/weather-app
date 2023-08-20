import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import DateAndTimeSelector from "./datetime/datetime";
import { Dayjs } from "dayjs";

import LocationSelector from "./location/location";

const URL = "http://localhost:3344/traffic/fetch?location_id=2";

interface WeatherDto {
  timestamp: string;
  image_path: string;
}

function App() {
  const [datetime, setDatetime] = useState<Dayjs | null>(null);
  

  const [imageUrl, setImageUrl] = useState();

  const imagePath = "assets/images/test-image.jpg";
  // const imagePath = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fimages%2Fanimals%2Fcat&psig=AOvVaw0qFlcnkfwTrBT3D_GR62tg&ust=1692606649289000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJCOsqLp6oADFQAAAAAdAAAAABAE';

  const fetchData = async (url: any) =>
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Assuming the response contains the column value
        const bucketPath = response.data.data.image_path;
        setImageUrl(bucketPath);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  useEffect(() => {
    fetchData(URL);
  }, []);

  const handleDatetimeChange = (newDatetime: Dayjs | null) => {
    setDatetime(newDatetime);
  };

  const [location, setLocation] = useState('No location');
  const chooseLocation = (data: string) => {
    setLocation(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>My App</h2>
      </header>

      <div className="selectors-container">
        <div className="selector-column">
          <DateAndTimeSelector
            datetime={datetime}
            onDatetimeChange={handleDatetimeChange}
          ></DateAndTimeSelector>
        </div>
        <div className="selector-column">
          <LocationSelector chooseLocation={chooseLocation}></LocationSelector>
          {location && (<p>{location}</p>)}
        </div>
      </div>


      <div>
        <h2>Traffic Image</h2>
        <p>{`Location: ${location}`}</p>
        <img src={imagePath} alt="Traffic" />
      </div>

    </div>
  );
}

export default App;
