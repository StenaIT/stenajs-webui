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
import { VisiblePanel } from "../types";

export const useTravelDateInput = (
  value: string | undefined,
  onValueChange: ((value: string) => void) | undefined,
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

  const selectedDate = useMemo(
    () =>
      value?.length === dateFormat.length
        ? parseLocalizedDateString(value, localeCode)
        : undefined,
    [dateFormat.length, localeCode, value]
  );

  const [visibleMonth, setVisibleMonth] = useState<Date>(
    initialMonthInFocus ?? selectedDate ?? new Date()
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

  const onValueChangeByInputs = useCallback<(value: string) => void>(
    (v) => {
      const startDate =
        v?.length === dateFormat.length
          ? parseLocalizedDateString(v, localeCode)
          : undefined;

      if (startDate) {
        setVisibleMonthClamped(startDate);
      }

      onValueChange?.(v);
    },
    [dateFormat.length, localeCode, onValueChange, setVisibleMonthClamped]
  );

  const prevMonthDisabled = useMemo(
    () => isSameMonth(today, visibleMonth) || isBefore(visibleMonth, today),
    [today, visibleMonth]
  );

  const isDateDisabled = useCallback<(date: Date) => boolean>(
    (date) => !isSameDay(date, today) && isBefore(date, today),
    [today]
  );

  const onClickDate = (date: Date) => {
    onValueChange?.(formatLocalizedDate(date, localeCode));
  };

  return {
    isDateDisabled,
    onClickDate,
    onValueChangeByInputs,
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
    selectedDate,
    today,
    visibleMonth,
  };
};
