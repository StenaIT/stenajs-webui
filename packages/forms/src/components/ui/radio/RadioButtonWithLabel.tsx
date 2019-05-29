import { Box, Space, StandardText, useThemeFields } from "@stenajs-webui/core";
import * as React from "react";
import { Ref } from "react";
import { ThemeColorField } from "@stenajs-webui/core";
import { RadioButton, RadioButtonProps } from "./RadioButton";
import { defaultRadioButtonTheme } from "./RadioButtonTheme";

export interface RadioButtonWithLabelProps extends RadioButtonProps {
  label: string;
  textColor?: ThemeColorField | string;
  innerRef?: Ref<HTMLDivElement>;
}

export const RadioButtonWithLabel: React.FC<RadioButtonWithLabelProps> = ({
  label,
  theme = defaultRadioButtonTheme,
  disabled,
  innerRef,
  textColor,
  ...radioButtonProps
}) => {
  const { colors } = useThemeFields(
    {
      colors: {
        textColorDisabled: theme.iconColorDisabled,
        textColor: textColor
      }
    },
    [theme]
  );

  return (
    <div ref={innerRef}>
      <label>
        <Box row alignItems={"center"}>
          <RadioButton
            theme={theme}
            disabled={disabled}
            {...radioButtonProps}
          />
          <Space />
          <StandardText
            userSelect={"none"}
            color={disabled ? colors.textColorDisabled : colors.textColor}
          >
            {label}
          </StandardText>
        </Box>
      </label>
    </div>
  );
};
