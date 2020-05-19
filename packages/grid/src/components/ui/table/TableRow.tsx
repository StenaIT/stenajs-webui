import { Row } from "@stenajs-webui/core";
import * as React from "react";
import { tableBorder, tableRowHeight } from "../../../config/TableConfig";

interface Props {}

export const TableRow: React.FC<Props> = ({ children }) => {
  return (
    <Row height={tableRowHeight} width={"100%"} borderBottom={tableBorder}>
      {children}
    </Row>
  );
};
