import { Box, useDelayedFalse } from "@stenajs-webui/core";
import { stenaArrowRight } from "@stenajs-webui/elements";
import {
  TextInputProps,
  ValueAndOnValueChangeProps,
} from "@stenajs-webui/forms";
import { Popover } from "@stenajs-webui/tooltip";
import { isAfter } from "date-fns";
import * as React from "react";
import { useMemo, useRef } from "react";
import { defaultPopoverPlacement } from "../../../config/DefaultPopoverPlacement";
import {
  DualTextInput,
  DualTextInputProps,
} from "../../../features/dual-text-input/DualTextInput";
import { CalendarWithMonthSwitcher } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import { buildDayStateForSingleMonth } from "../../../util/calendar/StateModifier";
import { useDateRangeEffects } from "./hooks/UseDateRangeEffects";
import { useDateRangeHandlers } from "./hooks/UseDateRangeHandlers";
import { useInputStates } from "./hooks/UseInputStates";
import { useUserInputHandlers } from "./hooks/UseUserInputHandlers";
import { DateRangeInputCalendarProps } from "../../calendar-types/date-range-calendar/DateRangeCalendar";
import { OptionalMinMaxDatesAsString } from "../../../types/CalendarTypes";
import { DateRange } from "../../../types/DateRange";
import { defaultMaxDate } from "../../../config/DefaultMaxDate";

export interface DateRangeDualTextInputProps<TData = unknown>
  extends ValueAndOnValueChangeProps<DateRange>,
    OptionalMinMaxDatesAsString,
    Pick<DualTextInputProps, "widthLeft" | "widthRight" | "variant"> {
  onEsc?: () => void;
  onEnter?: () => void;
  onBlur?: () => void;
  autoFocus?: boolean;
  calendarProps?: DateRangeInputCalendarProps<TData>;
  disabled?: boolean;
}

export function DateRangeDualTextInput<TData>({
  value,
  onValueChange,
  autoFocus,
  onBlur,
  onEnter,
  onEsc,
  minDate,
  maxDate = defaultMaxDate,
  calendarProps,
  widthLeft = 128,
  widthRight = 128,
  variant,
  disabled,
}: DateRangeDualTextInputProps<TData>) {
  const { startDate, endDate } = value || {};

  const startDateInputRef: TextInputProps["inputRef"] = useRef(null);
  const endDateInputRef: TextInputProps["inputRef"] = useRef(null);

  const states = useInputStates(startDate, endDate);

  const {
    dateInFocus,
    setDateInFocus,
    isCalendarVisible,
    currentPanel,
    setCurrentPanel,
  } = states;

  const {
    showCalendar,
    hideCalendar,
    inputLeftChangeHandler,
    inputRightChangeHandler,
  } = useDateRangeHandlers(startDate, endDate, onValueChange, states);

  const {
    onKeyDownHandler,
    onFocusRight,
    onFocusLeft,
    onClickDay,
    onClickCalendarButton,
    onClickArrowButton,
  } = useUserInputHandlers(
    startDate,
    endDate,
    onValueChange,
    startDateInputRef,
    endDateInputRef,
    showCalendar,
    hideCalendar,
    states
  );

  useDateRangeEffects(
    startDate,
    endDate,
    setDateInFocus,
    startDateInputRef,
    endDateInputRef
  );

  const startDateIsAfterEnd = useMemo(
    () => startDate && endDate && isAfter(startDate, endDate),
    [startDate, endDate]
  );

  const statePerMonth = useMemo(
    () =>
      buildDayStateForSingleMonth(
        calendarProps?.statePerMonth,
        startDate,
        endDate,
        dateInFocus
      ),
    [calendarProps?.statePerMonth, startDate, endDate, dateInFocus]
  );

  const delayedIsCalendarVisible = useDelayedFalse(isCalendarVisible, 300);

  return (
    <Box onKeyDown={onKeyDownHandler}>
      <Popover
        arrow={false}
        lazy
        disabled={disabled}
        placement={defaultPopoverPlacement}
        onClickOutside={hideCalendar}
        visible={isCalendarVisible}
        content={
          delayedIsCalendarVisible && (
            <CalendarWithMonthSwitcher
              onClickDay={onClickDay}
              dateInFocus={dateInFocus}
              setDateInFocus={setDateInFocus}
              currentPanel={currentPanel}
              setCurrentPanel={setCurrentPanel}
              minDate={minDate}
              maxDate={maxDate}
              {...calendarProps}
              statePerMonth={statePerMonth}
            />
          )
        }
      >
        <DualTextInput
          autoFocusLeft={autoFocus}
          onEsc={onEsc}
          onEnter={onEnter}
          onBlur={onBlur}
          disabled={disabled}
          separatorIcon={stenaArrowRight}
          typeLeft={"date"}
          typeRight={"date"}
          placeholderLeft={"Start date"}
          placeholderRight={"End date"}
          onChangeLeft={inputLeftChangeHandler}
          onChangeRight={inputRightChangeHandler}
          onClickArrowDown={onClickArrowButton}
          onClickCalendar={onClickCalendarButton}
          onFocusLeft={onFocusLeft}
          onFocusRight={onFocusRight}
          onClickLeft={onFocusLeft}
          onClickRight={onFocusRight}
          inputRefLeft={startDateInputRef}
          inputRefRight={endDateInputRef}
          variant={startDateIsAfterEnd ? "error" : variant}
          widthLeft={widthLeft}
          widthRight={widthRight}
          minLeft={minDate}
          maxLeft={maxDate}
          minRight={minDate}
          maxRight={maxDate}
        />
      </Popover>
    </Box>
  );
}
