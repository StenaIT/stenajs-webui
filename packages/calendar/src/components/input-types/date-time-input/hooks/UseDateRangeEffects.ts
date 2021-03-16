import { RefObject, useEffect } from "react";

export const useDateRangeEffects = (
  date: Date | undefined | null,
  setDateInFocus: (date: Date) => void,
  dateInputRef: RefObject<HTMLInputElement>
) => {
  useEffect(
    function moveFocusedDateWhenDateChanges() {
      if (date) {
        setDateInFocus(date);
      }
    },
    [date, setDateInFocus]
  );

  useEffect(
    function updateDateFieldWhenValueChanges() {
      if (dateInputRef.current) {
        if (date) {
          dateInputRef.current.valueAsDate = new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
          );
        } else {
          dateInputRef.current.valueAsDate = null;
        }
      }
    },
    [date, dateInputRef]
  );
};
