import { Box, Space, StandardText, useThemeFields } from "@stenajs-webui/core";
import * as React from "react";
import { ThemeColorField } from "@stenajs-webui/core";
import { Switch, SwitchProps } from "./Switch";
import { defaultSwitchTheme } from "./SwitchTheme";

export interface SwitchWithLabelProps extends SwitchProps {
  label: string;
  textColor?: ThemeColorField | string;
}

export const SwitchWithLabel: React.FC<SwitchWithLabelProps> = ({
  label,
  theme = defaultSwitchTheme,
  disabled,
  innerRef,
  textColor,
  ...switchProps
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
          <Switch theme={theme} disabled={disabled} {...switchProps} />
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
