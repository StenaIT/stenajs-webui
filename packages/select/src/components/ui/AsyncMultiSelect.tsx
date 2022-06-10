import * as React from "react";
import { useMemo } from "react";
import { mergeStyles } from "react-select";
import AsyncComponent, { AsyncProps } from "react-select/async";
import { defaultSelectTheme, selectThemeDark } from "../../SelectTheme";
import { createStylesFromTheme, SelectVariant } from "../../util/StylesBuilder";
import { GroupBase } from "react-select/dist/declarations/src/types";

export interface AsyncMultiSelectProps<T = { label: string; value: string }>
  extends AsyncProps<T, true, GroupBase<T>> {
  variant?: "dark" | "light";
  textVariant?: SelectVariant;
  isMulti?: true;
}

export const AsyncMultiSelect = <T extends {}>({
  variant = "light",
  textVariant,
  styles,
  isMulti,
  ...selectProps
}: AsyncMultiSelectProps<T>) => {
  const selectStyles = useMemo(() => {
    const sourceStyles = createStylesFromTheme<T, true>(
      variant === "light" ? defaultSelectTheme : selectThemeDark,
      textVariant
    );

    return styles ? mergeStyles(sourceStyles, styles) : sourceStyles;
  }, [variant, textVariant, styles]);

  return (
    <AsyncComponent styles={selectStyles} {...selectProps} isMulti={true} />
  );
};
