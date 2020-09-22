import * as React from "react";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DateRangeDualTextField } from "./DateRangeDualTextField";
import { Popover } from "@stenajs-webui/tooltip";
import {
  TextInputProps,
  ValueAndOnValueChangeProps,
} from "@stenajs-webui/forms";
import { DateRangeOnChangeValue } from "../date-range/hooks/UseDateRangeOnClickDayHandler";
import {
  Box,
  BoxProps,
  Column,
  useBoolean,
  useDebounce,
  useMultiOnClickOutside,
} from "@stenajs-webui/core";
import { DateRangeFocusedInput } from "../../components/calendar-types/date-range-calendar/DateRangeCalendar";
import { DayData } from "../../util/calendar/CalendarDataFactory";
import { isAfter } from "date-fns";
import { CalendarWithMonthSwitcher } from "../month-switcher/CalendarWithMonthSwitcher";
import { buildDayStateForSingleMonth } from "../../components/calendar-types/date-range-calendar/util/DayStateFactory";
import { CalendarPanelType } from "../calendar-with-month-year-pickers/CalendarPanelType";

interface Props extends ValueAndOnValueChangeProps<DateRangeOnChangeValue> {}

export const DateRangeDualTextInput: React.FC<Props> = ({
  value,
  onValueChange,
}) => {
  /*
  TODO
  Close on esc
   */
  const [isCalendarVisible, showCalendar, hideCalendar] = useBoolean(false);
  const [currentPanel, setCurrentPanel] = useState<CalendarPanelType>(
    "calendar"
  );

  const [dateInFocus, setDateInFocus] = useState(
    () => (focusedInput && value?.[focusedInput]) ?? new Date()
  );
  const [focusedInput, setFocusedInput] = useState<DateRangeFocusedInput>(
    "startDate"
  );

  const popoverRef: BoxProps["innerRef"] = useRef(null);
  const containerRef: BoxProps["innerRef"] = useRef(null);
  const startDateInputRef: TextInputProps["inputRef"] = useRef(null);
  const endDateInputRef: TextInputProps["inputRef"] = useRef(null);

  const inputLeftChangeHandler = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      if (ev.target.value[0] !== "0") {
        onValueChange?.({
          startDate: ev.target.valueAsDate ?? undefined,
          endDate: value?.endDate,
        });
      }
    },
    [onValueChange, value]
  );

  const inputRightChangeHandler = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      if (ev.target.value[0] !== "0") {
        onValueChange?.({
          startDate: value?.startDate,
          endDate: ev.target.valueAsDate ?? undefined,
        });
      }
    },
    [onValueChange, value]
  );

  useEffect(() => {
    if (focusedInput) {
      const selectedDate = value?.[focusedInput];
      if (selectedDate) {
        setDateInFocus(selectedDate);
      }
    }
  }, [value, focusedInput]);

  useEffect(() => {
    if (startDateInputRef.current && value?.startDate) {
      startDateInputRef.current.valueAsDate = new Date(
        Date.UTC(
          value.startDate.getFullYear(),
          value.startDate.getMonth(),
          value.startDate.getDate()
        )
      );
    }
  }, [value?.startDate]);

  useEffect(() => {
    if (endDateInputRef.current && value?.endDate) {
      endDateInputRef.current.valueAsDate = new Date(
        Date.UTC(
          value.endDate.getFullYear(),
          value.endDate.getMonth(),
          value.endDate.getDate()
        )
      );
    }
  }, [value?.endDate]);

  const showCalendarStartDate = useCallback(() => {
    setFocusedInput("startDate");
    if (!isCalendarVisible) {
      setCurrentPanel("calendar");
      showCalendar();
    }
  }, [isCalendarVisible, setFocusedInput, showCalendar]);

  const showCalendarEndDate = useCallback(() => {
    setFocusedInput("endDate");
    if (!isCalendarVisible) {
      setCurrentPanel("calendar");
      showCalendar();
    }
  }, [isCalendarVisible, setFocusedInput, showCalendar]);

  const onClickDay = useCallback(
    (day: DayData) => {
      if (focusedInput === "startDate") {
        onValueChange?.({
          startDate: day.date,
          endDate: value?.endDate,
        });
        if (!value || !value.endDate) {
          setFocusedInput("endDate");
          endDateInputRef.current?.focus();
        } else {
          setTimeout(hideCalendar, 150);
        }
      } else if (focusedInput === "endDate") {
        onValueChange?.({
          startDate: value?.startDate,
          endDate: day.date,
        });
        if (!value || !value.startDate) {
          setFocusedInput("startDate");
          startDateInputRef.current?.focus();
        } else {
          setTimeout(hideCalendar, 150);
        }
      }
    },
    [focusedInput, onValueChange, setFocusedInput, hideCalendar, value]
  );

  const onClickArrowButton = useCallback(() => {
    setCurrentPanel("presets");
    showCalendar();
  }, [setCurrentPanel, showCalendar]);

  const onClickCalendarButton = useCallback(() => {
    setCurrentPanel("calendar");
    showCalendar();
  }, [setCurrentPanel, showCalendar]);

  const startDateIsAfterEnd = useMemo(
    () =>
      value &&
      value.startDate &&
      value.endDate &&
      isAfter(value.startDate, value.endDate),
    [value]
  );

  const statePerMonth = useMemo(() => {
    return buildDayStateForSingleMonth(
      undefined,
      value?.startDate,
      value?.endDate,
      dateInFocus
    );
  }, [value, dateInFocus]);

  const onKeyDownHandler = useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>) => {
      if (ev.key === "Escape") {
        hideCalendar();
      }
    },
    [hideCalendar]
  );

  useMultiOnClickOutside([popoverRef, containerRef], hideCalendar);

  const debouncedIsCalendarVisible = useDebounce(isCalendarVisible, 300);

  return (
    <Box innerRef={containerRef} onKeyDown={onKeyDownHandler}>
      <Popover
        arrow={false}
        placement={"bottom"}
        visible={isCalendarVisible}
        content={
          (debouncedIsCalendarVisible || isCalendarVisible) && (
            <Column innerRef={popoverRef}>
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
          onFocusLeft={showCalendarStartDate}
          onFocusRight={showCalendarEndDate}
          onClickLeft={showCalendarStartDate}
          onClickRight={showCalendarEndDate}
          inputRefLeft={startDateInputRef}
          inputRefRight={endDateInputRef}
          variant={startDateIsAfterEnd ? "error" : undefined}
        />
      </Popover>
    </Box>
  );
};
