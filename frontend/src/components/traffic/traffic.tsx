import React from "react";
import {Paragraph} from '../../shared/style'
import { TrafficDto } from "../../dto";
import { DatetimeFormatter } from "../../shared/utils";


interface TrafficDisplayProps {
  traffic: TrafficDto | null;
}

const TrafficDisplay: React.FC<TrafficDisplayProps> = ({
  traffic,
}) => {  
  
  const formatTimestamp = DatetimeFormatter(traffic?.timestamp || null)

  return (
    <div>
      <h2>Traffic Image</h2>
      {traffic && (
        <div>
          <Paragraph>{`Location: ${traffic.location}`}</Paragraph>
          <img src={traffic.image_url} alt="Traffic" width="500" height="300" />
          <Paragraph>{`Correct as of: ${formatTimestamp}`}</Paragraph>
        </div>
      ) || (
        <Paragraph>Please select location and date & time</Paragraph>
      )}
    </div>
  );
};

export default TrafficDisplay;
