import * as React from "react";
import { Column } from "@stenajs-webui/core";
import { PropsWithChildren } from "react";

export interface ModalContainerProps extends PropsWithChildren {}

export const ModalContainer: React.FC<ModalContainerProps> = ({ children }) => {
  return (
    <Column flex={1} height={"100%"} justifyContent={"space-between"}>
      {children}
    </Column>
  );
};
