import {
  ThemeColorField,
  ThemeFontField,
  ThemeFontSizeField
} from "@stenajs-webui/core";

export interface ButtonTheme {
  /** The color of the text on the button. */
  textColor: ThemeColorField | string;
  /** The color of the text on the button when disabled. */
  textColorDisabled: ThemeColorField | string;
  /** The color of the button. */
  bgColor: ThemeColorField | string;
  /** The color of the button when disabled. */
  bgColorDisabled: ThemeColorField | string;
  /** The font of the button. */
  font: ThemeFontField | string;
  /** The font of the button. */
  fontSize: ThemeFontSizeField | string;
  /** Border radius of the button. */
  borderRadius: string | undefined;
  /** Size of spacing between edges, icons and text. */
  numSpacing: number;
  /** Height of button. */
  height: string;
  /** Color of success icon */
  successIconColor: ThemeColorField | string;
  /** Color of success text */
  successTextColor: ThemeColorField | string;
  /** Color of progress spinner */
  loadingSpinnerColor: ThemeColorField | string;
  /** Color of loading text */
  loadingTextColor: ThemeColorField | string;
}

export const defaultButtonTheme: ButtonTheme = {
  textColor: "white",
  bgColor: "interactionBgPrimary",
  textColorDisabled: "white",
  bgColorDisabled: "disabledText",
  font: "buttons",
  fontSize: "normal",
  borderRadius: "3px",
  numSpacing: 2,
  height: "40px",
  successIconColor: "white",
  successTextColor: "white",
  loadingSpinnerColor: "white",
  loadingTextColor: "white"
};
