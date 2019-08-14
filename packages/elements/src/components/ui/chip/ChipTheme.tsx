import { ThemeColorField } from "@stenajs-webui/core";

export interface ChipTheme {
  background: ThemeColorField | string;
  backgroundHover: ThemeColorField | string;
  iconColor: ThemeColorField | string;
  iconColorHover: ThemeColorField | string;
  removeIconBackground: ThemeColorField | string;
  removeIconBackgroundHover: ThemeColorField | string;
  borderRadius: string;
  height: string;
}

export const defaultChipTheme: ChipTheme = {
  background: "primaryBg",
  backgroundHover: "primaryBgLight",
  iconColor: "disabledText",
  iconColorHover: "primaryText",
  removeIconBackground: "primaryBg",
  removeIconBackgroundHover: "primaryBgDark",
  borderRadius: "3px",
  height: "24px"
};
