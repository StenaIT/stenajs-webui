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
  borderColor: "inputBorder",
  borderColorFocus: "inputBorderFocused",
  borderRadius: "4px",
  menuBackground: "white",
  iconColor: "primaryText",
  iconColorDisabled: "disabledText",
  iconColorFocus: "white",
  iconColorHover: "white",
  itemBackground: "white",
  itemBackgroundFocus: "interactionBgPrimary",
  itemBackgroundHover: "interactionBgHover",
  itemBackgroundDisabled: "disabledBackground",
  itemBackgroundDisabledFocus: "disabledTextLight",
  itemLabelColor: "primaryText",
  itemLabelColorDisabled: "disabledText",
  itemLabelColorFocus: "white",
  itemLabelColorHover: "white",
  itemTextColor: "primaryTextLight",
  itemTextColorDisabled: "disabledTextLight",
  itemTextColorFocus: "white",
  itemTextColorHover: "white",
  itemHeight: "34px"
};
