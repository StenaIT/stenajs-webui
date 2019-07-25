import { Column, PartialTheme, ThemeProvider } from "@stenajs-webui/core";
import { StandardButton } from "@stenajs-webui/elements";
import { storiesOf } from "@storybook/react";
import * as React from "react";

export const customTheme: PartialTheme = {
  colors: {
    primaryText: "#1b2e47",
    primaryTextLight: "#bcbabd",
    primaryBg: "#F9F7F4",
    primaryBgLight: "#FEFEFE",
    primaryBgDark: "#226F81",
    interactionBgPrimary: "#29881d",
    disabledText: "#b6b6b6",
    disabledTextLight: "#dddddd",
    disabledBackground: "#F3F3F5",
    white: "#ffffff",
    separator: "#cccdcf",
    separatorLight: "#F2F3F5",
    separatorHighlighted: "#9391ff",
    successGreen: "#8bc34a",
    successGreenLight: "#94f78c",
    errorText: "#D05353",
    errorTextLight: "#ffbfc6",
    errorBgLight: "#ffbfc6",
    errorBgDark: "#a8171c",
    alertText: "#dbdb51",
    alertTextLight: "#edec8a",
    info: "#7a77c3",
    infoLight: "#e6e5ff",
    inputBorder: "#d2dadf",
    inputBorderFocused: "#605988",
    inputBorderFocusedAlt: "#C7C3D8",
    inputBorderFocusedLight: "#E1DEEC",
    highlightBoxBg: "#E8F4FA",
    highlightBoxBorder: "#7498AD"
  },
  metrics: {
    indent: 14,
    spacing: 14,
    space: 14
  },
  fontWeights: {
    bold: 600,
    standard: 300,
    light: 100
  },
  fonts: {
    primary: "Open Sans",
    buttons: "Open Sans",
    input: "Open Sans"
  },
  fontSizes: {
    huge: "22px",
    larger: "18px",
    large: "16px",
    normal: "14px",
    input: "13px",
    small: "12px",
    smaller: "11px",
    tiny: "9px"
  },
  shadows: {
    modal: "rgba(0, 0, 0, 0.2) 0px 0px 10px 4px;",
    box: "rgba(0, 0, 0, 0.15) 0 2px 4px 0;"
  }
};

const overridingTheme: PartialTheme = {
  colors: {
    interactionBgPrimary: "#a8171c"
  }
};

storiesOf("theme/ThemeContext", module)
  .add("standard theme", () => (
    <>
      <StandardButton label={"Button"} />
    </>
  ))
  .add("custom theme", () => (
    <>
      <ThemeProvider value={customTheme}>
        <StandardButton label={"Button"} />
      </ThemeProvider>
    </>
  ))
  .add("merged custom theme", () => (
    <Column
      alignItems={"flex-start"}
      height={"150px"}
      justifyContent={"space-between"}
    >
      <StandardButton label={"Default theme button"} />
      <ThemeProvider value={customTheme}>
        <StandardButton label={"Custom theme button"} />
        <ThemeProvider value={overridingTheme}>
          <StandardButton label={"Custom theme button with different color"} />
        </ThemeProvider>
      </ThemeProvider>
    </Column>
  ));
