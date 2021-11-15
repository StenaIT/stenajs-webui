import {
  DateRangeCalendar,
  DateRangeCalendarProps,
  DateRangeFocusedInput,
} from "@stenajs-webui/calendar";
import * as React from "react";
import { useMemo, useState } from "react";
import { Box } from "@stenajs-webui/core";
import { parse } from "date-fns";
import {
  SearchFilterSection,
  SearchFilterSectionProps,
} from "../../../components/SearchFilterSection";

interface DateRangeCalendarSectionOnChangeValue {
  startDate?: string;
  endDate?: string;
}

interface DateRangeCalendarSectionProps<TFormModel, TSectionKey extends string>
  extends SearchFilterSectionProps<TFormModel, TSectionKey>,
    Omit<
      DateRangeCalendarProps<{}>,
      "focusedInput" | "setFocusedInput" | "startDate" | "endDate" | "onChange"
    > {
  value: DateRangeCalendarSectionOnChangeValue;
}

export const DateRangeCalendarSection = <
  TFormModel,
  TSectionKey extends string
>({
  value,
  sectionId,
  state,
  actions,
  dispatch,
  ...dateRangeCalendarProps
}: DateRangeCalendarSectionProps<TFormModel, TSectionKey>) => {
  const [focusedInput, setFocusedInput] = useState<DateRangeFocusedInput>(
    "startDate"
  );

  const { startDate, endDate } = value ?? {};

  const startDateObj = useMemo(
    () => (startDate ? parse(startDate, "yyyy-MM-dd", new Date()) : undefined),
    [startDate]
  );

  const endDateObj = useMemo(
    () => (endDate ? parse(endDate, "yyyy-MM-dd", new Date()) : undefined),
    [endDate]
  );

  return (
    <SearchFilterSection
      sectionId={sectionId}
      state={state}
      actions={actions}
      dispatch={dispatch}
    >
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
    </SearchFilterSection>
  );
};
