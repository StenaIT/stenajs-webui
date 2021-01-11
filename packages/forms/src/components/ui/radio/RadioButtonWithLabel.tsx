import { Row, Space, Text } from "@stenajs-webui/core";
import * as React from "react";
import { Ref } from "react";
import { RadioButton, RadioButtonProps } from "./RadioButton";

export interface RadioButtonWithLabelProps extends RadioButtonProps {
  label: string;
  textColor?: string;
  wrapperRef?: Ref<HTMLDivElement>;
  inputRef?: Ref<HTMLInputElement>;
}

export const RadioButtonWithLabel: React.FC<RadioButtonWithLabelProps> = ({
  label,
  inputRef,
  wrapperRef,
  textColor,
  ...radioButtonProps
}) => {
  return (
    <div ref={wrapperRef}>
      <label>
        <Row alignItems={"center"}>
          <RadioButton ref={inputRef} {...radioButtonProps} />
          <Space />
          <Text color={textColor} userSelect={"none"}>
            {label}
          </Text>
        </Row>
      </label>
    </div>
  );
};
