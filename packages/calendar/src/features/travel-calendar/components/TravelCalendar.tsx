import * as React from "react";
import {
  DayData,
  MonthData,
  WeekData,
} from "../../../util/calendar/CalendarDataFactory";
import { Text } from "@stenajs-webui/core";
import { TravelDateCell } from "./TravelDateCell";
import { isSameDay } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import styles from "./TravelCalendar.module.css";

export interface TravelCalendarProps {
  visibleMonthData: MonthData;
  onClickDate: (date: Date) => void;
  visibleMonth: Date;
  setVisibleMonth: (visibleMonth: Date) => void;
  isValidDateRange: boolean;
  setHoverDate: Dispatch<SetStateAction<Date | undefined>>;
  selectedStartDate: Date | undefined;
  selectedEndDate: Date | undefined;
  hoverDate: Date | undefined;
  today: Date;
  isDateDisabled: (date: Date) => boolean;
  calendarId: string;
  todayIsInVisibleMonth: boolean;
}

export const TravelCalendar: React.FC<TravelCalendarProps> = ({
  visibleMonthData,
  onClickDate,
  setHoverDate,
  setVisibleMonth,
  visibleMonth,
  isValidDateRange,
  selectedStartDate,
  selectedEndDate,
  hoverDate,
  today,
  calendarId,
  isDateDisabled,
  todayIsInVisibleMonth,
}) => {
  return (
    <table className={styles.travelCalendar}>
      <tbody>
        <tr>
          {visibleMonthData.weeks[0].days.map((day: DayData) => (
            <th key={day.name} abbr={day.fullName}>
              <Text>{day.name}</Text>
            </th>
          ))}
        </tr>
        {visibleMonthData.weeks.map((week: WeekData) => (
          <React.Fragment key={week.weekNumber}>
            <tr key={week.weekNumber}>
              {week.days.map((day) => (
                <TravelDateCell
                  onClick={(d) => onClickDate(d)}
                  key={day.dateString}
                  visibleMonth={visibleMonth}
                  onChangeVisibleMonth={setVisibleMonth}
                  isValidDateRange={isValidDateRange}
                  day={day}
                  onStartHover={(d) => setHoverDate(d)}
                  onEndHover={(d) =>
                    setHoverDate((p) => (p && isSameDay(p, d) ? undefined : p))
                  }
                  selectedStartDate={selectedStartDate}
                  selectedEndDate={selectedEndDate}
                  hoverDate={hoverDate}
                  today={today}
                  todayIsInVisibleMonth={todayIsInVisibleMonth}
                  calendarId={calendarId}
                  isDateDisabled={isDateDisabled}
                />
              ))}
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};
