import {
  defaultStandardTextInputTheme,
  StandardTextInputTheme
} from "@stenajs-webui/forms";

export interface DateTextInputTheme extends StandardTextInputTheme {}

export const defaultDateTextInputTheme: DateTextInputTheme = {
  ...defaultStandardTextInputTheme
};
