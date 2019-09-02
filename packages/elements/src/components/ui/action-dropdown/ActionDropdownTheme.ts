import { ThemeColorField } from "@stenajs-webui/core";

export interface ActionDropdownTheme {
  background?: ThemeColorField | string;
  backgroundDisabled?: ThemeColorField | string;
  textColor?: ThemeColorField | string;
  textColorDisabled?: ThemeColorField | string;
  borderColor?: ThemeColorField | string;
  borderColorFocus?: ThemeColorField | string;
  borderRadius?: string;
  dropdownBackground?: ThemeColorField | string;
  expandIconColor: ThemeColorField | string;
  expandIconColorDisabled: ThemeColorField | string;
  expandIconColorFocus: ThemeColorField | string;
  iconColor: ThemeColorField | string;
  iconColorDisabled: ThemeColorField | string;
  iconColorFocus: ThemeColorField | string;
  itemBackground?: ThemeColorField | string;
  itemBackgroundDisabled?: ThemeColorField | string;
  itemBackgroundFocus?: ThemeColorField | string;
  itemLabelColor?: ThemeColorField | string;
  itemLabelColorDisabled?: ThemeColorField | string;
  itemLabelColorFocus?: ThemeColorField | string;
  itemTextColor?: ThemeColorField | string;
  itemTextColorDisabled?: ThemeColorField | string;
  itemTextColorFocus?: ThemeColorField | string;
  height: string;
  itemHeight: string;
}

export const defaultActionDropdownTheme: ActionDropdownTheme = {
  background: "white",
  backgroundDisabled: "disabledBackground",
  textColor: "primaryText",
  textColorDisabled: "disabledText",
  borderColor: "inputBorder",
  borderColorFocus: "inputBorderFocused",
  borderRadius: "4px",
  dropdownBackground: "white",
  expandIconColor: "disabledText",
  expandIconColorDisabled: "disabledText",
  expandIconColorFocus: "interactionBgPrimary",
  iconColor: "primaryText",
  iconColorDisabled: "disabledText",
  iconColorFocus: "white",
  itemBackground: "white",
  itemBackgroundFocus: "interactionBgPrimary",
  itemBackgroundDisabled: "disabledBackground",
  itemLabelColor: "primaryText",
  itemLabelColorDisabled: "disabledText",
  itemLabelColorFocus: "white",
  itemTextColor: "primaryTextLight",
  itemTextColorDisabled: "disabledTextLight",
  itemTextColorFocus: "white",
  height: "34px",
  itemHeight: "34px"
};
