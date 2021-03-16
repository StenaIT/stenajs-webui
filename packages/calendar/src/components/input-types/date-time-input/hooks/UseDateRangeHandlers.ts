import { ChangeEvent, RefObject, useCallback } from "react";
import { getHoursAndMinutesFromTimeString } from "../../../../util/time/TimeTransformer";
import { DateTimeInputProps } from "../DateTimeInput";
import { UseInputStatesResult } from "./UseInputStates";

export const useDateRangeHandlers = (
  date: Date | undefined | null,
  onValueChange: DateTimeInputProps["onValueChange"],
  {
    setDateInFocus,
    showCalendarInternal,
    hideCalendarInternal,
    setFirstFocusedInput,
    setCurrentPanel,
    localTime,
    setLocalTime,
    localDate,
    setLocalDate,
  }: UseInputStatesResult,
  dateInputRef: RefObject<HTMLInputElement>
) => {
  const onChangeDate = useCallback(
    (incomingDate: Date | null) => {
      if (!incomingDate) {
        return;
      }
      const newDate = new Date(incomingDate);

      if (date) {
        // Full date is available

        newDate.setHours(date.getHours());
        newDate.setMinutes(date.getMinutes());

        onValueChange?.(newDate);
        setLocalDate(newDate);
      } else if (localTime) {
        // Only time has been selected
        const { minute, hour } = getHoursAndMinutesFromTimeString(localTime);

        newDate.setHours(hour ?? 0);
        newDate.setMinutes(minute ?? 0);

        onValueChange?.(newDate);
        setLocalDate(newDate);
      } else {
        // Nothing has been selected
        setLocalDate(newDate);
      }
      setDateInFocus(newDate);
      if (dateInputRef.current) {
        dateInputRef.current.valueAsDate = newDate;
      }
    },
    [date, dateInputRef, localTime, onValueChange, setDateInFocus, setLocalDate]
  );

  const onChangeTime = useCallback(
    (time: string) => {
      if (!time) {
        return;
      }

      if (date) {
        // Full date is available
        const newTime = getHoursAndMinutesFromTimeString(time);
        const newDate = new Date(date);

        newDate.setHours(newTime.hour || 0);
        newDate.setMinutes(newTime.minute || 0);

        onValueChange?.(newDate);
        setLocalTime(time);
      } else if (localDate) {
        // Only date has already been selected
        const newTime = getHoursAndMinutesFromTimeString(time);
        const newDate = new Date(localDate);

        newDate.setHours(newTime.hour || 0);
        newDate.setMinutes(newTime.minute || 0);

        onValueChange?.(newDate);
        setLocalTime(time);
      } else {
        // Nothing has been selected
        setLocalTime(time);
      }
    },
    [onValueChange, date, localDate, setLocalTime]
  );

  const inputLeftChangeHandler = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      if (ev.target.value[0] !== "0") {
        onChangeDate(ev.target.valueAsDate);
      }
    },
    [onChangeDate]
  );

  const inputRightChangeHandler = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => onChangeTime(ev.target.value),
    [onChangeTime]
  );

  const showCalendar = useCallback(() => {
    if (date) {
      setDateInFocus(date);
    } else {
      setDateInFocus(new Date());
    }
    setCurrentPanel("calendar");
    showCalendarInternal();
  }, [date, setCurrentPanel, showCalendarInternal, setDateInFocus]);

  const hideCalendar = useCallback(() => {
    setFirstFocusedInput(undefined);
    hideCalendarInternal();
  }, [setFirstFocusedInput, hideCalendarInternal]);

  return {
    inputLeftChangeHandler,
    inputRightChangeHandler,
    hideCalendar,
    showCalendar,
    onChangeTime,
    onChangeDate,
  };
};
