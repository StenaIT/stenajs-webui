import { BoxProps, Row } from "@stenajs-webui/core";
import * as React from "react";
import { tableBorder, tableRowHeight } from "../../../../config/TableConfig";

interface Props extends BoxProps {}

export const TableRow: React.FC<Props> = (props) => {
  return (
    <Row
      height={tableRowHeight}
      borderTop={tableBorder}
      hoverBackground={"var(--lhds-color-ui-100)"}
      {...props}
    />
  );
};
