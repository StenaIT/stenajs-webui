import {
  ThemeColorField,
  ThemeFontField,
  ThemeFontSizeField
} from "@stenajs-webui/core";

export interface SimpleTextInputTheme {
  disabledBackgroundColor: ThemeColorField;
  disabledTextColor: ThemeColorField;
  fontSize: ThemeFontSizeField;
  fontFamily: ThemeFontField;
  textColor: ThemeColorField;
  placeholderColor: ThemeColorField;
  backgroundColor: ThemeColorField;
  height: string | undefined;
}

export const defaultSimpleTextInputTheme: SimpleTextInputTheme = {
  disabledBackgroundColor: "disabledBackground",
  disabledTextColor: "disabledText",
  fontSize: "normal",
  fontFamily: "input",
  textColor: "primaryText",
  placeholderColor: "separator",
  backgroundColor: "white",
  height: undefined
};
