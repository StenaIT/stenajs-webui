import * as React from 'react';
import {
  CalendarUserWeekData,
  DayState,
  DayStateHighlight,
  ExtraDayContentProps,
  OnClickDay,
  OnClickWeek,
  RenderWeekNumber,
} from '../types/CalendarTypes';
import { MonthData, WeekData } from '../util/CalendarDataFactory';
import { CalendarDayProps } from '../types/CalendarTypes';
import { CalendarTheme } from './CalendarTheme';
import { WeekNumberCell } from './renderers/WeekNumberCell';

export interface CalendarWeekProps<T> {
  dayComponent: React.ComponentType<CalendarDayProps<T>>;
  week: WeekData;
  month: MonthData;
  statePerWeekDay?: CalendarUserWeekData<DayState>;
  userDataPerWeekDay?: CalendarUserWeekData<T>;
  onClickWeek?: OnClickWeek;
  onClickDay?: OnClickDay<T>;
  theme: CalendarTheme;
  renderWeekNumber?: RenderWeekNumber;
  extraDayContent?: React.ComponentType<ExtraDayContentProps<T>>;
  defaultHighlights?: Array<DayStateHighlight>;
}

export const CalendarWeek = <T extends {}>({
  week,
  month,
  dayComponent: DayComponent,
  statePerWeekDay,
  userDataPerWeekDay,
  onClickWeek,
  onClickDay,
  theme,
  renderWeekNumber,
  extraDayContent,
  defaultHighlights,
}: CalendarWeekProps<T>) => (
  <tr key={week.weekNumber}>
    <td>
      {renderWeekNumber ? (
        renderWeekNumber(week, theme, onClickWeek)
      ) : (
        <WeekNumberCell week={week} onClickWeek={onClickWeek} theme={theme} />
      )}
    </td>
    {week.days.map(day => (
      <DayComponent
        key={day.dateString}
        day={day}
        week={week}
        month={month}
        dayState={statePerWeekDay && statePerWeekDay[day.dayOfMonth]}
        userData={userDataPerWeekDay && userDataPerWeekDay[day.dayOfMonth]}
        onClickDay={onClickDay}
        theme={theme}
        extraDayContent={extraDayContent}
        defaultHighlights={defaultHighlights}
      />
    ))}
  </tr>
);
