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
import {
  compose,
  defaultProps,
  setDisplayName,
  withHandlers,
  withState
} from "recompose";
import { DateFormats } from "../../../util/date/DateFormats";
import {
  CalendarTheme,
  defaultCalendarTheme
} from "../calendar/components/CalendarTheme";
import { DateRangeCalendar } from "../calendar/DateRangeCalendar";
import {
  DateRangeCalendarOnChangeValue,
  DateRangeCalendarProps,
  DateRangeFocusedInput,
  OnChangePropsDateRangeSelection
} from "../calendar/features/DateRangeSelection";
import {
  DateRangeInputTheme,
  defaultDateRangeInputTheme
} from "./DateRangeInputTheme";

export interface DateRangeInputProps extends OnChangePropsDateRangeSelection {
  /** The current date range value */
  value: DateRangeCalendarOnChangeValue;

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

export interface DateRangeInputPropsWithDefaultProps {
  displayFormat: string;
  placeholderStartDate: string;
  placeholderEndDate: string;
}

// tslint:disable:no-empty
const noop = () => {};

type InnerProps = DateRangeInputProps &
  WithShowingCalendarStateProps &
  WithShowCalendarHandlers &
  WithOnSelectDateHandler &
  WithFocusedInputStateProps &
  DateRangeInputPropsWithDefaultProps;

const DateRangeInputComponent = ({
  showCalendarStartDate,
  showCalendarEndDate,
  hideCalendar,
  displayFormat,
  showingCalendar,
  showingFocusHighlight,
  placeholderStartDate,
  placeholderEndDate,
  onSelectDateRange,
  value,
  zIndex,
  setStartDate,
  setEndDate,
  focusedInput,
  setFocusedInput,
  toText = "to",
  theme = defaultDateRangeInputTheme,
  calendarTheme = defaultCalendarTheme,
  calendarProps
}: InnerProps) => {
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

interface WithShowingCalendarStateProps {
  showingCalendar: boolean;
  setShowingCalendar: (showingCalendar: boolean) => void;
  showingFocusHighlight: boolean;
  setShowingFocusHighlight: (showingFocusHighlight: boolean) => void;
}

const withShowingCalendarState = compose(
  withState("showingCalendar", "setShowingCalendar", false),
  withState("showingFocusHighlight", "setShowingFocusHighlight", false)
);

interface WithFocusedInputStateProps {
  focusedInput: DateRangeFocusedInput;
  setFocusedInput: (focusedInput: DateRangeFocusedInput) => void;
}

const withFocusedInputState = withState(
  "focusedInput",
  "setFocusedInput",
  undefined
);

interface WithShowCalendarHandlers {
  showCalendarStartDate: () => boolean;
  showCalendarEndDate: () => boolean;
  hideCalendar: () => void;
  setStartDate: (startDate: Date) => void;
  setEndDate: (endDate: Date) => void;
}

const withShowCalendarHandlers = withHandlers<
  WithShowingCalendarStateProps &
    DateRangeInputProps &
    WithFocusedInputStateProps,
  WithShowCalendarHandlers
>({
  showCalendarStartDate: ({
    setShowingCalendar,
    setShowingFocusHighlight,
    setFocusedInput
  }) => () => {
    setFocusedInput("startDate");
    setShowingCalendar(true);
    setShowingFocusHighlight(true);
    return true;
  },
  showCalendarEndDate: ({
    setShowingCalendar,
    setShowingFocusHighlight,
    setFocusedInput
  }) => () => {
    setFocusedInput("endDate");
    setShowingCalendar(true);
    setShowingFocusHighlight(true);
    return true;
  },
  hideCalendar: ({ setShowingCalendar, setShowingFocusHighlight }) => () => {
    setShowingCalendar(false);
    setShowingFocusHighlight(false);
  },
  setStartDate: ({
    value,
    onChange,
    setShowingCalendar,
    setShowingFocusHighlight,
    focusedInput
  }) => (startDate: Date) => {
    if (onChange) {
      onChange({ startDate, endDate: value.endDate });
    }
    if (focusedInput === "endDate") {
      setShowingFocusHighlight(false);
      setTimeout(() => setShowingCalendar(false), 150);
    }
  },
  setEndDate: ({
    value,
    onChange,
    setShowingCalendar,
    setShowingFocusHighlight,
    focusedInput
  }) => (endDate: Date) => {
    if (onChange) {
      onChange({ startDate: value.startDate, endDate });
    }
    if (focusedInput === "endDate") {
      setShowingFocusHighlight(false);
      setTimeout(() => setShowingCalendar(false), 150);
    }
  }
});

interface WithOnSelectDateHandler {
  onSelectDateRange: (dateRange: DateRangeCalendarOnChangeValue) => void;
}

const withOnSelectDateHandler = withHandlers<
  WithShowingCalendarStateProps &
    DateRangeInputProps &
    WithShowCalendarHandlers,
  WithOnSelectDateHandler
>({
  onSelectDateRange: ({ onChange }) => (
    dateRange: DateRangeCalendarOnChangeValue
  ) => {
    if (onChange) {
      onChange(dateRange);
    }
  }
});

const withDefaultProps = defaultProps<Partial<DateRangeInputProps>>({
  displayFormat: DateFormats.fullDate,
  placeholderStartDate: "Start date",
  placeholderEndDate: "End date",
  zIndex: 100
});

export const DateRangeInput = setDisplayName("DateRangeInput")(
  compose<InnerProps, DateRangeInputProps>(
    withDefaultProps,
    withShowingCalendarState,
    withFocusedInputState,
    withShowCalendarHandlers,
    withOnSelectDateHandler
  )(DateRangeInputComponent)
);
