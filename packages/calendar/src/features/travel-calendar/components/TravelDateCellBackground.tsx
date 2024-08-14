import * as React from "react";
import { Box, Row } from "@stenajs-webui/core";
import { TravelCalendarSizeVariant } from "./TravelCalendar";
import styles from "./TravelDateCellBackground.module.css";
import cx from "classnames";

export interface TravelDateCellBackgroundProps {
  calendarSize: TravelCalendarSizeVariant;
  bgColorLeft: string;
  bgColorRight: string;
}

export const TravelDateCellBackground: React.FC<
  TravelDateCellBackgroundProps
> = ({ calendarSize, bgColorLeft, bgColorRight }) => {
  return (
    <Row>
      <Box
        className={cx(styles.travelDateCellBackground, styles[calendarSize])}
        background={bgColorLeft}
      />
      <Box
        className={cx(styles.travelDateCellBackground, styles[calendarSize])}
        background={bgColorRight}
      />
    </Row>
  );
};
