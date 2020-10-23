export interface ActionMenuTheme {
  borderColor?: string;
  borderColorFocus?: string;
  borderRadius?: string;
  menuBackground?: string;
  iconColor: string;
  iconColorDisabled: string;
  iconColorFocus: string;
  iconColorHover: string;
  itemBackground?: string;
  itemBackgroundDisabled?: string;
  itemBackgroundDisabledFocus?: string;
  itemBackgroundFocus?: string;
  itemBackgroundHover?: string;
  itemLabelColor?: string;
  itemLabelColorDisabled?: string;
  itemLabelColorFocus?: string;
  itemLabelColorHover?: string;
  itemTextColor?: string;
  itemTextColorDisabled?: string;
  itemTextColorFocus?: string;
  itemTextColorHover?: string;
  itemHeight: string;
}

export const defaultActionMenuTheme: ActionMenuTheme = {
  borderColor: "var(--swui-field-border-color)",
  borderColorFocus: "var(--swui-field-border-color-hover)",
  borderRadius: "4px",
  menuBackground: "var(--swui-white)",
  iconColor: "var(--swui-text-primary-color)",
  iconColorDisabled: "var(--swui-text-disabled-color)",
  iconColorFocus: "var(--swui-text-primary-color)",
  iconColorHover: "var(--swui-text-primary-color)",
  itemBackground: "var(--swui-white)",
  itemBackgroundFocus: "var(--swui-primary-action-color-focus-light)",
  itemBackgroundHover: "var(--swui-primary-action-color-hover-light)",
  itemBackgroundDisabled: "var(--swui-white)",
  itemBackgroundDisabledFocus: "var(--swui-text-disabled-color-light)",
  itemLabelColor: "var(--swui-text-primary-color)",
  itemLabelColorDisabled: "var(--swui-text-disabled-color)",
  itemLabelColorFocus: "var(--swui-text-primary-color)",
  itemLabelColorHover: "var(--swui-text-primary-color)",
  itemTextColor: "var(--swui-text-primary-color-light)",
  itemTextColorDisabled: "var(--swui-text-disabled-color-light)",
  itemTextColorFocus: "var(--swui-text-primary-color-light)",
  itemTextColorHover: "var(--swui-text-primary-color-light)",
  itemHeight: "34px",
};
