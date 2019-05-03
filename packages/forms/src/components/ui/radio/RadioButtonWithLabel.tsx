import { Box, Clickable, Space, StandardText } from "@stenajs-webui/core";
import * as React from "react";
import { ValueOnChangeProps } from "../types";
import { RadioButton } from "./RadioButton";
import { defaultRadioButtonTheme, RadioButtonTheme } from "./RadioButtonTheme";

export interface RadioButtonWithLabelProps extends ValueOnChangeProps<boolean> {
  disabled?: boolean;
  label: string;
  theme?: RadioButtonTheme;
}

export const RadioButtonWithLabel: React.FC<RadioButtonWithLabelProps> = ({
  disabled,
  label,
  theme = defaultRadioButtonTheme,
  value,
  onChange
}) => {
  return (
    <Clickable
      onClick={disabled || !onChange ? undefined : () => onChange(!value)}
    >
      <Box row alignItems={"center"}>
        <RadioButton {...{ theme }} value={value} />
        <Space />
        <StandardText
          color={disabled ? theme.textColorDisabled : theme.textColor}
          fontSize={theme.textSize}
        >
          {label}
        </StandardText>
      </Box>
    </Clickable>
  );
};
