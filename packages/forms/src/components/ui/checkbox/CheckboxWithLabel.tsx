import { Row, Space, Text, ThemeColorField } from "@stenajs-webui/core";
import * as React from "react";
import { Ref } from "react";
import { Checkbox, CheckboxProps } from "./Checkbox";

export interface CheckboxWithLabelProps extends CheckboxProps {
  label?: string;
  textColor?: ThemeColorField | string;
  wrapperRef?: Ref<HTMLDivElement>;
  inputRef?: Ref<HTMLInputElement>;
}

export const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  children,
  label,
  inputRef,
  wrapperRef,
  textColor,
  ...checkboxProps
}) => {
  return (
    <div ref={wrapperRef}>
      <label>
        <Row alignItems={"center"}>
          <Checkbox {...checkboxProps} ref={inputRef} />
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
