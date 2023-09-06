import { Checkbox, CheckboxProps } from "@stenajs-webui/forms";
import * as React from "react";
import { Collapsible, CollapsibleProps } from "./Collapsible";

export interface CollapsibleWithCheckboxProps
  extends Omit<CollapsibleProps, "contentLeft" | "onChange">,
    Pick<
      CheckboxProps,
      "value" | "onValueChange" | "onChange" | "indeterminate"
    > {
  checkboxDisabled: boolean;
}

export const CollapsibleWithCheckbox: React.FC<
  CollapsibleWithCheckboxProps
> = ({
  value,
  onValueChange,
  onChange,
  indeterminate,
  checkboxDisabled,
  ...collapsibleProps
}) => {
  return (
    <Collapsible
      contentLeft={
        <Checkbox
          value={value}
          indeterminate={indeterminate}
          onValueChange={onValueChange}
          onChange={onChange}
          disabled={checkboxDisabled}
          onClick={(ev) => ev.stopPropagation()}
        />
      }
      {...collapsibleProps}
    />
  );
};
