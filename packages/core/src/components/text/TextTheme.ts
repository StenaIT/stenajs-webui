import { ThemeFontWeightField } from "../..";
import { ThemeColorField } from "../../theme/theme-types/ThemeColors";
import { ThemeFonts } from "../../theme/theme-types/ThemeFonts";
import { ThemeFontSizeField } from "../../theme/theme-types/ThemeFontSizes";

export interface TextTheme {
  color?: ThemeColorField;
  fontSize: ThemeFontSizeField;
  fontFamily: keyof ThemeFonts;
  fontWeightBold: ThemeFontWeightField;
  fontWeightNormal?: ThemeFontWeightField;
  fontWeightLight: ThemeFontWeightField;
}

export const defaultHeaderTextTheme: TextTheme = {
  fontSize: "huge",
  fontFamily: "primary",
  fontWeightBold: "bold",
  fontWeightLight: "light"
};

export const defaultSectionHeaderTextTheme: TextTheme = {
  fontSize: "large",
  fontFamily: "primary",
  fontWeightBold: "bold",
  fontWeightLight: "light"
};

export const defaultLargeTextTheme: TextTheme = {
  fontSize: "large",
  fontFamily: "primary",
  fontWeightBold: "bold",
  fontWeightLight: "light"
};

export const defaultSmallTextTheme: TextTheme = {
  fontSize: "small",
  fontFamily: "primary",
  fontWeightBold: "bold",
  fontWeightLight: "light"
};

export const defaultSmallerTextTheme: TextTheme = {
  fontSize: "smaller",
  fontFamily: "primary",
  fontWeightBold: "bold",
  fontWeightLight: "light"
};

export const defaultTinyTextTheme: TextTheme = {
  fontSize: "tiny",
  fontFamily: "primary",
  fontWeightBold: "bold",
  fontWeightLight: "light"
};
