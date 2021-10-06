import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons/faCalendarAlt";
import { Box, Omit, Row } from "@stenajs-webui/core";
import { FlatButton } from "@stenajs-webui/elements";
import { TextInput, TextInputProps } from "@stenajs-webui/forms";
import { Popover } from "@stenajs-webui/tooltip";
import { format, isValid, parse } from "date-fns";
import * as React from "react";
import { useCallback, useState } from "react";
import { usePopoverCalendar } from "../../../features/internal-panel-state/UsePopoverCalendar";
import { DateFormats } from "../../../util/date/DateFormats";
import {
  SingleDateCalendar,
  SingleDateCalendarProps,
} from "../../calendar-types/single-date-calendar/SingleDateCalendar";
import {
  CalendarTheme,
  defaultCalendarTheme,
} from "../../calendar/CalendarTheme";

export type DateTextInputCalendarProps<T> = Omit<
  SingleDateCalendarProps<T>,
  "value" | "onChange" | "theme"
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
  width = "130px",
  zIndex = 100,
  calendarTheme = defaultCalendarTheme,
  hideCalenderIcon = false,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const { tippyRef, onChangePanel } = usePopoverCalendar();

  const toggleCalendar = useCallback(() => {
    setOpen(!open);
  }, [setOpen, open]);

  const hideCalendar = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

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
    <Box width={width}>
      <Popover
        arrow={false}
        lazy
        visible={open}
        zIndex={zIndex}
        appendTo={portalTarget ?? "parent"}
        placement={"bottom"}
        onClickOutside={hideCalendar}
        sticky={"popper"}
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
            theme={calendarTheme}
          />
        }
      >
        <TextInput
          {...props}
          variant={invalid ? "error" : "standard"}
          disableContentPaddingRight
          contentRight={
            !hideCalenderIcon ? (
              <Row alignItems={"center"} indent={0.5}>
                <FlatButton
                  size={"small"}
                  leftIcon={faCalendarAlt}
                  onClick={toggleCalendar}
                />
              </Row>
            ) : undefined
          }
          onValueChange={onValueChangeHandler}
          placeholder={placeholder}
          value={value || ""}
          size={10}
        />
      </Popover>
    </Box>
  );
};
