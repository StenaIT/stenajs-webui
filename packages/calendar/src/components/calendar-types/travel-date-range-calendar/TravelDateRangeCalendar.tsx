import * as React from "react";
import { Column, Heading } from "@stenajs-webui/core";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { TravelDateTextInputs } from "../../../features/travel-calendar/components/TravelDateTextInputs";
import { MonthPicker } from "../../../features/month-picker/MonthPicker";
import { useTravelDateInput } from "../../../features/travel-calendar/hooks/UseTravelDateInput";
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

export const TravelDateRangeCalendar: React.FC<TravelDateRangeCalendarProps> = ({
  value,
  onValueChange,
  startDateLabel,
  endDateLabel,
  localeCode = "sv",
  initialMonthInFocus,
  previousMonthButtonAriaLabel = "Previous month",
  nextMonthButtonAriaLabel = "Next month",
}) => {
  const {
    monthPickerButtonRef,
    isDateDisabled,
    onClickDate,
    prevMonthDisabled,
    isValidDateRange,
    calendarId,
    onValueChangeByInputs,
    monthPickerButtonLabel,
    setVisiblePanel,
    visiblePanel,
    visibleMonthData,
    setVisibleMonth,
    setHoverDate,
    hoverDate,
    todayIsInVisibleMonth,
    selectedStartDate,
    selectedEndDate,
    today,
    visibleMonth,
  } = useTravelDateInput(value, onValueChange, localeCode, initialMonthInFocus);

  return (
    <Column gap={3}>
      <Heading variant={"h2"}>Select dates</Heading>
      <TravelDateTextInputs
        value={value}
        onValueChange={onValueChangeByInputs}
        localeCode={localeCode}
        startDateLabel={startDateLabel}
        endDateLabel={endDateLabel}
      />

      <MonthHeader
        setVisibleMonth={setVisibleMonth}
        setVisiblePanel={setVisiblePanel}
        visiblePanel={visiblePanel}
        previousMonthButtonAriaLabel={previousMonthButtonAriaLabel}
        monthPickerButtonLabel={monthPickerButtonLabel}
        monthPickerButtonRef={monthPickerButtonRef}
        nextMonthButtonAriaLabel={nextMonthButtonAriaLabel}
        prevMonthDisabled={prevMonthDisabled}
      />

      {visiblePanel === "calendar" && (
        <TravelCalendar
          calendarId={calendarId}
          isDateDisabled={isDateDisabled}
          hoverDate={hoverDate}
          today={today}
          setHoverDate={setHoverDate}
          onClickDate={onClickDate}
          visibleMonthData={visibleMonthData}
          setVisibleMonth={setVisibleMonth}
          isValidDateRange={isValidDateRange}
          selectedEndDate={selectedEndDate}
          selectedStartDate={selectedStartDate}
          todayIsInVisibleMonth={todayIsInVisibleMonth}
          visibleMonth={visibleMonth}
        />
      )}

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
