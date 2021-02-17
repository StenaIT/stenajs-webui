import { useBoolean } from "@stenajs-webui/core";
import { isAfter } from "date-fns";
import * as React from "react";
import { ChangeEvent, RefObject, useCallback, useState } from "react";
import { DateRangeFocusedInput } from "../../../components/calendar-types/date-range-calendar/DateRangeCalendar";
import { DayData } from "../../../util/calendar/CalendarDataFactory";
import { CalendarPanelType } from "../../calendar-with-month-year-pickers/CalendarPanelType";
import { DateRangeDualTextInputProps } from "../DateRangeDualTextInput";

export const useDateRangeDualTextInputStateAndHandlers = (
  startDate: Date | undefined,
  endDate: Date | undefined,
  onValueChange: DateRangeDualTextInputProps["onValueChange"],
  startDateInputRef: RefObject<HTMLInputElement>,
  endDateInputRef: RefObject<HTMLInputElement>
) => {
  const [
    isCalendarVisible,
    showCalendarInternal,
    hideCalendarInternal,
  ] = useBoolean(false);

  const [firstFocusedInput, setFirstFocusedInput] = useState<
    DateRangeFocusedInput | undefined
  >(undefined);

  const [focusedInput, setFocusedInput] = useState<DateRangeFocusedInput>(
    "startDate"
  );

  const [dateInFocus, setDateInFocus] = useState<Date>(() => {
    const fromValue =
      focusedInput === "startDate"
        ? startDate
        : focusedInput === "endDate"
        ? endDate
        : undefined;

    return fromValue ?? new Date();
  });

  const [currentPanel, setCurrentPanel] = useState<CalendarPanelType>(
    "calendar"
  );

  const inputLeftChangeHandler = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      if (ev.target.value[0] !== "0") {
        onValueChange?.({
          startDate: ev.target.valueAsDate ?? undefined,
          endDate,
        });
      }
    },
    [onValueChange, endDate]
  );

  const inputRightChangeHandler = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      if (ev.target.value[0] !== "0") {
        onValueChange?.({
          startDate,
          endDate: ev.target.valueAsDate ?? undefined,
        });
      }
    },
    [onValueChange, startDate]
  );

  const showCalendar = useCallback(() => {
    if (startDate) {
      setDateInFocus(startDate);
    } else if (endDate) {
      setDateInFocus(endDate);
    } else {
      setDateInFocus(new Date());
    }
    setCurrentPanel("calendar");
    showCalendarInternal();
  }, [
    startDate,
    endDate,
    setCurrentPanel,
    showCalendarInternal,
    setDateInFocus,
  ]);

  const hideCalendar = useCallback(() => {
    setFirstFocusedInput(undefined);
    hideCalendarInternal();
  }, [setFirstFocusedInput, hideCalendarInternal]);

  const onFocusLeft = useCallback(() => {
    if (firstFocusedInput == null) {
      setFirstFocusedInput("startDate");
    }
    setFocusedInput("startDate");
    if (!isCalendarVisible) {
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
      showCalendar();
    }
  }, [
    isCalendarVisible,
    setFocusedInput,
    showCalendar,
    setFirstFocusedInput,
    firstFocusedInput,
  ]);

  const onClickDay = useCallback(
    (day: DayData) => {
      if (focusedInput === "startDate") {
        onValueChange?.({
          startDate: day.date,
          endDate,
        });
        if (firstFocusedInput === "startDate") {
          setFocusedInput("endDate");
          endDateInputRef.current?.focus();
        } else {
          setTimeout(hideCalendar, 50);
        }
      } else if (focusedInput === "endDate") {
        onValueChange?.({
          startDate,
          endDate: day.date,
        });
        if (!startDate || isAfter(startDate, day.date)) {
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
      endDate,
      firstFocusedInput,
      setFocusedInput,
      endDateInputRef,
      hideCalendar,
      startDate,
      startDateInputRef,
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
  }, [
    focusedInput,
    startDateInputRef,
    endDateInputRef,
    setCurrentPanel,
    showCalendar,
  ]);

  const onKeyDownHandler = useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>) => {
      if (ev.key === "Escape") {
        hideCalendar();
      }
    },
    [hideCalendar]
  );

  return {
    inputLeftChangeHandler,
    inputRightChangeHandler,
    hideCalendar,
    onFocusLeft,
    onFocusRight,
    onClickDay,
    onClickArrowButton,
    onClickCalendarButton,
    onKeyDownHandler,
    isCalendarVisible,
    focusedInput,
    setFocusedInput,
    dateInFocus,
    setDateInFocus,
    currentPanel,
    setCurrentPanel,
  };
};
