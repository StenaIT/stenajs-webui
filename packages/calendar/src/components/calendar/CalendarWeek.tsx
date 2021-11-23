import * as React from "react";
import {
  CalendarDayProps,
  CalendarUserWeekData,
  DayState,
  DayStateHighlight,
  ExtraDayContentProps,
  OnClickDay,
  OnClickWeek,
  OptionalMinMaxDates,
  RenderWeekNumber,
} from "../../types/CalendarTypes";
import { MonthData, WeekData } from "../../util/calendar/CalendarDataFactory";

import { CalendarTheme } from "./CalendarTheme";
import { WeekNumberCell } from "./renderers/WeekNumberCell";

export interface CalendarWeekProps<T> extends OptionalMinMaxDates {
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

export function CalendarWeek<T>({
  week,
  month,
  dayComponent: DayComponent,
  statePerWeekDay,
  userDataPerWeekDay,
  minDate,
  maxDate,
  onClickWeek,
  onClickDay,
  theme,
  renderWeekNumber,
  extraDayContent,
  defaultHighlights,
}: CalendarWeekProps<T>) {
  return (
    <tr key={week.weekNumber}>
      {theme.WeekNumber.show && (
        <td>
          {renderWeekNumber ? (
            renderWeekNumber(week, theme, onClickWeek)
          ) : (
            <WeekNumberCell
              week={week}
              onClickWeek={onClickWeek}
              theme={theme}
            />
          )}
        </td>
      )}
      {week.days.map((day) => (
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
          minDate={minDate}
          maxDate={maxDate}
        />
      ))}
    </tr>
  );
}
