import { FlatButton, FlatButtonProps } from "@stenajs-webui/elements";
import * as React from "react";
import styles from "./NavBarButton.module.css";
import cx from "classnames";

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
      className={cx(className, selected && styles.selected)}
      inverted
    />
  );
};
