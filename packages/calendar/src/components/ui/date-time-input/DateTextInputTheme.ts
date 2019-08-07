import {
  defaultStandardTextInputTheme,
  StandardTextInputTheme
} from "@stenajs-webui/forms";

export interface DateTextInputTheme extends StandardTextInputTheme {
  backgroundColorInvalidDate: string;
}

export const defaultDateTextInputTheme: DateTextInputTheme = {
  ...defaultStandardTextInputTheme,
  backgroundColorInvalidDate: "errorBgLight"
};
