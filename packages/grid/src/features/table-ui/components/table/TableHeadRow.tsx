import { BoxProps, Row } from "@stenajs-webui/core";
import * as React from "react";

export interface TableHeadRowProps extends BoxProps {
  style?: React.CSSProperties;
  height?: string;
}

export const TableHeadRow: React.FC<TableHeadRowProps> = React.memo(
  ({ style, height = "40px", ...boxProps }) => {
    return <Row style={style} height={height} {...boxProps} />;
  }
);
