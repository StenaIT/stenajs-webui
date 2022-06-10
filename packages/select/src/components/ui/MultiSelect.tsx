import * as React from "react";
import { useMemo } from "react";
import SelectComponent, {
  mergeStyles,
  Props,
  SelectComponentsConfig,
} from "react-select";
import { defaultSelectTheme, selectThemeDark } from "../../SelectTheme";
import { createStylesFromTheme, SelectVariant } from "../../util/StylesBuilder";
import { GroupBase } from "react-select/dist/declarations/src/types";

export interface MultiSelectProps<TOption = { label: string; value: string }>
  extends Props<TOption, true> {
  variant?: "dark" | "light";
  textVariant?: SelectVariant;
  isMulti?: true;
}

export type MultiSelectComponentsConfig<TOption> = SelectComponentsConfig<
  TOption,
  true,
  GroupBase<TOption>
>;

export const MultiSelect = <TOption extends {}>({
  variant = "light",
  textVariant,
  styles,
  isMulti,
  ...selectProps
}: MultiSelectProps<TOption>) => {
  const selectStyles = useMemo(() => {
    const sourceStyles = createStylesFromTheme<TOption, true>(
      variant === "light" ? defaultSelectTheme : selectThemeDark,
      textVariant
    );

    return styles ? mergeStyles(sourceStyles, styles) : sourceStyles;
  }, [variant, textVariant, styles]);

  return (
    <SelectComponent styles={selectStyles} {...selectProps} isMulti={true} />
  );
};
