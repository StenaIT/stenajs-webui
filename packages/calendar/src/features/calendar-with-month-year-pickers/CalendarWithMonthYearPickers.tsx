import { Box } from "@stenajs-webui/core";
import { PrimaryButton } from "@stenajs-webui/elements";
import * as React from "react";
import { ReactNode, useCallback, useMemo } from "react";
import { Calendar } from "../../components/calendar/Calendar";
import {
  CalendarProps,
  RenderMonthPickerArgs,
} from "../../types/CalendarTypes";
import { MonthPicker } from "../month-picker/MonthPicker";
import { CalendarPreset } from "../preset-picker/CalendarPreset";
import { PresetPicker } from "../preset-picker/PresetPicker";
import { CalendarPanelType } from "./CalendarPanelType";
import {
  getLocaleCodeForLocale,
  SupportedLocaleCode,
} from "../localize-date-format/LocaleMapper";

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
    const localeCode = useMemo<SupportedLocaleCode>(
      () =>
        locale == null ? "en-GB" : (getLocaleCodeForLocale(locale) ?? "en-GB"),
      [locale],
    );

    const onChangeSelectedMonth = useCallback(
      (selectedMonth: Date) => {
        if (setDateInFocus) {
          setDateInFocus(selectedMonth);
        }
        setCurrentPanel("calendar");
      },
      [setDateInFocus, setCurrentPanel],
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
            value: dateInFocus,
            onValueChange: onChangeSelectedMonth,
            locale: locale,
            firstMonth: new Date(),
            numMonths: 24,
            dateInFocus,
          })
        ) : (
          <MonthPicker
            value={dateInFocus}
            onValueChange={onChangeSelectedMonth}
            localeCode={localeCode}
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
