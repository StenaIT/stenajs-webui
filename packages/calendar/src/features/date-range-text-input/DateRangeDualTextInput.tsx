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
  StandardText,
  useMultiOnClickOutside,
} from "@stenajs-webui/core";
import { DateRangeFocusedInput } from "../../components/calendar-types/date-range-calendar/DateRangeCalendar";
import { DayData } from "../../util/calendar/CalendarDataFactory";
import { isAfter } from "date-fns";
import { CalendarWithMonthSwitcher } from "../month-switcher/CalendarWithMonthSwitcher";
import { buildDayState } from "../../components/calendar-types/date-range-calendar/util/DayStateFactory";

interface Props extends ValueAndOnValueChangeProps<DateRangeOnChangeValue> {}

type ModalMode = "calendar" | "presets";

export const DateRangeDualTextInput: React.FC<Props> = ({
  value,
  onValueChange,
}) => {
  const [dateInFocus, setDateInFocus] = useState(
    () => (focusedInput && value?.[focusedInput]) ?? new Date()
  );
  const [modalMode, setModalMode] = useState<ModalMode | undefined>(undefined);
  const [focusedInput, setFocusedInput] = useState<DateRangeFocusedInput>(
    "startDate"
  );

  const popoverRef: BoxProps["innerRef"] = useRef(null);
  const containerRef: BoxProps["innerRef"] = useRef(null);
  const startDateInputRef: TextInputProps["inputRef"] = useRef(null);
  const endDateInputRef: TextInputProps["inputRef"] = useRef(null);

  const inputLeftChangeHandler = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      onValueChange?.({
        startDate: ev.target.valueAsDate ?? undefined,
        endDate: value?.endDate,
      });
    },
    [onValueChange, value]
  );

  const inputRightChangeHandler = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      onValueChange?.({
        startDate: value?.startDate,
        endDate: ev.target.valueAsDate ?? undefined,
      });
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
    console.log("value?.startDate CHANGED");

    if (startDateInputRef.current && value?.startDate) {
      console.log(
        "startDateInputRef.current.valueAsDate",
        startDateInputRef.current.valueAsDate
      );
      console.log("SET IT");
      console.log("value?.startDate", value?.startDate);
      startDateInputRef.current.valueAsDate = new Date(
        Date.UTC(
          value.startDate.getFullYear(),
          value.startDate.getMonth(),
          value.startDate.getDate()
        )
      );
      console.log(
        "startDateInputRef.current.valueAsDate AFTER",
        startDateInputRef.current.valueAsDate
      );
    }
  }, [value?.startDate]);

  useEffect(() => {
    console.log("value?.endDate CHANGED");

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
    setModalMode("calendar");
  }, [setFocusedInput, setModalMode]);

  const showCalendarEndDate = useCallback(() => {
    setFocusedInput("endDate");
    setModalMode("calendar");
  }, [setFocusedInput, setModalMode]);

  const hideCalendar = useCallback(() => {
    setModalMode(undefined);
  }, [setModalMode]);

  const onClickDay = useCallback(
    (day: DayData) => {
      console.log("---------------------");
      console.log("onClickDay", value);

      if (focusedInput === "startDate") {
        onValueChange?.({
          startDate: day.date,
          endDate: value?.endDate,
        });
        if (!value || !value.endDate) {
          console.log("Move to endDate", value, value?.endDate);

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
        if (!value || value.startDate) {
          console.log("Move to startDate", value, value?.startDate);
          setFocusedInput("startDate");
          startDateInputRef.current?.focus();
        } else {
          setTimeout(hideCalendar, 150);
        }
      }
    },
    [focusedInput, onValueChange, setFocusedInput, hideCalendar, value]
  );

  const startDateIsAfterEnd = useMemo(
    () =>
      value &&
      value.startDate &&
      value.endDate &&
      isAfter(value.startDate, value.endDate),
    [value && value.startDate, value && value.endDate]
  );

  const statePerMonth = useMemo(
    () => buildDayState(undefined, value?.startDate, value?.endDate),
    [value]
  );

  useMultiOnClickOutside([popoverRef, containerRef], hideCalendar);

  return (
    <Box innerRef={containerRef}>
      <Popover
        arrow={false}
        visible={!!modalMode}
        content={
          !!modalMode ? (
            <Column innerRef={popoverRef}>
              {modalMode === "calendar" && (
                <CalendarWithMonthSwitcher
                  statePerMonth={statePerMonth}
                  onClickDay={onClickDay}
                  dateInFocus={dateInFocus}
                  setDateInFocus={setDateInFocus}
                />
              )}
              {modalMode === "presets" && (
                <StandardText>Presets TODO</StandardText>
              )}
            </Column>
          ) : null
        }
      >
        <DateRangeDualTextField
          onChangeLeft={inputLeftChangeHandler}
          onChangeRight={inputRightChangeHandler}
          onClickArrowDown={() => setModalMode("presets")}
          onClickCalendar={() => setModalMode("calendar")}
          onFocusLeft={showCalendarStartDate}
          onFocusRight={showCalendarEndDate}
          inputRefLeft={startDateInputRef}
          inputRefRight={endDateInputRef}
          variantLeft={startDateIsAfterEnd ? "error" : undefined}
          variantRight={startDateIsAfterEnd ? "error" : undefined}
        />
      </Popover>
    </Box>
  );
};
