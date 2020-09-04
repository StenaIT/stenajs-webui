import * as React from "react";
import { useMemo } from "react";
import SelectComponent, { mergeStyles } from "react-select";
import { Props } from "react-select/src/Select";
import { defaultSelectTheme, selectThemeDark } from "../../SelectTheme";
import { createStylesFromTheme } from "../../util/StylesBuilder";

export interface SelectProps<T> extends Props<T> {
  variant?: "dark" | "light";
}

export const Select = <T extends {}>({
  variant = "light",
  styles,
  ...selectProps
}: SelectProps<T>) => {
  const selectStyles = useMemo(() => {
    const sourceStyles = createStylesFromTheme(
      variant === "light" ? defaultSelectTheme : selectThemeDark
    );

    return styles ? mergeStyles(sourceStyles, styles) : sourceStyles;
  }, [variant, styles]);

  return <SelectComponent styles={selectStyles} {...selectProps} />;
};
