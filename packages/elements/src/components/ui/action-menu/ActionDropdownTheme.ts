import { ActionMenuTheme, defaultActionMenuTheme } from "./ActionMenuTheme";

export interface ActionDropdownTheme extends ActionMenuTheme {
  background?: string;
  backgroundDisabled?: string;
  textColor?: string;
  textColorDisabled?: string;
  expandIconColor: string;
  expandIconColorDisabled: string;
  expandIconColorFocus: string;
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
