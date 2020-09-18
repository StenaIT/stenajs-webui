import { addMonths, subMonths } from "date-fns";
import { useCallback, useState } from "react";

export const useMonthSwitcherLogic = (
  startDateInFocus: Date | undefined,
  monthsPerRow?: number,
  numMonths?: number
) => {
  const [date, setDate] = useState<Date>(startDateInFocus || new Date());

  const nextMonth = useCallback(() => {
    setDate(addMonths(date, monthsPerRow || numMonths || 1));
  }, [setDate, date, monthsPerRow, numMonths]);

  const prevMonth = useCallback(() => {
    setDate(subMonths(date, monthsPerRow || numMonths || 1));
  }, [setDate, date, monthsPerRow, numMonths]);

  return {
    nextMonth,
    prevMonth,
    date,
  };
};
