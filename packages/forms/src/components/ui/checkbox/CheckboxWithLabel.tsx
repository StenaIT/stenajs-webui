import { Row, Space, Text, ThemeColorField } from "@stenajs-webui/core";
import * as React from "react";
import { Ref } from "react";
import { Checkbox, CheckboxProps } from "./Checkbox";

export interface CheckboxWithLabelProps extends CheckboxProps {
  label?: string;
  textColor?: ThemeColorField | string;
  innerRef?: Ref<HTMLDivElement>;
}

export const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  children,
  disabled = false,
  label,
  innerRef,
  textColor,
  size = "standard",
  ...checkboxProps
}) => {
  return (
    <div ref={innerRef}>
      <label>
        <Row alignItems={"center"}>
          <Checkbox {...checkboxProps} size={size} disabled={disabled} />
          <Space />
          {label && (
            <Text userSelect={"none"} color={textColor}>
              {label}
            </Text>
          )}
          {children}
        </Row>
      </label>
    </div>
  );
};
