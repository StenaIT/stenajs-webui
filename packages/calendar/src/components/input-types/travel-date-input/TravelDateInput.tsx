import * as React from "react";
import { useCallback, useState } from "react";
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
import { Locale } from "date-fns";

type VisiblePanel = "calendar" | "month-picker";

export interface TravelDateInputValue {
  startDate?: string;
  endDate?: string;
}

export interface TravelDateInputProps
  extends ValueAndOnValueChangeProps<TravelDateInputValue> {
  locale?: Locale;
}

export const TravelDateInput: React.FC<TravelDateInputProps> = ({
  value,
  onValueChange,
  locale = enGB,
}) => {
  const [visibleMonth, setVisibleMonth] = useState<MonthData>(() =>
    getMonthInYear(2024, 5, locale)
  );

  const today = useToday();

  const [hoverDay, setHoverDay] = useState<DayData | undefined>();

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
        const d = new Date(v.startDate);
        setVisibleMonth(getMonthInYear(d.getFullYear(), d.getMonth(), locale));
      }
      onValueChange?.(v);
    },
    [value?.startDate, value?.endDate, onValueChange, locale]
  );

  return (
    <Column gap={3} className={styles.travelDateInput}>
      <Heading variant={"h2"}>Select dates</Heading>
      <TravelDateTextInputs
        value={value}
        onValueChange={onValueChangeHandler}
      />
      <Row alignSelf={"center"} justifyContent={"space-between"} width={"100%"}>
        <FlatButton
          label={visibleMonth.name + " " + visibleMonth.year}
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
              <>
                <tr key={week.weekNumber}>
                  {week.days.map((day) => (
                    <TravelDateCell
                      visibleMonth={visibleMonth}
                      onChangeVisibleMonth={setVisibleMonthDate}
                      day={day}
                      onHoverDay={(d) => setHoverDay(d)}
                      onNoHoverDay={() =>
                        setHoverDay((p) => (p === day ? undefined : p))
                      }
                      value={value}
                      onValueChange={onValueChange}
                      hoverDay={hoverDay}
                      inputInFocus={"startDate"}
                      today={today}
                    />
                  ))}
                </tr>
              </>
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
