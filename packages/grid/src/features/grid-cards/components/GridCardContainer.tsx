import * as React from "react";
import cx from "classnames";
import styles from "./GridCardContainer.module.css";

export interface GridCardContainerProps {
  //   top?: ReactNode;
  //   width?: BoxProps["width"];
  //   variant?: ActionMenuVariant;
  //   shadow?: BoxProps["shadow"];
  //   trapFocus?: boolean;
  children?: React.ReactNode;
}

export const GridCardContainer: React.FC<GridCardContainerProps> = (
  {
    children
  }
) => {
  return (
    <div className={cx(styles.gridCardContainer, styles["standard"])}>
      {children}
    </div>
  );
};
