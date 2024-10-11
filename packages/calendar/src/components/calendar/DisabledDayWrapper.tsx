import * as React from "react";
import { useMemo } from "react";
import {
  CalendarDayProps,
  OptionalMinMaxDates,
} from "../../types/CalendarTypes";
import { addDayStateHighlightsOnSingleDay } from "../../util/calendar/StateModifier";
import { isDateInMinMaxRange } from "../../util/date/DateMinMaxValidator";

interface DisabledDayWrapperProps<T>
  extends CalendarDayProps<T>,
    OptionalMinMaxDates {
  dayComponent: React.ComponentType<CalendarDayProps<T>>;
}

export const DisabledDayWrapper = function DisabledDayWrapper<T>({
  dayComponent: DayComponent,
  minDate,
  maxDate,
  dayState,
  day,
  ...props
}: DisabledDayWrapperProps<T>) {
  const activeDayState = useMemo(
    () =>
      !isDateInMinMaxRange(day.date, minDate, maxDate)
        ? addDayStateHighlightsOnSingleDay(dayState, ["disabled"])
        : dayState,
    [day.date, dayState, maxDate, minDate],
  );

  return <DayComponent day={day} {...props} dayState={activeDayState} />;
};
