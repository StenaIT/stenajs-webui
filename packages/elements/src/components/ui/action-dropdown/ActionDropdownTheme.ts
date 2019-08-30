import { ThemeColorField } from "@stenajs-webui/core";

export interface ActionDropdownTheme {
  background?: ThemeColorField | string;
  textColor?: ThemeColorField | string;
  borderColor?: ThemeColorField | string;
  borderColorHover?: ThemeColorField | string;
  borderRadius?: string;
  dropdownBackground?: ThemeColorField | string;
  iconColor: ThemeColorField | string;
  iconColorDisabled: ThemeColorField | string;
  iconColorHover: ThemeColorField | string;
  itemBackground?: ThemeColorField | string;
  itemBackgroundDisabled?: ThemeColorField | string;
  itemBackgroundHover?: ThemeColorField | string;
  itemLabelColor?: ThemeColorField | string;
  itemLabelColorDisabled?: ThemeColorField | string;
  itemLabelColorHover?: ThemeColorField | string;
  itemTextColor?: ThemeColorField | string;
  itemTextColorDisabled?: ThemeColorField | string;
  itemTextColorHover?: ThemeColorField | string;
  height: string;
  itemHeight: string;
}

export const defaultActionDropdownTheme: ActionDropdownTheme = {
  background: "white",
  textColor: "primaryText",
  borderColor: "inputBorder",
  borderColorHover: "inputBorderFocused",
  borderRadius: "4px",
  dropdownBackground: "white",
  iconColor: "primaryText",
  iconColorDisabled: "disabledText",
  iconColorHover: "white",
  itemBackground: "white",
  itemBackgroundHover: "interactionBgPrimary",
  itemBackgroundDisabled: "disabledBackground",
  itemLabelColor: "primaryText",
  itemLabelColorDisabled: "disabledText",
  itemLabelColorHover: "white",
  itemTextColor: "primaryTextLight",
  itemTextColorDisabled: "disabledTextLight",
  itemTextColorHover: "white",
  height: "34px",
  itemHeight: "34px"
};
