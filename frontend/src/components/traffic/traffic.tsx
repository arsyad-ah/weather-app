import React from "react";
import {Paragraph} from '../../shared/style'
import { TrafficDto } from "../../dto";
import { DatetimeFormatter } from "../../shared/utils";
import MyCarousel from "../../shared/carousel";
import { IMAGE_PATH, PLACEHOLDER_IMAGE } from "../../shared/constants";

interface TrafficDisplayProps {
  traffics: TrafficDto[];
}

const TrafficDisplayWrapper: React.FC<TrafficDisplayProps> = ({
  traffics,
}) => {
  let content: JSX.Element;

  if (!traffics) {
    content = (<div>
      <Paragraph>{`Traffic image for is unavailable. Please check if datetime or location is correct.`}</Paragraph>
      <img src={`${IMAGE_PATH}/${PLACEHOLDER_IMAGE}`}></img>
    </div>)
  } else {
    if (traffics.length > 0) {
      content = (
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
      )
    } else {
      content = (<Paragraph>Please select location and date & time</Paragraph>)
    }
  }
  return (
    <div>
      <h2>Traffic Image</h2>
      {content}
    </div>
  );
};

export default TrafficDisplayWrapper;
