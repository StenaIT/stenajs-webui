import { Box } from "@stenajs-webui/core";
import { stenaCalendar, TextInputButton } from "@stenajs-webui/elements";
import { TextInput, TextInputProps } from "@stenajs-webui/forms";
import { ControlledPopover } from "@stenajs-webui/tooltip";
import { format } from "date-fns";
import * as React from "react";
import { defaultPopoverPlacement } from "../../../config/DefaultPopoverPlacement";
import { DateFormats } from "../../../util/date/DateFormats";
import { SingleDateCalendar } from "../../calendar-types/single-date-calendar/SingleDateCalendar";
import {
  CalendarTheme,
  defaultCalendarTheme,
} from "../../calendar/CalendarTheme";
import { DateTextInputCalendarProps } from "../date-text-input/DateTextInput";
import { useDateInput } from "./UseDateInput";
import { OptionalMinMaxDatesAsString } from "../../../types/CalendarTypes";
import { defaultMaxDate } from "../../../config/DefaultMaxDate";

export interface DateInputProps<T = unknown>
  extends OptionalMinMaxDatesAsString {
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
   *  Portal target, HTML element. If not set, window.body is used.
   */
  portalTarget?: HTMLElement;
  zIndex?: number;
  width?: string;
  /**
   * The calendar theme to use.
   */
  calendarTheme?: CalendarTheme;
  /** Props to be passed to Calendar, see SingleDateCalendar. */
  calendarProps?: DateTextInputCalendarProps<T>;
  /**
   * Disables the TextInput, Calendar and Popover.
   */
  disabled?: boolean;
}

export const DateInput: React.FC<DateInputProps> = ({
  displayFormat = DateFormats.fullDate,
  placeholder = "Enter date",
  value,
  calendarTheme = defaultCalendarTheme,
  calendarProps,
  openOnMount,
  onClose,
  onChange,
  variant,
  width,
  minDate,
  maxDate = defaultMaxDate,
  disabled,
  portalTarget,
  zIndex,
}) => {
  const { hideCalendar, showingCalendar, onSelectDate, showCalendar } =
    useDateInput(onChange, onClose, openOnMount);

  return (
    <Box width={width}>
      <ControlledPopover
        hideArrow
        open={showingCalendar}
        onRequestClose={hideCalendar}
        appendTo={portalTarget}
        zIndex={zIndex}
        renderTrigger={(props) => (
          <Box {...props}>
            <TextInput
              type={"date"}
              onFocus={showCalendar}
              buttonRight={
                <TextInputButton onClick={showCalendar} icon={stenaCalendar} />
              }
              value={value ? format(value, displayFormat) : ""}
              placeholder={placeholder}
              size={9}
              disabled={disabled}
              autoFocus={openOnMount}
              variant={variant}
              min={minDate}
              max={maxDate}
            />
          </Box>
        )}
        placement={defaultPopoverPlacement}
      >
        <SingleDateCalendar
          {...calendarProps}
          onChange={onSelectDate}
          value={value}
          theme={calendarTheme}
          minDate={minDate}
          maxDate={maxDate}
        />
      </ControlledPopover>
    </Box>
  );
};
