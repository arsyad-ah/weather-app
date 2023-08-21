import React, { useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import {Paragraph} from '../shared/style'

interface WeatherInfoProps {
  datetime: Dayjs | null;
  location: string;
  forecast: string;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ datetime, location, forecast }) => {
  
  return (
    <div>
      <h2>Weather Information</h2>
      {(location && datetime) ? (
        <div>
          <h5>{`Forecast: ${forecast}`}</h5>
          <Paragraph>{`Location: ${location}`}</Paragraph>
          <Paragraph>{`Correct as of: ${datetime}`}</Paragraph>
        </div>
      ) : <Paragraph>Please select location and date & time</Paragraph>}
    </div>
  );
};

export default WeatherInfo;
