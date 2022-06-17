import { FlatButton } from "@stenajs-webui/elements";
import * as React from "react";
import { Calendar } from "../../components/calendar/Calendar";
import { defaultCalendarTheme } from "../../components/calendar/CalendarTheme";
import { CalendarProps } from "../../types/CalendarTypes";
import { useSelectedMonthStepperLogic } from "./hooks/UseSelectedMonthStepperLogic";
import { WithMonthSwitcherBelow } from "./MonthSwitcherBelow";
import { CalendarWithMonthYearPickers } from "../calendar-with-month-year-pickers/CalendarWithMonthYearPickers";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { Column, Row, Space } from "@stenajs-webui/core";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons/faAngleDoubleLeft";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons/faAngleDoubleRight";
import { CalendarPanelType } from "../calendar-with-month-year-pickers/CalendarPanelType";
import { CalendarPreset } from "../preset-picker/CalendarPreset";

export type MonthSwitcherPlacement = "header" | "below";

export interface CalendarWithMonthSwitcherProps<T> extends CalendarProps<T> {
  monthSwitcherPlacement?: MonthSwitcherPlacement;
  dateInFocus: Date;
  setDateInFocus: (dateInFocus: Date) => void;
  currentPanel: CalendarPanelType;
  setCurrentPanel: (currentPanel: CalendarPanelType) => void;
  onSelectPreset?: (preset: CalendarPreset) => void;
  hideYearPagination?: boolean;
}

const noop = () => {};

export function CalendarWithMonthSwitcher<T>({
  monthSwitcherPlacement,
  theme = defaultCalendarTheme,
  dateInFocus,
  setDateInFocus,
  currentPanel,
  setCurrentPanel,
  onSelectPreset = noop,
  hideYearPagination = false,
  ...calendarProps
}: CalendarWithMonthSwitcherProps<T>) {
  const { nextMonth, prevMonth, nextYear, prevYear } =
    useSelectedMonthStepperLogic(
      dateInFocus,
      setDateInFocus,
      calendarProps.monthsPerRow,
      calendarProps.numMonths
    );

  const placement = fallbackIfNoPlacement(
    monthSwitcherPlacement,
    calendarProps.numMonths
  );

  switch (placement) {
    case "below": {
      return (
        <WithMonthSwitcherBelow
          theme={theme}
          nextMonth={nextMonth}
          prevMonth={prevMonth}
          nextYear={nextYear}
          prevYear={prevYear}
        >
          <Calendar<T> {...calendarProps} theme={theme} date={dateInFocus} />
        </WithMonthSwitcherBelow>
      );
    }
    case "header": {
      return (
        <Column>
          <CalendarWithMonthYearPickers<T>
            {...calendarProps}
            theme={theme}
            dateInFocus={dateInFocus}
            setDateInFocus={setDateInFocus}
            currentPanel={currentPanel}
            setCurrentPanel={setCurrentPanel}
            onSelectPreset={onSelectPreset}
            headerLeftContent={
              <Row alignItems={"center"}>
                {!hideYearPagination && (
                  <FlatButton
                    size={"small"}
                    onClick={prevYear}
                    leftIcon={faAngleDoubleLeft}
                  />
                )}
                <Space />
                <FlatButton
                  size={"small"}
                  onClick={prevMonth}
                  leftIcon={faAngleLeft}
                />
              </Row>
            }
            headerRightContent={
              <Row alignItems={"center"}>
                <FlatButton
                  size={"small"}
                  onClick={nextMonth}
                  leftIcon={faAngleRight}
                />
                <Space />
                {!hideYearPagination && (
                  <FlatButton
                    size={"small"}
                    onClick={nextYear}
                    leftIcon={faAngleDoubleRight}
                  />
                )}
              </Row>
            }
          />
        </Column>
      );
    }
    default: {
      return (
        <Calendar<T> {...calendarProps} theme={theme} date={dateInFocus} />
      );
    }
  }
}

const fallbackIfNoPlacement = (
  monthSwitcherPlacement: MonthSwitcherPlacement | undefined,
  numMonths: number | undefined
): MonthSwitcherPlacement => {
  return monthSwitcherPlacement || (numMonths || 1) > 1 ? "below" : "header";
};
