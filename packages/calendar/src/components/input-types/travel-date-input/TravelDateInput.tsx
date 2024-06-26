import * as React from "react";
import { useCallback, useMemo, useState } from "react";
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
  MonthData,
  WeekData,
} from "../../../util/calendar/CalendarDataFactory";
import { enGB } from "date-fns/locale";
import styles from "./TravelDateInput.module.css";
import { MonthPicker } from "../../../features/month-picker/MonthPicker";
import { getNextMonth, getPrevMonth } from "./util/MonthStepper";
import { TravelDateCell } from "./components/TravelDateCell";
import { useToday } from "./util/UseToday";
import { getLocaleForLocaleCode } from "../../../features/localize-date-format/LocaleMapper";
import { parseLocalizedDateString } from "../../../features/localize-date-format/LocalizedDateParser";
import { isBefore } from "date-fns";
import { formatLocalizedDate } from "../../../features/localize-date-format/LocalizedDateFormatter";

type VisiblePanel = "calendar" | "month-picker";

export interface TravelDateInputValue {
  startDate?: string;
  endDate?: string;
}

export interface TravelDateInputProps
  extends ValueAndOnValueChangeProps<TravelDateInputValue> {
  localeCode?: string;
}

export const TravelDateInput: React.FC<TravelDateInputProps> = ({
  value,
  onValueChange,
  localeCode = "sv",
}) => {
  const locale = getLocaleForLocaleCode(localeCode);

  const [visibleMonth, setVisibleMonth] = useState<MonthData>(() =>
    getMonthInYear(2024, 5, locale)
  );

  const today = useToday();

  const [hoverDate, setHoverDate] = useState<Date | undefined>();

  const [visiblePanel, setVisiblePanel] = useState<VisiblePanel>("calendar");

  const setVisibleMonthDate = useCallback(
    (d: Date) => {
      setVisibleMonth(getMonthInYear(d.getFullYear(), d.getMonth(), locale));
    },
    [locale]
  );

  const onValueChangeHandler = useCallback<
    (value: TravelDateInputValue) => void
  >(
    (v) => {
      if (!value?.startDate && !value?.endDate && v.startDate?.length === 10) {
        const d = parseLocalizedDateString(v.startDate, localeCode);
        setVisibleMonth(getMonthInYear(d.getFullYear(), d.getMonth(), locale));
      }
      onValueChange?.(v);
    },
    [value?.startDate, value?.endDate, onValueChange, locale]
  );

  const selectedStartDate = useMemo(
    () =>
      value?.startDate
        ? parseLocalizedDateString(value.startDate, localeCode)
        : undefined,
    [value?.startDate]
  );

  const selectedEndDate = useMemo(
    () =>
      value?.endDate
        ? parseLocalizedDateString(value.endDate, localeCode)
        : undefined,
    [value?.endDate]
  );

  const onClickDate = (date: Date) => {
    const isSameMonthAndYear =
      date.getFullYear() === visibleMonth.year &&
      date.getMonth() === visibleMonth.monthInYear;

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
        onValueChange={onValueChangeHandler}
        localeCode={localeCode}
      />
      <Row alignSelf={"center"} justifyContent={"space-between"} width={"100%"}>
        <FlatButton
          label={"TODO format: " + visibleMonth.name + " " + visibleMonth.year}
          rightIcon={
            visiblePanel === "calendar" ? stenaAngleDown : stenaAngleUp
          }
          onClick={() =>
            setVisiblePanel((p) =>
              p === "calendar" ? "month-picker" : "calendar"
            )
          }
        />
        <Row alignItems={"center"} gap={2}>
          <SecondaryButton
            leftIcon={stenaArrowLeft}
            onClick={() => setVisibleMonth((p) => getPrevMonth(p, locale))}
          />
          <SecondaryButton
            leftIcon={stenaArrowRight}
            onClick={() => setVisibleMonth((p) => getNextMonth(p, locale))}
          />
        </Row>
      </Row>

      {visiblePanel === "calendar" && (
        <table>
          <tbody>
            <tr>
              {visibleMonth.weeks[0].days.map((day: DayData) => (
                <th key={day.name}>
                  <Text>{day.name}</Text>
                </th>
              ))}
            </tr>
            {visibleMonth.weeks.map((week: WeekData) => (
              <React.Fragment key={week.weekNumber}>
                <tr key={week.weekNumber}>
                  {week.days.map((day) => (
                    <TravelDateCell
                      onClick={() => onClickDate(day.date)}
                      key={day.dateString}
                      visibleMonth={visibleMonth}
                      onChangeVisibleMonth={setVisibleMonthDate}
                      day={day}
                      onStartHover={() => setHoverDate(day.date)}
                      onEndHover={() =>
                        setHoverDate((p) => (p === day.date ? undefined : p))
                      }
                      selectedStartDate={selectedStartDate}
                      selectedEndDate={selectedEndDate}
                      hoverDate={hoverDate}
                      inputInFocus={"startDate"}
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
          value={{ month: visibleMonth.monthInYear, year: visibleMonth.year }}
          onValueChange={(v) => {
            setVisibleMonth(getMonthInYear(v.year, v.month, enGB));
            setVisiblePanel("calendar");
          }}
        />
      )}
    </Column>
  );
};
