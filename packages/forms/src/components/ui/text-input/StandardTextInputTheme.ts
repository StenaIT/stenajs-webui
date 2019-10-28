import { ThemeColorField } from "@stenajs-webui/core";
import { BorderColorProperty, BorderStyleProperty } from "csstype";
import { SimpleTextInputTheme } from "./SimpleTextInputTheme";

export interface StandardTextInputTheme extends SimpleTextInputTheme {
  borderRadius: string;
  borderColor: ThemeColorField | BorderColorProperty;
  borderColorFocused: ThemeColorField | string;
  borderStyle: BorderStyleProperty;
  borderWidth: number;
  paddingLeft: string;
  paddingRight: string;
  iconSize: number;
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
  fontFamily: "input",
  fontSize: "input",
  height: "32px",
  iconSize: 13,
  paddingLeft: "8px",
  paddingRight: "8px",
  placeholderColor: "separator",
  textColor: "primaryText",
  textColorDisabled: "disabledText",
  textColorInvalid: "primaryText"
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
  fontFamily: "input",
  fontSize: "input",
  height: "32px",
  iconSize: 13,
  paddingLeft: "8px",
  paddingRight: "8px",
  placeholderColor: "separator",
  textColor: "white",
  textColorDisabled: "disabledText",
  textColorInvalid: "white"
};
