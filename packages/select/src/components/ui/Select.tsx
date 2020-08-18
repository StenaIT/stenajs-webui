import * as React from "react";
import { useMemo } from "react";
import SelectComponent from "react-select";
import { Props } from "react-select/src/Select";
import { defaultSelectTheme, selectThemeDark } from "../../SelectTheme";
import { createStylesFromTheme } from "../../util/StylesBuilder";
import { mergeStyles } from "../../util/StylesMerger";
import { MultiValue } from "./MultiValue";
import { ClearIndicator } from "./ClearIndicator";
import { VariantContext } from "../../util/VariantContext";

export interface SelectProps<T> extends Props<T> {
  variant?: "dark" | "light";
}

export const Select = <T extends {}>({
  variant = "light",
  styles,
  ...selectProps
}: SelectProps<T>) => {
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
      <SelectComponent
        styles={selectStyles}
        components={{ ...selectProps.components, MultiValue, ClearIndicator }}
        {...selectProps}
      />
    </VariantContext.Provider>
  );
};
