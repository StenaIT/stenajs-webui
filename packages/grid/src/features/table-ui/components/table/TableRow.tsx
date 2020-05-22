import { Row } from "@stenajs-webui/core";
import * as React from "react";
import { BoxProps } from "@stenajs-webui/core";
import { tableBorder, tableRowHeight } from "../../../../config/TableConfig";

interface Props extends BoxProps {}

export const TableRow: React.FC<Props> = props => {
  return (
    <Row
      height={tableRowHeight}
      width={"100%"}
      borderBottom={tableBorder}
      hoverBackground={"var(--lhds-color-ui-100)"}
      {...props}
    />
  );
};
