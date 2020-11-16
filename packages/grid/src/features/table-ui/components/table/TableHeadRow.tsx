import { BoxProps, Row } from "@stenajs-webui/core";
import * as React from "react";
import { tableHeadRowHeight } from "../../../../config/TableConfig";

export interface TableHeadRowProps extends BoxProps {
  style?: React.CSSProperties;
}

export const TableHeadRow: React.FC<TableHeadRowProps> = React.memo(
  (boxProps, style) => {
    return <Row style={style} height={tableHeadRowHeight} {...boxProps} />;
  }
);
