import { StylesConfig } from "react-select/lib/styles";
import { SelectTheme } from "../SelectTheme";

export const createStylesFromTheme = (
  selectTheme: SelectTheme
): StylesConfig => ({
  option: (base, { isDisabled, isFocused, isSelected }) => ({
    ...base,
    fontFamily: selectTheme.input.fontFamily,
    fontSize: selectTheme.input.fontSize,
    backgroundColor: isDisabled
      ? selectTheme.menu.disabledBackgroundColor
      : isSelected
      ? selectTheme.menu.selectedItemBackgroundColor
      : isFocused
      ? selectTheme.menu.hoverBackgroundColor
      : undefined,
    color: isDisabled
      ? selectTheme.menu.disabledTextColor
      : isSelected
      ? selectTheme.menu.selectedItemTextColor
      : isFocused
      ? selectTheme.menu.hoverTextColor
      : undefined,
    cursor: isDisabled ? "not-allowed" : "default",
    whiteSpace: selectTheme.menu.whiteSpace || base.whiteSpace
  }),
  control: (base, { isFocused, isDisabled }) => ({
    ...base,
    // none of react-selects styles are passed to <View />
    fontFamily: selectTheme.input.fontFamily,
    fontSize: selectTheme.input.fontSize,
    minHeight: selectTheme.input.minHeight,
    height: selectTheme.input.height,
    backgroundColor: isDisabled
      ? selectTheme.input.disabledBackgroundColor
      : selectTheme.input.backgroundColor,
    boxShadow: "0",
    borderRadius: selectTheme.input.borderRadius,
    border: isFocused
      ? selectTheme.input.borderFocused
      : selectTheme.input.border,
    borderColor: isFocused
      ? selectTheme.input.borderColorFocused
      : selectTheme.input.borderColor,
    "&:hover": {
      border: isFocused
        ? selectTheme.input.borderFocused
        : selectTheme.input.border,
      borderColor: isFocused
        ? selectTheme.input.borderColorFocused
        : selectTheme.input.borderColor
    }
  }),
  singleValue: base => ({
    ...base,
    fontFamily: selectTheme.input.fontFamily,
    fontSize: selectTheme.input.fontSize,
    color: selectTheme.input.textColor
  }),
  noOptionsMessage: base => ({
    ...base,
    fontFamily: selectTheme.input.fontFamily,
    fontSize: selectTheme.input.fontSize
  }),
  input: base => ({
    ...base,
    fontFamily: selectTheme.input.fontFamily,
    fontSize: selectTheme.input.fontSize,
    color: selectTheme.input.textColor
  }),
  multiValueLabel: base => ({
    ...base,
    paddingTop: "2px",
    fontFamily: selectTheme.input.fontFamily,
    fontSize: selectTheme.input.fontSize,
    color: selectTheme.multiSelect.color,
    backgroundColor: selectTheme.multiSelect.backgroundColor
  }),
  indicatorSeparator: base => ({
    ...base,
    display: "none"
  }),
  clearIndicator: base => ({
    ...base,
    padding: "6px",
    color: selectTheme.clearButtonColor.standard,
    "&:hover": {
      color: selectTheme.clearButtonColor.hover
    }
  }),
  placeholder: base => ({
    ...base,
    fontFamily: selectTheme.input.fontFamily,
    fontSize: selectTheme.input.fontSize,
    color: selectTheme.input.placeholderColor
  }),
  container: base => ({
    ...base
  }),
  dropdownIndicator: (base, { isFocused }) => ({
    ...base,
    padding: "6px",
    color: isFocused
      ? selectTheme.arrowColor.focused.standard
      : selectTheme.arrowColor.closed.standard,
    "&:hover": {
      color: isFocused
        ? selectTheme.arrowColor.focused.hover
        : selectTheme.arrowColor.closed.hover
    }
  }),
  menu: base => ({
    ...base,
    backgroundColor: selectTheme.menu.backgroundColor,
    color: selectTheme.menu.textColor,
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
    margin: "3px",
    color: selectTheme.multiSelect.removeButtonTextColor,
    backgroundColor: selectTheme.multiSelect.removeButtonBackgroundColor,
    ":hover": {
      color: selectTheme.multiSelect.removeButtonHoverTextColor,
      backgroundColor: selectTheme.multiSelect.removeButtonHoverBackgroundColor
    }
  }),
  multiValue: base => ({
    ...base,
    color: selectTheme.multiSelect.color,
    backgroundColor: selectTheme.multiSelect.backgroundColor
  }),
  loadingMessage: base => ({
    ...base,
    color: selectTheme.loadingIndicator.textColor,
    fontFamily: selectTheme.input.fontFamily,
    fontSize: selectTheme.input.fontSize
  })
});
