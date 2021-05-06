import { OptionTypeBase } from "react-select/src/types";
import { SelectTheme } from "../SelectTheme";
import { StylesConfig } from "react-select";

const resolveOptionBackgroundColor = (
  colors: SelectTheme["menu"],
  isDisabled: boolean,
  isSelected: boolean,
  isFocused: boolean
): string | undefined => {
  if (isDisabled) {
    return colors.disabledBackgroundColor;
  } else if (isSelected && isFocused) {
    return colors.selectedItemHoverBackgroundColor;
  } else if (isSelected) {
    return colors.selectedItemBackgroundColor;
  } else if (isFocused) {
    return colors.hoverBackgroundColor;
  } else {
    return undefined;
  }
};

const resolveOptionColor = (
  colors: SelectTheme["menu"],
  isDisabled: boolean,
  isSelected: boolean,
  isFocused: boolean
): string | undefined => {
  if (isDisabled) {
    return colors.disabledTextColor;
  } else if (isSelected && isFocused) {
    return colors.selectedItemHoverTextColor;
  } else if (isSelected) {
    return colors.selectedItemTextColor;
  } else if (isFocused) {
    return colors.hoverTextColor;
  } else {
    return undefined;
  }
};

export const createStylesFromTheme = <
  OptionType extends OptionTypeBase,
  IsMulti extends boolean
>({
  menu,
  menuPortal,
  input,
  multiSelect,
  clearButtonColor,
  arrowColor,
  loadingIndicator,
}: SelectTheme): StylesConfig<OptionType, IsMulti> => ({
  option: (base, { isDisabled, isFocused, isSelected }) => ({
    ...base,
    fontFamily: input.fontFamily,
    fontSize: input.fontSize,
    backgroundColor: resolveOptionBackgroundColor(
      menu,
      isDisabled,
      isSelected,
      isFocused
    ),
    color: resolveOptionColor(menu, isDisabled, isSelected, isFocused),
    cursor: isDisabled ? "not-allowed" : "default",
    whiteSpace: menu.whiteSpace || base.whiteSpace,
    ":active": {
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? menu.selectedItemActiveBackgroundColor
        : menu.activeBackgroundColor,
      color: isDisabled
        ? undefined
        : isSelected
        ? menu.selectedItemActiveTextColor
        : menu.activeTextColor,
    },
  }),
  control: (base, { isFocused, isDisabled }) => ({
    ...base,
    // none of react-selects styles are passed to <View />
    fontFamily: input.fontFamily,
    fontSize: input.fontSize,
    minHeight: input.minHeight,
    backgroundColor: isDisabled
      ? input.disabledBackgroundColor
      : input.backgroundColor,
    borderRadius: input.borderRadius,
    border: isFocused ? input.borderFocused : input.border,
    borderColor: isFocused ? input.borderColorFocused : input.borderColor,
    boxShadow: isFocused ? input.boxShadowFocused : undefined,
    "&:hover": {
      border: input.borderFocused,
      borderColor: input.borderColorFocused,
    },
  }),
  singleValue: (base) => ({
    ...base,
    fontFamily: input.fontFamily,
    fontSize: input.fontSize,
    color: input.textColor,
  }),
  noOptionsMessage: (base) => ({
    ...base,
    fontFamily: input.fontFamily,
    fontSize: input.fontSize,
  }),
  input: (base) => ({
    ...base,
    fontFamily: input.fontFamily,
    fontSize: input.fontSize,
    color: input.textColor,
  }),
  groupHeading: (base) => ({
    ...base,
    fontFamily: input.fontFamily,
  }),
  multiValueLabel: (base) => ({
    ...base,
    backgroundColor: multiSelect.backgroundColor,
    color: multiSelect.textColor,
    fontFamily: input.fontFamily,
    fontSize: "12px",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: "5px",
    color: clearButtonColor.standard,
    "&:hover": {
      color: clearButtonColor.hover,
    },
    cursor: "pointer",
  }),
  placeholder: (base) => ({
    ...base,
    fontFamily: input.fontFamily,
    fontSize: input.fontSize,
    color: input.placeholderColor,
  }),
  container: (base) => ({
    ...base,
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 8px",
  }),
  dropdownIndicator: (base, { isFocused }) => ({
    ...base,
    padding: "5px",
    color: isFocused ? arrowColor.focused.standard : arrowColor.closed.standard,
    "&:hover": {
      color: isFocused ? arrowColor.focused.hover : arrowColor.closed.hover,
    },
    svg: {
      width: 14,
      height: 14,
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: menu.backgroundColor,
    color: menu.textColor,
    minWidth: menu.minWidth || base.minWidth,
    zIndex: menu.zIndex,
    width: menu.width || base.width,
    border: input.borderFocused,
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: menuPortal.zIndex,
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    backgroundColor: multiSelect.removeButtonBackgroundColor,
    ":hover": {
      color: multiSelect.removeButtonHoverTextColor,
      backgroundColor: multiSelect.removeButtonHoverBackgroundColor,
    },
    color: multiSelect.removeButtonTextColor,
    borderRadius: "50%",
    width: 16,
    height: 16,
    padding: 0,
    margin: 3,
    marginTop: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: multiSelect.backgroundColor,
    color: multiSelect.textColor,
    fontFamily: input.fontFamily,
    fontSize: "12px",
    alignItems: "center",
    margin: 0,
    marginRight: 2,
  }),
  loadingMessage: (base) => ({
    ...base,
    color: loadingIndicator.textColor,
    fontFamily: input.fontFamily,
    fontSize: input.fontSize,
  }),
});
