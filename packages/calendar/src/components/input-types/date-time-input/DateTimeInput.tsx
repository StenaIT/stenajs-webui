import { faClock } from "@fortawesome/free-regular-svg-icons/faClock";
import { Box, Column, Row, Space, useDelayedFalse } from "@stenajs-webui/core";
import { PrimaryButton } from "@stenajs-webui/elements";
import {
  TextInputProps,
  ValueAndOnValueChangeProps,
} from "@stenajs-webui/forms";
import { Popover } from "@stenajs-webui/tooltip";
import * as React from "react";
import { useCallback, useMemo, useRef } from "react";
import { defaultPopoverPlacement } from "../../../config/DefaultPopoverPlacement";
import {
  DualTextInput,
  DualTextInputProps,
} from "../../../features/dual-text-input/DualTextInput";
import { CalendarWithMonthSwitcher } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import { TimePicker } from "../../../features/time-picker/TimePicker";
import { addDayStateHighlights } from "../../../util/calendar/StateModifier";
import { transformTimeInDateToTimeString } from "../../../util/time/TimeTransformer";
import { useDateRangeEffects } from "./hooks/UseDateRangeEffects";
import { useDateRangeHandlers } from "./hooks/UseDateRangeHandlers";
import { useInputStates } from "./hooks/UseInputStates";
import { useUserInputHandlers } from "./hooks/UseUserInputHandlers";
import { OptionalMinMaxDatesAsString } from "../../../types/CalendarTypes";
import { defaultMaxDate } from "../../../config/DefaultMaxDate";

export interface DateTimeInputProps
  extends ValueAndOnValueChangeProps<Date | null>,
    OptionalMinMaxDatesAsString,
    Pick<DualTextInputProps, "widthLeft" | "widthRight"> {
  onEsc?: () => void;
  onEnter?: () => void;
  onBlur?: () => void;
  autoFocus?: boolean;
  disabled?: boolean;
}

export const DateTimeInput: React.FC<DateTimeInputProps> = ({
  value,
  onValueChange,
  onEnter,
  onEsc,
  onBlur,
  autoFocus,
  minDate,
  widthLeft = 128,
  widthRight = 80,
  maxDate = defaultMaxDate,
  disabled,
}) => {
  const dateInputRef: TextInputProps["inputRef"] = useRef(null);
  const timeInputRef: TextInputProps["inputRef"] = useRef(null);

  const states = useInputStates(value);

  const {
    setCurrentPanel,
    currentPanel,
    isCalendarVisible,
    dateInFocus,
    setDateInFocus,
    isTimePickerVisible,
    hideTimePicker,
    localTime,
    localDate,
  } = states;

  const {
    showCalendar,
    hideCalendar,
    inputLeftChangeHandler,
    inputRightChangeHandler,
    onChangeTime,
    onChangeDate,
  } = useDateRangeHandlers(value, onValueChange, states, dateInputRef);

  const {
    onKeyDownHandler,
    onFocusRight,
    onFocusLeft,
    onClickDay,
    onClickCalendarButton,
    onClickArrowButton,
  } = useUserInputHandlers(
    onChangeDate,
    dateInputRef,
    showCalendar,
    hideCalendar,
    states
  );

  useDateRangeEffects(value, setDateInFocus, dateInputRef);

  const statePerMonth = useMemo(() => {
    const dateToHighlight = value || localDate;
    if (!dateToHighlight) {
      return {};
    }
    return addDayStateHighlights(undefined, dateToHighlight, [
      "singleSelected",
      "selected",
    ]);
  }, [localDate, value]);

  const hideAll = useCallback(() => {
    hideCalendar();
    hideTimePicker();
  }, [hideCalendar, hideTimePicker]);

  const timeValue = useMemo<string | undefined>(
    () => (value ? transformTimeInDateToTimeString(value) : localTime),
    [value, localTime]
  );

  const delayedIsCalendarVisible = useDelayedFalse(isCalendarVisible, 300);
  const delayedIsTimePickerVisible = useDelayedFalse(isTimePickerVisible, 300);

  return (
    <Box onKeyDown={onKeyDownHandler}>
      <Popover
        arrow={false}
        lazy
        disabled={disabled}
        placement={defaultPopoverPlacement}
        visible={isCalendarVisible || isTimePickerVisible}
        onClickOutside={hideAll}
        content={
          (delayedIsCalendarVisible || delayedIsTimePickerVisible) && (
            <Column>
              {delayedIsCalendarVisible ? (
                <CalendarWithMonthSwitcher
                  statePerMonth={statePerMonth}
                  onClickDay={onClickDay}
                  dateInFocus={dateInFocus}
                  setDateInFocus={setDateInFocus}
                  currentPanel={currentPanel}
                  setCurrentPanel={setCurrentPanel}
                  minDate={minDate}
                  maxDate={maxDate}
                />
              ) : delayedIsTimePickerVisible ? (
                <Column>
                  <Column overflow={"hidden"} height={"250px"}>
                    <TimePicker
                      value={timeValue ?? ""}
                      onValueChange={onChangeTime}
                    />
                  </Column>
                  <Space />
                  <Row justifyContent={"flex-end"}>
                    <PrimaryButton label={"Done"} onClick={hideTimePicker} />
                  </Row>
                </Column>
              ) : null}
            </Column>
          )
        }
      >
        <DualTextInput
          autoFocusLeft={autoFocus}
          onEsc={onEsc}
          onEnter={onEnter}
          onBlur={onBlur}
          disabled={disabled}
          separatorIcon={faClock}
          typeLeft={"date"}
          typeRight={"time"}
          placeholderLeft={"yyyy-mm-dd"}
          placeholderRight={"hh:mm"}
          onChangeLeft={inputLeftChangeHandler}
          onChangeRight={inputRightChangeHandler}
          onClickArrowDown={onClickArrowButton}
          onClickCalendar={onClickCalendarButton}
          onFocusLeft={onFocusLeft}
          onFocusRight={onFocusRight}
          onClickLeft={onFocusLeft}
          onClickRight={onFocusRight}
          inputRefLeft={dateInputRef}
          inputRefRight={timeInputRef}
          valueRight={timeValue ?? ""}
          widthLeft={widthLeft}
          widthRight={widthRight}
          minLeft={minDate}
          maxLeft={maxDate}
        />
      </Popover>
    </Box>
  );
};
