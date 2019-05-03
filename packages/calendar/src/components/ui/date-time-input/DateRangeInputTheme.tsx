import {
  separator,
  separatorHighlighted,
  white,
} from '../../../../themes/default-values/Colors';
import {
  CalendarTheme,
  defaultCalendarTheme,
} from '../calendar/components/CalendarTheme';

export interface DateRangeInputTheme {
  borderColor: string;
  backgroundColor: string;
  highlightBorder: string;
  calendar: CalendarTheme;
}

export const defaultDateRangeInputTheme: DateRangeInputTheme = {
  backgroundColor: white,
  borderColor: separator,
  highlightBorder: `1px solid ${separatorHighlighted}`,
  calendar: defaultCalendarTheme,
};
