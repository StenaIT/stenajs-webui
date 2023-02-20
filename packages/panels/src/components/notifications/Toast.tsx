import { Box, BoxProps, Space } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import styles from "./Toast.module.css";
import cx from "classnames";
import {
  NotificationHeader,
  NotificationHeaderProps,
} from "./NotificationHeader";

export interface ToastProps
  extends Pick<BoxProps, "children" | "width" | "maxWidth">,
    Omit<NotificationHeaderProps, "contentRight"> {
  /** What happens on clicking the toast. */
  onClick?: () => void;
  /** Description of what happens on clicking the toast for accessibility. */
  onClickAriaLabel?: string;
}

export const Toast: React.FC<ToastProps> = ({
  onClick,
  onClickAriaLabel,
  children,
  width = 264,
  maxWidth,
  ...headerProps
}) => (
  <Box
    borderRadius={8}
    background={cssColor("--lhds-color-ui-50")}
    shadow={"popover"}
    width={width}
    maxWidth={maxWidth}
    role={"alert"}
    position={"relative"}
  >
    <Box className={cx({ [styles.nonClickable]: onClick })}>
      <NotificationHeader {...headerProps} />
    </Box>
    {children && (
      <Box indent={3} className={cx({ [styles.nonClickable]: onClick })}>
        {children}
        <Space num={2} />
      </Box>
    )}
    {onClick && (
      <button
        onClick={onClick}
        className={styles.clickable}
        aria-label={onClickAriaLabel}
      ></button>
    )}
  </Box>
);
