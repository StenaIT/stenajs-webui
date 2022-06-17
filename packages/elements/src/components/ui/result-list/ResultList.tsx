import * as React from "react";
import { Children, ReactNode } from "react";
import styles from "./ResultList.module.css";

export interface ResultListProps {
  children?: ReactNode;
}

export const ResultList: React.FC<ResultListProps> = ({ children }) => {
  return (
    <ul className={styles.resultList}>
      {Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  );
};
