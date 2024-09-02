import {
  getDefaultLocaleForFormatting,
  getLocaleForLocaleCode,
} from "../../localize-date-format/LocaleMapper";
import { useCallback, useId, useMemo, useRef, useState } from "react";
import { useToday } from "../util/UseToday";
import { getDateFormatForLocaleCode } from "../../localize-date-format/DateFormatProvider";
import { parseLocalizedDateString } from "../../localize-date-format/LocalizedDateParser";
import { format, isAfter, isBefore, isSameDay, isSameMonth } from "date-fns";
import { getMonthInYear } from "../../../util/calendar/CalendarDataFactory";
import { startCase } from "lodash-es";
import { formatLocalizedDate } from "../../localize-date-format/LocalizedDateFormatter";
import { TravelDateRangeInputValue, VisiblePanel } from "../types";
import { formatDateDescription } from "../util/DateDescriptionFormatter";

export const useTravelDateRangeInput = (
  value: TravelDateRangeInputValue | undefined,
  onValueChange: ((value: TravelDateRangeInputValue) => void) | undefined,
  localeCode: string,
  initialMonthInFocus: Date | undefined
) => {
  const locale =
    getLocaleForLocaleCode(localeCode) ?? getDefaultLocaleForFormatting();

  const calendarId = useId();
  const today = useToday();

  const monthPickerButtonRef = useRef<HTMLButtonElement>(null);

  const dateFormat = useMemo(
    () => getDateFormatForLocaleCode(localeCode),
    [localeCode]
  );

  const selectedStartDate = useMemo(
    () =>
      value?.startDate?.length === dateFormat.length
        ? parseLocalizedDateString(value.startDate, localeCode)
        : undefined,
    [dateFormat.length, localeCode, value?.startDate]
  );

  const selectedEndDate = useMemo(
    () =>
      value?.endDate?.length === dateFormat.length
        ? parseLocalizedDateString(value.endDate, localeCode)
        : undefined,
    [dateFormat.length, localeCode, value?.endDate]
  );

  const valueWhenBlurredStartDate = useMemo(
    () =>
      selectedStartDate != null
        ? formatDateDescription(selectedStartDate, locale)
        : undefined,
    [locale, selectedStartDate]
  );

  const valueWhenBlurredEndDate = useMemo(
    () =>
      selectedEndDate != null
        ? formatDateDescription(selectedEndDate, locale)
        : undefined,
    [locale, selectedEndDate]
  );

  const [visibleMonth, setVisibleMonth] = useState<Date>(
    initialMonthInFocus ?? selectedStartDate ?? new Date()
  );

  const setVisibleMonthClamped = useCallback(
    (month: Date) => {
      if (isSameMonth(month, today) || isAfter(month, today)) {
        setVisibleMonth(month);
      } else {
        setVisibleMonth(today);
      }
    },
    [today]
  );

  const visibleMonthData = useMemo(
    () =>
      getMonthInYear(
        visibleMonth.getFullYear(),
        visibleMonth.getMonth(),
        locale
      ),
    [locale, visibleMonth]
  );

  const monthPickerButtonLabel = useMemo(() => {
    return startCase(format(visibleMonth, "MMMM yyyy", { locale }));
  }, [locale, visibleMonth]);

  const todayIsInVisibleMonth = useMemo(() => {
    return isSameMonth(today, visibleMonth);
  }, [today, visibleMonth]);

  const [hoverDate, setHoverDate] = useState<Date | undefined>();

  const [visiblePanel, setVisiblePanel] = useState<VisiblePanel>("calendar");

  const onValueChangeByInputs = useCallback<
    (value: TravelDateRangeInputValue) => void
  >(
    (v) => {
      const startDate =
        v?.startDate?.length === dateFormat.length
          ? parseLocalizedDateString(v.startDate, localeCode)
          : undefined;

      const endDate =
        v?.endDate?.length === dateFormat.length
          ? parseLocalizedDateString(v.endDate, localeCode)
          : undefined;

      if (startDate) {
        setVisibleMonthClamped(startDate);
      } else if (endDate) {
        setVisibleMonthClamped(endDate);
      }

      onValueChange?.({
        ...value,
        ...v,
      });
    },
    [
      dateFormat.length,
      localeCode,
      onValueChange,
      setVisibleMonthClamped,
      value,
    ]
  );

  const prevMonthDisabled = useMemo(
    () => isSameMonth(today, visibleMonth) || isBefore(visibleMonth, today),
    [today, visibleMonth]
  );

  const isValidDateRange = useMemo(
    () =>
      (selectedStartDate &&
        selectedEndDate &&
        (isSameDay(selectedStartDate, selectedEndDate) ||
          isBefore(selectedStartDate, selectedEndDate))) ??
      false,
    [selectedEndDate, selectedStartDate]
  );

  const isDateDisabled = useCallback<(date: Date) => boolean>(
    (date) => !isSameDay(date, today) && isBefore(date, today),
    [today]
  );

  const onClickDate = (date: Date) => {
    const isSameMonthAndYear =
      date.getFullYear() === visibleMonth.getFullYear() &&
      date.getMonth() === visibleMonth.getMonth();

    if (isSameMonthAndYear) {
      if (selectedStartDate && selectedEndDate == null) {
        if (isBefore(date, selectedStartDate)) {
          onValueChange?.({
            startDate: formatLocalizedDate(date, localeCode),
            endDate: undefined,
          });
        } else {
          onValueChange?.({
            startDate: value?.startDate,
            endDate: formatLocalizedDate(date, localeCode),
          });
        }
      } else {
        onValueChange?.({
          startDate: formatLocalizedDate(date, localeCode),
          endDate: undefined,
        });
      }
    }
  };

  return {
    isDateDisabled,
    onClickDate,
    onValueChangeByInputs,
    isValidDateRange,
    prevMonthDisabled,
    monthPickerButtonRef,
    calendarId,
    monthPickerButtonLabel,
    visiblePanel,
    setVisiblePanel,
    setVisibleMonth,
    visibleMonthData,
    todayIsInVisibleMonth,
    hoverDate,
    setHoverDate,
    selectedStartDate,
    selectedEndDate,
    today,
    visibleMonth,
    valueWhenBlurredStartDate,
    valueWhenBlurredEndDate,
  };
};
