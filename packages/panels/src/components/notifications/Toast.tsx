import { Box, BoxProps, Row, Space } from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { ToastHeader, ToastHeaderProps } from "./ToastHeader";
import { FlatButton, stenaTimes } from "@stenajs-webui/elements";
import styles from "./Toast.module.css";
import cx from "classnames";

export interface ToastProps
  extends Pick<BoxProps, "children" | "width">,
    ToastHeaderProps {
  /** What happens on clicking the toast. */
  onClick?: () => void;
  /** Description of what happens on clicking the toast for accessibility. */
  onClickAriaLabel?: string;
  /** What happens on clicking close. */
  onClose?: () => void;
  /** Whether to hide the close button. */
  disableClose?: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  onClick,
  onClickAriaLabel = "Open notification",
  onClose,
  disableClose = false,
  children,
  width = 264,
  ...headerProps
}) => (
  <Box
    borderRadius={8}
    background={cssColor("--lhds-color-ui-50")}
    shadow={"popover"}
    width={width}
    role={"alert"}
    position={"relative"}
  >
    <Row
      alignItems={"flex-start"}
      indent
      spacing
      className={cx({ [styles.nonClickable]: onClick })}
    >
      <ToastHeader {...headerProps} />
      {!disableClose && (
        <Box
          flex={"none"}
          justifyContent={"center"}
          style={{
            height: "calc(20px + 2 * var(--swui-metrics-spacing))",
          }}
        >
          <FlatButton
            leftIcon={stenaTimes}
            onClick={onClose}
            aria-label={"Close"}
          />
        </Box>
      )}
    </Row>
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
