import { CloseButton } from "@stenajs-webui/elements";
import * as React from "react";
import { useMemo } from "react";
import { ClearIndicatorProps, mergeStyles } from "react-select";
import CreatableComponent, { CreatableProps } from "react-select/creatable";
import { GroupBase } from "react-select/dist/declarations/src/types";
import {
  createStylesFromVariant,
  SelectVariant,
} from "../../util/StylesBuilder";

export interface CreatableSelectProps<T = { label: string; value: string }>
  extends CreatableProps<T, false, GroupBase<T>> {
  variant?: SelectVariant;
  isMulti?: false;
}

export function CreatableSelect<T>({
  variant = "standard",
  styles,
  isMulti,
  components,
  ...selectProps
}: CreatableSelectProps<T>) {
  const selectStyles = useMemo(() => {
    const sourceStyles = createStylesFromVariant<T, false>(variant);

    return styles ? mergeStyles(sourceStyles, styles) : sourceStyles;
  }, [variant, styles]);

  const ClearIndicator = (
    props: ClearIndicatorProps<T, false, GroupBase<T>>
  ) => <CloseButton aria-label={"Clear"} onClick={props.clearValue} />;

  return (
    <CreatableComponent
      styles={selectStyles}
      components={{ ...components, ClearIndicator }}
      {...selectProps}
      isMulti={false}
    />
  );
}
