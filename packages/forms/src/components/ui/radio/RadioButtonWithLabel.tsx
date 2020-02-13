import { Row, Space, StandardText, ThemeColorField } from "@stenajs-webui/core";
import * as React from "react";
import { Ref } from "react";
import { RadioButton, RadioButtonProps } from "./RadioButton";

export interface RadioButtonWithLabelProps extends RadioButtonProps {
  label: string;
  textColor?: ThemeColorField | string;
  innerRef?: Ref<HTMLDivElement>;
}

export const RadioButtonWithLabel: React.FC<RadioButtonWithLabelProps> = ({
  label,
  disabled,
  innerRef,
  textColor,
  ...radioButtonProps
}) => {
  return (
    <div ref={innerRef}>
      <label>
        <Row alignItems={"center"}>
          <RadioButton disabled={disabled} {...radioButtonProps} />
          <Space />
          <StandardText userSelect={"none"} lineHeight={"100%"}>
            {label}
          </StandardText>
        </Row>
      </label>
    </div>
  );
};
