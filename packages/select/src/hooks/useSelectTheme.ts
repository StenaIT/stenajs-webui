import { useThemeFields } from "@stenajs-webui/core";
export const useSelectTheme = () => {
  return useThemeFields(
    {
      colors: {
        arrowHoverFocused: "primaryText",
        arrowStandardFocused: "separator",
        arrowHoverClosed: "primaryText",
        arrowStandardClosed: "separator",

        clearButtonColorHover: "primaryText",
        clearButtonColorStandard: "separator",

        inputBackgroundColor: "white",
        inputBorder: `1px solid inputBorder`,
        inputBorderFocused: `1px solid inputBorderFocused`,
        inputBorderColor: "inputBorder",
        inputBorderColorFocused: "inputBorderFocused",
        inputDisabledBackgroundColor: "disabledBackground",
        inputFontFamily: "primary",
        inputFontSize: "normal",
        inputPlaceholderColor: "separator",
        inputTextColor: "primaryText",
        inputBorderRadius: "4px",

        loadingIndicatorTextColor: "primaryText",
        menuDisabledTextColor: "disabledText",
        menuDisabledBackgroundColor: "disabledBackground",
        menuTextColor: "primaryText",
        menuBackgroundColor: "white",
        menuHoverTextColor: "primaryText",
        menuHoverBackgroundColor: "#F2F3F5", // TODO: Remove and use opacity
        menuSelectedItemTextColor: "primaryText",
        menuSelectedItemHoverTextColor: "primaryText", // TODO: Remove and use opacity
        menuSelectedItemBackgroundColor: "white",
        menuSelectedItemHoverBackgroundColor: "#F2F3F5", // TODO: Remove and use opacity
        multiSelectBackgroundColor: "#B9D8DF",
        multiSelectTextColor: "primaryText",
        multiSelectRemoveButtonBackgroundColor: "#B9D8DF",
        multiSelectRemoveButtonTextColor: "primaryText",
        multiSelectRemoveButtonHoverBackgroundColor: "primaryBgDark",
        multiSelectRemoveButtonHoverTextColor: "white"
      }
    },
    []
  );
};
