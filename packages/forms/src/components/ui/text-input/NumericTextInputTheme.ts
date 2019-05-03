import { ThemeColorField } from "@stenajs-webui/core";
import {
  defaultStandardTextInputTheme,
  StandardTextInputTheme,
  defaultStandardTextInputThemeDark
} from "./StandardTextInputTheme";

export interface NumericTextInputTheme extends StandardTextInputTheme {
  borderColor: ThemeColorField | string;
  buttonHeight: string;
}

export const defaultNumericTextInputTheme: NumericTextInputTheme = {
  ...defaultStandardTextInputTheme,
  borderColor: "inputBorder",
  buttonHeight: "17px"
};

export const defaultNumericTextInputThemeDark: NumericTextInputTheme = {
  ...defaultStandardTextInputThemeDark,
  borderColor: "inputBorder",
  buttonHeight: "17px"
};
