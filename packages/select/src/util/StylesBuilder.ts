import { StylesConfig } from "react-select/lib/styles";
import { SelectThemeColors, SelectThemeFields } from "../SelectColors";
import { SelectTheme } from "../SelectTheme";

const resolveOptionBackgroundColor = (
  colors: SelectThemeColors,
  isDisabled: boolean,
  isSelected: boolean,
  isFocused: boolean
): string | undefined => {
  if (isDisabled) {
    return colors.menuDisabledBackgroundColor;
  } else if (isSelected && isFocused) {
    return colors.menuSelectedItemHoverBackgroundColor;
  } else if (isSelected) {
    return colors.menuSelectedItemBackgroundColor;
  } else if (isFocused) {
    return colors.menuHoverBackgroundColor;
  } else {
    return undefined;
  }
};

const resolveOptionColor = (
  colors: SelectThemeColors,
  isDisabled: boolean,
  isSelected: boolean,
  isFocused: boolean
): string | undefined => {
  if (isDisabled) {
    return colors.menuDisabledTextColor;
  } else if (isSelected && isFocused) {
    return colors.menuSelectedItemHoverTextColor;
  } else if (isSelected) {
    return colors.menuSelectedItemTextColor;
  } else if (isFocused) {
    return colors.menuHoverTextColor;
  } else {
    return undefined;
  }
};

export const createStylesFromTheme = (
  selectTheme: SelectTheme,
  { colors, fonts, fontSizes }: SelectThemeFields
): StylesConfig => ({
  option: (base, { isDisabled, isFocused, isSelected }) => ({
    ...base,
    fontFamily: fonts.input,
    fontSize: fontSizes.input,
    backgroundColor: resolveOptionBackgroundColor(
      colors,
      isDisabled,
      isSelected,
      isFocused
    ),
    color: resolveOptionColor(colors, isDisabled, isSelected, isFocused),
    cursor: isDisabled ? "not-allowed" : "default",
    whiteSpace: selectTheme.menu.whiteSpace || base.whiteSpace
  }),
  control: (base, { isFocused, isDisabled }) => ({
    ...base,
    // none of react-selects styles are passed to <View />
    fontFamily: fonts.input,
    fontSize: fontSizes.input,
    minHeight: selectTheme.input.minHeight,
    height: selectTheme.input.height,
    backgroundColor: isDisabled
      ? colors.inputDisabledBackgroundColor
      : colors.inputBackgroundColor,
    boxShadow: "0",
    borderRadius: selectTheme.input.borderRadius,
    border: isFocused ? colors.inputBorderFocused : colors.inputBorder,
    borderColor: isFocused
      ? colors.inputBorderColorFocused
      : colors.inputBorderColor,
    "&:hover": {
      border: isFocused ? colors.inputBorderFocused : colors.inputBorder,
      borderColor: isFocused
        ? colors.inputBorderColorFocused
        : colors.inputBorderColor
    }
  }),
  singleValue: base => ({
    ...base,
    fontFamily: fonts.input,
    fontSize: fontSizes.input,
    color: colors.inputTextColor
  }),
  noOptionsMessage: base => ({
    ...base,
    fontFamily: fonts.input,
    fontSize: fontSizes.input
  }),
  input: base => ({
    ...base,
    fontFamily: fonts.input,
    fontSize: fontSizes.input,
    color: colors.inputTextColor
  }),
  multiValueLabel: base => ({
    ...base,
    backgroundColor: colors.multiSelectBackgroundColor,
    color: colors.multiSelectTextColor,
    fontFamily: fonts.input,
    fontSize: fontSizes.input,
    paddingTop: "2px"
  }),
  indicatorSeparator: base => ({
    ...base,
    display: "none"
  }),
  clearIndicator: base => ({
    ...base,
    padding: "6px",
    color: colors.clearButtonColorStandard,
    "&:hover": {
      color: colors.clearButtonColorHover
    }
  }),
  placeholder: base => ({
    ...base,
    fontFamily: fonts.input,
    fontSize: fontSizes.input,
    color: colors.inputPlaceholderColor
  }),
  container: base => ({
    ...base
  }),
  dropdownIndicator: (base, { isFocused }) => ({
    ...base,
    padding: "6px",
    color: isFocused ? colors.arrowStandardFocused : colors.arrowStandardClosed,
    "&:hover": {
      color: isFocused ? colors.arrowHoverFocused : colors.arrowHoverClosed
    }
  }),
  menu: base => ({
    ...base,
    backgroundColor: colors.menuBackgroundColor,
    color: colors.menuTextColor,
    minWidth: selectTheme.menu.minWidth || base.minWidth,
    zIndex: selectTheme.menu.zIndex,
    width: selectTheme.menu.width || base.width
  }),
  menuPortal: base => ({
    ...base,
    zIndex: selectTheme.menuPortal.zIndex
  }),
  multiValueRemove: styles => ({
    ...styles,
    backgroundColor: colors.multiSelectRemoveButtonBackgroundColor,
    ":hover": {
      color: colors.multiSelectRemoveButtonHoverTextColor,
      backgroundColor: colors.multiSelectRemoveButtonHoverBackgroundColor
    },
    color: colors.multiSelectRemoveButtonTextColor,
    margin: "3px"
  }),
  multiValue: base => ({
    ...base,
    backgroundColor: colors.multiSelectBackgroundColor,
    color: colors.multiSelectTextColor
  }),
  loadingMessage: base => ({
    ...base,
    color: colors.loadingIndicatorTextColor,
    fontFamily: fonts.input,
    fontSize: fontSizes.input
  })
});
