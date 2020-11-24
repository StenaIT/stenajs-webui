import { Box, Text } from "@stenajs-webui/core";
import * as React from "react";
import { TableHeadItem } from "./TableHeadItem";
import { tableHeadRowHeight } from "../../../../config/TableConfig";

interface Props {
  label?: string;
  flex?: number;
  width?: string;
  indent?: number;
}

export const TableColumnGroupHead: React.FC<Props> = ({
  label,
  flex,
  width,
  indent = 1,
}) => {
  return (
    <TableHeadItem width={width} flex={flex} height={tableHeadRowHeight}>
      <Box indent={indent} spacing>
        <Text variant={"bold"}>{label}</Text>
      </Box>
    </TableHeadItem>
  );
};
