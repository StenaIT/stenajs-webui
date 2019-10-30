import { Theme } from "../Theme";
import { defaultTheme } from "../DefaultTheme";

export enum Colors {
  UI1 = "#202326" /* Heading text */,
  UI2 = "#4c4f56" /* Normal text */,
  UI3 = "#919296" /* Disabled */,
  UI4 = "#d1d2d7" /* Lines & Borders */,
  UI5 = "#e4e5e9" /* Page background */,
  UI6 = "#f2f3f5" /*  */,
  UI7 = "#fbfbfc" /*  */,
  UI8 = "#ffffff" /* White */,
  UI10 = "#0c0c0c" /* Black */,
  Alert1 = "#e28b09" /*  */,
  Alert2 = "#ffbd42" /*  */,
  Alert3 = "#fbe0ad" /* Information & Highlight */,
  Alert4 = "#fdf2dd" /*  */,
  Sos1 = "#d05353" /* Error */,
  Sos2 = "#ffb5ac" /* Warning */,
  Sos3 = "#f1d8d5" /*  */,
  Sos4 = "#faebe9" /*  */,
  Lush1 = "#305e17" /*  */,
  Lush2 = "#60bd2f" /*  */,
  Lush3 = "#d8efcc" /*  */,
  Lush4 = "#f7fcf5" /*  */,
  Freight1 = "#143e62" /*  */,
  Freight2 = "#2378cd" /* Main blue */,
  Freight3 = "#e2edf7" /*  */,
  Freight4 = "#f3f7fb" /*  */,

  /* --- Project custom colors --- */

  UI3Alt = "#8c9196",
  Freight1Alt = "#1967b8" /* BookingSearch > Input background; UserProfile */,
  Freight1AltContrast = "#9cc3ed" /* BookingSearch > Input placeholder color */,
  Freight2Alt = "#5498E3" /* Dashboard > DateWrapper */,
  Freight2AltContrast = "#3494DD" /* Dashboard > Border color */,
  Night3 = "#3a4145",
  Night4 = "#535e63",
  Ocean2 = "#2e4662",
  Ocean3 = "#4a5d73",
  Lush2Alt = "rgb(174, 214, 145)" /* Disabled Lush2 buttons */
}

export const externalTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primaryText: Colors.UI2,
    primaryTextLight: Colors.UI3,
    primaryBg: Colors.UI5,
    primaryBgLight: Colors.UI6,
    primaryBgDark: Colors.UI4,
    navBarBg: "#2e4662",
    navBarBgButtonText: "#ffffff",
    navBarBgButtonTextFaded: "#b1bbc0",
    interactionBgPrimary: Colors.Freight2,
    disabledText: Colors.UI3,
    disabledTextLight: Colors.UI4,
    disabledBackground: Colors.UI5,
    white: Colors.UI8,
    separator: Colors.UI4,
    separatorLight: Colors.UI5,
    separatorHighlighted: Colors.UI3,
    successGreen: Colors.Lush2,
    successGreenLight: Colors.Lush3,
    errorText: Colors.Sos2,
    errorTextLight: Colors.Sos3,
    errorBgLight: Colors.Sos3,
    errorBgDark: Colors.Sos1,
    badgeBg: "#af4b4d",
    alertText: Colors.Alert2,
    alertTextLight: Colors.Alert2,
    info: Colors.Freight2,
    infoLight: Colors.Freight3,
    inputBorder: Colors.UI4,
    inputBorderFocused: Colors.Freight2,
    inputBorderFocusedAlt: Colors.Freight2Alt,
    inputBorderFocusedLight: Colors.Freight3,
    highlightBoxBg: "#E8F4FA",
    highlightBoxBorder: "#7498AD"
  },
  metrics: {
    indent: 10,
    spacing: 10,
    space: 10
  }
};
