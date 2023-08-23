import React, { useState } from "react";
import {Paragraph} from '../../shared/style'
import { TrafficDto } from "../../dto";
import { DatetimeFormatter } from "../../shared/utils";
import MyCarousel from "../../shared/carousel";


interface TrafficDisplayProps {
  traffics: TrafficDto[];
}

const TrafficDisplay: React.FC<TrafficDisplayProps> = ({
  traffics,
}) => {
  return (
    <div>
      <h2>Traffic Image</h2>
      {(traffics.length > 0) ? (
        <div>
          <div className="location">
            <Paragraph>
              {`Location: ${traffics[0]?.location}`}
            </Paragraph>
          </div>
          <MyCarousel
            images={traffics}
          ></MyCarousel>
          <div className="correct-timestamp">
            <Paragraph>
              {`Correct as of: ${DatetimeFormatter(traffics[0]?.timestamp || null)}`}
            </Paragraph>
          </div>
        </div>
      ) : (
        <Paragraph>Please select location and date & time</Paragraph>
      )}
    </div>
  );
};

export default TrafficDisplay;
