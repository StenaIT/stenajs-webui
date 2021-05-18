import * as React from "react";
import { useMemo } from "react";
import AsyncComponent, { Props } from "react-select/async";
import { defaultSelectTheme, selectThemeDark } from "../../SelectTheme";
import { createStylesFromTheme } from "../../util/StylesBuilder";
import { mergeStyles } from "react-select";

export interface AsyncSelectProps<T = { label: string; value: string }>
  extends Props<T, false> {
  variant?: "dark" | "light";
  isMulti?: false;
}

export const AsyncSelect = <T extends {}>({
  variant = "light",
  styles,
  isMulti,
  ...selectProps
}: AsyncSelectProps<T>) => {
  const selectStyles = useMemo(() => {
    const sourceStyles = createStylesFromTheme<T, false>(
      variant === "light" ? defaultSelectTheme : selectThemeDark
    );

    return styles ? mergeStyles(sourceStyles, styles) : sourceStyles;
  }, [variant, styles]);

  return (
    <AsyncComponent styles={selectStyles} {...selectProps} isMulti={false} />
  );
};
