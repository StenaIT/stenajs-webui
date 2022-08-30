import * as React from "react";
import { useMemo } from "react";
import SelectComponent, { mergeStyles, Props } from "react-select";
import {
  createStylesFromVariant,
  SelectVariant,
} from "../../util/StylesBuilder";

export interface SelectProps<T = { label: string; value: string }>
  extends Props<T, false> {
  variant?: SelectVariant;
  isMulti?: false;
}

export function Select<T>({
  variant = "standard",
  styles,
  isMulti,
  ...selectProps
}: SelectProps<T>) {
  const selectStyles = useMemo(() => {
    const sourceStyles = createStylesFromVariant<T, false>(variant);

    return styles ? mergeStyles(sourceStyles, styles) : sourceStyles;
  }, [variant, styles]);

  return (
    <SelectComponent styles={selectStyles} {...selectProps} isMulti={false} />
  );
}
