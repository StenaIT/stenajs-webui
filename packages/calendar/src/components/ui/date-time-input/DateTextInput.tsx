import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons/faCalendarAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Clickable, Omit } from "@stenajs-webui/core";
import { useOnClickOutside } from "@stenajs-webui/core/dist";
import { Box } from "@stenajs-webui/core/src";
import {
  StandardTextInput,
  StandardTextInputProps
} from "@stenajs-webui/forms";
import { format, isValid, parse } from "date-fns";
import * as React from "react";
import { useCallback, useRef, useState } from "react";
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
  /** Onchange callback, returns the current value */
  onChange: (value: string) => void;
  /** Placeholder for the input, @default YYYY-MM-DD */
  placeholder?: string;
  /**  Z-index of the calendar overlay, @default 100 */
  zIndex?: number;
  /** The theme to use. */
  dateInputTheme?: DateInputTheme;
  /** The calendar theme to use. */
  calendarTheme?: CalendarTheme;
}

export const DateTextInput = <T extends {}>({
  calendarProps,
  closeOnCalendarSelectDate = true,
  dateFormat = "yyyy-MM-dd",
  disableCalender = false,
  useCalenderIcon = true,
  onChange,
  placeholder = "YYYY-MM-DD",
  value,
  width = "125px",
  zIndex = 100,
  dateInputTheme = defaultDateInputTheme,
  calendarTheme = defaultCalendarTheme,
  ...props
}: DateTextInputProps<T>) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const toggleCalendar = useCallback(() => {
    setOpen(!open);
  }, [setOpen, open]);

  useOnClickOutside(ref, toggleCalendar);

  const updateValue = (date: string) => {
    onChange(date);
  };

  const calendar =
    disableCalender || props.disabled ? (
      <FontAwesomeIcon icon={faCalendarAlt} />
    ) : (
      useCalenderIcon && (
        <Clickable onClick={toggleCalendar}>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </Clickable>
      )
    );

  const onCalendarSelectDate = (date: Date | undefined) => {
    if (date) {
      updateValue(format(date, dateFormat));
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
        contentLeft={calendar}
        onChange={updateValue}
        placeholder={placeholder}
        value={value}
        width={width}
      />
      {open && (
        <Box position={"relative"}>
          <Box
            position={"absolute"}
            zIndex={zIndex}
            borderWidth={1}
            borderColor={dateInputTheme.borderColor}
            background={dateInputTheme.backgroundColor}
            indent
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
          </Box>
        </Box>
      )}
    </>
  );
};
