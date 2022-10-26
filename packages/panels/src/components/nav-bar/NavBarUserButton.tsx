import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { stenaUserCircle } from "@stenajs-webui/elements";
import cx from "classnames";
import * as React from "react";
import {
  ActionMenuFlatButton,
  ActionMenuFlatButtonProps,
} from "../action-menu-button/ActionMenuFlatButton";
import styles from "./NavBarUserButton.module.css";

export interface NavBarUserButtonProps
  extends Omit<ActionMenuFlatButtonProps, "label" | "leftIcon" | "rightIcon"> {
  username?: string;
  initials?: string;
  icon?: IconDefinition;
}

export const NavBarUserButton: React.FC<NavBarUserButtonProps> = ({
  className,
  username,
  initials,
  icon = stenaUserCircle,
  iconClassName,
  ...buttonProps
}) => {
  return (
    <ActionMenuFlatButton
      {...buttonProps}
      className={cx(
        { [styles.initials]: initials != null },
        styles.navBarUserButton,
        className
      )}
      leftIcon={username != null ? icon : undefined}
      label={initials ?? username}
      disableArrow
    />
  );
};
