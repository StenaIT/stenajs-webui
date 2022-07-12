import { StylesConfig } from "react-select";
import { defaultSelectTheme, SelectTheme } from "../SelectTheme";
import { GroupBase } from "react-select/dist/declarations/src/types";

export type SelectVariant = "standard" | "warning" | "error" | "success";

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

const resolveInputBackgroundColor = (
  colors: SelectTheme["input"],
  isDisabled: boolean,
  isFocused: boolean,
  variant: SelectVariant | undefined
): string | undefined => {
  if (isDisabled) {
    return colors.disabledBackgroundColor;
  } else if (isFocused) {
    return colors.backgroundColor;
  } else if (variant === "warning") {
    return colors.warningBackgroundColor;
  } else if (variant === "success") {
    return colors.successBackgroundColor;
  } else if (variant === "error") {
    return colors.errorBackgroundColor;
  } else {
    return colors.backgroundColor;
  }
};

const resolveInputBorderColor = (
  colors: SelectTheme["input"],
  isDisabled: boolean,
  isFocused: boolean,
  isHovered: boolean,
  variant: SelectVariant | undefined
): string | undefined => {
  if (isDisabled) {
    return colors.borderColor;
  } else if (isFocused) {
    return colors.borderColorFocused;
  } else if (variant === "warning") {
    return colors.warningBorderColor;
  } else if (variant === "success") {
    return colors.successBorderColor;
  } else if (variant === "error") {
    return colors.errorBorderColor;
  } else if (isHovered) {
    return colors.borderColorFocused;
  } else {
    return colors.borderColor;
  }
};

/**
 * @deprecated
 */
export const createStylesFromTheme = <
  OptionType,
  IsMulti extends boolean,
  TGroup extends GroupBase<OptionType> = GroupBase<OptionType>
>(
  {
    menu,
    menuPortal,
    input,
    multiSelect,
    clearButtonColor,
    arrowColor,
    groupHeading,
    loadingIndicator,
  }: SelectTheme,
  variant: SelectVariant | undefined
): StylesConfig<OptionType, IsMulti, TGroup> => ({
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
  control: (base, { isFocused, isDisabled, menuIsOpen }) => ({
    ...base,
    // none of react-selects styles are passed to <View />
    fontFamily: input.fontFamily,
    fontSize: input.fontSize,
    minHeight: input.minHeight,
    backgroundColor: resolveInputBackgroundColor(
      input,
      isDisabled,
      isFocused,
      variant
    ),
    borderRadius: input.borderRadius,
    border: input.border,
    "--swui-select-border-color": resolveInputBorderColor(
      input,
      isDisabled,
      isFocused || menuIsOpen,
      false,
      variant
    ),
    boxShadow: isFocused ? input.boxShadowFocused : undefined,
    "&:hover": {
      "--swui-select-border-color": resolveInputBorderColor(
        input,
        false,
        isFocused || menuIsOpen,
        true,
        variant
      ),
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
    fontSize: groupHeading.fontSize,
    lineHeight: groupHeading.lineHeight,
    fontWeight: groupHeading.fontWeight as any,
    color: groupHeading.color,
    letterSpacing: groupHeading.letterSpacing,
  }),
  multiValueLabel: (base) => ({
    ...base,
    backgroundColor: multiSelect.backgroundColor,
    color: multiSelect.textColor,
    fontFamily: input.fontFamily,
    fontSize: groupHeading.fontSize,
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
    border: input.border,
    borderColor: input.borderColorFocused,
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
    fontSize: groupHeading.fontSize,
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

export const createStylesFromVariant = <
  OptionType,
  IsMulti extends boolean,
  TGroup extends GroupBase<OptionType> = GroupBase<OptionType>
>(
  variant: SelectVariant
): StylesConfig<OptionType, IsMulti, TGroup> =>
  createStylesFromTheme(defaultSelectTheme, variant);
