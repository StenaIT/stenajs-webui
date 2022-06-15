import * as React from "react";
import { useMemo } from "react";
import AsyncComponent, { AsyncProps } from "react-select/async";
import {
  createStylesFromVariant,
  SelectVariant,
} from "../../util/StylesBuilder";
import { mergeStyles } from "react-select";
import { GroupBase } from "react-select/dist/declarations/src/types";

export interface AsyncSelectProps<T = { label: string; value: string }>
  extends AsyncProps<T, false, GroupBase<T>> {
  variant?: SelectVariant;
  isMulti?: false;
}

export const AsyncSelect = <T extends {}>({
  variant = "standard",
  styles,
  isMulti,
  ...selectProps
}: AsyncSelectProps<T>) => {
  const selectStyles = useMemo(() => {
    const sourceStyles = createStylesFromVariant<T, false>(variant);

    return styles ? mergeStyles(sourceStyles, styles) : sourceStyles;
  }, [variant, styles]);

  return (
    <AsyncComponent styles={selectStyles} {...selectProps} isMulti={false} />
  );
};
