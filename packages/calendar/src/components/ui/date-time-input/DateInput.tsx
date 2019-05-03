import { format } from 'date-fns';
import * as React from 'react';
import {
  compose,
  defaultProps,
  setDisplayName,
  withHandlers,
  withState,
} from 'recompose';
import { DateFormats } from '../../../../util/date/DateFormats';
import { withTheme, WithThemeProps } from '../../../util/enhancers';
import { Background } from '../../colors';
import { Border } from '../../decorations';
import { Indent } from '../../layout/Indent';
import { Overlay } from '../../overlay';
import { Absolute, Relative } from '../../positioning';
import { createSingleDateCalendar } from '../calendar/SingleDateCalendar';
import { DefaultTextInput } from '../text-input';

export interface DateInputProps {
  /** The current value */
  value?: Date;
  /** onChange handler for when the user selects a date. */
  onChange?: (date: Date | undefined) => void;
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
}

export interface DateInputPropsWithDefaultProps {
  displayFormat: string;
  placeholder: string;
}

// tslint:disable:no-empty
const noop = () => {};

type InnerProps = DateInputProps &
  WithShowingCalendarStateProps &
  WithShowCalendarHandlers &
  WithOnSelectDateHandler &
  DateInputPropsWithDefaultProps &
  WithThemeProps;

const SingleDateCalendar = createSingleDateCalendar();

const DateInputComponent = ({
  showCalendar,
  hideCalendar,
  displayFormat,
  showingCalendar,
  placeholder,
  onSelectDate,
  value,
  zIndex,
  theme,
  openOnMount,
}: InnerProps) => (
  <>
    <DefaultTextInput
      iconLeft={'calendar-alt'}
      onFocus={showCalendar}
      value={value ? format(value, displayFormat) : ''}
      placeholder={placeholder}
      onChange={noop}
      size={9}
      forceFocusHighlight={showingCalendar}
      focusOnMount={openOnMount}
    />
    {showingCalendar && (
      <Relative>
        <Overlay onClickOutside={hideCalendar} backgroundOpacity={0} />
        <Absolute zIndex={zIndex}>
          <Border color={theme.components.DateInput.borderColor}>
            <Background color={theme.components.DateInput.backgroundColor}>
              <Indent>
                <SingleDateCalendar
                  onChange={onSelectDate}
                  value={value}
                  theme={theme.components.DateInput.calendar}
                />
              </Indent>
            </Background>
          </Border>
        </Absolute>
      </Relative>
    )}
  </>
);

interface WithShowingCalendarStateProps {
  showingCalendar: boolean;
  setShowingCalendar: (showingCalendar: boolean) => void;
}

const withShowingCalendarState = withState(
  'showingCalendar',
  'setShowingCalendar',
  ({ openOnMount }: DateInputProps) => openOnMount,
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
  },
});

interface WithOnSelectDateHandler {
  onSelectDate: (date: Date | undefined) => void;
}

const withOnSelectDateHandler = withHandlers<
  WithShowingCalendarStateProps & DateInputProps & WithShowCalendarHandlers,
  WithOnSelectDateHandler
>({
  onSelectDate: ({ setShowingCalendar, onChange, hideCalendar }) => (
    date: Date | undefined,
  ) => {
    if (onChange) {
      onChange(date);
    }
    setTimeout(hideCalendar, 150);
  },
});

const withDefaultProps = defaultProps<Partial<DateInputProps>>({
  displayFormat: DateFormats.fullDate,
  placeholder: 'Enter date',
  zIndex: 100,
});

export const DateInput = setDisplayName<DateInputProps>('DateInput')(
  compose<InnerProps, DateInputProps>(
    withDefaultProps,
    withShowingCalendarState,
    withShowCalendarHandlers,
    withOnSelectDateHandler,
    withTheme,
  )(DateInputComponent),
);
