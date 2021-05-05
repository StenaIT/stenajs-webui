import * as React from "react";
import { useMemo } from "react";
import SelectComponent, { mergeStyles, Props } from "react-select";
import { defaultSelectTheme, selectThemeDark } from "../../SelectTheme";
import { createStylesFromTheme } from "../../util/StylesBuilder";

export interface MultiSelectProps<T> extends Omit<Props<T, true>, "isMulti"> {
  variant?: "dark" | "light";
}

export const MultiSelect = <T extends {}>({
  variant = "light",
  styles,
  ...selectProps
}: MultiSelectProps<T>) => {
  const selectStyles = useMemo(() => {
    const sourceStyles = createStylesFromTheme<T, true>(
      variant === "light" ? defaultSelectTheme : selectThemeDark
    );

    return styles ? mergeStyles(sourceStyles, styles) : sourceStyles;
  }, [variant, styles]);

  return <SelectComponent styles={selectStyles} isMulti {...selectProps} />;
};
