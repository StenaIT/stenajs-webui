import { Box, StandardText } from "@stenajs-webui/core";
import * as React from "react";
import { TableHeadItem } from "./TableHeadItem";

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
  indent = 1
}) => {
  return (
    <TableHeadItem width={width} flex={flex} height={"50px"}>
      <Box indent={indent} spacing>
        <StandardText fontWeight={"bold"}>{label}</StandardText>
      </Box>
    </TableHeadItem>
  );
};
