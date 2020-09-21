import { ThemeColorField } from "@stenajs-webui/core";

export interface ToggleButtonTheme {
  backgroundColorPressed: ThemeColorField | string;
  backgroundColorNotPressed: ThemeColorField | string;
  textColorPressed: ThemeColorField | string;
  textColorNotPressed: ThemeColorField | string;
  width: string;
  height: string;
}

export const defaultToggleButtonTheme: ToggleButtonTheme = {
  backgroundColorPressed: "inputBorderFocused",
  backgroundColorNotPressed: "inputBorderFocusedAlt",
  textColorPressed: "white",
  textColorNotPressed: "primaryText",
  width: "28px",
  height: "28px",
};

export const defaultToggleButtonThemeDark: ToggleButtonTheme = {
  backgroundColorPressed: "inputBorderFocusedAlt",
  backgroundColorNotPressed: "inputBorderFocused",
  textColorPressed: "primaryText",
  textColorNotPressed: "white",
  width: "28px",
  height: "28px",
};
