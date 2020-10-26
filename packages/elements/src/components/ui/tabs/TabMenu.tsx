import * as React from "react";
import { Children } from "react";
import styles from "./TabMenu.module.css";
import cx from "classnames";

interface Props {}

export const TabMenu: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.tabMenu}>
      {Children.map(children, (child, index) => (
        <>
          {index > 0 && (
            <div className={styles.separator}>
              <div className={styles.separatorInner} />
            </div>
          )}
          {child}
        </>
      ))}
      <div className={cx(styles.separator, styles.filler)}>
        <div className={styles.separatorInner} />
      </div>
    </div>
  );
};
