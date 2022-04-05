import { FlatButton, FlatButtonProps } from "@stenajs-webui/elements";
import * as React from "react";
import cx from "classnames";
import styles from "./NavBarButton.module.css";

export interface NavBarButtonProps extends FlatButtonProps {
  selected?: boolean;
}

export const NavBarButton: React.FC<NavBarButtonProps> = ({
  selected,
  className,
  ...buttonProps
}) => {
  return (
    <FlatButton
      {...buttonProps}
      className={cx(
        styles.navBarButton,
        selected && styles.selected,
        className
      )}
    />
  );
};
