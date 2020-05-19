import * as React from "react";
import { smallTableRowWidth } from "../../../config/TableConfig";
import { TableHead, TableHeadProps } from "./TableHead";

interface Props extends TableHeadProps {}

export const SmallTableHead: React.FC<Props> = props => {
  return (
    <TableHead
      width={smallTableRowWidth}
      justifyContent={"center"}
      {...props}
    />
  );
};
