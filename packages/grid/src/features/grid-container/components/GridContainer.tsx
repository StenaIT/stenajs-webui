import * as React from "react";
import styles from "./GridContainer.module.css";

export interface GridContainerProps {
  nrOfColumns?: number;
  children?: React.ReactNode;
}

export const GridContainer: React.FC<GridContainerProps> = ({
  nrOfColumns,
  children,
}) => {
  const className =
    styles.gridContainer +
    " " +
    (nrOfColumns
      ? nrOfColumns > 3
        ? styles.CardsFour
        : styles.CardsThree
      : styles.CardsTwo);

  return <div className={className}>{children}</div>;
};
