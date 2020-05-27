import { BoxProps, Row } from "@stenajs-webui/core";
import * as React from "react";
import {
  tableBorder,
  tableHeadRowHeight
} from "../../../../config/TableConfig";

export interface TableHeadRowProps extends BoxProps {}

export const TableHeadRow: React.FC<TableHeadRowProps> = React.memo(
  boxProps => {
    return (
      <Row
        borderBottom={tableBorder}
        height={tableHeadRowHeight}
        {...boxProps}
      />
    );
  }
);
