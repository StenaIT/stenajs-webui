import { ThemeColorField } from "@stenajs-webui/core";

export interface NavBarTheme {
  height: string;
  backgroundColor: ThemeColorField | string;
}

export const defaultNavBarTheme: NavBarTheme = {
  height: "50px",
  backgroundColor: "navBarBg"
};
