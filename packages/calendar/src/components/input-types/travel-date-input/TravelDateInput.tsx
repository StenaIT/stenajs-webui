import * as React from "react";
import { useState } from "react";
import { Box, Column, Heading } from "@stenajs-webui/core";
import { ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { TravelDateTextInputs } from "../../../features/travel-calendar/components/TravelDateTextInputs";
import { CardBody } from "@stenajs-webui/elements";
import { MonthPicker } from "../../../features/month-picker/MonthPicker";
import { useTravelDateInput } from "../../../features/travel-calendar/hooks/UseTravelDateInput";
import { MonthHeader } from "../../../features/travel-calendar/components/MonthHeader";
import { TravelCalendar } from "../../../features/travel-calendar/components/TravelCalendar";
import { TravelDateInputValue } from "../../../features/travel-calendar/types";

export interface TravelDateInputProps
  extends ValueAndOnValueChangeProps<TravelDateInputValue> {
  localeCode?: string;
  initialMonthInFocus?: Date;
  startDateLabel?: string;
  endDateLabel?: string;
  previousMonthButtonAriaLabel?: string;
  nextMonthButtonAriaLabel?: string;
}

export const TravelDateInput: React.FC<TravelDateInputProps> = ({
  value,
  onValueChange,
  startDateLabel,
  endDateLabel,
  localeCode = "sv",
  initialMonthInFocus,
  previousMonthButtonAriaLabel = "Previous month",
  nextMonthButtonAriaLabel = "Next month",
}) => {
  const [calendarVisible, setCalendarVisible] = useState(false);

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
    <Box position={"relative"} border={"red"}>
      <Box
        position={"absolute"}
        left={-24}
        top={-80}
        display={calendarVisible ? undefined : "none"}
      >
        <Box
          background={"white"}
          shadow={"popover"}
          borderRadius={"var(--swui-border-radius-large)"}
        >
          <CardBody>
            <Column gap={3}>
              <Heading variant={"h2"}>Select dates</Heading>
              <Box height={"68px"} />
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
          </CardBody>
        </Box>
      </Box>

      <Box position={"absolute"}>
        <TravelDateTextInputs
          value={value}
          onValueChange={onValueChangeByInputs}
          localeCode={localeCode}
          startDateLabel={startDateLabel}
          endDateLabel={endDateLabel}
          onFocus={() => setCalendarVisible(true)}
        />
      </Box>
    </Box>
  );
};
