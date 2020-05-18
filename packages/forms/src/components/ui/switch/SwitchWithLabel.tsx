import { Box, Space, StandardText, ThemeColorField } from "@stenajs-webui/core";
import * as React from "react";
import { Switch, SwitchProps } from "./Switch";

export interface SwitchWithLabelProps extends SwitchProps {
  label: string;
  textColor?: ThemeColorField | string;
}

export const SwitchWithLabel: React.FC<SwitchWithLabelProps> = ({
  label,
  disabled,
  innerRef,
  textColor,
  wrapperRef,
  ...switchProps
}) => {
  return (
    <div ref={wrapperRef}>
      <label>
        <Box row alignItems={"center"}>
          <Switch disabled={disabled} {...switchProps} />
          <Space />
          <StandardText userSelect={"none"} color={textColor}>
            {label}
          </StandardText>
        </Box>
      </label>
    </div>
  );
};
