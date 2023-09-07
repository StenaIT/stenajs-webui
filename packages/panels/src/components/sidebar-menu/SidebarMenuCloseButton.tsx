import * as React from "react";
import cx from "classnames";
import styles from "./SidebarMenuCloseButton.module.css";
import { Box, ButtonElementProps, Row } from "@stenajs-webui/core";
import { ReactComponent as CloseIcon } from "./svg/close.svg";
import { StenaFlag } from "@stenajs-webui/elements";

export interface SidebarMenuCloseButtonProps extends ButtonElementProps {}

export const SidebarMenuCloseButton: React.FC<SidebarMenuCloseButtonProps> = ({
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cx(styles.sidebarMenuCloseButton, className)}
    >
      <Row justifyContent={"space-between"} alignItems={"center"} flex={1}>
        <Box className={styles.iconWrapper}>
          <CloseIcon className={styles.icon} />
        </Box>
        <StenaFlag className={styles.stenaFlag} />
      </Row>
    </button>
  );
};
