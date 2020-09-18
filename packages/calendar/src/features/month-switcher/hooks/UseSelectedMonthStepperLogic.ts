import { addMonths, addYears, subMonths, subYears } from "date-fns";
import { useCallback } from "react";

export const useSelectedMonthStepperLogic = (
  dateInFocus: Date,
  setDateInFocus?: (dateInFocus: Date) => void,
  monthsPerRow?: number,
  numMonths?: number
) => {
  const nextMonth = useCallback(() => {
    const d = addMonths(dateInFocus, monthsPerRow ?? numMonths ?? 1);
    setDateInFocus?.(d);
  }, [setDateInFocus, dateInFocus, monthsPerRow, numMonths]);

  const nextYear = useCallback(() => {
    const d = addYears(dateInFocus, 1);
    setDateInFocus?.(d);
  }, [setDateInFocus, dateInFocus]);

  const prevMonth = useCallback(() => {
    const d = subMonths(dateInFocus, monthsPerRow ?? numMonths ?? 1);
    setDateInFocus?.(d);
  }, [setDateInFocus, dateInFocus, monthsPerRow, numMonths]);

  const prevYear = useCallback(() => {
    const d = subYears(dateInFocus, 1);
    setDateInFocus?.(d);
  }, [setDateInFocus, dateInFocus]);

  return {
    nextMonth,
    prevMonth,
    nextYear,
    prevYear,
  };
};
