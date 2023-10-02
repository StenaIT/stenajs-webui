import { Row, Space } from "@stenajs-webui/core";
import { TextInput, ValueAndOnValueChangeProps } from "@stenajs-webui/forms";
import { format } from "date-fns";
import * as React from "react";
import { useMemo, useState } from "react";
import { cssColor } from "@stenajs-webui/theme";
import { defaultPopoverPlacement } from "../../../config/DefaultPopoverPlacement";
import { DateFormats } from "../../../util/date/DateFormats";
import { DateRangeInputCalendarProps } from "../../calendar-types/date-range-calendar/DateRangeCalendar";
import {
  CalendarTheme,
  defaultCalendarTheme,
} from "../../calendar/CalendarTheme";
import { useDateRangeInput } from "./hooks/UseDateRangeInput";
import {
  Icon,
  stenaArrowWideRight,
  stenaCalendar,
} from "@stenajs-webui/elements";
import { CalendarWithMonthSwitcher } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import { CalendarPanelType } from "../../../features/calendar-with-month-year-pickers/CalendarPanelType";
import { Popover } from "@stenajs-webui/tooltip";
import { buildDayStateForDateRange } from "../../../util/calendar/StateModifier";
import { OptionalMinMaxDatesAsString } from "../../../types/CalendarTypes";
import { DateRange } from "../../../types/DateRange";
import { defaultMaxDate } from "../../../config/DefaultMaxDate";

export interface DateRangeInputProps<T>
  extends OptionalMinMaxDatesAsString,
    ValueAndOnValueChangeProps<DateRange> {
  /**
   * The date format in the input field. See date-fns docs.
   * @default YYYY-MM-dd
   */
  displayFormat?: string;

  /**
   * Placeholder for start date field when no date has been selected.
   * @default Start date
   */
  placeholderStartDate?: string;

  /**
   * Placeholder for end date field when no date has been selected.
   * @default End date
   */
  placeholderEndDate?: string;
  /**
   * Portal target, HTML element. If not set, portal is not used.
   */
  portalTarget?: HTMLElement | null;

  /**
   * Z-index of the calendar overlay.
   * @default 100
   */
  zIndex?: number;

  /**
   * Width of the input element.
   * * @default 125px
   */
  width?: string;

  /**
   * The calendar theme to use.
   */
  calendarTheme?: CalendarTheme;

  /** Props to be passed to DateRangeCalendar, see DateRangeCalendar. */
  calendarProps?: DateRangeInputCalendarProps<T>;

  /**
   * Disables the Popover and both TextInputs.
   */
  disabled?: boolean;
}

/**
 * @deprecated Please use DateRangeDualTextInput instead.
 */
export function DateRangeInput<T>({
  displayFormat = DateFormats.fullDate,
  placeholderStartDate = "Start date",
  placeholderEndDate = "End date",
  portalTarget,
  value,
  onValueChange,
  zIndex = 100,
  width,
  calendarTheme = defaultCalendarTheme,
  calendarProps,
  minDate,
  maxDate = defaultMaxDate,
  disabled,
}: DateRangeInputProps<T>): React.ReactElement<DateRangeInputProps<T>> {
  const [currentPanel, setCurrentPanel] =
    useState<CalendarPanelType>("calendar");

  const {
    hideCalendar,
    showCalendarEndDate,
    showCalendarStartDate,
    showingCalendar,
    focusedInput,
    startDateInputRef,
    endDateInputRef,
    onClickDay,
    startDateIsAfterEnd,
  } = useDateRangeInput(value, onValueChange);

  const [dateInFocus, setDateInFocus] = useState(
    () => (focusedInput && value?.[focusedInput]) ?? new Date()
  );
  const statePerMonth = useMemo(
    () =>
      buildDayStateForDateRange(undefined, value?.startDate, value?.endDate),
    [value]
  );

  return (
    <Popover
      arrow={false}
      lazy
      disabled={disabled}
      visible={showingCalendar}
      zIndex={zIndex}
      placement={defaultPopoverPlacement}
      appendTo={portalTarget ?? "parent"}
      onClickOutside={hideCalendar}
      content={
        <CalendarWithMonthSwitcher
          {...calendarProps}
          dateInFocus={dateInFocus}
          setDateInFocus={setDateInFocus}
          statePerMonth={statePerMonth}
          theme={calendarTheme}
          onClickDay={onClickDay}
          currentPanel={currentPanel}
          setCurrentPanel={setCurrentPanel}
          minDate={minDate}
          maxDate={maxDate}
        />
      }
    >
      <Row alignItems={"center"}>
        <TextInput
          iconLeft={stenaCalendar}
          onFocus={showCalendarStartDate}
          value={value?.startDate ? format(value.startDate, displayFormat) : ""}
          placeholder={placeholderStartDate}
          width={width}
          disabled={disabled}
          inputRef={startDateInputRef}
          size={9}
          variant={startDateIsAfterEnd ? "error" : undefined}
        />
        <Space />
        <Icon
          icon={stenaArrowWideRight}
          color={cssColor("--lhds-color-ui-500")}
          size={14}
        />
        <Space />
        <TextInput
          iconLeft={stenaCalendar}
          onFocus={showCalendarEndDate}
          value={value?.endDate ? format(value.endDate, displayFormat) : ""}
          placeholder={placeholderEndDate}
          width={width}
          disabled={disabled}
          inputRef={endDateInputRef}
          size={9}
          variant={startDateIsAfterEnd ? "error" : undefined}
        />
      </Row>
    </Popover>
  );
}
