import { Box, Clickable, Text } from "@stenajs-webui/core";
import * as React from "react";
import { OnClickWeekDay } from "../../../types/CalendarTypes";
import { DayData } from "../../../util/calendar/CalendarDataFactory";
import { CalendarTheme } from "../CalendarTheme";

export interface WeekDayCellProps {
  onClickWeekDay?: OnClickWeekDay;
  day: DayData;
  theme: CalendarTheme;
}

export const WeekDayCell = ({
  onClickWeekDay,
  day,
  theme,
}: WeekDayCellProps) => {
  const content = (
    <Box
      width={theme.width}
      height={theme.height}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text
        size={"small"}
        color={
          onClickWeekDay
            ? theme.WeekDay.clickableTextColor
            : theme.WeekDay.textColor
        }
      >
        {day.name}
      </Text>
    </Box>
  );

  if (onClickWeekDay) {
    return (
      <Clickable
        borderRadius={"var(--swui-calendar-day-border-radius)"}
        onClick={(ev) => onClickWeekDay(day.dayOfWeek, ev)}
        disableFocusHighlight={!onClickWeekDay}
      >
        {content}
      </Clickable>
    );
  }

  return content;
};
