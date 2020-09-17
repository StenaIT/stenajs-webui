import * as React from "react";
import { useState } from "react";
import { CalendarProps } from "../../types/CalendarTypes";
import { Calendar } from "../../components/calendar/Calendar";
import { Months } from "../../util/calendar/CalendarDataFactory";
import { MonthPicker } from "../month-picker/MonthPicker";
import { YearPicker } from "../year-picker/YearPicker";
import { Box } from "@stenajs-webui/core";
import { PrimaryButton } from "@stenajs-webui/elements";

interface CalendarWithMonthYearPickersProps<T> extends CalendarProps<T> {}

type PopoverMode = "calendar" | "year" | "month";

export const CalendarWithMonthYearPickers = function CalendarWithMonthYearPickers<
  T
>(props: CalendarWithMonthYearPickersProps<T>) {
  const [selectedMonth, setSelectedMonth] = useState<Months>(() =>
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(() =>
    new Date().getFullYear()
  );

  const [mode, setMode] = useState<PopoverMode>("calendar");

  switch (mode) {
    case "calendar":
      return (
        <>
          <Calendar<T>
            {...props}
            month={selectedMonth}
            year={selectedYear}
            onClickMonth={() => setMode("month")}
            onClickYear={() => setMode("year")}
          />
        </>
      );
    case "month":
      return (
        <MonthPicker value={selectedMonth} onValueChange={setSelectedMonth} />
      );
    case "year":
      return (
        <YearPicker value={selectedYear} onValueChange={setSelectedYear} />
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
