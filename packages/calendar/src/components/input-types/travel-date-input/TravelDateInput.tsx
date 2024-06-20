import * as React from "react";
import { useState } from "react";
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
  const [month, setMonth] = useState<MonthData>(() =>
    getMonthInYear(2024, 5, locale)
  );

  const [hoverDay, setHoverDay] = useState<DayData | undefined>();

  const [visiblePanel, setVisiblePanel] = useState<VisiblePanel>("calendar");

  return (
    <Column gap={2} className={styles.travelDateInput}>
      <Heading variant={"h2"}>Select dates</Heading>
      <TravelDateTextInputs value={value} onValueChange={onValueChange} />
      <Row alignSelf={"center"} justifyContent={"space-between"} width={"100%"}>
        <FlatButton
          label={month.name + " " + month.year}
          rightIcon={
            visiblePanel === "calendar" ? stenaAngleDown : stenaAngleUp
          }
          onClick={() =>
            setVisiblePanel((p) =>
              p === "calendar" ? "month-picker" : "calendar"
            )
          }
        />
        <Row alignSelf={"center"} gap={2}>
          <SecondaryButton
            leftIcon={stenaArrowLeft}
            onClick={() => setMonth((p) => getPrevMonth(p, locale))}
          />
          <SecondaryButton
            leftIcon={stenaArrowRight}
            onClick={() => setMonth((p) => getNextMonth(p, locale))}
          />
        </Row>
      </Row>

      {visiblePanel === "calendar" && (
        <table>
          <tbody>
            <tr>
              {month.weeks[0].days.map((day: DayData) => (
                <th key={day.name}>
                  <Text>{day.name}</Text>
                </th>
              ))}
            </tr>
            {month.weeks.map((week: WeekData) => (
              <>
                <tr key={week.weekNumber}>
                  {week.days.map((day) => (
                    <TravelDateCell
                      visibleMonth={month}
                      day={day}
                      onHoverDay={(d) => setHoverDay(d)}
                      onNoHoverDay={() =>
                        setHoverDay((p) => (p === day ? undefined : p))
                      }
                      value={value}
                      onValueChange={onValueChange}
                      hoverDay={hoverDay}
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
          value={{ month: month.monthInYear, year: month.year }}
          onValueChange={(v) => {
            setMonth(getMonthInYear(v.year, v.month, enGB));
            setVisiblePanel("calendar");
          }}
        />
      )}
    </Column>
  );
};
