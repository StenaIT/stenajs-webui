import { ThemeColorField } from "@stenajs-webui/core";

export interface ChipTheme {
  background: ThemeColorField | string;
  backgroundHover: ThemeColorField | string;
  iconColor: ThemeColorField | string;
  iconColorHover: ThemeColorField | string;
  removeIconBackgroundHover: ThemeColorField | string;
  textColor: ThemeColorField | string;
  textColorHover: ThemeColorField | string;
  borderRadius: string;
  height: string;
}

export const defaultChipTheme: ChipTheme = {
  background: "interactionBgPrimary",
  backgroundHover: "interactionBgHover",
  iconColor: "primaryTextLight",
  iconColorHover: "white",
  removeIconBackgroundHover: "interactionBgHover",
  textColor: "white",
  textColorHover: "primaryBgLight",
  borderRadius: "3px",
  height: "24px"
};
