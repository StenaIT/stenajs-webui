import { BoxProps, Row } from "@stenajs-webui/core";
import * as React from "react";
import {
  defaultTableHeadRowHeight,
  tableBorder,
  tableBorderHidden,
} from "../../../../config/TableConfig";
import styles from "./TableRow.module.css";
import cx from "classnames";

interface Props extends BoxProps {
  hideBorderTop?: boolean;
}

export const TableRow: React.FC<Props> = ({
  hideBorderTop,
  height = defaultTableHeadRowHeight,
  className,
  ...boxProps
}) => {
  return (
    <Row
      borderTop={hideBorderTop ? tableBorderHidden : tableBorder}
      height={height}
      className={cx(styles.tableRow, className)}
      {...boxProps}
    />
  );
};
