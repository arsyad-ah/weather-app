import React, { useState, useEffect } from "react";

interface WeatherInfoProps {
  selectedDateTime: Date;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ selectedDateTime }) => {
  const [weatherInfo, setWeatherInfo] = useState<string>("");

  // Fetch weather information using an API call to NestJS backend based on selectedDateTime
  useEffect(() => {
    // Fetch weather information based on the selectedDateTime using an API call to the backend
    // Update the weatherInfo state with the response data
    // For demonstration purposes, let's assume weatherInfo is a string
    const mockWeatherInfo = "Sunny with a chance of clouds";
    setWeatherInfo(mockWeatherInfo);
  }, [selectedDateTime]);

  return (
    <div>
      <h2>Weather Information</h2>
      <p>{weatherInfo}</p>
    </div>
  );
};

export default WeatherInfo;
