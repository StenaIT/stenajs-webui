export interface ThemeColors {
  primaryText: string;
  primaryTextLight: string;
  primaryBg: string;
  primaryBgLight: string;
  primaryBgDark: string;
  disabledText: string;
  disabledTextLight: string;
  disabledBackground: string;
  interactionBgPrimary: string;
  white: string;
  separator: string;
  separatorLight: string;
  separatorHighlighted: string;
  successGreen: string;
  successGreenLight: string;
  errorText: string;
  errorTextLight: string;
  errorBgLight: string;
  errorBgDark: string;
  alertText: string;
  alertTextLight: string;
  info: string;
  infoLight: string;
  inputBorder: string;
  inputBorderFocused: string;
  inputBorderFocusedAlt: string;
  inputBorderFocusedLight: string;
  highlightBoxBg: string;
  highlightBoxBorder: string;
}

export type ThemeColorField = keyof ThemeColors;  // TODO Add CSS color type.
