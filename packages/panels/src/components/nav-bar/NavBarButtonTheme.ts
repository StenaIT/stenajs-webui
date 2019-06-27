import { ThemeColorField } from "@stenajs-webui/core";
import { ButtonTheme, defaultFlatButtonTheme } from "@stenajs-webui/elements";

export interface NavBarButtonTheme extends ButtonTheme {
  textColorSelected: ThemeColorField | string;
  textColorNotSelected: ThemeColorField | string;
}

export const defaultNavBarButtonTheme: NavBarButtonTheme = {
  ...defaultFlatButtonTheme,
  height: "50px",
  textColorSelected: "navBarBgButtonText",
  textColorNotSelected: "navBarBgButtonTextFaded"
};
