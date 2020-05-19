import { BoxProps, Indent, Row } from "@stenajs-webui/core";
import * as React from "react";

export interface TableCellProps extends BoxProps {}

export const TableCell: React.FC<TableCellProps> = ({
  alignItems = "center",
  justifyContent = "flex-start",
  children,
  ...boxProps
}) => {
  return (
    <Row
      height={"100%"}
      alignItems={alignItems}
      justifyContent={justifyContent}
      {...boxProps}
    >
      <Indent>{children}</Indent>
    </Row>
  );
};
