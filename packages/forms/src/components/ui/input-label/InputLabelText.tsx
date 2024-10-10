import { getDataProps, Text } from "@stenajs-webui/core";
import * as React from "react";
import { cssColor } from "@stenajs-webui/theme";

export interface InputLabelTextProps {
  disabled?: boolean;
  text?: string;
}

export const InputLabelText: React.FC<InputLabelTextProps> = ({
  disabled,
  text,
  ...props
}) => {
  return (
    <Text
      variant={"bold"}
      color={cssColor(disabled ? "--silver" : "--tjara")}
      size={"small"}
      whiteSpace={"nowrap"}
      {...getDataProps(props)}
    >
      {text}
    </Text>
  );
};
