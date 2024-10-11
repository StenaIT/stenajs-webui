import { RefObject, useEffect } from "react";

export const useDateRangeEffects = (
  startDate: Date | undefined,
  endDate: Date | undefined,
  setDateInFocus: (date: Date) => void,
  startDateInputRef: RefObject<HTMLInputElement>,
  endDateInputRef: RefObject<HTMLInputElement>,
) => {
  useEffect(
    function moveFocusedDateWhenStartDateChanges() {
      if (startDate) {
        setDateInFocus(startDate);
      }
    },
    [startDate, setDateInFocus],
  );

  useEffect(
    function moveFocusedDateWhenEndDateChanges() {
      if (endDate) {
        setDateInFocus(endDate);
      }
    },
    [endDate, setDateInFocus],
  );

  useEffect(
    function updateStartDateFieldWhenValueChanges() {
      if (startDateInputRef.current) {
        if (startDate) {
          startDateInputRef.current.valueAsDate = new Date(
            Date.UTC(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate(),
            ),
          );
        } else {
          startDateInputRef.current.valueAsDate = null;
        }
      }
    },
    [startDate, startDateInputRef],
  );

  useEffect(
    function updateEndDateFieldWhenValueChanges() {
      if (endDateInputRef.current) {
        if (endDate) {
          endDateInputRef.current.valueAsDate = new Date(
            Date.UTC(
              endDate.getFullYear(),
              endDate.getMonth(),
              endDate.getDate(),
            ),
          );
        } else {
          endDateInputRef.current.valueAsDate = null;
        }
      }
    },
    [endDate, endDateInputRef],
  );
};
