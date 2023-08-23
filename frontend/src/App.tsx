import React, { useState, useEffect } from "react";
import "./App.css";
import DateAndTimeSelector from "./datetime/datetime";
import TrafficDisplay from "./traffic/traffic"
import { Dayjs } from "dayjs";
import ContainedButtons from './shared/button'
import {fetchTrafficUrl, fetchWeather} from './shared/datafetcher'
import LocationSelector from "./location/location";
import WeatherInfoProps from './weather/weather'
import { TrafficDto, WeatherDto } from "./dto";

function App() {
  const [datetime, setDatetime] = useState<Dayjs | null>(null);
  const [location, setLocation] = useState<string>('');
  const [traffic, setTraffic] = useState<TrafficDto | null>(null);
  const [weather, setWeather] = useState<WeatherDto | null>(null);

  const handleDatetimeChange = (newDatetime: Dayjs | null) => {
    const convertedDatetime = newDatetime?.add(8, 'hour') || null
    setDatetime(convertedDatetime);
  };

  const chooseLocation = (data: string) => {
    setLocation(data);
  };

  const handleSearchClick = async (location: string, datetime: Dayjs | null) => {
    if (location && datetime) {
      const traffic = await fetchTrafficUrl(location, datetime);
      const weather = await fetchWeather(location, datetime)
      setTraffic(traffic);
      setWeather(weather);
    } else {
      alert('Please check if datetime and location is selected.')
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <h2>Traffic and Weather App</h2>
      </header>

      <div className="top-component-grid">
        <div className="component">
          <DateAndTimeSelector
            datetime={datetime}
            onDatetimeChange={handleDatetimeChange}
          ></DateAndTimeSelector>
        </div>
        <div className="component">
          <LocationSelector onChange={chooseLocation}></LocationSelector>
        </div>

      </div>
      <div className="center-button">
        <ContainedButtons onClick={()=>handleSearchClick(location, datetime)}></ContainedButtons>
      </div>
      
      <div className="bottom-component-grid">
        <div className="component">
          <WeatherInfoProps 
            datetime={datetime} 
            weather={weather}></WeatherInfoProps>
        </div>

        <div className="component">
          <TrafficDisplay
            datetime={datetime}
            traffic={traffic}
          ></TrafficDisplay>
        </div>
      </div>

    </div>
  );
}

export default App;
