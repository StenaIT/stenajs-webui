import * as React from "react";
import { BoxProps, Column, Space } from "@stenajs-webui/core";

export interface NotificationBodyProps extends BoxProps {}

export const NotificationBody: React.FC<NotificationBodyProps> = ({
  children,
  ...boxProps
}) => {
  return (
    <Column>
      <Column indent={3} {...boxProps}>
        {children}
      </Column>
      <Space num={2} />
    </Column>
  );
};
