import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons/faCalendarAlt";
import {
  Absolute,
  Box,
  Relative,
  Row,
  Space,
  StandardText,
  useOnClickOutside,
  useThemeFields
} from "@stenajs-webui/core";
import { StandardTextInput } from "@stenajs-webui/forms";
import { format } from "date-fns";
import * as React from "react";
import { useRef } from "react";
import { DateFormats } from "../../../util/date/DateFormats";
import {
  DateRangeCalendar,
  DateRangeCalendarOnChangeValue,
  DateRangeCalendarProps
} from "../../calendar-types/date-range-calendar/DateRangeCalendar";
import {
  CalendarTheme,
  defaultCalendarTheme
} from "../../calendar/CalendarTheme";
import {
  DateRangeInputTheme,
  defaultDateRangeInputTheme
} from "./DateRangeInputTheme";
import { useDateRangeInput } from "./hooks/UseDateRangeInput";

export interface DateRangeInputProps {
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
   * The calendar theme to use.
   */
  calendarTheme?: CalendarTheme;

  /** Props to be passed to DateRangeCalendar, see DateRangeCalendar. */
  calendarProps?: DateRangeCalendarProps<{}>;
}

// tslint:disable:no-empty
const noop = () => {};

export const DateRangeInput: React.FC<DateRangeInputProps> = ({
  displayFormat = DateFormats.fullDate,
  placeholderStartDate = "Start date",
  placeholderEndDate = "End date",
  value,
  onChange,
  zIndex = 100,
  toText = "to",
  theme = defaultDateRangeInputTheme,
  calendarTheme = defaultCalendarTheme,
  calendarProps
}) => {
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
  const ref = useRef(null);
  useOnClickOutside(ref, hideCalendar);

  const { colors } = useThemeFields(
    {
      colors: {
        backgroundColor: theme.backgroundColor,
        borderColor: theme.borderColor
      }
    },
    []
  );

  return (
    <Box>
      <Row alignItems={"center"}>
        <StandardTextInput
          iconLeft={faCalendarAlt}
          onFocus={showCalendarStartDate}
          forceFocusHighlight={
            focusedInput === "startDate" && showingFocusHighlight
          }
          value={value.startDate ? format(value.startDate, displayFormat) : ""}
          placeholder={placeholderStartDate}
          onChange={noop}
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
          value={value.endDate ? format(value.endDate, displayFormat) : ""}
          placeholder={placeholderEndDate}
          onChange={noop}
          size={9}
        />
      </Row>
      {showingCalendar && (
        <Relative>
          <Absolute zIndex={zIndex} innerRef={ref}>
            <Box
              background={colors.backgroundColor}
              borderColor={colors.borderColor}
              indent
              spacing
              shadow={"popover"}
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
            </Box>
          </Absolute>
        </Relative>
      )}
    </Box>
  );
};
