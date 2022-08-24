import * as React from "react";
import styles from "./GridCardContainer.module.css";

export interface GridCardContainerProps {
  children?: React.ReactNode;
}

export const GridCardContainer: React.FC<GridCardContainerProps> = ({
  children,
}) => {
  return <div className={styles.gridCardContainer}>{children}</div>;
};
