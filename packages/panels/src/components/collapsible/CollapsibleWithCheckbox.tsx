import { Checkbox, CheckboxProps } from "@stenajs-webui/forms";
import * as React from "react";
import { Collapsible, CollapsibleProps } from "./Collapsible";

export interface CollapsibleWithCheckboxProps
  extends Omit<CollapsibleProps, "contentLeft" | "onChange">,
    Pick<
      CheckboxProps,
      "value" | "onValueChange" | "onChange" | "indeterminate"
    > {}

export const CollapsibleWithCheckbox: React.FC<CollapsibleWithCheckboxProps> = ({
  value,
  onValueChange,
  onChange,
  indeterminate,
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
          onClick={(ev) => ev.stopPropagation()}
        />
      }
      {...collapsibleProps}
    />
  );
};
