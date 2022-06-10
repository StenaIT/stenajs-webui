import * as React from "react";
import { useMemo } from "react";
import AsyncComponent, { AsyncProps } from "react-select/async";
import { defaultSelectTheme, selectThemeDark } from "../../SelectTheme";
import { createStylesFromTheme, SelectVariant } from "../../util/StylesBuilder";
import { mergeStyles } from "react-select";
import { GroupBase } from "react-select/dist/declarations/src/types";

export interface AsyncSelectProps<T = { label: string; value: string }>
  extends AsyncProps<T, false, GroupBase<T>> {
  variant?: "dark" | "light";
  textVariant?: SelectVariant;
  isMulti?: false;
}

export const AsyncSelect = <T extends {}>({
  variant = "light",
  textVariant,
  styles,
  isMulti,
  ...selectProps
}: AsyncSelectProps<T>) => {
  const selectStyles = useMemo(() => {
    const sourceStyles = createStylesFromTheme<T, false>(
      variant === "light" ? defaultSelectTheme : selectThemeDark,
      textVariant
    );

    return styles ? mergeStyles(sourceStyles, styles) : sourceStyles;
  }, [variant, textVariant, styles]);

  return (
    <AsyncComponent styles={selectStyles} {...selectProps} isMulti={false} />
  );
};
