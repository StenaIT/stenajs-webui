import * as React from "react";
import { Column, Heading, HeadingVariant } from "@stenajs-webui/core";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { TravelDateRangeTextInputFields } from "../../../features/travel-calendar/components/TravelDateRangeTextInputFields";
import { MonthPicker } from "../../../features/month-picker/MonthPicker";
import { useTravelDateRangeInput } from "../../../features/travel-calendar/hooks/UseTravelDateRangeInput";
import { MonthHeader } from "../../../features/travel-calendar/components/MonthHeader";
import {
  TravelCalendar,
  TravelCalendarSizeVariant,
} from "../../../features/travel-calendar/components/TravelCalendar";
import {
  DateTextInputVariant,
  TravelDateRangeInputValue,
} from "../../../features/travel-calendar/types";

export interface TravelDateRangeCalendarProps
  extends ValueAndOnValueChangeProps<TravelDateRangeInputValue> {
  localeCode?: string;
  initialMonthInFocus?: Date;
  startDateLabel?: string;
  endDateLabel?: string;
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
  placeholderWhenBlurredStartDate?: string;
  placeholderWhenBlurredEndDate?: string;
  textInputVariant?: DateTextInputVariant;
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
  heading,
  headingLevel,
  numMonthsInMonthPicker = 12,
  firstMonthInMonthPicker = new Date(),
  size = "medium",
  dateTestId,
  previousMonthButtonTestId,
  nextMonthButtonTestId,
  placeholderWhenBlurredStartDate,
  placeholderWhenBlurredEndDate,
  textInputVariant = "standard",
}) => {
  const inputProps = useTravelDateRangeInput(
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
  } = inputProps;

  return (
    <Column gap={3}>
      {heading && (
        <Heading variant={"h2"} as={headingLevel}>
          {heading}
        </Heading>
      )}
      <TravelDateRangeTextInputFields
        {...inputProps}
        value={value}
        onValueChange={onValueChangeByInputs}
        localeCode={localeCode}
        startDateLabel={startDateLabel}
        endDateLabel={endDateLabel}
        calendarSize={size}
        placeholderWhenBlurredStartDate={placeholderWhenBlurredStartDate}
        placeholderWhenBlurredEndDate={placeholderWhenBlurredEndDate}
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
          multiSelectable={true}
          dateTestId={dateTestId}
        />
      )}

      {visiblePanel === "month-picker" && (
        <MonthPicker
          firstMonth={firstMonthInMonthPicker}
          numMonths={numMonthsInMonthPicker}
          value={visibleMonth}
          size={size}
          localeCode={localeCode}
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
