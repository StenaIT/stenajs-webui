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
  background: "var(--swui-white)",
  backgroundDisabled: "var(--swui-field-bg-disabled)",
  textColor: "var(--swui-text-primary-color)",
  textColorDisabled: "var(--swui-text-disabled-color)",
  expandIconColor: "var(--swui-field-border-color)",
  expandIconColorDisabled: "var(--swui-text-disabled-color)",
  expandIconColorFocus: "var(--swui-field-border-color-hover)",
  height: "34px",
};
