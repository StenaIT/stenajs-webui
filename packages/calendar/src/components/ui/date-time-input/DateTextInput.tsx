import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons/faCalendarAlt";
import {
  Absolute,
  Border,
  Omit,
  Relative,
  useOnClickOutside,
  useThemeFields
} from "@stenajs-webui/core";
import {
  StandardTextInput,
  StandardTextInputProps
} from "@stenajs-webui/forms";
import { format, isValid, parse } from "date-fns";
import * as React from "react";
import { useCallback, useRef, useState } from "react";
import { DateFormats } from "../../../util/date/DateFormats";
import {
  CalendarTheme,
  defaultCalendarTheme
} from "../calendar/components/CalendarTheme";
import { SingleDateCalendarProps } from "../calendar/features/SingleDateSelection";
import { SingleDateCalendar } from "../calendar/SingleDateCalendar";
import { DateInputTheme, defaultDateInputTheme } from "./DateInputTheme";

export type DateTextInputCalendarProps<T> = Omit<
  SingleDateCalendarProps<T>,
  "value" | "onChange" | "theme"
>;

export interface DateTextInputProps<T> extends StandardTextInputProps {
  /** Props to be passed to Calendar, see SingleDateCalendar for sage */
  calendarProps?: DateTextInputCalendarProps<T>;
  /** Close calendar when date is selected, @default true */
  closeOnCalendarSelectDate?: boolean;
  /** Valid date format, @default YYYY-MM-DD */
  dateFormat?: string;
  /** Make the icon not clickable, @default false */
  disableCalender?: boolean;
  /** Show or hide the calender icon, @default true */
  useCalenderIcon?: boolean;
  /** Placeholder for the input, @default YYYY-MM-DD */
  placeholder?: string;
  /**  Z-index of the calendar overlay, @default 100 */
  zIndex?: number;
  /** The theme to use. */
  dateInputTheme?: DateInputTheme;
  /** The calendar theme to use. */
  calendarTheme?: CalendarTheme;
}

export const DateTextInput: React.FC<DateTextInputProps<{}>> = ({
  calendarProps,
  closeOnCalendarSelectDate = true,
  dateFormat = DateFormats.fullDate,
  disableCalender = false,
  useCalenderIcon = true,
  onChange,
  onValueChange,
  placeholder = "yyyy-mm-dd",
  value,
  width = "125px",
  zIndex = 100,
  dateInputTheme = defaultDateInputTheme,
  calendarTheme = defaultCalendarTheme,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const { colors } = useThemeFields(
    {
      colors: {
        backgroundColor: dateInputTheme.backgroundColor,
        borderColor: dateInputTheme.borderColor
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

  const onChangeHandler = useCallback(
    ev => {
      if (onChange) {
        onChange(ev);
      }
      if (onValueChange) {
        onValueChange(ev.target.value);
      }
    },
    [onChange, onValueChange]
  );

  const onCalendarSelectDate = (date: Date | undefined) => {
    if (date) {
      onChangeHandler(format(date, dateFormat));
      if (closeOnCalendarSelectDate) {
        setTimeout(() => setOpen(!open), 200);
      }
    }
  };

  const validInput = value && !/^[-/0-9]+$/.test(value);

  const dateIsValid = value && isValid(parse(value, dateFormat, new Date()));

  const userInputCorrectLength = value && value.length >= dateFormat.length;

  return (
    <>
      <StandardTextInput
        {...props}
        backgroundColor={
          (userInputCorrectLength && !dateIsValid) || validInput
            ? "red" // TODO Use color from theme. errorBgLight
            : undefined
        }
        iconLeft={faCalendarAlt}
        onClickLeft={toggleCalendar}
        onChange={onChangeHandler}
        placeholder={placeholder}
        value={value}
        width={width}
      />
      {open && (
        <Relative>
          <Absolute zIndex={zIndex} innerRef={ref}>
            <Border
              borderColor={colors.borderColor}
              background={colors.backgroundColor}
              indent
              spacing
            >
              <SingleDateCalendar
                {...calendarProps}
                onChange={onCalendarSelectDate}
                value={
                  value && dateIsValid
                    ? parse(value, dateFormat, new Date())
                    : undefined
                }
                theme={calendarTheme}
              />
            </Border>
          </Absolute>
        </Relative>
      )}
    </>
  );
};
