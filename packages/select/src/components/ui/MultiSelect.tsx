import * as React from "react";
import { useMemo } from "react";
import SelectComponent, {
  ClearIndicatorProps,
  GroupBase,
  mergeStyles,
  MultiValueProps,
  Props,
  SelectComponentsConfig,
} from "react-select";
import {
  createStylesFromVariant,
  SelectVariant,
} from "../../util/StylesBuilder";
import { Chip, stenaTimes, TextInputButton } from "@stenajs-webui/elements";

interface MultiSelectOption {
  label: string;
  value: string;
}

export interface MultiSelectProps<
  TOption extends MultiSelectOption = MultiSelectOption
> extends Props<TOption, true> {
  variant?: SelectVariant;
  isMulti?: true;
}

export type MultiSelectComponentsConfig<TOption> = SelectComponentsConfig<
  TOption,
  true,
  GroupBase<TOption>
>;

const ClearIndicator = function <TOption>({
  clearValue,
}: ClearIndicatorProps<TOption, true, GroupBase<TOption>>) {
  return (
    <TextInputButton
      aria-label={"Clear"}
      onClick={clearValue}
      icon={stenaTimes}
      variant={"error"}
    />
  );
};

const MultiValue = function <TOption extends MultiSelectOption>({
  removeProps,
  data,
}: MultiValueProps<TOption, true, GroupBase<TOption>>) {
  return (
    <Chip
      onClickRemove={(ev) =>
        removeProps.onClick?.(ev as unknown as React.MouseEvent<HTMLDivElement>)
      }
      label={data.label}
    />
  );
};

export function MultiSelect<TOption extends MultiSelectOption>({
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

  return (
    <SelectComponent
      styles={selectStyles}
      components={{ ...components, ClearIndicator, MultiValue }}
      {...selectProps}
      isMulti={true}
    />
  );
}
