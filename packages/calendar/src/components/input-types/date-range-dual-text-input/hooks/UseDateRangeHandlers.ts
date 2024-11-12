import { ChangeEvent, useCallback } from "react";
import { DateRangeDualTextInputProps } from "../DateRangeDualTextInput";
import { UseInputStatesResult } from "./UseInputStates";

export const useDateRangeHandlers = (
  startDate: Date | undefined,
  endDate: Date | undefined,
  onValueChange: DateRangeDualTextInputProps["onValueChange"],
  {
    setDateInFocus,
    showCalendarInternal,
    hideCalendarInternal,
    setFirstFocusedInput,
    setCurrentPanel,
  }: UseInputStatesResult,
) => {
  const inputLeftChangeHandler = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      if (ev.target.value[0] !== "0") {
        onValueChange?.({
          startDate: ev.target.valueAsDate ?? undefined,
          endDate,
        });
      }
    },
    [onValueChange, endDate],
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
    [onValueChange, startDate],
  );

  const showCalendar = useCallback(
    (dateInFocus?: Date) => {
      console.log("dateInFocus", dateInFocus);
      if (dateInFocus != null) {
        setDateInFocus(dateInFocus);
      } else if (startDate) {
        setDateInFocus(startDate);
      } else if (endDate) {
        setDateInFocus(endDate);
      } else {
        setDateInFocus(new Date());
      }
      setCurrentPanel("calendar");
      showCalendarInternal();
    },
    [startDate, endDate, setCurrentPanel, showCalendarInternal, setDateInFocus],
  );

  const hideCalendar = useCallback(() => {
    setFirstFocusedInput(undefined);
    hideCalendarInternal();
  }, [setFirstFocusedInput, hideCalendarInternal]);

  return {
    inputLeftChangeHandler,
    inputRightChangeHandler,
    hideCalendar,
    setDateInFocus,
    setCurrentPanel,
    showCalendar,
  };
};
