import React, { useState, useEffect } from "react";
import "./App.css";
import DateAndTimeSelector from "./datetime/datetime";
import TrafficDisplay from "./traffic/traffic"
import { Dayjs } from "dayjs";
import ContainedButtons from './shared/button'
import {fetchImageUrl} from './shared/datafetcher'
import LocationSelector from "./location/location";


function App() {
  const [datetime, setDatetime] = useState<Dayjs | null>(null);
  const [location, setLocation] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>();

  const handleDatetimeChange = (newDatetime: Dayjs | null) => {
    setDatetime(newDatetime);
  };

  const chooseLocation = (data: string) => {
    console.log(`data: ${data}`)
    setLocation(data);
  };

  const handleSearchClick = async (name: string) => {
    const imageUrl = await fetchImageUrl(name)
    setImageUrl(imageUrl)
    console.log(imageUrl)
  }

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
          <LocationSelector onChange={chooseLocation}></LocationSelector>
          {location && (<p>{location}</p>)}
        </div>
      </div>

      <ContainedButtons onClick={()=>handleSearchClick(location)}></ContainedButtons>
      
      <div>
        <h2>Traffic Image</h2>
        <p>{`Location: ${location}`}</p>
        { imageUrl ? (<img src={imageUrl} alt="Traffic" width="500" height="300"/>) 
          : <p>Please select location and date & time</p>}
      </div>
      <div>
        <TrafficDisplay 
          datetime={datetime}
          location={location}
        ></TrafficDisplay>
      </div>

    </div>
  );
}

export default App;
