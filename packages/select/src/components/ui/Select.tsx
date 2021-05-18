import * as React from "react";
import { useMemo } from "react";
import SelectComponent, { mergeStyles, Props } from "react-select";
import { defaultSelectTheme, selectThemeDark } from "../../SelectTheme";
import { createStylesFromTheme } from "../../util/StylesBuilder";

export interface SelectProps<T = { label: string; value: string }>
  extends Props<T, false> {
  variant?: "dark" | "light";
  isMulti?: false;
}

export const Select = <T extends {}>({
  variant = "light",
  styles,
  isMulti,
  ...selectProps
}: SelectProps<T>) => {
  const selectStyles = useMemo(() => {
    const sourceStyles = createStylesFromTheme<T, false>(
      variant === "light" ? defaultSelectTheme : selectThemeDark
    );

    return styles ? mergeStyles(sourceStyles, styles) : sourceStyles;
  }, [variant, styles]);

  return (
    <SelectComponent styles={selectStyles} {...selectProps} isMulti={false} />
  );
};
