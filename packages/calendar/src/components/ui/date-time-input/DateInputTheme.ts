import { separator, white } from '../../../../themes/default-values/Colors';
import {
  CalendarTheme,
  defaultCalendarTheme,
} from '../calendar/components/CalendarTheme';

export interface DateInputTheme {
  backgroundColor: string;
  borderColor: string;
  calendar: CalendarTheme;
}

export const defaultDateInputTheme: DateInputTheme = {
  backgroundColor: white,
  borderColor: separator,
  calendar: defaultCalendarTheme,
};
