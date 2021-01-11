import { Box, Space, Text } from "@stenajs-webui/core";
import * as React from "react";
import { Switch, SwitchProps } from "./Switch";

export interface SwitchWithLabelProps extends SwitchProps {
  label: string;
  textColor?: string;
}

export const SwitchWithLabel: React.FC<SwitchWithLabelProps> = ({
  label,
  disabled,
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
          <Text userSelect={"none"} color={textColor}>
            {label}
          </Text>
        </Box>
      </label>
    </div>
  );
};
