import { ThemeColorField, ThemeFontSizeField } from "@stenajs-webui/core";
import { BorderColorProperty, BorderStyleProperty } from "csstype";

export interface StandardTextInputTheme {
  borderRadius: string;
  borderColor: ThemeColorField | BorderColorProperty;
  borderColorFocused: ThemeColorField | string;
  borderStyle: BorderStyleProperty;
  borderWidth: number;
  disabledBackgroundColor: string;
  fontSize: ThemeFontSizeField | string;
  height: string;
  paddingLeft: string;
  paddingRight: string;
  iconSize: number;
  backgroundColor: ThemeColorField | string;
  textColor: ThemeColorField | string;
}

export const defaultStandardTextInputTheme: StandardTextInputTheme = {
  borderRadius: "4px",
  borderColor: "inputBorder",
  borderColorFocused: "inputBorderFocused",
  borderStyle: "solid",
  borderWidth: 1,
  disabledBackgroundColor: "disabledBackground",
  fontSize: "input",
  height: "34px",
  paddingLeft: "8px",
  paddingRight: "8px",
  iconSize: 13,
  backgroundColor: "white",
  textColor: "primaryText"
};

export const defaultStandardTextInputThemeDark: StandardTextInputTheme = {
  borderRadius: "4px",
  borderColor: "transparent",
  borderColorFocused: "white",
  borderStyle: "solid",
  borderWidth: 1,
  disabledBackgroundColor: "disabledBackground",
  fontSize: "input",
  height: "34px",
  paddingLeft: "8px",
  paddingRight: "8px",
  iconSize: 13,
  backgroundColor: "#4a5d73",
  textColor: "white"
};
