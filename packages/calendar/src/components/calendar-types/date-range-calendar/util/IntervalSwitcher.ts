import { isAfter } from "date-fns";

export const toggleDatesIfEndIsEarlierThanStart = (
  startDate: Date | undefined,
  endDate: Date | undefined
) => {
  if (startDate && endDate && isAfter(startDate, endDate)) {
    return {
      startDate: endDate,
      endDate: startDate
    };
  }
  return {
    startDate,
    endDate
  };
};
