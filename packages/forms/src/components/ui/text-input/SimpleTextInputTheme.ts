import {
  ThemeColorField,
  ThemeFontField,
  ThemeFontSizeField
} from "@stenajs-webui/core";

export interface SimpleTextInputTheme {
  textColor: ThemeColorField;
  textColorDisabled: ThemeColorField;
  backgroundColor: ThemeColorField;
  backgroundColorDisabled: ThemeColorField;
  placeholderColor: ThemeColorField;
  fontSize: ThemeFontSizeField;
  fontFamily: ThemeFontField;
  height: string | undefined;
}

export const defaultSimpleTextInputTheme: SimpleTextInputTheme = {
  textColor: "primaryText",
  textColorDisabled: "disabledText",
  backgroundColor: "white",
  backgroundColorDisabled: "disabledBackground",
  placeholderColor: "separator",
  fontSize: "normal",
  fontFamily: "input",
  height: undefined
};
