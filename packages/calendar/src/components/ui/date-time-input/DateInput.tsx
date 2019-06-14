import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons/faCalendarAlt";
import { useOnClickOutside, useThemeFields } from "@stenajs-webui/core";
import { StandardTextInput } from "@stenajs-webui/forms";
import { format } from "date-fns";
import * as React from "react";
import { useRef } from "react";
import {
  compose,
  defaultProps,
  setDisplayName,
  withHandlers,
  withState
} from "recompose";
import { DateFormats } from "../../../util/date/DateFormats";
import {
  CalendarTheme,
  defaultCalendarTheme
} from "../calendar/components/CalendarTheme";
import { createSingleDateCalendar } from "../calendar/SingleDateCalendar";
import { CalendarPopupBox } from "./CalendarPopupBox";
import { DateInputTheme, defaultDateInputTheme } from "./DateInputTheme";
import { DateTextInputCalendarProps } from "./DateTextInput";

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
   * Z-index of the calendar overlay.
   * @default 100
   */
  zIndex?: number;
  /**
   * The theme to use.
   */
  theme?: DateInputTheme;
  /**
   * The calendar theme to use.
   */
  calendarTheme?: CalendarTheme;
  /** Props to be passed to Calendar, see SingleDateCalendar. */
  calendarProps?: DateTextInputCalendarProps<T>;
}

export interface DateInputPropsWithDefaultProps {
  displayFormat: string;
  placeholder: string;
}

type InnerProps = DateInputProps &
  WithShowingCalendarStateProps &
  WithShowCalendarHandlers &
  WithOnSelectDateHandler &
  DateInputPropsWithDefaultProps;

const SingleDateCalendar = createSingleDateCalendar();

const DateInputComponent: React.FC<InnerProps> = ({
  showCalendar,
  hideCalendar,
  backgroundColor,
  displayFormat,
  showingCalendar,
  placeholder,
  onSelectDate,
  value,
  zIndex,
  theme = defaultDateInputTheme,
  calendarTheme = defaultCalendarTheme,
  calendarProps,
  openOnMount
}) => {
  const ref = useRef(null);
  useOnClickOutside(ref, hideCalendar);

  const { colors } = useThemeFields(
    {
      colors: {
        backgroundColor: theme.backgroundColor,
        borderColor: theme.borderColor
      }
    },
    [theme]
  );

  return (
    <>
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
      {showingCalendar && (
        <CalendarPopupBox
          innerRef={ref}
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
      )}
    </>
  );
};

interface WithShowingCalendarStateProps {
  showingCalendar: boolean;
  setShowingCalendar: (showingCalendar: boolean) => void;
}

const withShowingCalendarState = withState(
  "showingCalendar",
  "setShowingCalendar",
  ({ openOnMount }: DateInputProps) => openOnMount
);

interface WithShowCalendarHandlers {
  showCalendar: () => boolean;
  hideCalendar: () => void;
}

const withShowCalendarHandlers = withHandlers<
  WithShowingCalendarStateProps & DateInputProps,
  WithShowCalendarHandlers
>({
  showCalendar: ({ setShowingCalendar }) => () => {
    setShowingCalendar(true);
    return true;
  },
  hideCalendar: ({ setShowingCalendar, onClose }) => () => {
    setShowingCalendar(false);
    if (onClose) {
      onClose();
    }
  }
});

interface WithOnSelectDateHandler {
  onSelectDate: (date: Date | undefined) => void;
}

const withOnSelectDateHandler = withHandlers<
  WithShowingCalendarStateProps & DateInputProps & WithShowCalendarHandlers,
  WithOnSelectDateHandler
>({
  onSelectDate: ({ onChange, hideCalendar }) => (date: Date | undefined) => {
    if (onChange) {
      onChange(date);
    }
    setTimeout(hideCalendar, 150);
  }
});

const withDefaultProps = defaultProps<Partial<DateInputProps>>({
  displayFormat: DateFormats.fullDate,
  placeholder: "Enter date",
  zIndex: 100
});

export const DateInput = setDisplayName("DateInput")(
  compose<InnerProps, DateInputProps>(
    withDefaultProps,
    withShowingCalendarState,
    withShowCalendarHandlers,
    withOnSelectDateHandler
  )(DateInputComponent)
);
