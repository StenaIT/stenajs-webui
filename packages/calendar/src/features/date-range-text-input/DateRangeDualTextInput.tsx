import {
  Box,
  Column,
  useDelayedFalse,
  useMultiOnClickOutside,
} from "@stenajs-webui/core";
import {
  TextInputProps,
  ValueAndOnValueChangeProps,
} from "@stenajs-webui/forms";
import { Popover } from "@stenajs-webui/tooltip";
import { isAfter } from "date-fns";
import * as React from "react";
import { useMemo, useRef } from "react";
import { buildDayStateForSingleMonth } from "../../util/calendar/StateModifier";
import { DateRangeOnChangeValue } from "../date-range/hooks/UseDateRangeOnClickDayHandler";
import { CalendarWithMonthSwitcher } from "../month-switcher/CalendarWithMonthSwitcher";
import { DateRangeDualTextField } from "./DateRangeDualTextField";
import { useDateRangeDualTextInputStateAndHandlers } from "./hooks/UseDateRangeDualTextInputStateAndHandlers";
import { useDateRangeDualTextInputEffects } from "./hooks/UseDateRangeDualTextInputEffects";

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

  const {
    hideCalendar,
    inputLeftChangeHandler,
    inputRightChangeHandler,
    onClickArrowButton,
    onClickCalendarButton,
    onClickDay,
    onFocusLeft,
    onFocusRight,
    isCalendarVisible,
    onKeyDownHandler,
    setDateInFocus,
    dateInFocus,
    currentPanel,
    setCurrentPanel,
  } = useDateRangeDualTextInputStateAndHandlers(
    startDate,
    endDate,
    onValueChange,
    startDateInputRef,
    endDateInputRef
  );

  useDateRangeDualTextInputEffects(
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

  const statePerMonth = useMemo(() => {
    return buildDayStateForSingleMonth(
      undefined,
      startDate,
      endDate,
      dateInFocus
    );
  }, [startDate, endDate, dateInFocus]);

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
        <DateRangeDualTextField
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
