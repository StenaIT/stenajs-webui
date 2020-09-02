import * as React from "react";
import { useMemo } from "react";
import AsyncComponent, { Props } from "react-select/async";
import { defaultSelectTheme, selectThemeDark } from "../../SelectTheme";
import { createStylesFromTheme } from "../../util/StylesBuilder";
import { VariantContext } from "../../util/VariantContext";
import { MultiValue } from "./MultiValue";
import { ClearIndicator } from "./ClearIndicator";
import { mergeStyles } from "react-select";

interface AsyncSelectProps<T> extends Props<T> {
  variant?: "dark" | "light";
}

export const AsyncSelect = <T extends {}>({
  variant = "light",
  styles,
  components,
  ...selectProps
}: AsyncSelectProps<T>) => {
  const selectStyles = useMemo(
    () =>
      styles &&
      mergeStyles(
        createStylesFromTheme(
          variant === "light" ? defaultSelectTheme : selectThemeDark
        ),
        styles
      ),
    [variant, styles]
  );

  return (
    <VariantContext.Provider value={variant}>
      <AsyncComponent
        styles={selectStyles}
        components={{ ...components, MultiValue, ClearIndicator }}
        {...selectProps}
      />
    </VariantContext.Provider>
  );
};
