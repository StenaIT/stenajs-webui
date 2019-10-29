import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons/faCalendarAlt";
import {
  Box,
  Row,
  Space,
  StandardText,
  useMultiOnClickOutside,
  useThemeFields
} from "@stenajs-webui/core";
import { StandardTextInput } from "@stenajs-webui/forms";
import { format } from "date-fns";
import * as React from "react";
import { useRef } from "react";
import * as ReactDOM from "react-dom";
import { Manager, Reference } from "react-popper";
import { DateFormats } from "../../../util/date/DateFormats";
import {
  DateRangeCalendar,
  DateRangeCalendarOnChangeValue,
  DateRangeCalendarProps
} from "../../calendar-types/date-range-calendar/DateRangeCalendar";
import { CalendarPopperContent } from "../../calendar/CalendarPopperContent";
import {
  CalendarTheme,
  defaultCalendarTheme
} from "../../calendar/CalendarTheme";
import {
  DateRangeInputTheme,
  defaultDateRangeInputTheme
} from "./DateRangeInputTheme";
import { useDateRangeInput } from "./hooks/UseDateRangeInput";

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
   * Text between the inputs.
   * @default to
   */
  toText?: string;

  /**
   * The theme to use.
   */
  theme?: DateRangeInputTheme;

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

// tslint:disable:no-empty
const noop = () => {};

export const DateRangeInput = <T extends {}>({
  displayFormat = DateFormats.fullDate,
  placeholderStartDate = "Start date",
  placeholderEndDate = "End date",
  portalTarget,
  value,
  onChange,
  zIndex = 100,
  width = "125px",
  toText = "to",
  theme = defaultDateRangeInputTheme,
  calendarTheme = defaultCalendarTheme,
  calendarProps
}: DateRangeInputProps<T>): React.ReactElement<DateRangeInputProps<T>> => {
  const {
    hideCalendar,
    onSelectDateRange,
    setEndDate,
    setStartDate,
    showCalendarEndDate,
    showCalendarStartDate,
    showingCalendar,
    showingFocusHighlight,
    setFocusedInput,
    focusedInput
  } = useDateRangeInput(value, onChange);
  const popupRef = useRef<HTMLDivElement>(null);
  const outsideRef = useRef<HTMLDivElement>(null);

  useMultiOnClickOutside([popupRef, outsideRef], hideCalendar);

  const { colors } = useThemeFields(
    {
      colors: {
        backgroundColor: theme.backgroundColor,
        borderColor: theme.borderColor
      }
    },
    []
  );

  const popperContent = (
    <CalendarPopperContent
      innerRef={popupRef}
      background={colors.backgroundColor}
      borderColor={colors.borderColor}
      zIndex={zIndex}
      open={showingCalendar}
    >
      <DateRangeCalendar
        {...calendarProps}
        startDateInFocus={
          focusedInput === "startDate" || focusedInput === "endDate"
            ? value[focusedInput]
            : undefined
        }
        onChange={onSelectDateRange}
        startDate={value.startDate}
        endDate={value.endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        focusedInput={focusedInput}
        setFocusedInput={setFocusedInput}
        theme={calendarTheme}
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
                <StandardTextInput
                  iconLeft={faCalendarAlt}
                  onFocus={showCalendarStartDate}
                  forceFocusHighlight={
                    focusedInput === "startDate" && showingFocusHighlight
                  }
                  value={
                    value.startDate
                      ? format(value.startDate, displayFormat)
                      : ""
                  }
                  placeholder={placeholderStartDate}
                  onChange={noop}
                  width={width}
                  size={9}
                />
                <Space />
                <StandardText>{toText}</StandardText>
                <Space />
                <StandardTextInput
                  iconLeft={faCalendarAlt}
                  onFocus={showCalendarEndDate}
                  forceFocusHighlight={
                    focusedInput === "endDate" && showingFocusHighlight
                  }
                  value={
                    value.endDate ? format(value.endDate, displayFormat) : ""
                  }
                  placeholder={placeholderEndDate}
                  onChange={noop}
                  width={width}
                  size={9}
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
