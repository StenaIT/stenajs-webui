import { ThemeColorField } from "@stenajs-webui/core";

export interface ActionDropdownTheme {
  background?: ThemeColorField | string;
  backgroundDisabled?: ThemeColorField | string;
  textColor?: ThemeColorField | string;
  textColorDisabled?: ThemeColorField | string;
  borderColor?: ThemeColorField | string;
  borderColorHover?: ThemeColorField | string;
  borderRadius?: string;
  dropdownBackground?: ThemeColorField | string;
  expandIconColor: ThemeColorField | string;
  expandIconColorDisabled: ThemeColorField | string;
  expandIconColorHover: ThemeColorField | string;
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
  backgroundDisabled: "disabledBackground",
  textColor: "primaryText",
  textColorDisabled: "disabledText",
  borderColor: "inputBorder",
  borderColorHover: "inputBorderFocused",
  borderRadius: "4px",
  dropdownBackground: "white",
  expandIconColor: "disabledText",
  expandIconColorDisabled: "disabledText",
  expandIconColorHover: "interactionBgPrimary",
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
