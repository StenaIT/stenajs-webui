import * as React from "react";
import { useCallback } from "react";
import { CalendarProps } from "../../types/CalendarTypes";
import { Calendar } from "../../components/calendar/Calendar";
import { Months } from "../../util/calendar/CalendarDataFactory";
import { MonthPicker } from "../month-picker/MonthPicker";
import { YearPicker } from "../year-picker/YearPicker";
import { Box } from "@stenajs-webui/core";
import { PrimaryButton } from "@stenajs-webui/elements";
import { CalendarPanelType } from "./CalendarPanelType";
import { PresetPicker } from "../preset-picker/PresetPicker";
import { CalendarPreset } from "../preset-picker/CalendarPreset";

interface CalendarWithMonthYearPickersProps<T>
  extends Omit<CalendarProps<T>, "date" | "year" | "month"> {
  dateInFocus: Date;
  setDateInFocus: (dateInFocus: Date) => void;
  currentPanel: CalendarPanelType;
  setCurrentPanel: (currentPanel: CalendarPanelType) => void;
  onSelectPreset: (preset: CalendarPreset) => void;
}

export const CalendarWithMonthYearPickers = function CalendarWithMonthYearPickers<
  T
>({
  dateInFocus,
  setDateInFocus,
  currentPanel,
  setCurrentPanel,
  ...props
}: CalendarWithMonthYearPickersProps<T>) {
  const onChangeSelectedMonth = useCallback(
    (selectedMonth: Months) => {
      const newDate = dateInFocus ? new Date(dateInFocus) : new Date();
      newDate.setMonth(selectedMonth);
      if (setDateInFocus) {
        setDateInFocus(newDate);
      }
      setCurrentPanel("calendar");
    },
    [dateInFocus, setDateInFocus, setCurrentPanel]
  );

  const onChangeSelectedYear = useCallback(
    (selectedYear: number) => {
      const newDate = dateInFocus ? new Date(dateInFocus) : new Date();
      newDate.setFullYear(selectedYear);
      if (setDateInFocus) {
        setDateInFocus(newDate);
      }
      setCurrentPanel("calendar");
    },
    [dateInFocus, setDateInFocus, setCurrentPanel]
  );

  const onClickYear = useCallback(() => {
    setCurrentPanel("year");
  }, [setCurrentPanel]);

  const onClickMonth = useCallback(() => {
    setCurrentPanel("month");
  }, [setCurrentPanel]);

  switch (currentPanel) {
    case "calendar":
      return (
        <>
          <Calendar<T>
            {...props}
            date={dateInFocus}
            onClickYear={onClickYear}
            onClickMonth={onClickMonth}
          />
        </>
      );
    case "month":
      return (
        <MonthPicker
          value={dateInFocus.getMonth()}
          onValueChange={onChangeSelectedMonth}
        />
      );
    case "year":
      return (
        <YearPicker
          value={dateInFocus.getFullYear()}
          onValueChange={onChangeSelectedYear}
        />
      );
    case "presets":
      return <PresetPicker onClickPreset={() => {}} />;

    default:
      return (
        <Box>
          <PrimaryButton
            label={"Show calendar"}
            onClick={() => setCurrentPanel("calendar")}
          />
        </Box>
      );
  }
};
