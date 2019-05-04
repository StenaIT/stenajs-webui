import { Box, StandardText } from "@stenajs-webui/core";
import * as React from "react";
import { OnClickWeekDay } from "../../types/CalendarTypes";
import { DayData } from "../../util/CalendarDataFactory";
import { CalendarTheme } from "../CalendarTheme";

export interface WeekDayCellProps {
  onClickWeekDay?: OnClickWeekDay;
  day: DayData;
  theme: CalendarTheme;
}

export const WeekDayCell = ({
  onClickWeekDay,
  day,
  theme
}: WeekDayCellProps) => (
  <div
    onClick={onClickWeekDay ? () => onClickWeekDay(day.dayOfWeek) : undefined}
  >
    <Box
      width={theme.width}
      height={theme.height}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <StandardText color={theme.WeekDay.textColor}>{day.name}</StandardText>
    </Box>
  </div>
);
