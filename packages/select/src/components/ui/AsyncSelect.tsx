import * as React from "react";
import { useMemo } from "react";
import AsyncComponent, { Props } from "react-select/async";
import { defaultSelectTheme, selectThemeDark } from "../../SelectTheme";
import { createStylesFromTheme } from "../../util/StylesBuilder";
import { mergeStyles } from "../../util/StylesMerger";
import { VariantContext } from "../../util/variantContext";
import { MultiValue } from "./MultiValue";
import { ClearIndicator } from "./ClearIndicator";

interface AsyncSelectProps<T> extends Props<T> {
  variant?: "dark" | "light";
}

export const AsyncSelect = <T extends {}>({
  variant = "light",
  styles,
  ...selectProps
}: AsyncSelectProps<T>) => {
  const selectStyles = useMemo(
    () =>
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
        components={{ ...selectProps.components, MultiValue, ClearIndicator }}
        {...selectProps}
      />
    </VariantContext.Provider>
  );
};
