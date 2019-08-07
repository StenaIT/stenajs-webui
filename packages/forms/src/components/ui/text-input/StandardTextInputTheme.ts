import { ThemeColorField, ThemeFontSizeField } from "@stenajs-webui/core";
import { BorderColorProperty, BorderStyleProperty } from "csstype";

export interface StandardTextInputTheme {
  backgroundColor: ThemeColorField | string;
  backgroundColorDisabled: string;
  backgroundColorInvalid: string;
  borderRadius: string;
  borderColor: ThemeColorField | BorderColorProperty;
  borderColorFocused: ThemeColorField | string;
  borderStyle: BorderStyleProperty;
  borderWidth: number;
  fontSize: ThemeFontSizeField | string;
  height: string;
  paddingLeft: string;
  paddingRight: string;
  iconSize: number;
  textColor: ThemeColorField | string;
}

export const defaultStandardTextInputTheme: StandardTextInputTheme = {
  backgroundColor: "white",
  backgroundColorDisabled: "disabledBackground",
  backgroundColorInvalid: "errorBgLight",
  borderRadius: "4px",
  borderColor: "inputBorder",
  borderColorFocused: "inputBorderFocused",
  borderStyle: "solid",
  borderWidth: 1,
  fontSize: "input",
  height: "34px",
  paddingLeft: "8px",
  paddingRight: "8px",
  iconSize: 13,
  textColor: "primaryText"
};

export const defaultStandardTextInputThemeDark: StandardTextInputTheme = {
  backgroundColor: "#4a5d73",
  backgroundColorDisabled: "disabledBackground",
  backgroundColorInvalid: "errorBgLight",
  borderRadius: "4px",
  borderColor: "transparent",
  borderColorFocused: "white",
  borderStyle: "solid",
  borderWidth: 1,
  fontSize: "input",
  height: "34px",
  paddingLeft: "8px",
  paddingRight: "8px",
  iconSize: 13,
  textColor: "white"
};
