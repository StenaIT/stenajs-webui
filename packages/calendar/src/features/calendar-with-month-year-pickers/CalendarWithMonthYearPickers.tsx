import * as React from "react";
import { useCallback, useState } from "react";
import { CalendarProps } from "../../types/CalendarTypes";
import { Calendar } from "../../components/calendar/Calendar";
import { Months } from "../../util/calendar/CalendarDataFactory";
import { MonthPicker } from "../month-picker/MonthPicker";
import { YearPicker } from "../year-picker/YearPicker";
import { Box } from "@stenajs-webui/core";
import { PrimaryButton } from "@stenajs-webui/elements";

interface CalendarWithMonthYearPickersProps<T>
  extends Omit<CalendarProps<T>, "date" | "year" | "month"> {
  dateInFocus: Date;
  setDateInFocus: (dateInFocus: Date) => void;
}

type PopoverMode = "calendar" | "year" | "month";

export const CalendarWithMonthYearPickers = function CalendarWithMonthYearPickers<
  T
>({
  dateInFocus,
  setDateInFocus,
  ...props
}: CalendarWithMonthYearPickersProps<T>) {
  const onChangeSelectedMonth = useCallback(
    (selectedMonth: Months) => {
      const newDate = dateInFocus ? new Date(dateInFocus) : new Date();
      newDate.setMonth(selectedMonth);
      if (setDateInFocus) {
        setDateInFocus(newDate);
      }
    },
    [dateInFocus, setDateInFocus]
  );

  const onChangeSelectedYear = useCallback(
    (selectedYear: number) => {
      const newDate = dateInFocus ? new Date(dateInFocus) : new Date();
      newDate.setFullYear(selectedYear);
      if (setDateInFocus) {
        setDateInFocus(newDate);
      }
    },
    [dateInFocus, setDateInFocus]
  );

  const [mode, setMode] = useState<PopoverMode>("calendar");

  switch (mode) {
    case "calendar":
      return (
        <>
          <Calendar<T> {...props} date={dateInFocus} />
        </>
      );
    case "month":
      return (
        <MonthPicker
          value={dateInFocus.getMonth()}
          onValueChange={onChangeSelectedMonth}
        />
      );
    case "year":
      return (
        <YearPicker
          value={dateInFocus.getFullYear()}
          onValueChange={onChangeSelectedYear}
        />
      );
    default:
      return (
        <Box>
          <PrimaryButton
            label={"Show calendar"}
            onClick={() => setMode("calendar")}
          />
        </Box>
      );
  }
};
