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
  Column,
  useBoolean,
  useDebounce,
  useMultiOnClickOutside,
} from "@stenajs-webui/core";
import { DateRangeFocusedInput } from "../../components/calendar-types/date-range-calendar/DateRangeCalendar";
import { DayData } from "../../util/calendar/CalendarDataFactory";
import { isAfter } from "date-fns";
import { CalendarWithMonthSwitcher } from "../month-switcher/CalendarWithMonthSwitcher";
import { CalendarPanelType } from "../calendar-with-month-year-pickers/CalendarPanelType";
import { buildDayStateForSingleMonth } from "../../util/calendar/StateModifier";

export interface DateRangeDualTextInputProps
  extends ValueAndOnValueChangeProps<DateRangeOnChangeValue> {}

export const DateRangeDualTextInput: React.FC<DateRangeDualTextInputProps> = ({
  value,
  onValueChange,
}) => {
  const [isCalendarVisible, showCalendar, _hideCalendar] = useBoolean(false);

  const [currentPanel, setCurrentPanel] = useState<CalendarPanelType>(
    "calendar"
  );

  const [dateInFocus, setDateInFocus] = useState(
    () => (focusedInput && value?.[focusedInput]) ?? new Date()
  );

  const [firstFocusedInput, setFirstFocusedInput] = useState<
    DateRangeFocusedInput | undefined
  >(undefined);

  const [focusedInput, setFocusedInput] = useState<DateRangeFocusedInput>(
    "startDate"
  );

  const popoverRef = useRef(null);
  const containerRef = useRef(null);
  const startDateInputRef: TextInputProps["inputRef"] = useRef(null);
  const endDateInputRef: TextInputProps["inputRef"] = useRef(null);

  const hideCalendar = useCallback(() => {
    setFirstFocusedInput(undefined);
    _hideCalendar();
  }, [setFirstFocusedInput, _hideCalendar]);

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

  useEffect(
    function moveFocusedDateWhenValueChanges() {
      if (focusedInput) {
        const selectedDate = value?.[focusedInput];
        if (selectedDate) {
          setDateInFocus(selectedDate);
        }
      }
    },
    [value, focusedInput]
  );

  useEffect(
    function updateStartDateFieldWhenValueChanges() {
      if (startDateInputRef.current && value?.startDate) {
        startDateInputRef.current.valueAsDate = new Date(
          Date.UTC(
            value.startDate.getFullYear(),
            value.startDate.getMonth(),
            value.startDate.getDate()
          )
        );
      }
    },
    [value?.startDate]
  );

  useEffect(
    function updateEndDateFieldWhenValueChanges() {
      if (endDateInputRef.current && value?.endDate) {
        endDateInputRef.current.valueAsDate = new Date(
          Date.UTC(
            value.endDate.getFullYear(),
            value.endDate.getMonth(),
            value.endDate.getDate()
          )
        );
      }
    },
    [value?.endDate]
  );

  const onFocusLeft = useCallback(() => {
    if (firstFocusedInput == null) {
      setFirstFocusedInput("startDate");
    }
    setFocusedInput("startDate");
    if (!isCalendarVisible) {
      setCurrentPanel("calendar");
      showCalendar();
    }
  }, [
    isCalendarVisible,
    setFocusedInput,
    showCalendar,
    setFirstFocusedInput,
    firstFocusedInput,
  ]);

  const onFocusRight = useCallback(() => {
    if (firstFocusedInput == null) {
      setFirstFocusedInput("endDate");
    }
    setFocusedInput("endDate");
    if (!isCalendarVisible) {
      setCurrentPanel("calendar");
      showCalendar();
    }
  }, [isCalendarVisible, setFocusedInput, showCalendar, setFirstFocusedInput]);

  const onClickDay = useCallback(
    (day: DayData) => {
      if (focusedInput === "startDate") {
        onValueChange?.({
          startDate: day.date,
          endDate: value?.endDate,
        });
        if (firstFocusedInput === "startDate") {
          setFocusedInput("endDate");
          endDateInputRef.current?.focus();
        } else {
          setTimeout(hideCalendar, 50);
        }
      } else if (focusedInput === "endDate") {
        onValueChange?.({
          startDate: value?.startDate,
          endDate: day.date,
        });
        if (!value?.startDate || isAfter(value?.startDate, day.date)) {
          setFocusedInput("startDate");
          startDateInputRef.current?.focus();
        } else {
          setTimeout(hideCalendar, 50);
        }
      }
    },
    [
      focusedInput,
      onValueChange,
      setFocusedInput,
      hideCalendar,
      value,
      firstFocusedInput,
    ]
  );

  const onClickArrowButton = useCallback(() => {
    setCurrentPanel("presets");
    showCalendar();
  }, [setCurrentPanel, showCalendar]);

  const onClickCalendarButton = useCallback(() => {
    if (focusedInput === "startDate" && startDateInputRef.current) {
      startDateInputRef.current.focus();
    } else if (focusedInput === "endDate" && endDateInputRef.current) {
      endDateInputRef.current.focus();
    } else {
      setCurrentPanel("calendar");
      showCalendar();
    }
  }, [setCurrentPanel, showCalendar, focusedInput]);

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
    <Box ref={containerRef} onKeyDown={onKeyDownHandler}>
      <Popover
        arrow={false}
        lazy
        placement={"bottom"}
        visible={isCalendarVisible}
        content={
          (debouncedIsCalendarVisible || isCalendarVisible) && (
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
