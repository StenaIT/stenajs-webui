import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons/faCalendarAlt";
import {
  Box,
  Omit,
  useMultiOnClickOutside,
  useThemeFields
} from "@stenajs-webui/core";
import {
  StandardTextInput,
  StandardTextInputProps
} from "@stenajs-webui/forms";
import { format, isValid, parse } from "date-fns";
import * as React from "react";
import { useCallback, useRef, useState } from "react";
import * as ReactDOM from "react-dom";
import { Manager, Reference } from "react-popper";
import { DateFormats } from "../../../util/date/DateFormats";
import {
  SingleDateCalendar,
  SingleDateCalendarProps
} from "../../calendar-types/single-date-calendar/SingleDateCalendar";
import { CalendarPopupBox } from "../../calendar/CalendarPopupBox";
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
  /** Portal target, HTML element. If not set, portal is not used. */
  portalTarget?: HTMLElement | null;
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
  portalTarget,
  value,
  width = "125px",
  zIndex = 100,
  theme = defaultDateTextInputTheme,
  hideCalenderIcon = false,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const outsideRef = useRef<HTMLDivElement>(null);

  const { colors } = useThemeFields(
    {
      colors: {
        backgroundColor: theme.standardTextInput.backgroundColor,
        borderColor: theme.standardTextInput.borderColor
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

  useMultiOnClickOutside([popupRef, outsideRef], closeCalendar);

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

  const popperContent = (
    <CalendarPopupBox
      innerRef={popupRef}
      background={colors.backgroundColor}
      borderColor={colors.borderColor}
      zIndex={zIndex}
      open={open}
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
  );
  return (
    <Box innerRef={outsideRef} width={width}>
      <Manager>
        <Reference>
          {({ ref }) => (
            <Box innerRef={ref}>
              <StandardTextInput
                {...props}
                theme={theme.standardTextInput}
                invalid={invalid}
                iconLeft={!hideCalenderIcon ? faCalendarAlt : undefined}
                onClickLeft={
                  !hideCalenderIcon && !disableCalender
                    ? toggleCalendar
                    : undefined
                }
                onValueChange={onValueChangeHandler}
                placeholder={placeholder}
                value={value}
              />
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
