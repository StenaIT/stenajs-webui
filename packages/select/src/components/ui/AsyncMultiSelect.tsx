import * as React from "react";
import { useMemo } from "react";
import { mergeStyles } from "react-select";
import AsyncComponent, { Props } from "react-select/async";
import { defaultSelectTheme, selectThemeDark } from "../../SelectTheme";
import { createStylesFromTheme } from "../../util/StylesBuilder";

export interface AsyncMultiSelectProps<T> extends Props<T, true> {
  variant?: "dark" | "light";
}

export const AsyncMultiSelect = <T extends {}>({
  variant = "light",
  styles,
  ...selectProps
}: AsyncMultiSelectProps<T>) => {
  const selectStyles = useMemo(() => {
    const sourceStyles = createStylesFromTheme<T, true>(
      variant === "light" ? defaultSelectTheme : selectThemeDark
    );

    return styles ? mergeStyles(sourceStyles, styles) : sourceStyles;
  }, [variant, styles]);

  return <AsyncComponent styles={selectStyles} {...selectProps} />;
};
