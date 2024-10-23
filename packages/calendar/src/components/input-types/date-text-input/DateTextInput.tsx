import { Box, Omit, Row } from "@stenajs-webui/core";
import { FlatButton, stenaCalendar } from "@stenajs-webui/elements";
import { TextInput, TextInputProps } from "@stenajs-webui/forms";
import { ControlledPopover } from "@stenajs-webui/tooltip";
import { format, isValid, parse } from "date-fns";
import * as React from "react";
import { useCallback, useState } from "react";
import { defaultPopoverPlacement } from "../../../config/DefaultPopoverPlacement";
import { DateFormats } from "../../../util/date/DateFormats";
import {
  SingleDateCalendar,
  SingleDateCalendarProps,
} from "../../calendar-types/single-date-calendar/SingleDateCalendar";
import {
  CalendarTheme,
  defaultCalendarTheme,
} from "../../calendar/CalendarTheme";
import { OptionalMinMaxDatesAsString } from "../../../types/CalendarTypes";
import { defaultMaxDate } from "../../../config/DefaultMaxDate";

export type DateTextInputCalendarProps<T> = Omit<
  SingleDateCalendarProps<T>,
  "value" | "onChange" | "theme"
>;

export interface DateTextInputProps<T>
  extends Omit<TextInputProps, "onChange" | "theme" | "min" | "max">,
    OptionalMinMaxDatesAsString {
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
  /** The date text input theme to use. */
  calendarTheme?: CalendarTheme;
  /**
   *  Portal target for the popover, HTML element. If not set, window.body is used.
   */
  portalTarget?: HTMLElement;
  zIndex?: number;
}

export const DateTextInput: React.FC<DateTextInputProps<unknown>> = ({
  calendarProps,
  closeOnCalendarSelectDate = true,
  dateFormat = DateFormats.fullDate,
  disableCalender = false,
  onValueChange,
  placeholder = "yyyy-mm-dd",
  value,
  width = "130px",
  calendarTheme = defaultCalendarTheme,
  hideCalenderIcon = false,
  minDate,
  maxDate = defaultMaxDate,
  variant,
  portalTarget,
  zIndex,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const toggleCalendar = useCallback(() => {
    setOpen(!open);
  }, [setOpen, open]);

  const hideCalendar = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onValueChangeHandler = useCallback(
    (value: string) => {
      if (onValueChange) {
        onValueChange(value);
      }
    },
    [onValueChange],
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
    [
      onValueChangeHandler,
      dateFormat,
      closeOnCalendarSelectDate,
      setOpen,
      open,
    ],
  );

  const inValidInput = !!value && !/^[-/\\.0-9]+$/.test(value);

  const dateIsValid = !!value && isValid(parse(value, dateFormat, new Date()));

  const userInputCorrectLength = !!value && value.length >= dateFormat.length;

  const invalid: boolean =
    (userInputCorrectLength && !dateIsValid) || inValidInput;

  return (
    <Box width={width}>
      <ControlledPopover
        appendTo={portalTarget}
        zIndex={zIndex}
        renderTrigger={(popoverProps) => (
          <TextInput
            {...props}
            variant={invalid ? "error" : variant}
            disableContentPaddingRight
            contentRight={
              !hideCalenderIcon ? (
                <Row alignItems={"center"} indent={0.5}>
                  <FlatButton
                    size={"small"}
                    disabled={props.disabled || disableCalender}
                    leftIcon={stenaCalendar}
                    onClick={toggleCalendar}
                  />
                </Row>
              ) : undefined
            }
            onValueChange={onValueChangeHandler}
            placeholder={placeholder}
            value={value || ""}
            min={minDate}
            max={maxDate}
            size={10}
            {...popoverProps}
          />
        )}
        hideArrow
        open={open}
        placement={defaultPopoverPlacement}
        onRequestClose={hideCalendar}
      >
        <SingleDateCalendar
          {...calendarProps}
          onChange={onCalendarSelectDate}
          value={
            value && dateIsValid
              ? parse(value, dateFormat, new Date())
              : undefined
          }
          minDate={minDate}
          maxDate={maxDate}
          theme={calendarTheme}
        />
      </ControlledPopover>
    </Box>
  );
};
