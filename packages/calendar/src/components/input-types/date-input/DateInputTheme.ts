import { ThemeColorField } from "@stenajs-webui/core";
import {
  CalendarTheme,
  defaultCalendarTheme
} from "../../calendar/CalendarTheme";

export interface DateInputTheme {
  backgroundColor: ThemeColorField | string;
  backgroundColorInvalidDate: ThemeColorField | string;
  borderColor: ThemeColorField | string;
  calendar: CalendarTheme;
}

export const defaultDateInputTheme: DateInputTheme = {
  backgroundColor: "white",
  backgroundColorInvalidDate: "errorBgLight",
  borderColor: "separator",
  calendar: defaultCalendarTheme
};
