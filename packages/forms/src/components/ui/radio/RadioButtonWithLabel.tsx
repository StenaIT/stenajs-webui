import { Box, Space, StandardText, ThemeColorField } from "@stenajs-webui/core";
import * as React from "react";
import { Ref } from "react";
import { RadioButton, RadioButtonProps } from "./RadioButton";

export interface RadioButtonWithLabelProps extends RadioButtonProps {
  label: string;
  textColor?: ThemeColorField | string;
  textSize?: string;
  innerRef?: Ref<HTMLDivElement>;
}

export const RadioButtonWithLabel: React.FC<RadioButtonWithLabelProps> = ({
  label,
  disabled,
  innerRef,
  textColor,
  textSize,
  ...radioButtonProps
}) => {
  return (
    <div ref={innerRef}>
      <label>
        <Box row alignItems={"center"}>
          <RadioButton disabled={disabled} {...radioButtonProps} />
          <Space />
          <StandardText
            userSelect={"none"}
            color={"yellow"}
            fontSize={textSize}
          >
            {label}
          </StandardText>
        </Box>
      </label>
    </div>
  );
};
