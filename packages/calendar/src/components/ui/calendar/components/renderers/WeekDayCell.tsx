import * as React from 'react';
import { Column } from '../../../../layout';
import { DefaultText } from '../../../../text';
import { DayData } from '../../util/CalendarDataFactory';
import { OnClickWeekDay } from '../../types/CalendarTypes';
import { CalendarTheme } from '../CalendarTheme';

export interface WeekDayCellProps {
  onClickWeekDay?: OnClickWeekDay;
  day: DayData;
  theme: CalendarTheme;
}

export const WeekDayCell = ({
  onClickWeekDay,
  day,
  theme,
}: WeekDayCellProps) => (
  <div
    onClick={onClickWeekDay ? () => onClickWeekDay(day.dayOfWeek) : undefined}
  >
    <Column
      width={theme.width}
      height={theme.height}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <DefaultText color={theme.WeekDay.textColor}>{day.name}</DefaultText>
    </Column>
  </div>
);
