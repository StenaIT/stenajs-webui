import { Box, BoxProps } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import styles from "./ShimmerBox.module.css";

export interface ShimmerBoxProps extends BoxProps {}

export const ShimmerBox: React.FC<ShimmerBoxProps> = ({
  className,
  ...props
}) => {
  return <Box className={cx(styles.shimmerBox, className)} {...props} />;
};
