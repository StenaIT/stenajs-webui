import { ThemeColorField } from '@stenajs-webui/core';
import {
  CalendarTheme,
  defaultCalendarTheme,
} from '../calendar/components/CalendarTheme';

export interface DateInputTheme {
  backgroundColor: ThemeColorField;
  borderColor: ThemeColorField;
  calendar: CalendarTheme;
}

export const defaultDateInputTheme: DateInputTheme = {
  backgroundColor: 'white',
  borderColor: 'separator',
  calendar: defaultCalendarTheme,
};
