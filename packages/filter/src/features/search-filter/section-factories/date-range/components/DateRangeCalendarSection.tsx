import {
  DateRangeCalendar,
  DateRangeCalendarProps,
  DateRangeFocusedInput,
} from "@stenajs-webui/calendar";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { Box } from "@stenajs-webui/core";
import { format, parse } from "date-fns";
import {
  SearchFilterSection,
  SearchFilterSectionProps,
} from "../../../components/SearchFilterSection";
import {
  SearchFilterActions,
  SearchFilterDispatch,
} from "../../../redux/SearchFilterRedux";
import { useSearchFilterDispatch } from "../../../context/SearchFilterDispatchContext";
import { useSearchFilterActions } from "../../../context/SearchFilterActionsContext";

interface DateRangeCalendarSectionOnChangeValue {
  startDate?: string;
  endDate?: string;
}

export interface DateRangeCalendarSectionProps<
  TFormModel,
  TSectionKey extends string
> extends SearchFilterSectionProps<TSectionKey>,
    Omit<
      DateRangeCalendarProps<{}>,
      | "focusedInput"
      | "setFocusedInput"
      | "startDate"
      | "endDate"
      | "onChange"
      | "setStartDate"
      | "setEndDate"
    > {
  value: DateRangeCalendarSectionOnChangeValue;
  onValueChange: (
    value: DateRangeCalendarSectionOnChangeValue,
    options: SetDateOptions<TFormModel, TSectionKey>
  ) => void;
}

export interface SetDateOptions<TFormModel, TSectionKey extends string> {
  dispatch: SearchFilterDispatch<TFormModel>;
  actions: SearchFilterActions<TFormModel, TSectionKey>;
}

export const DateRangeCalendarSection = <
  TFormModel,
  TSectionKey extends string
>({
  value,
  onValueChange,
  sectionId,
  ...dateRangeCalendarProps
}: DateRangeCalendarSectionProps<TFormModel, TSectionKey>) => {
  const dispatch = useSearchFilterDispatch();
  const actions = useSearchFilterActions<TFormModel, TSectionKey>();

  const options = useMemo<SetDateOptions<TFormModel, TSectionKey>>(
    () => ({ dispatch, actions }),
    [actions, dispatch]
  );
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

  const setStartDate = useCallback(
    (startDate: Date) => {
      onValueChange(
        { startDate: format(startDate, "yyyy-MM-dd"), endDate },
        options
      );
    },
    [endDate, onValueChange, options]
  );

  const setEndDate = useCallback(
    (endDate: Date) => {
      onValueChange(
        { startDate, endDate: format(endDate, "yyyy-MM-dd") },
        options
      );
    },
    [onValueChange, options, startDate]
  );

  return (
    <SearchFilterSection sectionId={sectionId}>
      <Box flex={1} alignItems={"center"}>
        <Box background={"white"} indent>
          <DateRangeCalendar
            setFocusedInput={setFocusedInput}
            focusedInput={focusedInput}
            startDate={startDateObj}
            endDate={endDateObj}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            {...dateRangeCalendarProps}
          />
        </Box>
      </Box>
    </SearchFilterSection>
  );
};
