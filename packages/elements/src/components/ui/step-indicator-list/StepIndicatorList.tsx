import * as React from "react";
import { ReactNode } from "react";
import styles from "./StepIndicatorList.module.css";
import { getDataProps } from "@stenajs-webui/core";

export interface StepIndicatorListProps {
  children?: ReactNode;
}

export const StepIndicatorList: React.FC<StepIndicatorListProps> = ({
  children,
  ...rest
}) => {
  return (
    <ol {...getDataProps(rest)} className={styles.list}>
      {children}
    </ol>
  );
};
