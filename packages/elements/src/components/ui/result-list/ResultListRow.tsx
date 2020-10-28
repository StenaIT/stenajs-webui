import * as React from "react";
import { StandardText } from "@stenajs-webui/core";
import { Link } from "../link/Link";
import styles from "./ResultListRow.module.css";

export interface ResultItem {
  text: string;
  linkText?: string;
  onClickLink?: () => void;
}

export interface ResultItemProps extends ResultItem {}

export const ResultListRow: React.FC<ResultItemProps> = ({
  text,
  onClickLink,
  linkText,
}) => {
  return (
    <div className={styles.resultItemRow}>
      <StandardText>{text}</StandardText>
      {linkText && (
        <Link className={styles.link} onClick={onClickLink}>
          {linkText}
        </Link>
      )}
    </div>
  );
};
