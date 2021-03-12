import * as React from "react";
import { RefObject, useCallback } from "react";
import { DayData } from "../../../../util/calendar/CalendarDataFactory";
import { UseInputStatesResult } from "./UseInputStates";

export const useUserInputHandlers = (
  onChangeDate: (incomingDate: Date | undefined) => void,
  dateInputRef: RefObject<HTMLInputElement>,
  showCalendar: () => void,
  hideCalendar: () => void,
  {
    isCalendarVisible,
    setCurrentPanel,
    showTimePicker,
    hideTimePicker,
  }: UseInputStatesResult
) => {
  const onFocusLeft = useCallback(() => {
    if (!isCalendarVisible) {
      showCalendar();
    }
    setCurrentPanel("calendar");
    hideTimePicker();
  }, [hideTimePicker, isCalendarVisible, setCurrentPanel, showCalendar]);

  const onFocusRight = useCallback(() => {
    hideCalendar();
    showTimePicker();
  }, [hideCalendar, showTimePicker]);

  const onClickDay = useCallback(
    (day: DayData) => {
      onChangeDate(day.date);
      setTimeout(hideCalendar, 50);
    },
    [onChangeDate, hideCalendar]
  );

  const onClickArrowButton = useCallback(() => {
    setCurrentPanel("presets");
    showCalendar();
  }, [setCurrentPanel, showCalendar]);

  const onClickCalendarButton = useCallback(() => {
    if (isCalendarVisible) {
      hideCalendar();
    } else {
      dateInputRef.current?.focus();
      setCurrentPanel("calendar");
      showCalendar();
    }
  }, [
    isCalendarVisible,
    hideCalendar,
    dateInputRef,
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
