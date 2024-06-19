import { Column, Row } from "@stenajs-webui/core";
import {
  SecondaryButton,
  stenaArrowLeft,
  stenaArrowRight,
} from "@stenajs-webui/elements";
import * as React from "react";
import { Calendar } from "../../components/calendar/Calendar";
import { defaultCalendarTheme } from "../../components/calendar/CalendarTheme";
import {
  CalendarProps,
  RenderMonthPickerArgs,
} from "../../types/CalendarTypes";
import { CalendarPanelType } from "../calendar-with-month-year-pickers/CalendarPanelType";
import { CalendarWithMonthYearPickers } from "../calendar-with-month-year-pickers/CalendarWithMonthYearPickers";
import { CalendarPreset } from "../preset-picker/CalendarPreset";
import { useSelectedMonthStepperLogic } from "./hooks/UseSelectedMonthStepperLogic";
import { WithMonthSwitcherBelow } from "./MonthSwitcherBelow";
import { ReactNode } from "react";

export type MonthSwitcherPlacement = "header" | "below";

export interface CalendarWithMonthSwitcherProps<T> extends CalendarProps<T> {
  monthSwitcherPlacement?: MonthSwitcherPlacement;
  dateInFocus: Date;
  setDateInFocus: (dateInFocus: Date) => void;
  currentPanel: CalendarPanelType;
  setCurrentPanel: (currentPanel: CalendarPanelType) => void;
  onSelectPreset?: (preset: CalendarPreset) => void;
  renderMonthPicker?: (args: RenderMonthPickerArgs) => ReactNode;
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
  renderMonthPicker,
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
            renderMonthPicker={renderMonthPicker}
            dateInFocus={dateInFocus}
            setDateInFocus={setDateInFocus}
            currentPanel={currentPanel}
            setCurrentPanel={setCurrentPanel}
            onSelectPreset={onSelectPreset}
            headerRightContent={
              <Row alignItems={"center"} gap={1}>
                <SecondaryButton
                  onClick={prevMonth}
                  leftIcon={stenaArrowLeft}
                />
                <SecondaryButton
                  onClick={nextMonth}
                  leftIcon={stenaArrowRight}
                />
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
