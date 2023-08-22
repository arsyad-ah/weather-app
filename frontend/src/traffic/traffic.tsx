import React, { useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import {Paragraph} from '../shared/style'
import { TrafficDto } from "../dto";


interface TrafficDisplayProps {
  datetime: Dayjs | null;
  traffic: TrafficDto | null;
}

const TrafficDisplay: React.FC<TrafficDisplayProps> = ({
  datetime,
  traffic,
}) => {  
  
  return (
    <div>
      <h2>Traffic Image</h2>
      {traffic && (
        <Paragraph>
          <p>{`Location: ${traffic.location}`}</p>
          <img src={traffic.image_url} alt="Traffic" width="500" height="300" />
          <p>{`Correct as of: ${datetime}`}</p>
        </Paragraph>
      ) || (
        <Paragraph>Please select location and date & time</Paragraph>
      )}
    </div>
  );
};

export default TrafficDisplay;

