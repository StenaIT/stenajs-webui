import {
  Box,
  Column,
  useDelayedFalse,
  useMultiOnClickOutside,
} from "@stenajs-webui/core";
import { stenaArrowRight } from "@stenajs-webui/elements";
import {
  TextInputProps,
  ValueAndOnValueChangeProps,
} from "@stenajs-webui/forms";
import { Popover } from "@stenajs-webui/tooltip";
import { isAfter } from "date-fns";
import * as React from "react";
import { useMemo, useRef } from "react";
import { DateRangeOnChangeValue } from "../../../features/date-range/hooks/UseDateRangeOnClickDayHandler";
import { DualTextInput } from "../../../features/dual-text-input/DualTextInput";
import { CalendarWithMonthSwitcher } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import { buildDayStateForSingleMonth } from "../../../util/calendar/StateModifier";
import { useDateRangeEffects } from "./hooks/UseDateRangeEffects";
import { useDateRangeHandlers } from "./hooks/UseDateRangeHandlers";
import { useInputStates } from "./hooks/UseInputStates";
import { useUserInputHandlers } from "./hooks/UseUserInputHandlers";

export interface DateRangeDualTextInputProps
  extends ValueAndOnValueChangeProps<DateRangeOnChangeValue> {}

export const DateRangeDualTextInput: React.FC<DateRangeDualTextInputProps> = ({
  value,
  onValueChange,
}) => {
  const { startDate, endDate } = value || {};

  const popoverRef = useRef(null);
  const containerRef = useRef(null);
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
      buildDayStateForSingleMonth(undefined, startDate, endDate, dateInFocus),
    [startDate, endDate, dateInFocus]
  );

  useMultiOnClickOutside([popoverRef, containerRef], hideCalendar);

  const delayedIsCalendarVisible = useDelayedFalse(isCalendarVisible, 300);

  return (
    <Box ref={containerRef} onKeyDown={onKeyDownHandler}>
      <Popover
        arrow={false}
        lazy
        placement={"bottom"}
        visible={isCalendarVisible}
        content={
          delayedIsCalendarVisible && (
            <Column ref={popoverRef}>
              <CalendarWithMonthSwitcher
                statePerMonth={statePerMonth}
                onClickDay={onClickDay}
                dateInFocus={dateInFocus}
                setDateInFocus={setDateInFocus}
                currentPanel={currentPanel}
                setCurrentPanel={setCurrentPanel}
              />
            </Column>
          )
        }
      >
        <DualTextInput
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
          variant={startDateIsAfterEnd ? "error" : undefined}
        />
      </Popover>
    </Box>
  );
};
