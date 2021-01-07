import { BoxProps, Row } from "@stenajs-webui/core";
import * as React from "react";
import {
  defaultTableHeadRowHeight,
  tableBorder,
} from "../../../../config/TableConfig";

interface Props extends BoxProps {}

export const TableRow: React.FC<Props> = ({
  height = defaultTableHeadRowHeight,
  background,
  ...boxProps
}) => {
  return (
    <Row
      borderTop={tableBorder}
      hoverBackground={background ? undefined : "var(--lhds-color-ui-100)"}
      background={background}
      height={height}
      {...boxProps}
    />
  );
};
