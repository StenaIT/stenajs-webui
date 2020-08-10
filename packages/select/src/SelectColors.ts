export interface SelectThemeColors extends Record<string, string> {
  arrowHoverClosed: string;
  arrowHoverFocused: string;
  arrowStandardClosed: string;
  arrowStandardFocused: string;
  clearButtonColorHover: string;
  clearButtonColorStandard: string;
  inputBackgroundColor: string;
  inputBorder: string;
  inputBorderColor: string;
  inputBorderColorFocused: string;
  inputBorderFocused: string;
  inputDisabledBackgroundColor: string;
  inputPlaceholderColor: string;
  inputTextColor: string;
  inputBoxShadowFocused: string;
  loadingIndicatorTextColor: string;
  menuActiveBackgroundColor: string;
  menuActiveTextColor: string;
  menuBackgroundColor: string;
  menuDisabledBackgroundColor: string;
  menuDisabledTextColor: string;
  menuHoverBackgroundColor: string;
  menuHoverTextColor: string;
  menuSelectedItemActiveBackgroundColor: string;
  menuSelectedItemActiveTextColor: string;
  menuSelectedItemBackgroundColor: string;
  menuSelectedItemHoverBackgroundColor: string;
  menuSelectedItemHoverTextColor: string;
  menuSelectedItemTextColor: string;
  menuTextColor: string;
  multiSelectBackgroundColor: string;
  multiSelectRemoveButtonBackgroundColor: string;
  multiSelectRemoveButtonHoverBackgroundColor: string;
  multiSelectRemoveButtonHoverTextColor: string;
  multiSelectRemoveButtonTextColor: string;
  multiSelectTextColor: string;
}

export interface SelectThemeFields {
  colors: SelectThemeColors;
  fontSizes: { input: string };
  fonts: { input: string };
}
