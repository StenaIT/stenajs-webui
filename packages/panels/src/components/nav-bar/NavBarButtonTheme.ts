import { ThemeColorField } from "@stenajs-webui/core";
import {
  DepricatedButtonTheme,
  defaultFlatButtonTheme
} from "@stenajs-webui/elements";

export interface NavBarButtonTheme extends DepricatedButtonTheme {
  textColorSelected: ThemeColorField | string;
  textColorNotSelected: ThemeColorField | string;
}

export const defaultNavBarButtonTheme: NavBarButtonTheme = {
  ...defaultFlatButtonTheme,
  height: "50px",
  fontSize: "16px",
  fontWeight: "normal",
  textColorSelected: "navBarBgButtonText",
  textColorNotSelected: "navBarBgButtonTextFaded"
};
