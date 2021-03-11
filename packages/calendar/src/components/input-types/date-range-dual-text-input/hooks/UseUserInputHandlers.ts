import { isAfter } from "date-fns";
import * as React from "react";
import { RefObject, useCallback } from "react";
import { DayData } from "../../../../util/calendar/CalendarDataFactory";
import { DateRangeDualTextInputProps } from "../DateRangeDualTextInput";
import { UseInputStatesResult } from "./UseInputStates";

export const useUserInputHandlers = (
  startDate: Date | undefined,
  endDate: Date | undefined,
  onValueChange: DateRangeDualTextInputProps["onValueChange"],
  startDateInputRef: RefObject<HTMLInputElement>,
  endDateInputRef: RefObject<HTMLInputElement>,
  showCalendar: () => void,
  hideCalendar: () => void,
  {
    firstFocusedInput,
    setFirstFocusedInput,
    isCalendarVisible,
    setFocusedInput,
    focusedInput,
    setCurrentPanel,
  }: UseInputStatesResult
) => {
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
    if (isCalendarVisible) {
      hideCalendar();
    } else {
      setFocusedInput("startDate");
      setFirstFocusedInput("startDate");
      startDateInputRef.current?.focus();
      setCurrentPanel("calendar");
      showCalendar();
    }
  }, [
    isCalendarVisible,
    hideCalendar,
    setFocusedInput,
    setFirstFocusedInput,
    startDateInputRef,
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
    onFocusLeft,
    onFocusRight,
    onClickDay,
    onClickArrowButton,
    onClickCalendarButton,
    onKeyDownHandler,
  };
};
