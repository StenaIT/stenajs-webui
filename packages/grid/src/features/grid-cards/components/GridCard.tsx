import * as React from "react";
import { Box } from "@stenajs-webui/core";
import styles from "./GridCard.module.css";

export interface GridCardProps {
  // top?: ReactNode;
  // width?: BoxProps["width"];
  // variant?: ActionMenuVariant;
  // shadow?: BoxProps["shadow"];
  // trapFocus?: boolean;
  // children?: ReactNode;
}

export const GridCard: React.FC<GridCardProps> = (
  {
    // top,
    // children,
    // width,
    // shadow,
    // variant = "standard",
    // trapFocus,
  }
) => {
  return (
    <Box className={styles.standard}>
      {/* <Column
        className={cx(styles.actionMenu, styles[variant])}
        width={width}
        shadow={shadow}
      >
        {top}
        <Column>{children}</Column>
      </Column> */}
      <span>AAAAAAAAAAA</span>
    </Box>
  );
};
