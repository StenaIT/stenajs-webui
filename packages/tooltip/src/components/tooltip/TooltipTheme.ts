import { ThemeColorField } from "@stenajs-webui/core";

export interface TooltipTheme {
  textColor: ThemeColorField | string;
  textColorWarning: ThemeColorField | string;
  textColorError: ThemeColorField | string;
  background: ThemeColorField | string;
  backgroundWarning: ThemeColorField | string;
  backgroundError: ThemeColorField | string;
}

export const defaultTooltipTheme: TooltipTheme = {
  textColor: "white",
  textColorWarning: "white",
  textColorError: "white",
  background: "primaryBgDark",
  backgroundWarning: "alertTextLight",
  backgroundError: "errorBgLight"
};
