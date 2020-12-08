import { Box, Text } from "@stenajs-webui/core";
import * as React from "react";
import { TableHeadItem } from "./TableHeadItem";
import { defaultTableHeadRowHeight } from "../../../../config/TableConfig";

interface Props {
  label?: string;
  flex?: number;
  width?: string;
  indent?: number;
  height?: string;
}

export const TableColumnGroupHead: React.FC<Props> = ({
  label,
  flex,
  width,
  indent = 1,
  height = defaultTableHeadRowHeight,
}) => {
  return (
    <TableHeadItem width={width} flex={flex} height={height}>
      <Box indent={indent} spacing>
        <Text variant={"bold"}>{label}</Text>
      </Box>
    </TableHeadItem>
  );
};
