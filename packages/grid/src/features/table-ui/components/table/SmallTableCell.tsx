import * as React from "react";
import { TableCell, TableCellProps } from "./TableCell";
import { smallTableRowWidth } from "../../../../config/TableConfig";

interface Props extends TableCellProps {}

export const SmallTableCell: React.FC<Props> = props => {
  return (
    <TableCell
      width={smallTableRowWidth}
      justifyContent={"center"}
      {...props}
    />
  );
};
