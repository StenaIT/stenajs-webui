import * as React from "react";
import { useMemo } from "react";
import SelectComponent, { mergeStyles, Props } from "react-select";
import { defaultSelectTheme, selectThemeDark } from "../../SelectTheme";
import { createStylesFromTheme } from "../../util/StylesBuilder";

export interface MultiSelectProps<T = { label: string; value: string }>
  extends Props<T, true> {
  variant?: "dark" | "light";
  isMulti?: true;
}

export const MultiSelect = <T extends {}>({
  variant = "light",
  styles,
  isMulti,
  ...selectProps
}: MultiSelectProps<T>) => {
  const selectStyles = useMemo(() => {
    const sourceStyles = createStylesFromTheme<T, true>(
      variant === "light" ? defaultSelectTheme : selectThemeDark
    );

    return styles ? mergeStyles(sourceStyles, styles) : sourceStyles;
  }, [variant, styles]);

  return (
    <SelectComponent styles={selectStyles} {...selectProps} isMulti={true} />
  );
};
