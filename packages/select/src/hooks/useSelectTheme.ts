import { useThemeFields } from "@stenajs-webui/core";
import { SelectThemeFields } from "../SelectColors";
import { SelectTheme } from "../SelectTheme";

export const useSelectTheme = (theme: SelectTheme) => {
  return useThemeFields<SelectThemeFields>(
    {
      colors: {
        arrowHoverFocused: theme.arrowColor.focused.hover,
        arrowStandardFocused: theme.arrowColor.focused.standard,
        arrowHoverClosed: theme.arrowColor.closed.hover,
        arrowStandardClosed: theme.arrowColor.closed.standard,

        clearButtonColorHover: theme.clearButtonColor.hover,
        clearButtonColorStandard: theme.clearButtonColor.standard,

        inputBackgroundColor: theme.input.backgroundColor,
        inputBorder: theme.input.border,
        inputBorderFocused: theme.input.borderFocused,
        inputBorderColor: theme.input.borderColor,
        inputBorderColorFocused: theme.input.borderColorFocused,
        inputDisabledBackgroundColor: theme.input.disabledBackgroundColor,
        inputPlaceholderColor: theme.input.placeholderColor,
        inputTextColor: theme.input.textColor,

        loadingIndicatorTextColor: theme.loadingIndicator.textColor,
        menuDisabledTextColor: theme.menu.disabledTextColor,
        menuDisabledBackgroundColor: theme.menu.disabledBackgroundColor,
        menuTextColor: theme.menu.textColor,
        menuBackgroundColor: theme.menu.backgroundColor,
        menuHoverTextColor: theme.menu.hoverTextColor,
        menuHoverBackgroundColor: theme.menu.hoverBackgroundColor,
        menuSelectedItemHoverTextColor: theme.menu.selectedItemHoverTextColor,
        menuSelectedItemTextColor: theme.menu.selectedItemTextColor,
        menuSelectedItemBackgroundColor: theme.menu.selectedItemBackgroundColor,
        menuSelectedItemHoverBackgroundColor:
          theme.menu.selectedItemHoverBackgroundColor,
        multiSelectBackgroundColor: theme.multiSelect.backgroundColor,
        multiSelectTextColor: theme.multiSelect.color,
        multiSelectRemoveButtonBackgroundColor:
          theme.multiSelect.removeButtonBackgroundColor,
        multiSelectRemoveButtonTextColor:
          theme.multiSelect.removeButtonTextColor,
        multiSelectRemoveButtonHoverBackgroundColor:
          theme.multiSelect.removeButtonHoverBackgroundColor,
        multiSelectRemoveButtonHoverTextColor:
          theme.multiSelect.removeButtonHoverTextColor
      },
      fontSizes: {
        input: theme.input.fontSize
      },
      fonts: {
        input: theme.input.fontFamily
      }
    },
    []
  );
};
