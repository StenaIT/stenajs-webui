import * as React from "react";
import { smallTableRowWidth } from "../../../../config/TableConfig";
import { TableHeadItem, TableHeadProps } from "./TableHeadItem";

interface Props extends TableHeadProps {}

export const SmallTableHead: React.FC<Props> = props => {
  return (
    <TableHeadItem
      width={smallTableRowWidth}
      justifyContent={"center"}
      {...props}
    />
  );
};
