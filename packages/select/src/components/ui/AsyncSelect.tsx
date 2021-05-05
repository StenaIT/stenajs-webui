import * as React from "react";
import { useMemo } from "react";
import AsyncComponent, { Props } from "react-select/async";
import { defaultSelectTheme, selectThemeDark } from "../../SelectTheme";
import { createStylesFromTheme } from "../../util/StylesBuilder";
import { mergeStyles } from "react-select";

export interface AsyncSelectProps<T = { label: string; value: string }>
  extends Omit<Props<T, false>, "isMulti"> {
  variant?: "dark" | "light";
}

export const AsyncSelect = <T extends {}>({
  variant = "light",
  styles,
  ...selectProps
}: AsyncSelectProps<T>) => {
  const selectStyles = useMemo(() => {
    const sourceStyles = createStylesFromTheme<T, false>(
      variant === "light" ? defaultSelectTheme : selectThemeDark
    );

    return styles ? mergeStyles(sourceStyles, styles) : sourceStyles;
  }, [variant, styles]);

  return <AsyncComponent styles={selectStyles} {...selectProps} />;
};
