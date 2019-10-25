export interface SelectThemeColors extends Record<string, string> {
  menuDisabledTextColor: string;
  clearButtonColorStandard: string;
  inputBorderColorFocused: string;
  inputBackgroundColor: string;
  inputDisabledBackgroundColor: string;
  multiSelectTextColor: string;
  menuSelectedItemTextColor: string;
  multiSelectBackgroundColor: string;
  menuDisabledBackgroundColor: string;
  loadingIndicatorTextColor: string;
  inputBorderFocused: string;
  menuSelectedItemHoverBackgroundColor: string;
  arrowHoverClosed: string;
  clearButtonColorHover: string;
  menuTextColor: string;
  multiSelectRemoveButtonBackgroundColor: string;
  menuSelectedItemBackgroundColor: string;
  inputTextColor: string;
  arrowStandardClosed: string;
  inputPlaceholderColor: string;
  arrowHoverFocused: string;
  menuSelectedItemHoverTextColor: string;
  multiSelectRemoveButtonHoverBackgroundColor: string;
  arrowStandardFocused: string;
  inputBorder: string;
  inputBorderColor: string;
  multiSelectRemoveButtonHoverTextColor: string;
  menuHoverBackgroundColor: string;
  menuBackgroundColor: string;
  multiSelectRemoveButtonTextColor: string;
  menuHoverTextColor: string;
}

export interface SelectThemeFields {
  colors: SelectThemeColors;
  fontSizes: { input: string };
  fonts: { input: string };
}
