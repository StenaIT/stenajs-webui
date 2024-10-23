import * as React from "react";
import { Column, Heading, HeadingVariant } from "@stenajs-webui/core";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { MonthPicker } from "../../../features/month-picker/MonthPicker";
import { MonthHeader } from "../../../features/travel-calendar/components/MonthHeader";
import {
  TravelCalendar,
  TravelCalendarSizeVariant,
} from "../../../features/travel-calendar/components/TravelCalendar";
import { useTravelDateInput } from "../../../features/travel-calendar/hooks/UseTravelDateInput";
import { TravelDateTextInputField } from "../../../features/travel-calendar/components/TravelDateTextInputField";
import { DateTextInputVariant } from "../../../features/travel-calendar/types";

export interface TravelDateCalendarProps
  extends ValueAndOnValueChangeProps<string> {
  localeCode?: string;
  initialMonthInFocus?: Date;
  label?: string;
  previousMonthButtonAriaLabel?: string;
  nextMonthButtonAriaLabel?: string;
  heading?: string;
  headingLevel?: HeadingVariant;
  firstMonthInMonthPicker?: Date;
  numMonthsInMonthPicker?: number;
  size?: TravelCalendarSizeVariant;
  dateTestId?: (date: Date) => string | undefined;
  previousMonthButtonTestId?: string;
  nextMonthButtonTestId?: string;
  placeholderWhenBlurred?: string;
  textInputVariant?: DateTextInputVariant;
}

export const TravelDateCalendar: React.FC<TravelDateCalendarProps> = ({
  value,
  onValueChange,
  label,
  localeCode = "sv",
  initialMonthInFocus,
  previousMonthButtonAriaLabel = "Previous month",
  nextMonthButtonAriaLabel = "Next month",
  placeholderWhenBlurred,
  heading,
  headingLevel,
  numMonthsInMonthPicker = 12,
  firstMonthInMonthPicker = new Date(),
  dateTestId,
  size = "medium",
  previousMonthButtonTestId,
  nextMonthButtonTestId,
  textInputVariant = "standard",
}) => {
  const inputProps = useTravelDateInput(
    value,
    onValueChange,
    localeCode,
    initialMonthInFocus,
  );

  const {
    visiblePanel,
    visibleMonth,
    onValueChangeByInputs,
    setVisibleMonth,
    setVisiblePanel,
    monthPickerButtonRef,
    selectedDate,
  } = inputProps;

  return (
    <Column gap={3}>
      {heading && (
        <Heading variant={"h2"} as={headingLevel}>
          {heading}
        </Heading>
      )}
      <TravelDateTextInputField
        {...inputProps}
        value={value}
        onValueChange={onValueChangeByInputs}
        localeCode={localeCode}
        label={label}
        calendarSize={size}
        placeholderWhenBlurred={placeholderWhenBlurred}
        variant={textInputVariant}
      />

      <MonthHeader
        {...inputProps}
        previousMonthButtonAriaLabel={previousMonthButtonAriaLabel}
        nextMonthButtonAriaLabel={nextMonthButtonAriaLabel}
        calendarSize={size}
        previousMonthButtonTestId={previousMonthButtonTestId}
        nextMonthButtonTestId={nextMonthButtonTestId}
      />

      {visiblePanel === "calendar" && (
        <TravelCalendar
          {...inputProps}
          size={size}
          selectedStartDate={selectedDate}
          selectedEndDate={selectedDate}
          isValidDateRange={Boolean(selectedDate)}
          multiSelectable={false}
          dateTestId={dateTestId}
        />
      )}

      {visiblePanel === "month-picker" && (
        <MonthPicker
          firstMonth={firstMonthInMonthPicker}
          numMonths={numMonthsInMonthPicker}
          value={visibleMonth}
          localeCode={localeCode}
          size={size}
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
