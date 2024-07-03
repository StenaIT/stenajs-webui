import * as React from "react";
import { Column } from "@stenajs-webui/core";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { TravelDateTextInputFields } from "../../../features/travel-calendar/components/TravelDateTextInputFields";
import { MonthPicker } from "../../../features/month-picker/MonthPicker";
import { useTravelDateRangeInput } from "../../../features/travel-calendar/hooks/UseTravelDateRangeInput";
import { MonthHeader } from "../../../features/travel-calendar/components/MonthHeader";
import { TravelCalendar } from "../../../features/travel-calendar/components/TravelCalendar";
import { TravelDateRangeInputValue } from "../../../features/travel-calendar/types";

export interface TravelDateRangeCalendarProps
  extends ValueAndOnValueChangeProps<TravelDateRangeInputValue> {
  localeCode?: string;
  initialMonthInFocus?: Date;
  startDateLabel?: string;
  endDateLabel?: string;
  previousMonthButtonAriaLabel?: string;
  nextMonthButtonAriaLabel?: string;
}

export const TravelDateRangeCalendar: React.FC<
  TravelDateRangeCalendarProps
> = ({
  value,
  onValueChange,
  startDateLabel,
  endDateLabel,
  localeCode = "sv",
  initialMonthInFocus,
  previousMonthButtonAriaLabel = "Previous month",
  nextMonthButtonAriaLabel = "Next month",
}) => {
  const inputProps = useTravelDateRangeInput(
    value,
    onValueChange,
    localeCode,
    initialMonthInFocus
  );

  const {
    visiblePanel,
    visibleMonth,
    onValueChangeByInputs,
    setVisibleMonth,
    setVisiblePanel,
    monthPickerButtonRef,
  } = inputProps;

  return (
    <Column gap={3}>
      <TravelDateTextInputFields
        value={value}
        onValueChange={onValueChangeByInputs}
        localeCode={localeCode}
        startDateLabel={startDateLabel}
        endDateLabel={endDateLabel}
      />

      <MonthHeader
        {...inputProps}
        previousMonthButtonAriaLabel={previousMonthButtonAriaLabel}
        nextMonthButtonAriaLabel={nextMonthButtonAriaLabel}
      />

      {visiblePanel === "calendar" && <TravelCalendar {...inputProps} />}

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
  );
};
