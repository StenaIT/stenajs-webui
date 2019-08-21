import {
  defaultStandardTextInputTheme,
  StandardTextInputTheme
} from "@stenajs-webui/forms";
import {
  CalendarTheme,
  defaultCalendarTheme
} from "../../calendar/CalendarTheme";

export interface DateTextInputTheme {
  calendar: CalendarTheme;
  standardTextInput: StandardTextInputTheme;
}

export const defaultDateTextInputTheme: DateTextInputTheme = {
  calendar: defaultCalendarTheme,
  standardTextInput: defaultStandardTextInputTheme
};
