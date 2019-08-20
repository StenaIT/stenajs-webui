import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons/faCalendarAlt";
import { Omit, useOnClickOutside, useThemeFields } from "@stenajs-webui/core";
import {
  StandardTextInput,
  StandardTextInputProps
} from "@stenajs-webui/forms";
import { format, isValid, parse } from "date-fns";
import * as React from "react";
import { useCallback, useRef, useState } from "react";
import { DateFormats } from "../../../util/date/DateFormats";
import {
  SingleDateCalendar,
  SingleDateCalendarProps
} from "../../calendar-types/single-date-calendar/SingleDateCalendar";
import { CalendarPopupBox } from "../../calendar/CalendarPopupBox";
import {
  CalendarTheme,
  defaultCalendarTheme
} from "../../calendar/CalendarTheme";
import {
  DateTextInputTheme,
  defaultDateTextInputTheme
} from "./DateTextInputTheme";
import { SingleDateCalendarProps } from "../calendar/features/SingleDateSelection";
import { SingleDateCalendar } from "../calendar/SingleDateCalendar";
import { CalendarPopupBox } from "./CalendarPopupBox";
import {
  DateTextInputTheme,
  defaultDateTextInputTheme
} from "./DateTextInputTheme";

export type DateTextInputCalendarProps<T> = Omit<
  SingleDateCalendarProps<T>,
  "value" | "onChange" | "theme"
>;

export interface DateTextInputProps<T>
  extends Omit<StandardTextInputProps, "onChange" | "theme"> {
  /** Props to be passed to Calendar, see SingleDateCalendar. */
  calendarProps?: DateTextInputCalendarProps<T>;
  /** Close calendar when date is selected, @default true */
  closeOnCalendarSelectDate?: boolean;
  /** Valid date format, @default YYYY-MM-DD */
  dateFormat?: string;
  /** Make the icon not clickable, @default false */
  disableCalender?: boolean;
  /** Show or hide the calender icon, @default false */
  hideCalenderIcon?: boolean;
  /** Placeholder for the input, @default YYYY-MM-DD */
  placeholder?: string;
  /**  Z-index of the calendar overlay, @default 100 */
  zIndex?: number;
  /** The date text input theme to use. */
  theme?: DateTextInputTheme;
}

export const DateTextInput: React.FC<DateTextInputProps<{}>> = ({
  calendarProps,
  closeOnCalendarSelectDate = true,
  dateFormat = DateFormats.fullDate,
  disableCalender = false,
  onValueChange,
  placeholder = "yyyy-mm-dd",
  value,
  width = "125px",
  zIndex = 100,
  theme = defaultDateTextInputTheme,
  hideCalenderIcon = false,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const { colors } = useThemeFields(
    {
      colors: {
        backgroundColor: theme.textInput.backgroundColor,
        borderColor: theme.textInput.borderColor,
        backgroundColorInvalidDate: theme.textInput.backgroundColorInvalid
      }
    },
    []
  );

  const toggleCalendar = useCallback(() => {
    setOpen(!open);
  }, [setOpen, open]);

  const closeCalendar = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useOnClickOutside(ref, closeCalendar);

  const onValueChangeHandler = useCallback(
    value => {
      if (onValueChange) {
        onValueChange(value);
      }
    },
    [onValueChange]
  );

  const onCalendarSelectDate = (date: Date | undefined) => {
    if (date) {
      onValueChangeHandler(format(date, dateFormat));
      if (closeOnCalendarSelectDate) {
        setTimeout(() => setOpen(!open), 200);
      }
    }
  };

  const inValidInput = !!value && !/^[-/\\.0-9]+$/.test(value);

  const dateIsValid = !!value && isValid(parse(value, dateFormat, new Date()));

  const userInputCorrectLength = !!value && value.length >= dateFormat.length;

  const invalid: boolean =
    (userInputCorrectLength && !dateIsValid) || inValidInput;

  return (
    <>
      <StandardTextInput
        {...props}
        theme={theme.textInput}
        invalid={invalid}
        iconLeft={!hideCalenderIcon ? faCalendarAlt : undefined}
        onClickLeft={
          !hideCalenderIcon && !disableCalender ? toggleCalendar : undefined
        }
        onValueChange={onValueChangeHandler}
        placeholder={placeholder}
        value={value}
        width={width}
      />
      {open && (
        <CalendarPopupBox
          innerRef={ref}
          background={colors.backgroundColor}
          borderColor={colors.borderColor}
          zIndex={zIndex}
        >
          <SingleDateCalendar
            {...calendarProps}
            onChange={onCalendarSelectDate}
            value={
              value && dateIsValid
                ? parse(value, dateFormat, new Date())
                : undefined
            }
            theme={theme.calendar}
          />
        </CalendarPopupBox>
      )}
    </>
  );
};
