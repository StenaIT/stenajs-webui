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
  textInput: StandardTextInputTheme;
}

export const defaultDateTextInputTheme: DateTextInputTheme = {
  calendar: defaultCalendarTheme,
  textInput: defaultStandardTextInputTheme
};
