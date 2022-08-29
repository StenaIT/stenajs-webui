import * as React from "react";
import styles from "./GridCardContainer.module.css";

export interface GridCardContainerProps {
  nrOfColumns?: number;
  children?: React.ReactNode;
}

export const GridCardContainer: React.FC<GridCardContainerProps> = ({
  nrOfColumns,
  children,
}) => {
  const className =
    styles.gridCardContainer +
    " " +
    (nrOfColumns
      ? nrOfColumns > 3
        ? styles.CardsFour
        : styles.CardsThree
      : styles.CardsTwo);

  return <div className={className}>{children}</div>;
};
