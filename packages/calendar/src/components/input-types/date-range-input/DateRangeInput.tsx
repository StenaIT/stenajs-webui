import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons/faCalendarAlt";
import { Box, Row, Space, useMultiOnClickOutside } from "@stenajs-webui/core";
import { TextInput } from "@stenajs-webui/forms";
import { format } from "date-fns";
import * as React from "react";
import { useMemo, useRef } from "react";
import * as ReactDOM from "react-dom";
import { Manager, Reference } from "react-popper";
import { DateFormats } from "../../../util/date/DateFormats";
import {
  DateRangeCalendarOnChangeValue,
  DateRangeCalendarProps,
} from "../../calendar-types/date-range-calendar/DateRangeCalendar";
import { CalendarPopperContent } from "../../calendar/CalendarPopperContent";
import {
  CalendarTheme,
  defaultCalendarTheme,
} from "../../calendar/CalendarTheme";
import { useDateRangeInput } from "./hooks/UseDateRangeInput";
import { Icon } from "@stenajs-webui/elements";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons/faLongArrowAltRight";
import { CalendarWithMonthSwitcher } from "../../../features/month-switcher/CalendarWithMonthSwitcher";
import { buildDayState } from "../../calendar-types/date-range-calendar/util/DayStateFactory";

export interface DateRangeInputProps<T extends {}> {
  /** The current date range value */
  value: DateRangeCalendarOnChangeValue;

  /** The onChange handler. */
  onChange: (value: DateRangeCalendarOnChangeValue) => void;

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
  calendarProps?: Omit<
    DateRangeCalendarProps<T>,
    | "startDateInFocus"
    | "onChange"
    | "startDate"
    | "endDate"
    | "setStartDate"
    | "setEndDate"
    | "focusedInput"
    | "setFocusedInput"
    | "theme"
  >;
}

export const DateRangeInput = <T extends {}>({
  displayFormat = DateFormats.fullDate,
  placeholderStartDate = "Start date",
  placeholderEndDate = "End date",
  portalTarget,
  value,
  onChange,
  zIndex = 100,
  width = "125px",
  calendarTheme = defaultCalendarTheme,
  calendarProps,
}: DateRangeInputProps<T>): React.ReactElement<DateRangeInputProps<T>> => {
  const popupRef = useRef<HTMLDivElement>(null);
  const outsideRef = useRef<HTMLDivElement>(null);
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
  } = useDateRangeInput(value, onChange);

  useMultiOnClickOutside([popupRef, outsideRef], hideCalendar);

  const statePerMonth = useMemo(
    () => buildDayState(undefined, value.startDate, value.endDate),
    [value]
  );

  const popperContent = (
    <CalendarPopperContent
      innerRef={popupRef}
      background={"var(--swui-field-bg-enabled)"}
      borderColor={"var(--swui-modal-border-color)"}
      zIndex={zIndex}
      open={showingCalendar}
    >
      <CalendarWithMonthSwitcher
        {...calendarProps}
        startDateInFocus={
          focusedInput === "startDate" || focusedInput === "endDate"
            ? value[focusedInput]
            : undefined
        }
        statePerMonth={statePerMonth}
        theme={calendarTheme}
        onClickDay={onClickDay}
      />
    </CalendarPopperContent>
  );
  return (
    <Box innerRef={outsideRef}>
      <Manager>
        <Reference>
          {({ ref }) => (
            <Box innerRef={ref}>
              <Row alignItems={"center"}>
                <TextInput
                  iconLeft={faCalendarAlt}
                  onFocus={showCalendarStartDate}
                  value={
                    value.startDate
                      ? format(value.startDate, displayFormat)
                      : ""
                  }
                  placeholder={placeholderStartDate}
                  width={width}
                  inputRef={startDateInputRef}
                  size={9}
                  variant={startDateIsAfterEnd ? "error" : undefined}
                />
                <Space />
                <Icon
                  icon={faLongArrowAltRight}
                  color={"var(--lhds-color-ui-500)"}
                  size={14}
                />
                <Space />
                <TextInput
                  iconLeft={faCalendarAlt}
                  onFocus={showCalendarEndDate}
                  value={
                    value.endDate ? format(value.endDate, displayFormat) : ""
                  }
                  placeholder={placeholderEndDate}
                  width={width}
                  inputRef={endDateInputRef}
                  size={9}
                  variant={startDateIsAfterEnd ? "error" : undefined}
                />
              </Row>
            </Box>
          )}
        </Reference>
        {portalTarget
          ? ReactDOM.createPortal(popperContent, portalTarget)
          : popperContent}
      </Manager>
    </Box>
  );
};
