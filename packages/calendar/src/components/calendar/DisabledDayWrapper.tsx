import * as React from "react";
import { useMemo } from "react";
import {
  CalendarDayProps,
  OptionalMinMaxDates,
} from "../../types/CalendarTypes";
import {
  isAfterOrSameDay,
  isBeforeOrSameDay,
} from "../../util/date/DateComparator";

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
  const isBeforeMinDate = useMemo(() => {
    if (!minDate) {
      return false;
    }
    return isBeforeOrSameDay(day.date, minDate);
  }, [day.date, minDate]);

  const isAfterMaxDate = useMemo(() => {
    if (!maxDate) {
      return false;
    }
    return isAfterOrSameDay(day.date, maxDate);
  }, [day.date, maxDate]);

  const disabledByMinMax = isBeforeMinDate || isAfterMaxDate;

  const activeDayState = useMemo(
    () =>
      disabledByMinMax
        ? { highlights: [...(dayState?.highlights ?? []), "disabled"] }
        : dayState,
    [dayState, disabledByMinMax]
  );

  return <DayComponent day={day} {...props} dayState={activeDayState} />;
};
