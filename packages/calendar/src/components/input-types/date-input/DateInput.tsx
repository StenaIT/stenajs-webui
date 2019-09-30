import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons/faCalendarAlt";
import {
  Box,
  useMultiOnClickOutside,
  useThemeFields
} from "@stenajs-webui/core";
import { StandardTextInput } from "@stenajs-webui/forms";
import { format } from "date-fns";
import * as React from "react";
import { useRef } from "react";
import * as ReactDOM from "react-dom";
import { Manager, Reference } from "react-popper";
import { DateFormats } from "../../../util/date/DateFormats";
import { SingleDateCalendar } from "../../calendar-types/single-date-calendar/SingleDateCalendar";
import { CalendarPopupBox } from "../../calendar/CalendarPopupBox";
import {
  CalendarTheme,
  defaultCalendarTheme
} from "../../calendar/CalendarTheme";
import { DateTextInputCalendarProps } from "../date-text-input/DateTextInput";
import { DateInputTheme, defaultDateInputTheme } from "./DateInputTheme";
import { useDateInput } from "./UseDateInput";

export interface DateInputProps<T = {}> {
  /** The current value */
  value?: Date;
  /** onChange handler for when the user selects a date. */
  onChange?: (date: Date | undefined) => void;
  /** Background color of the input field. */
  backgroundColor?: string;
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
   * The theme to use.
   */
  theme?: DateInputTheme;
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
  backgroundColor,
  displayFormat = DateFormats.fullDate,
  placeholder = "Enter date",
  value,
  zIndex = 100,
  theme = defaultDateInputTheme,
  calendarTheme = defaultCalendarTheme,
  calendarProps,
  openOnMount,
  onClose,
  onChange,
  portalTarget,
  width = "125px"
}) => {
  const {
    hideCalendar,
    showingCalendar,
    onSelectDate,
    showCalendar
  } = useDateInput(onChange, onClose, openOnMount);

  const popupRef = useRef<HTMLDivElement>(null);
  const outsideRef = useRef<HTMLDivElement>(null);

  useMultiOnClickOutside([popupRef, outsideRef], hideCalendar);

  const { colors } = useThemeFields(
    {
      colors: {
        backgroundColor: theme.backgroundColor,
        borderColor: theme.borderColor
      }
    },
    [theme]
  );

  const popperContent = (
    <CalendarPopupBox
      open={showingCalendar}
      innerRef={popupRef}
      background={colors.backgroundColor}
      borderColor={colors.borderColor}
      zIndex={zIndex}
    >
      <SingleDateCalendar
        {...calendarProps}
        onChange={onSelectDate}
        value={value}
        theme={calendarTheme}
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
                backgroundColor={backgroundColor}
                iconLeft={faCalendarAlt}
                onFocus={showCalendar}
                onClickLeft={showCalendar}
                value={value ? format(value, displayFormat) : ""}
                placeholder={placeholder}
                size={9}
                forceFocusHighlight={showingCalendar}
                focusOnMount={openOnMount}
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
