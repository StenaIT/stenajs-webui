import { DeepPartial } from '../../../../../types/DeepPartial';
import { CalendarTheme } from '../components/CalendarTheme';

export interface WithCalendarTheme {
  theme?: DeepPartial<CalendarTheme>;
}
