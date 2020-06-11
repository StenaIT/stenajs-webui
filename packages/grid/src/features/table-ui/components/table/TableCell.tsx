import { BoxProps, Indent, Row } from "@stenajs-webui/core";
import * as React from "react";

export interface TableCellProps extends BoxProps {}

export const TableCell: React.FC<TableCellProps> = ({
  alignItems = "center",
  justifyContent = "flex-start",
  overflow = "hidden",
  children,
  ...boxProps
}) => {
  return (
    <Row
      height={"100%"}
      alignItems={alignItems}
      justifyContent={justifyContent}
      overflow={overflow}
      {...boxProps}
    >
      <Indent>{children}</Indent>
    </Row>
  );
};
