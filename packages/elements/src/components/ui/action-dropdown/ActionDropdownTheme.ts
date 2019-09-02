import { ThemeColorField } from "@stenajs-webui/core";
import { ActionMenuTheme, defaultActionMenuTheme } from "./ActionMenuTheme";

export interface ActionDropdownTheme extends ActionMenuTheme {
  background?: ThemeColorField | string;
  backgroundDisabled?: ThemeColorField | string;
  textColor?: ThemeColorField | string;
  textColorDisabled?: ThemeColorField | string;
  expandIconColor: ThemeColorField | string;
  expandIconColorDisabled: ThemeColorField | string;
  expandIconColorFocus: ThemeColorField | string;
  height: string;
}

export const defaultActionDropdownTheme: ActionDropdownTheme = {
  ...defaultActionMenuTheme,
  background: "white",
  backgroundDisabled: "disabledBackground",
  textColor: "primaryText",
  textColorDisabled: "disabledText",
  expandIconColor: "disabledText",
  expandIconColorDisabled: "disabledText",
  expandIconColorFocus: "interactionBgPrimary",
  height: "34px"
};
