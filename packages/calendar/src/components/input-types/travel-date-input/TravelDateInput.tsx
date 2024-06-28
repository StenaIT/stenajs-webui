import * as React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { Column, Heading, Row, Text } from "@stenajs-webui/core";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { TravelDateTextInputs } from "./components/TravelDateTextInputs";
import {
  FlatButton,
  SecondaryButton,
  stenaAngleDown,
  stenaAngleUp,
  stenaArrowLeft,
  stenaArrowRight,
} from "@stenajs-webui/elements";
import {
  DayData,
  getMonthInYear,
  WeekData,
} from "../../../util/calendar/CalendarDataFactory";
import styles from "./TravelDateInput.module.css";
import { MonthPicker } from "../../../features/month-picker/MonthPicker";
import { TravelDateCell } from "./components/TravelDateCell";
import { useToday } from "./util/UseToday";
import { getLocaleForLocaleCode } from "../../../features/localize-date-format/LocaleMapper";
import { parseLocalizedDateString } from "../../../features/localize-date-format/LocalizedDateParser";
import { addMonths, format, isBefore, isSameDay, subMonths } from "date-fns";
import { formatLocalizedDate } from "../../../features/localize-date-format/LocalizedDateFormatter";
import { startCase } from "lodash-es";
import { getDateFormatForLocaleCode } from "../../../features/localize-date-format/DateFormatProvider";

type VisiblePanel = "calendar" | "month-picker";

export interface TravelDateInputValue {
  startDate?: string;
  endDate?: string;
}

export interface TravelDateInputProps
  extends ValueAndOnValueChangeProps<TravelDateInputValue> {
  localeCode?: string;
  initialMonthInFocus?: Date;
  startDateLabel?: string;
  endDateLabel?: string;
  previousMonthButtonAriaLabel?: string;
  nextMonthButtonAriaLabel?: string;
}

export const TravelDateInput: React.FC<TravelDateInputProps> = ({
  value,
  onValueChange,
  startDateLabel,
  endDateLabel,
  localeCode = "sv",
  initialMonthInFocus,
  previousMonthButtonAriaLabel = "Previous month",
  nextMonthButtonAriaLabel = "Next month",
}) => {
  const locale = getLocaleForLocaleCode(localeCode);

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

  const [visibleMonth, setVisibleMonth] = useState<Date>(
    initialMonthInFocus ?? selectedStartDate ?? new Date()
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

  const today = useToday();

  const [hoverDate, setHoverDate] = useState<Date | undefined>();

  const [visiblePanel, setVisiblePanel] = useState<VisiblePanel>("calendar");

  const setVisibleMonthDate = useCallback((d: Date) => {
    setVisibleMonth(d);
  }, []);

  const onValueChangeByInputs = useCallback<
    (value: TravelDateInputValue) => void
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
        setVisibleMonth(startDate);
      } else if (endDate) {
        setVisibleMonth(endDate);
      }

      onValueChange?.({
        ...value,
        ...v,
      });
    },
    [dateFormat.length, localeCode, onValueChange, value]
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

  return (
    <Column gap={3} className={styles.travelDateInput}>
      <Heading variant={"h2"}>Select dates</Heading>
      <TravelDateTextInputs
        value={value}
        onValueChange={onValueChangeByInputs}
        localeCode={localeCode}
        startDateLabel={startDateLabel}
        endDateLabel={endDateLabel}
      />
      <Row alignSelf={"center"} justifyContent={"space-between"} width={"100%"}>
        <FlatButton
          aria-live={"polite"}
          label={monthPickerButtonLabel}
          rightIcon={
            visiblePanel === "calendar" ? stenaAngleDown : stenaAngleUp
          }
          onClick={() =>
            setVisiblePanel((p) =>
              p === "calendar" ? "month-picker" : "calendar"
            )
          }
          ref={monthPickerButtonRef}
        />
        <Row alignItems={"center"} gap={2}>
          <SecondaryButton
            leftIcon={stenaArrowLeft}
            onClick={() => setVisibleMonth((p) => subMonths(p, 1))}
            aria-label={previousMonthButtonAriaLabel}
          />
          <SecondaryButton
            leftIcon={stenaArrowRight}
            onClick={() => setVisibleMonth((p) => addMonths(p, 1))}
            aria-label={nextMonthButtonAriaLabel}
          />
        </Row>
      </Row>

      {visiblePanel === "calendar" && (
        <table>
          <tbody>
            <tr>
              {visibleMonthData.weeks[0].days.map((day: DayData) => (
                <th key={day.name} abbr={day.fullName}>
                  <Text>{day.name}</Text>
                </th>
              ))}
            </tr>
            {visibleMonthData.weeks.map((week: WeekData) => (
              <React.Fragment key={week.weekNumber}>
                <tr key={week.weekNumber}>
                  {week.days.map((day) => (
                    <TravelDateCell
                      onClick={(d) => onClickDate(d)}
                      key={day.dateString}
                      visibleMonth={visibleMonth}
                      onChangeVisibleMonth={setVisibleMonthDate}
                      isValidDateRange={isValidDateRange}
                      day={day}
                      onStartHover={(d) => setHoverDate(d)}
                      onEndHover={(d) =>
                        setHoverDate((p) =>
                          p && isSameDay(p, d) ? undefined : p
                        )
                      }
                      selectedStartDate={selectedStartDate}
                      selectedEndDate={selectedEndDate}
                      hoverDate={hoverDate}
                      today={today}
                    />
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}

      {visiblePanel === "month-picker" && (
        <MonthPicker
          firstMonth={new Date()}
          numMonths={12}
          value={{
            month: visibleMonth.getMonth(),
            year: visibleMonth.getFullYear(),
          }}
          onValueChange={(v) => {
            setVisibleMonth(new Date(v.year, v.month));
            setVisiblePanel("calendar");
            monthPickerButtonRef.current?.focus();
          }}
          onCancel={() => {
            setVisiblePanel("calendar");
            monthPickerButtonRef.current?.focus();
          }}
        />
      )}
    </Column>
  );
};
