import * as React from "react";
import cx from "classnames";
import styles from "./NavBarUserButton.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  ActionMenuFlatButton,
  ActionMenuFlatButtonProps,
} from "../action-menu-button/ActionMenuFlatButton";
import { stenaUser } from "@stenajs-webui/elements";
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
  icon = stenaUser,
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
