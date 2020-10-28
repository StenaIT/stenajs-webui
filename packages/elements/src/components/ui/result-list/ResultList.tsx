import * as React from "react";
import { Children } from "react";
import styles from "./ResultList.module.css";

interface Props {}

export const ResultList: React.FC<Props> = ({ children }) => {
  return (
    <ul className={styles.resultList}>
      {Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  );
};
