import { createTheme } from "@vanilla-extract/css";
import { globalTheme, tagThemeVars } from "../Tag.css";

export const customTheme = createTheme(tagThemeVars, {
  fontSize: "1.4rem",
  bgColor: "#F4F4F4",
  textColor: "#123D66",
  borderRadius: "8px",
  indent: "4px",
  lineHeight: globalTheme.text.small.lineHeight,
  fontWeight: "500",
  fontFamily: globalTheme.font.primary,
  letterSpacing: "0",
  height: "24px",
});
