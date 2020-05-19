import { Box, StandardText } from "@stenajs-webui/core";
import * as React from "react";
import { TableHead } from "./TableHead";

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
    <TableHead width={width} flex={flex} height={"50px"}>
      <Box indent={indent} spacing>
        <StandardText fontWeight={"bold"}>{label}</StandardText>
      </Box>
    </TableHead>
  );
};
