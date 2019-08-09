import { Box, StandardText, useThemeFields } from '@stenajs-webui/core';
import * as React from 'react';
import { OnClickWeekDay } from '../../../types/CalendarTypes';
import { DayData } from '../../../util/calendar/CalendarDataFactory';
import { CalendarTheme } from '../CalendarTheme';

export interface WeekDayCellProps {
  onClickWeekDay?: OnClickWeekDay;
  day: DayData;
  theme: CalendarTheme;
}

export const WeekDayCell = ({
  onClickWeekDay,
  day,
  theme
}: WeekDayCellProps) => {
  const { colors } = useThemeFields(
    {
      colors: {
        textColor: theme.WeekDay.textColor
      }
    },
    [theme]
  );

  return (
    <div
      onClick={onClickWeekDay ? () => onClickWeekDay(day.dayOfWeek) : undefined}
    >
      <Box
        width={theme.width}
        height={theme.height}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <StandardText color={colors.textColor}>{day.name}</StandardText>
      </Box>
    </div>
  );
};
