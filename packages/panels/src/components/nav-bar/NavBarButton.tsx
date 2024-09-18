import { FlatButton, FlatButtonProps } from "@stenajs-webui/elements";
import * as React from "react";
import { forwardRef } from "react";
import cx from "classnames";
import styles from "./NavBarButton.module.css";

export interface NavBarButtonProps extends FlatButtonProps {
  selected?: boolean;
}

export const NavBarButton = forwardRef<HTMLButtonElement, NavBarButtonProps>(
  function ({ selected, className, ...buttonProps }, ref) {
    return (
      <FlatButton
        {...buttonProps}
        ref={ref}
        className={cx(
          styles.navBarButton,
          selected && styles.selected,
          className
        )}
      />
    );
  }
);
