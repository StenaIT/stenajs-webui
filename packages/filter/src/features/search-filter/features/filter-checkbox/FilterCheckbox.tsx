import * as React from "react";
import { Row, Text } from "@stenajs-webui/core";
import { ContentMenuButton } from "@stenajs-webui/elements";
import { Checkbox, CheckboxProps } from "@stenajs-webui/forms";

export interface FilterCheckboxProps extends CheckboxProps {
  label: string;
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  label,
  ...checkboxProps
}) => {
  return (
    <ContentMenuButton>
      <Row gap={2} alignItems={"center"} justifyContent={"flex-start"}>
        <Checkbox {...checkboxProps} />
        <Text>{label}</Text>
      </Row>
    </ContentMenuButton>
  );
};
