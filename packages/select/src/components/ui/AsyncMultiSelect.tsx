import * as React from "react";
import { useMemo } from "react";
import { GroupBase, mergeStyles } from "react-select";
import AsyncComponent, { AsyncProps } from "react-select/async";
import {
  createStylesFromVariant,
  SelectVariant,
} from "../../util/StylesBuilder";

export interface AsyncMultiSelectProps<T = { label: string; value: string }>
  extends AsyncProps<T, true, GroupBase<T>> {
  variant?: SelectVariant;
  isMulti?: true;
}

export function AsyncMultiSelect<T>({
  variant = "standard",
  styles,
  isMulti,
  ...selectProps
}: AsyncMultiSelectProps<T>) {
  const selectStyles = useMemo(() => {
    const sourceStyles = createStylesFromVariant<T, true>(variant);

    return styles ? mergeStyles(sourceStyles, styles) : sourceStyles;
  }, [variant, styles]);

  return (
    <AsyncComponent styles={selectStyles} {...selectProps} isMulti={true} />
  );
}
