import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons/faCalendarAlt";
import { Box, useMultiOnClickOutside } from "@stenajs-webui/core";
import { TextInput, TextInputProps } from "@stenajs-webui/forms";
import { format } from "date-fns";
import * as React from "react";
import { useRef } from "react";
import { DateFormats } from "../../../util/date/DateFormats";
import { SingleDateCalendar } from "../../calendar-types/single-date-calendar/SingleDateCalendar";
import {
  CalendarTheme,
  defaultCalendarTheme,
} from "../../calendar/CalendarTheme";
import { DateTextInputCalendarProps } from "../date-text-input/DateTextInput";
import { useDateInput } from "./UseDateInput";
import { Popover } from "@stenajs-webui/tooltip";

export interface DateInputProps<T = {}> {
  /** The current value */
  value?: Date;
  /** onChange handler for when the user selects a date. */
  onChange?: (date: Date | undefined) => void;
  /** Variant of the input field. */
  variant?: TextInputProps["variant"];
  /** If true, calendar will be open when component mounts. */
  openOnMount?: boolean;
  /** Is invoked when user closes the calendar popup. */
  onClose?: () => void;
  /**
   * The date format in the input field. See date-fns docs.
   * @default YYYY-MM-dd
   */
  displayFormat?: string;
  /**
   * Placeholder when no date has been selected.
   * @default Enter date
   */
  placeholder?: string;
  /**
   *  Portal target, HTML element. If not set, portal is not used.
   */
  portalTarget?: HTMLElement | null;
  /**
   * Z-index of the calendar overlay.
   * @default 100
   */
  zIndex?: number;
  /**
   * Width of the input element.
   * * @default 125px
   */
  width?: string;
  /**
   * The calendar theme to use.
   */
  calendarTheme?: CalendarTheme;
  /** Props to be passed to Calendar, see SingleDateCalendar. */
  calendarProps?: DateTextInputCalendarProps<T>;
}

export const DateInput: React.FC<DateInputProps> = ({
  displayFormat = DateFormats.fullDate,
  placeholder = "Enter date",
  value,
  zIndex = 100,
  calendarTheme = defaultCalendarTheme,
  calendarProps,
  openOnMount,
  onClose,
  onChange,
  portalTarget,
  variant,
  width,
}) => {
  const {
    hideCalendar,
    showingCalendar,
    onSelectDate,
    showCalendar,
  } = useDateInput(onChange, onClose, openOnMount);

  const popupRef = useRef<HTMLDivElement>(null);
  const outsideRef = useRef<HTMLDivElement>(null);

  useMultiOnClickOutside([popupRef, outsideRef], hideCalendar);

  return (
    <Box ref={outsideRef} width={width}>
      <Popover
        arrow={false}
        lazy
        visible={showingCalendar}
        zIndex={zIndex}
        appendTo={portalTarget ?? "parent"}
        content={
          <SingleDateCalendar
            {...calendarProps}
            onChange={onSelectDate}
            value={value}
            theme={calendarTheme}
          />
        }
      >
        <TextInput
          iconLeft={faCalendarAlt}
          onFocus={showCalendar}
          onClickLeft={showCalendar}
          value={value ? format(value, displayFormat) : ""}
          placeholder={placeholder}
          size={9}
          autoFocus={openOnMount}
          variant={variant}
        />
      </Popover>
    </Box>
  );
};
