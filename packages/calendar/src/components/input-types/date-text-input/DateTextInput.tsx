import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons/faCalendarAlt";
import { Box, Omit, useMultiOnClickOutside } from "@stenajs-webui/core";
import { TextInput, TextInputProps } from "@stenajs-webui/forms";
import { format, isValid, parse } from "date-fns";
import * as React from "react";
import { useCallback, useRef, useState } from "react";
import { DateFormats } from "../../../util/date/DateFormats";
import {
  SingleDateCalendar,
  SingleDateCalendarProps,
} from "../../calendar-types/single-date-calendar/SingleDateCalendar";
import {
  CalendarTheme,
  defaultCalendarTheme,
} from "../../calendar/CalendarTheme";
import { Popover } from "@stenajs-webui/tooltip";

export type DateTextInputCalendarProps<T> = Omit<
  SingleDateCalendarProps<T>,
  | "value"
  | "onChange"
  | "theme"
  | "dateInFocus"
  | "setDateInFocus"
  | "currentPanel"
  | "setCurrentPanel"
>;

export interface DateTextInputProps<T>
  extends Omit<TextInputProps, "onChange" | "theme"> {
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
  /** Portal target, HTML element. If not set, portal is not used. */
  portalTarget?: HTMLElement | null;
  /**  Z-index of the calendar overlay, @default 100 */
  zIndex?: number;
  /** The date text input theme to use. */
  calendarTheme?: CalendarTheme;
}

export const DateTextInput: React.FC<DateTextInputProps<{}>> = ({
  calendarProps,
  closeOnCalendarSelectDate = true,
  dateFormat = DateFormats.fullDate,
  disableCalender = false,
  onValueChange,
  placeholder = "yyyy-mm-dd",
  portalTarget,
  value,
  width = "125px",
  zIndex = 100,
  calendarTheme = defaultCalendarTheme,
  hideCalenderIcon = false,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const outsideRef = useRef<HTMLDivElement>(null);

  const toggleCalendar = useCallback(() => {
    setOpen(!open);
  }, [setOpen, open]);

  const closeCalendar = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useMultiOnClickOutside([popupRef, outsideRef], closeCalendar);

  const onValueChangeHandler = useCallback(
    (value) => {
      if (onValueChange) {
        onValueChange(value);
      }
    },
    [onValueChange]
  );

  const onCalendarSelectDate = useCallback(
    (date: Date | undefined) => {
      if (date) {
        onValueChangeHandler(format(date, dateFormat));
        if (closeOnCalendarSelectDate) {
          setTimeout(() => setOpen(!open), 200);
        }
      }
    },
    [onValueChangeHandler, dateFormat, closeOnCalendarSelectDate, setOpen, open]
  );

  const inValidInput = !!value && !/^[-/\\.0-9]+$/.test(value);

  const dateIsValid = !!value && isValid(parse(value, dateFormat, new Date()));

  const userInputCorrectLength = !!value && value.length >= dateFormat.length;

  const invalid: boolean =
    (userInputCorrectLength && !dateIsValid) || inValidInput;

  return (
    <Box ref={outsideRef} width={width}>
      <Popover
        arrow={false}
        lazy
        visible={open}
        zIndex={zIndex}
        appendTo={portalTarget ?? "parent"}
        content={
          <Box ref={popupRef}>
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
        }
      >
        <TextInput
          {...props}
          variant={invalid ? "error" : "standard"}
          iconLeft={!hideCalenderIcon ? faCalendarAlt : undefined}
          onClickLeft={
            !hideCalenderIcon && !disableCalender ? toggleCalendar : undefined
          }
          onValueChange={onValueChangeHandler}
          placeholder={placeholder}
          value={value || ""}
          size={9}
        />
      </Popover>
    </Box>
  );
};
