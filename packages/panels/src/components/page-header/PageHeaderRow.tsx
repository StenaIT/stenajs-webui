import * as React from "react";
import { BoxProps, Row } from "@stenajs-webui/core";

export interface PageHeaderRowProps extends BoxProps {}

export const PageHeaderRow: React.FC<PageHeaderRowProps> = (props) => (
  <Row indent={3} spacing {...props} />
);
