import { ThemeColorField } from "@stenajs-webui/core";

export interface ActionMenuTheme {
  borderColor?: ThemeColorField | string;
  borderColorFocus?: ThemeColorField | string;
  borderRadius?: string;
  menuBackground?: ThemeColorField | string;
  iconColor: ThemeColorField | string;
  iconColorDisabled: ThemeColorField | string;
  iconColorFocus: ThemeColorField | string;
  iconColorHover: ThemeColorField | string;
  itemBackground?: ThemeColorField | string;
  itemBackgroundDisabled?: ThemeColorField | string;
  itemBackgroundDisabledFocus?: ThemeColorField | string;
  itemBackgroundFocus?: ThemeColorField | string;
  itemBackgroundHover?: ThemeColorField | string;
  itemLabelColor?: ThemeColorField | string;
  itemLabelColorDisabled?: ThemeColorField | string;
  itemLabelColorFocus?: ThemeColorField | string;
  itemLabelColorHover?: ThemeColorField | string;
  itemTextColor?: ThemeColorField | string;
  itemTextColorDisabled?: ThemeColorField | string;
  itemTextColorFocus?: ThemeColorField | string;
  itemTextColorHover?: ThemeColorField | string;
  itemHeight: string;
}

export const defaultActionMenuTheme: ActionMenuTheme = {
  borderColor: "var(--swui-field-border-color)",
  borderColorFocus: "var(--swui-field-border-color-hover)",
  borderRadius: "4px",
  menuBackground: "var(--swui-white)",
  iconColor: "var(--swui-text-primary-color)",
  iconColorDisabled: "var(--swui-text-disabled-color)",
  iconColorFocus: "var(--swui-white)",
  iconColorHover: "var(--swui-white)",
  itemBackground: "var(--swui-white)",
  itemBackgroundFocus: "var(--swui-primary-action-color-focus)",
  itemBackgroundHover: "var(--swui-primary-action-color-hover)",
  itemBackgroundDisabled: "var(--swui-primary-action-color-disabled)",
  itemBackgroundDisabledFocus: "disabledTextLight",
  itemLabelColor: "var(--swui-text-primary-color)",
  itemLabelColorDisabled: "var(--swui-text-disabled-color)",
  itemLabelColorFocus: "var(--swui-white)",
  itemLabelColorHover: "var(--swui-white)",
  itemTextColor: "var(--swui-text-primary-color-light)",
  itemTextColorDisabled: "var(--swui-text-disabled-color-light)",
  itemTextColorFocus: "var(--swui-white)",
  itemTextColorHover: "var(--swui-white)",
  itemHeight: "34px"
};
