import * as React from "react";
import { useMemo } from "react";
import SelectComponent, {
  mergeStyles,
  Props,
  SelectComponentsConfig,
} from "react-select";
import {
  createStylesFromVariant,
  SelectVariant,
} from "../../util/StylesBuilder";
import { GroupBase } from "react-select/dist/declarations/src/types";

export interface MultiSelectProps<TOption = { label: string; value: string }>
  extends Props<TOption, true> {
  variant?: SelectVariant;
  isMulti?: true;
}

export type MultiSelectComponentsConfig<TOption> = SelectComponentsConfig<
  TOption,
  true,
  GroupBase<TOption>
>;

export function MultiSelect<TOption>({
  variant = "standard",
  styles,
  isMulti,
  ...selectProps
}: MultiSelectProps<TOption>) {
  const selectStyles = useMemo(() => {
    const sourceStyles = createStylesFromVariant<TOption, true>(variant);

    return styles ? mergeStyles(sourceStyles, styles) : sourceStyles;
  }, [variant, styles]);

  return (
    <SelectComponent styles={selectStyles} {...selectProps} isMulti={true} />
  );
}
