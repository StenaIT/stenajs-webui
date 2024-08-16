import { Box, ScreenReaderOnlyText, Space, Text } from "@stenajs-webui/core";
import * as React from "react";
import { Switch, SwitchProps } from "./Switch";

export interface SwitchWithLabelProps extends SwitchProps {
  label: string;
  /**
   * If set, this label is used by screen readers instead of label prop.
   * For example, label could be "male", while screenReaderLabel is "Gender male".
   * If not set, screen readers will use label prop.
   */
  screenReaderLabel?: string;
  textColor?: string;
}

export const SwitchWithLabel: React.FC<SwitchWithLabelProps> = ({
  label,
  disabled,
  textColor,
  wrapperRef,
  screenReaderLabel,
  ...switchProps
}) => {
  return (
    <div ref={wrapperRef}>
      <label>
        <Box row alignItems={"center"}>
          <Switch disabled={disabled} {...switchProps} />
          <Space />
          {screenReaderLabel ? (
            <ScreenReaderOnlyText>{screenReaderLabel}</ScreenReaderOnlyText>
          ) : null}
          <Text
            color={textColor}
            aria-hidden={Boolean(screenReaderLabel)}
            userSelect={"none"}
          >
            {label}
          </Text>
        </Box>
      </label>
    </div>
  );
};
