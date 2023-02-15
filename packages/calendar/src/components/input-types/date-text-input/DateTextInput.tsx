import { Box, Omit, Space } from "@stenajs-webui/core";
import { InputFieldButton, stenaCalendar } from "@stenajs-webui/elements";
import { TextInput, TextInputProps } from "@stenajs-webui/forms";
import { Popover } from "@stenajs-webui/tooltip";
import { format, isValid, parse } from "date-fns";
import * as React from "react";
import { useCallback, useState } from "react";
import { defaultPopoverPlacement } from "../../../config/DefaultPopoverPlacement";
import { useCalendarPopoverUpdater } from "../../../features/internal-panel-state/UseCalendarPopoverUpdater";
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
  disabled,
  onValueChange,
  placeholder = "yyyy-mm-dd",
  portalTarget,
  value,
  width = "130px",
  zIndex = 100,
  calendarTheme = defaultCalendarTheme,
  hideCalenderIcon = false,
  minDate,
  maxDate = defaultMaxDate,
  variant,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const { tippyRef, onChangePanel } = useCalendarPopoverUpdater();

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
    <Box width={width}>
      <Popover
        arrow={false}
        lazy
        visible={open}
        zIndex={zIndex}
        appendTo={portalTarget ?? "parent"}
        placement={defaultPopoverPlacement}
        onClickOutside={hideCalendar}
        tippyRef={tippyRef}
        content={
          <SingleDateCalendar
            {...calendarProps}
            onChange={onCalendarSelectDate}
            onChangePanel={onChangePanel}
            value={
              value && dateIsValid
                ? parse(value, dateFormat, new Date())
                : undefined
            }
            minDate={minDate}
            maxDate={maxDate}
            theme={calendarTheme}
          />
        }
      >
        <TextInput
          {...props}
          variant={invalid ? "error" : variant}
          disableContentPaddingRight
          contentRight={
            !hideCalenderIcon ? (
              <div style={{ display: "flex" }}>
                <InputFieldButton
                  icon={stenaCalendar}
                  disabled={disabled}
                  onClick={toggleCalendar}
                />
                <Space num={0.5} />
              </div>
            ) : undefined
          }
          onValueChange={onValueChangeHandler}
          placeholder={placeholder}
          value={value || ""}
          min={minDate}
          max={maxDate}
          size={10}
          disableContentPadding={true}
        />
      </Popover>
    </Box>
  );
};
