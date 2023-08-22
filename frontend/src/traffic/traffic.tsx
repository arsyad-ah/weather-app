import React, { useState, useEffect } from "react";
import { fetchImageUrl } from '../shared/datafetcher'
import { Dayjs } from "dayjs";
import {Paragraph} from '../shared/style'
import { TrafficDto } from "../dto";


interface TrafficDisplayProps {
  datetime: Dayjs | null;
  image: TrafficDto | null;
}

const TrafficDisplay: React.FC<TrafficDisplayProps> = ({
  datetime,
  image,
}) => {  
  
  return (
    <div>
      <h2>Traffic Image</h2>
      {image && (
        <Paragraph>
          <p>{`Location: ${image.location}`}</p>
          <img src={image.image_url} alt="Traffic" width="500" height="300" />
          <p>{`Correct as of: ${datetime}`}</p>
        </Paragraph>
      ) || (
        <Paragraph>Please select location and date & time</Paragraph>
      )}
    </div>
  );
};

export default TrafficDisplay;

