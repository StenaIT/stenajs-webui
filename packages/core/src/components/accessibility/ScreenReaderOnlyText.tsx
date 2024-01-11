import * as React from "react";
import { ReactNode } from "react";
import styles from "./ScreenReaderOnlyText.module.css";
import { getDataProps } from "../../utils/PropsForwarder";

export interface ScreenReaderOnlyTextProps {
  children?: ReactNode;
}

export const ScreenReaderOnlyText: React.FC<ScreenReaderOnlyTextProps> = ({
  children,
  ...props
}) => {
  return (
    <span className={styles.visuallyHidden} {...getDataProps(props)}>
      {children}
    </span>
  );
};
