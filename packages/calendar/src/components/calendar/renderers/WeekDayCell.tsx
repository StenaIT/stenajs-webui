import { Box, Clickable, SmallText, useThemeFields } from "@stenajs-webui/core";
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
  const { colors } = useThemeFields(
    {
      colors: {
        textColor: theme.WeekDay.textColor,
      },
    },
    [theme]
  );

  return (
    <Clickable
      onClick={
        onClickWeekDay ? (ev) => onClickWeekDay(day.dayOfWeek, ev) : undefined
      }
      disableFocusHighlight={!onClickWeekDay}
    >
      <Box
        width={theme.width}
        height={theme.height}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <SmallText color={colors.textColor}>{day.name}</SmallText>
      </Box>
    </Clickable>
  );
};
