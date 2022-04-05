import * as React from "react";
import styles from "./TabMenu.module.css";
import { Row } from "@stenajs-webui/core";
import cx from "classnames";

export interface TabMenuProps {
  disableBorder?: boolean;
}

export const TabMenu: React.FC<TabMenuProps> = ({
  children,
  disableBorder,
}) => {
  return (
    <Row
      className={cx(styles.tabMenu, { [styles.withBorder]: !disableBorder })}
      gap={2}
      role={"tablist"}
    >
      {children}
    </Row>
  );
};
