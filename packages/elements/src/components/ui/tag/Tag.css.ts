import { createGlobalTheme, createTheme, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const globalTheme = createGlobalTheme(":root", {
  lhdsColors: {
    blue100: "#e1eefa",
    blue200: "#afd0f1",
    blue300: "#6ca9e6",
    blue400: "#3a8cdd",
    blue50: "#f2f8fd",
    blue500: "#2378cd",
    blue600: "#1a5a9a",
    blue700: "#18518a",
    blue800: "#143e62",
    blue900: "#0f304d",

    green100: "#d1efc1",
    green200: "#aee492",
    green300: "#8ad861",
    green400: "#6cce38",
    green50: "#f4fbf0",
    green500: "#60bd2f",
    green600: "#509e27",
    green700: "#407e1f",
    green800: "#305f18",
    green900: "#284f14",

    orange100: "#ffeac4",
    orange200: "#ffd589",
    orange300: "#ffc04e",
    orange400: "#ffb633",
    orange50: "#fff8eb",
    orange500: "#ffa400",
    orange600: "#eb9700",
    orange700: "#d88b00",
    orange800: "#b17200",
    orange900: "#895800",

    red100: "#ffdde4",
    red200: "#ff899f",
    red300: "#ff4e70",
    red400: "#f1002e",
    red50: "#fff1f4",
    red500: "#d70029",
    red600: "#b00022",
    red700: "#8a0019",
    red800: "#710015",
    red900: "#570010",

    turquoise100: "#daf8f4",
    turquoise200: "#b9f2e9",
    turquoise300: "#87e8da",
    turquoise400: "#46dcc6",
    turquoise50: "#eafbf9",
    turquoise500: "#28d2b9",
    turquoise600: "#24bda6",
    turquoise700: "#1c9280",
    turquoise800: "#156f62",
    turquoise900: "#125f53",

    ui100: "#fafafb",
    ui200: "#efeff2",
    ui300: "#e4e5e9",
    ui400: "#ced0d7",
    ui50: "#ffffff",
    ui500: "#989cab",
    ui600: "#5c6171",
    ui700: "#424551",
    ui800: "#282931",
    ui900: "#0d0e10",
  },
  text: {
    smaller: {
      fontSize: "1rem",
      lineHeight: "1.6rem",
    },
    small: {
      fontSize: "1.2rem",
      lineHeight: "1.6rem",
    },
    medium: {
      fontSize: "1.4rem",
      lineHeight: "1.6rem",
    },
    large: {
      fontSize: "1.6rem",
      lineHeight: "2.4rem",
    },
  },
  font: {
    primary: `"Stena Sans", "Open Sans", Arial, sans-serif`,
  },
  metrics: {
    indent: "8px",
    spacing: "8px",
    space: "8px",
  },
});

export const [tagStandardTheme, tagThemeVars] = createTheme({
  bgColor: globalTheme.lhdsColors.blue100,
  textColor: globalTheme.lhdsColors.blue800,
  fontSize: globalTheme.text.small.fontSize,
  lineHeight: globalTheme.text.small.lineHeight,
  fontWeight: "500",
  fontFamily: globalTheme.font.primary,
  letterSpacing: "0",
  height: "24px",
  borderRadius: "10rem",
  indent: globalTheme.metrics.indent,
});

export const tagClassName = recipe({
  base: {
    background: tagThemeVars.bgColor,
    color: tagThemeVars.textColor,
    fontFamily: tagThemeVars.fontFamily,
    fontSize: tagThemeVars.fontSize,
    fontWeight: tagThemeVars.fontWeight,
    boxSizing: "border-box",
    display: "inline-flex",
    flexDirection: "row",
    whiteSpace: "nowrap",
    borderRadius: tagThemeVars.borderRadius,
    minHeight: tagThemeVars.height,
    alignItems: "center",
    padding: `0 ${tagThemeVars.indent}`,
  },
  variants: {
    size: {
      medium: {},
      small: {
        vars: {
          [tagThemeVars.height]: "16px",
        },
      },
    },
    variant: {
      info: {
        vars: {
          [tagThemeVars.bgColor]: globalTheme.lhdsColors.blue100,
          [tagThemeVars.textColor]: globalTheme.lhdsColors.blue800,
        },
      },
      passive: {
        vars: {
          [tagThemeVars.bgColor]: globalTheme.lhdsColors.ui300,
          [tagThemeVars.textColor]: globalTheme.lhdsColors.ui900,
        },
      },
      success: {
        vars: {
          [tagThemeVars.bgColor]: globalTheme.lhdsColors.green100,
          [tagThemeVars.textColor]: globalTheme.lhdsColors.green900,
        },
      },
      warning: {
        vars: {
          [tagThemeVars.bgColor]: globalTheme.lhdsColors.orange100,
          [tagThemeVars.textColor]: globalTheme.lhdsColors.orange900,
        },
      },
      error: {
        vars: {
          [tagThemeVars.bgColor]: globalTheme.lhdsColors.red100,
          [tagThemeVars.textColor]: globalTheme.lhdsColors.red800,
        },
      },
    },
  },
  defaultVariants: {
    variant: "info",
    size: "medium",
  },
});

export const labelStyle = style({
  padding: `0 ${tagThemeVars.indent}`,
});
