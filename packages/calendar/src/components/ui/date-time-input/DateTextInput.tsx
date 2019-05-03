import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons/faCalendarAlt';
import { format, isValid, parse } from 'date-fns';
import * as React from 'react';
import { useState } from 'react';
import { Omit } from '../../../../types';
import { useTheme } from '../../../theme/UseThemeHook';
import { Background } from '../../colors';
import { Border } from '../../decorations';
import { Icon } from '../../icon';
import { Clickable } from '../../interaction';
import { Indent } from '../../layout';
import { Overlay } from '../../overlay';
import { Absolute, Relative } from '../../positioning';
import { SingleDateCalendar, SingleDateCalendarProps } from '../calendar';
import { DefaultTextInput, DefaultTextInputProps } from '../text-input';

export type DateTextInputCalendarProps<T> = Omit<
  SingleDateCalendarProps<T>,
  'value' | 'onChange' | 'theme'
>;

export interface DateTextInputProps<T> extends DefaultTextInputProps {
  /** Props to be passed to Calendar, see SingleDateCalendar for sage */
  calendarProps?: DateTextInputCalendarProps<T>;
  /** Close calendar when date is selected, @default true */
  closeOnCalendarSelectDate?: boolean;
  /** Valid date format, @default YYYY-MM-DD */
  dateFormat?: string;
  /** Make the icon not clickable, @default false */
  disableCalender?: boolean;
  /** Show or hide the calender icon, @default true */
  useCalenderIcon?: boolean;
  /** Onchange callback, returns the current value */
  onChange: (value: string) => void;
  /** Placeholder for the input, @default YYYY-MM-DD */
  placeholder?: string;
  /**  Z-index of the calendar overlay, @default 100 */
  zIndex?: number;
}

export const DateTextInput = <T extends {}>({
  calendarProps,
  closeOnCalendarSelectDate = true,
  dateFormat = 'yyyy-MM-dd',
  disableCalender = false,
  useCalenderIcon = true,
  onChange,
  placeholder = 'YYYY-MM-DD',
  value,
  width = '125px',
  zIndex = 100,
  ...props
}: DateTextInputProps<T>) => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();

  const toggleCalendar = () => {
    setOpen(!open);
  };

  const updateValue = (date: string) => {
    onChange(date);
  };

  const calendar =
    disableCalender || props.disabled ? (
      <Icon name={faCalendarAlt} />
    ) : (
      useCalenderIcon && (
        <Clickable onClick={toggleCalendar}>
          <Icon name={faCalendarAlt} />
        </Clickable>
      )
    );

  const onCalendarSelectDate = (date: Date | undefined) => {
    if (date) {
      updateValue(format(date, dateFormat));
      if (closeOnCalendarSelectDate) {
        setTimeout(() => setOpen(!open), 200);
      }
    }
  };

  const validInput = value && !/^[-/0-9]+$/.test(value);

  const dateIsValid = value && isValid(parse(value, dateFormat, new Date()));

  const userInputCorrectLength = value && value.length >= dateFormat.length;

  return (
    <>
      <DefaultTextInput
        {...props}
        backgroundColor={
          (userInputCorrectLength && !dateIsValid) || validInput
            ? theme.colors.errorBgLight
            : undefined
        }
        contentLeft={calendar}
        onChange={updateValue}
        placeholder={placeholder}
        value={value}
        width={width}
      />
      {open && (
        <Relative>
          <Overlay onClickOutside={toggleCalendar} backgroundOpacity={0} />
          <Absolute zIndex={zIndex}>
            <Border color={theme.components.DateInput.borderColor}>
              <Background color={theme.components.DateInput.backgroundColor}>
                <Indent>
                  <SingleDateCalendar
                    {...calendarProps}
                    onChange={onCalendarSelectDate}
                    value={
                      value && dateIsValid
                        ? parse(value, dateFormat, new Date())
                        : undefined
                    }
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
};
