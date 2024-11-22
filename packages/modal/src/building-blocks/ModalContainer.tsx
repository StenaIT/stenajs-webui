import * as React from "react";
import { BoxProps, Column } from "@stenajs-webui/core";
import { PropsWithChildren } from "react";

export interface ModalContainerProps
  extends PropsWithChildren,
    Pick<BoxProps, "maxWidth"> {}

export const ModalContainer: React.FC<ModalContainerProps> = ({
  children,
  maxWidth,
}) => {
  return (
    <Column
      flex={1}
      height={"100%"}
      justifyContent={"space-between"}
      maxWidth={maxWidth}
    >
      {children}
    </Column>
  );
};
