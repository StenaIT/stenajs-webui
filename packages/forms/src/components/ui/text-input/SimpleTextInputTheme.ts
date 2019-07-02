import {
  ThemeColorField,
  ThemeFontField,
  ThemeFontSizeField
} from "@stenajs-webui/core";

export interface SimpleTextInputTheme {
  textColor: ThemeColorField | string;
  textColorDisabled: ThemeColorField | string;
  backgroundColor: ThemeColorField | string;
  backgroundColorDisabled: ThemeColorField | string;
  placeholderColor: ThemeColorField | string;
  fontSize: ThemeFontSizeField | string;
  fontFamily: ThemeFontField | string;
  height: string | undefined;
}

export const defaultSimpleTextInputTheme: SimpleTextInputTheme = {
  textColor: "primaryText",
  textColorDisabled: "disabledText",
  backgroundColor: "white",
  backgroundColorDisabled: "disabledBackground",
  placeholderColor: "separator",
  fontSize: "input",
  fontFamily: "input",
  height: undefined
};
