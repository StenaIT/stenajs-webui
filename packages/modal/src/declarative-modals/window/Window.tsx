import { Box } from "@stenajs-webui/core";
import * as React from "react";
import { BaseWindow, BaseWindowProps } from "./BaseWindow";
import { WindowHeader, WindowHeaderProps } from "./WindowHeader";
import cx from "classnames";
import styles from "./Window.module.css";

export interface WindowProps extends BaseWindowProps, WindowHeaderProps {
  spacing?: number;
  indent?: number;
  draggable?: boolean;
  footer?: React.ReactNode;
  disableStickyFooter?: boolean;
}

export const Window: React.FC<WindowProps> = ({
  header,
  headerText,
  children,
  spacing,
  indent,
  draggable = false,
  onRequestClose,
  closeButtonClassName,
  footer,
  disableStickyFooter = false,
  ...props
}) => {
  const activeSpacing = typeof spacing === "number" ? spacing : 1;
  const activeIndent = typeof indent === "number" ? indent : 1;

  return (
    <BaseWindow
      {...props}
      onRequestClose={onRequestClose}
      draggable={draggable}
    >
      <WindowHeader
        onRequestClose={onRequestClose}
        header={header}
        headerText={headerText}
        closeButtonClassName={closeButtonClassName}
      />
      <Box spacing={activeSpacing} indent={activeIndent}>
        {children}
      </Box>
      {footer && (
        <Box
          className={cx(styles.footer, {
            [styles.stickyFooter]: !disableStickyFooter,
          })}
        >
          {footer}
        </Box>
      )}
    </BaseWindow>
  );
};
