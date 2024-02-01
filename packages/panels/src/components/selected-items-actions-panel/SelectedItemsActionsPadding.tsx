import * as React from "react";
import { PropsWithChildren } from "react";
import { Row } from "@stenajs-webui/core";

export interface SelectedItemsActionsPaddingProps extends PropsWithChildren {}

export const SelectedItemsActionsPadding: React.FC<
  SelectedItemsActionsPaddingProps
> = ({ children }) => {
  return (
    <Row spacing={0.5} indent={0.5} flex={1}>
      {children}
    </Row>
  );
};
