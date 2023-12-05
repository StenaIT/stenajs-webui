import * as React from "react";
import { useMemo } from "react";
import SelectComponent, {
  ClearIndicatorProps,
  GroupBase,
  mergeStyles,
  Props,
} from "react-select";
import {
  createStylesFromVariant,
  SelectVariant,
} from "../../util/StylesBuilder";
import { stenaTimes, TextInputButton } from "@stenajs-webui/elements";

export interface SelectProps<T = { label: string; value: string }>
  extends Props<T, false> {
  variant?: SelectVariant;
  isMulti?: false;
}

export function Select<T>({
  variant = "standard",
  styles,
  isMulti,
  components,
  ...selectProps
}: SelectProps<T>) {
  const selectStyles = useMemo(() => {
    const sourceStyles = createStylesFromVariant<T, false>(variant);

    return styles ? mergeStyles(sourceStyles, styles) : sourceStyles;
  }, [variant, styles]);

  const ClearIndicator = (
    props: ClearIndicatorProps<T, true, GroupBase<T>>
  ) => {
    return (
      <TextInputButton
        variant={"error"}
        icon={stenaTimes}
        onClick={props.clearValue}
      />
    );
  };

  return (
    <SelectComponent
      styles={selectStyles}
      components={{ ...components, ClearIndicator }}
      {...selectProps}
      isMulti={false}
    />
  );
}
