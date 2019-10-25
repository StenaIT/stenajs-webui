import { Omit, useThemeFields } from "@stenajs-webui/core";
import * as React from "react";
import { useMemo } from "react";
import { Async as AsyncComponent } from "react-select";
import { Props } from "react-select/lib/Async";
import { defaultSelectTheme, SelectTheme } from "../../SelectTheme";
import { createStylesFromTheme } from "../../util/StylesBuilder";
import { mergeStyles } from "../../util/StylesMerger";

interface AsyncSelectProps<T> extends Omit<Props<T>, "theme"> {
  theme?: SelectTheme;
}

export const AsyncSelect = <T extends {}>({
  theme = defaultSelectTheme,
  styles,
  ...selectProps
}: AsyncSelectProps<T>) => {
  const { colors } = useThemeFields(
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
    [theme]
  );

  const selectStyles = useMemo(
    () => mergeStyles(createStylesFromTheme(theme, colors), styles),
    [theme, colors, styles]
  );

  return <AsyncComponent styles={selectStyles} {...selectProps as Props<T>} />;
};
