import { Box } from "@stenajs-webui/core";
import { PrimaryButton } from "@stenajs-webui/elements";
import * as React from "react";
import { ReactNode, useCallback } from "react";
import { Calendar } from "../../components/calendar/Calendar";
import {
  CalendarProps,
  RenderMonthPickerArgs,
} from "../../types/CalendarTypes";
import {
  createFirstDate,
  MonthPicker,
  MonthPickerValue,
} from "../month-picker/MonthPicker";
import { CalendarPreset } from "../preset-picker/CalendarPreset";
import { PresetPicker } from "../preset-picker/PresetPicker";
import { CalendarPanelType } from "./CalendarPanelType";

interface CalendarWithMonthYearPickersProps<T>
  extends Omit<CalendarProps<T>, "date" | "year" | "month"> {
  dateInFocus: Date;
  setDateInFocus: (dateInFocus: Date) => void;
  currentPanel: CalendarPanelType;
  setCurrentPanel: (currentPanel: CalendarPanelType) => void;
  onSelectPreset: (preset: CalendarPreset) => void;
  renderMonthPicker?: (args: RenderMonthPickerArgs) => ReactNode;
}

export const CalendarWithMonthYearPickers =
  function CalendarWithMonthYearPickers<T>({
    locale,
    dateInFocus,
    setDateInFocus,
    currentPanel,
    setCurrentPanel,
    renderMonthPicker,
    ...props
  }: CalendarWithMonthYearPickersProps<T>) {
    const onChangeSelectedMonth = useCallback(
      (selectedMonth: MonthPickerValue) => {
        const newDate = dateInFocus ? new Date(dateInFocus) : new Date();
        newDate.setMonth(selectedMonth.month);
        newDate.setFullYear(selectedMonth.year);
        if (setDateInFocus) {
          setDateInFocus(newDate);
        }
        setCurrentPanel("calendar");
      },
      [dateInFocus, setDateInFocus, setCurrentPanel]
    );

    const onClickMonth = useCallback(() => {
      setCurrentPanel("month");
    }, [setCurrentPanel]);

    switch (currentPanel) {
      case "calendar":
        return (
          <Calendar<T>
            {...props}
            date={dateInFocus}
            onClickMonth={onClickMonth}
            locale={locale}
          />
        );
      case "month":
        return renderMonthPicker ? (
          renderMonthPicker({
            value: createFirstDate(dateInFocus),
            onValueChange: onChangeSelectedMonth,
            locale: locale,
            firstMonth: new Date(),
            numMonths: 24,
            dateInFocus,
          })
        ) : (
          <MonthPicker
            value={createFirstDate(dateInFocus)}
            onValueChange={onChangeSelectedMonth}
            locale={locale}
            firstMonth={new Date()}
            numMonths={24}
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
