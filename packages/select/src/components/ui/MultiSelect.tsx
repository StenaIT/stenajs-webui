import * as React from "react";
import { useMemo } from "react";
import SelectComponent, {
  ClearIndicatorProps,
  GroupBase,
  mergeStyles,
  Props,
  SelectComponentsConfig,
} from "react-select";
import {
  createStylesFromVariant,
  SelectVariant,
} from "../../util/StylesBuilder";
import { CloseButton } from "@stenajs-webui/elements";

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
  components,
  ...selectProps
}: MultiSelectProps<TOption>) {
  const selectStyles = useMemo(() => {
    const sourceStyles = createStylesFromVariant<TOption, true>(variant);

    return styles ? mergeStyles(sourceStyles, styles) : sourceStyles;
  }, [variant, styles]);

  const ClearIndicator = (
    props: ClearIndicatorProps<TOption, true, GroupBase<TOption>>
  ) => <CloseButton aria-label={"Clear"} onClick={props.clearValue} />;

  return (
    <SelectComponent
      styles={selectStyles}
      components={{ ...components, ClearIndicator }}
      {...selectProps}
      isMulti={true}
    />
  );
}
