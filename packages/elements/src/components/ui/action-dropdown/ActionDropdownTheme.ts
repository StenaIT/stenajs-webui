import { ThemeColorField } from "@stenajs-webui/core";

export interface ActionDropdownTheme {
  background?: ThemeColorField | string;
  textColor?: ThemeColorField | string;
  borderColor?: ThemeColorField | string;
  borderRadius?: string;
  dropdownBackground?: ThemeColorField | string;
  itemBackground?: ThemeColorField | string;
  itemBackgroundHover?: ThemeColorField | string;
  itemLabelColor?: ThemeColorField | string;
  itemLabelColorHover?: ThemeColorField | string;
  itemTextColor?: ThemeColorField | string;
  itemTextColorHover?: ThemeColorField | string;
  height: string;
  itemHeight: string;
}

export const defaultActionDropdownTheme: ActionDropdownTheme = {
  background: "white",
  textColor: "primaryText",
  borderColor: "inputBorder",
  borderRadius: "4px",
  dropdownBackground: "white",
  itemBackground: undefined,
  itemBackgroundHover: "disabledBackground",
  itemLabelColor: "primaryText",
  itemLabelColorHover: undefined,
  itemTextColor: "primaryTextLight",
  itemTextColorHover: undefined,
  height: "34px",
  itemHeight: "34px"
};
