import { FlatButtonProps, stenaBellFilled } from "@stenajs-webui/elements";
import * as React from "react";
import cx from "classnames";
import styles from "./NavBarNotificationButton.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { BaseButton } from "@stenajs-webui/elements";

export interface NavBarNotificationButtonProps
  extends Omit<FlatButtonProps, "leftIcon" | "rightIcon" | "label"> {
  count: number;
  unread: boolean;
  icon?: IconDefinition;
}

export const NavBarNotificationButton: React.FC<
  NavBarNotificationButtonProps
> = ({
  count,
  unread = false,
  className,
  labelClassName,
  iconClassName,
  icon = stenaBellFilled,
  ...buttonProps
}) => {
  const hasCount = count > 1;

  return (
    <BaseButton
      {...buttonProps}
      leftIcon={icon}
      className={cx(
        styles.navBarNotificationButton,
        unread && styles.unread,
        hasCount && styles.hasCount,
        className
      )}
      label={hasCount ? String(count) : undefined}
      labelClassName={cx(labelClassName, styles.label)}
      iconClassName={cx(iconClassName, styles.icon)}
    />
  );
};
