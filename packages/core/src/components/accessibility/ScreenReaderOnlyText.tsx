import * as React from "react";
import { ReactNode } from "react";
import styles from "./ScreenReaderOnlyText.module.css";

export interface ScreenReaderOnlyTextProps {
  children?: ReactNode;
}

export const ScreenReaderOnlyText: React.FC<ScreenReaderOnlyTextProps> = ({
  children,
}) => {
  return (
    <span
      data-testid={"screen-reader-only-text"}
      className={styles.hideVisually}
    >
      {children}
    </span>
  );
};
