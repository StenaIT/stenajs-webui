import { FlatButton, FlatButtonProps } from "@stenajs-webui/elements";
import * as React from "react";
import cx from "classnames";
import styles from "./NavBarUserButton.module.css";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  ActionMenuFlatButton,
  ActionMenuFlatButtonProps,
} from "../action-menu-button/ActionMenuFlatButton";

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
  icon = faUser,
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
      rightIcon={null}
      leftIcon={username != null ? faUser : undefined}
      label={initials ?? username}
    />
  );
};
