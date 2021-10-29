import {
  DateRangeCalendar,
  DateRangeCalendarProps,
} from "@stenajs-webui/calendar";
import * as React from "react";
import { useMemo, useState } from "react";
import { DateRangeFocusedInput } from "@stenajs-webui/calendar/dist/components/calendar-types/date-range-calendar/DateRangeCalendar";
import { Box } from "@stenajs-webui/core";
import { parse } from "date-fns";

interface DateRangeCalendarSectionProps
  extends Omit<
    DateRangeCalendarProps<{}>,
    "focusedInput" | "setFocusedInput" | "startDate" | "endDate"
  > {
  startDate: string | undefined;
  endDate: string | undefined;
}

export const DateRangeCalendarSection: React.FC<DateRangeCalendarSectionProps> = ({
  startDate,
  endDate,
  ...dateRangeCalendarProps
}) => {
  const [focusedInput, setFocusedInput] = useState<DateRangeFocusedInput>(
    "startDate"
  );

  const startDateObj = useMemo(
    () => (startDate ? parse(startDate, "yyyy-MM-dd", new Date()) : undefined),
    [startDate]
  );

  const endDateObj = useMemo(
    () => (endDate ? parse(endDate, "yyyy-MM-dd", new Date()) : undefined),
    [endDate]
  );

  return (
    <Box flex={1} alignItems={"center"}>
      <Box background={"white"} indent>
        <DateRangeCalendar
          setFocusedInput={setFocusedInput}
          focusedInput={focusedInput}
          startDate={startDateObj}
          endDate={endDateObj}
          {...dateRangeCalendarProps}
        />
      </Box>
    </Box>
  );
};
