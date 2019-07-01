import { create } from "@storybook/theming";

const color = {
  // Official color palette
  primary: "#3284de", // coral
  secondary: "#143e62", // ocean
  tertiary: "#FAFBFC",
  ancillary: "#22a699", // for code

  // Complimentary
  orange: "#FC521F",
  gold: "#FFAE00",
  green: "#66BF3C",
  seafoam: "#37D5D3",
  purple: "#6F2CAC",
  ultraviolet: "#2A0481",

  // Monochrome
  lightest: "#FFFFFF",
  lighter: "#F8F8F8",
  light: "#F3F3F3",
  mediumlight: "#EEEEEE",
  medium: "#DDDDDD",
  mediumdark: "#999999",
  dark: "#666666",
  darker: "#444444",
  darkest: "#333333",

  // For borders
  border: "rgba(0,0,0,.1)",

  // Status
  positive: "#66BF3C",
  negative: "#FF4400",
  warning: "#E69D00",

  defaultText: "#333333",
  inverseText: "#FFFFFF"
};

const background = {
  app: "#F6F9FC",
  content: color.lightest,
  hoverable: "rgba(0,0,0,.05)", // hover state for items in a list

  // Notification, error, and warning backgrounds
  positive: "#E1FFD4",
  negative: "#FEDED2",
  warning: "#FFF5CF"
};

const typography = {
  fonts: {
    base: [
      '"Open Sans"',
      '"Nunito Sans"',
      "-apple-system",
      '".SFNSText-Regular"',
      '"San Francisco"',
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Helvetica",
      "Arial",
      "sans-serif"
    ].join(", "),
    mono: [
      '"Menlo"',
      '"Operator Mono"',
      '"Fira Code Retina"',
      '"Fira Code"',
      '"FiraCode-Retina"',
      '"Andale Mono"',
      '"Lucida Console"',
      "Consolas",
      "Monaco",
      "monospace"
    ].join(", ")
  },
  weight: {
    regular: 400,
    bold: 700,
    black: 900
  },
  size: {
    s1: 12,
    s2: 14,
    s3: 16,
    m1: 20,
    m2: 24,
    m3: 28,
    l1: 32,
    l2: 40,
    l3: 48,
    code: 90
  }
};

export interface ThemeVars {
  base: "light" | "dark";

  colorPrimary?: string;
  colorSecondary?: string;

  // UI
  appBg?: string;
  appContentBg?: string;
  appBorderColor?: string;
  appBorderRadius?: number;

  // Typography
  fontBase?: string;
  fontCode?: string;

  // Text colors
  textColor?: string;
  textInverseColor?: string;

  // Toolbar default and active colors
  barTextColor?: string;
  barSelectedColor?: string;
  barBg?: string;

  // Form colors
  inputBg?: string;
  inputBorder?: string;
  inputTextColor?: string;
  inputBorderRadius?: number;

  brandTitle?: string;
  brandUrl?: string;
  brandImage?: string;
}

export type Color = typeof color;
export type Background = typeof background;
export type Typography = typeof typography;

export type TextSize = number | string;
export interface Brand {
  title: string | undefined;
  url: string | null | undefined;
  image: string | null | undefined;
}

export interface Theme {
  color: Color;
  background: Background;
  typography: Typography;

  input: {
    border: string;
    background: string;
    color: string;
    borderRadius: number;
  };

  // UI
  layoutMargin: number;
  appBorderColor: string;
  appBorderRadius: number;

  // Toolbar default/active colors
  barTextColor: string;
  barSelectedColor: string;
  barBg: string;

  brand: Brand;

  code: {
    [key: string]: string | object;
  };

  [key: string]: any;
}

const RawStenaTheme: ThemeVars = {
  base: "light",

  // Storybook-specific color palette
  colorPrimary: "#3284de", // coral
  colorSecondary: "#143e62", // ocean

  // UI
  appBg: background.app,
  appContentBg: color.lightest,
  appBorderColor: color.border,
  appBorderRadius: 4,

  // Fonts
  fontBase: typography.fonts.base,
  fontCode: typography.fonts.mono,

  // Text colors
  textColor: color.darkest,
  textInverseColor: color.lightest,

  // Toolbar default and active colors
  barTextColor: color.mediumdark,
  barSelectedColor: color.secondary,
  barBg: color.lightest,

  // Form colors
  inputBg: color.lightest,
  inputBorder: color.border,
  inputTextColor: color.darkest,
  inputBorderRadius: 4
};

export const StenaTheme = create(RawStenaTheme);
