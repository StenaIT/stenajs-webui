import {
  DateRange,
  DateRangeCalendar,
  DateRangeCalendarProps,
  DateRangeFocusedInput,
  dateRangeToStrings,
  DateStringRange,
  stringsToDateRange,
} from "@stenajs-webui/calendar";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { Box } from "@stenajs-webui/core";
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

export interface DateRangeCalendarSectionProps<
  TFormModel,
  TSectionKey extends string
> extends Omit<
      SearchFilterSectionProps<TSectionKey>,
      "label" | "onRetry" | "error" | "loading"
    >,
    Omit<
      DateRangeCalendarProps<unknown>,
      "value" | "onValueChange" | "focusedInput" | "setFocusedInput"
    > {
  value: DateStringRange;
  onValueChange: (
    value: DateStringRange,
    options: SetDateOptions<TFormModel, TSectionKey>
  ) => void;
  label?: string;
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
  contentRight,
  disableContentPadding,
  label,
  leftIcon,
  ...dateRangeCalendarProps
}: DateRangeCalendarSectionProps<TFormModel, TSectionKey>) => {
  const dispatch = useSearchFilterDispatch();
  const actions = useSearchFilterActions<TFormModel, TSectionKey>();

  const options = useMemo<SetDateOptions<TFormModel, TSectionKey>>(
    () => ({ dispatch, actions }),
    [actions, dispatch]
  );
  const [focusedInput, setFocusedInput] =
    useState<DateRangeFocusedInput>("startDate");

  const dateRangeValue = useMemo(() => stringsToDateRange(value), [value]);

  const onValueChangeHandler = useCallback(
    (value: DateRange) => {
      onValueChange(dateRangeToStrings(value), options);
    },
    [onValueChange, options]
  );

  return (
    <SearchFilterSection
      label={label}
      leftIcon={leftIcon}
      sectionId={sectionId}
      contentRight={contentRight}
      disableContentPadding={disableContentPadding}
    >
      <Box flex={1} alignItems={"center"}>
        <Box background={"white"} indent>
          <DateRangeCalendar
            setFocusedInput={setFocusedInput}
            focusedInput={focusedInput}
            value={dateRangeValue}
            onValueChange={onValueChangeHandler}
            {...dateRangeCalendarProps}
          />
        </Box>
      </Box>
    </SearchFilterSection>
  );
};
