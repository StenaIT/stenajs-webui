import * as React from "react";
import cx from "classnames";

import styles from "./Label.module.css";

export type LabelProps = React.HTMLAttributes<HTMLDivElement>;

export const Label: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cx(styles.label, className)} {...props}>
      {children}
    </div>
  );
};
