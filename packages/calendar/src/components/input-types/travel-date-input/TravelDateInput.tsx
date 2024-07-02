import * as React from "react";
import { useCallback, useId, useMemo, useRef, useState } from "react";
import { Box, Column, Heading, Row, Text } from "@stenajs-webui/core";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { TravelDateTextInputs } from "./components/TravelDateTextInputs";
import {
  Card,
  CardBody,
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
import {
  getDefaultLocaleForFormatting,
  getLocaleForLocaleCode,
} from "../../../features/localize-date-format/LocaleMapper";
import { parseLocalizedDateString } from "../../../features/localize-date-format/LocalizedDateParser";
import {
  addMonths,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  subMonths,
} from "date-fns";
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
  const locale =
    getLocaleForLocaleCode(localeCode) ?? getDefaultLocaleForFormatting();

  const [calendarVisible, setCalendarVisible] = useState(false);

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

  return (
    <Box position={"relative"} border={"red"}>
      <Box
        position={"absolute"}
        left={-24}
        top={-80}
        display={calendarVisible ? undefined : "none"}
      >
        <Box
          background={"white"}
          shadow={"popover"}
          borderRadius={"var(--swui-border-radius-large)"}
        >
          <CardBody>
            <Column gap={3} className={styles.travelDateInput}>
              <Heading variant={"h2"}>Select dates</Heading>
              <Box height={"68px"} />
              <Row
                alignSelf={"center"}
                justifyContent={"space-between"}
                width={"100%"}
              >
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
                    disabled={prevMonthDisabled}
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
                              onChangeVisibleMonth={setVisibleMonth}
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
                              todayIsInVisibleMonth={todayIsInVisibleMonth}
                              calendarId={calendarId}
                              isDateDisabled={isDateDisabled}
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
                  value={visibleMonth}
                  onValueChange={(v) => {
                    setVisibleMonth(v);
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
          </CardBody>
        </Box>
      </Box>

      <Box position={"absolute"}>
        <TravelDateTextInputs
          value={value}
          onValueChange={onValueChangeByInputs}
          localeCode={localeCode}
          startDateLabel={startDateLabel}
          endDateLabel={endDateLabel}
          setCalendarVisible={setCalendarVisible}
        />
      </Box>
    </Box>
  );
};
