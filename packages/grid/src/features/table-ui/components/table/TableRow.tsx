import { BoxProps, Row } from "@stenajs-webui/core";
import * as React from "react";
import {
  defaultTableHeadRowHeight,
  tableBorder,
} from "../../../../config/TableConfig";
import styles from "./TableRow.module.css";
import cx from "classnames";

interface Props extends BoxProps {}

export const TableRow: React.FC<Props> = ({
  height = defaultTableHeadRowHeight,
  className,
  ...boxProps
}) => {
  return (
    <Row
      borderTop={tableBorder}
      height={height}
      className={cx(styles.tableRow, className)}
      {...boxProps}
    />
  );
};
