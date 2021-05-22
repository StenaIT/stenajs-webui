import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Row, Space, Text } from "@stenajs-webui/core";
import * as React from "react";
import { forwardRef, useCallback, useContext } from "react";
import { Icon } from "../icon/Icon";
import { ActionMenuContext } from "./ActionMenuContext";
import cx from "classnames";

import styles from "./ActionMenu.module.css";

export type ActionMenuItemVariant = "standard" | "danger";

export interface ActionMenuItemProps {
  label: string;
  variant?: ActionMenuItemVariant;
  rightText?: string;
  icon?: IconDefinition;
  iconRight?: IconDefinition;
  disabled?: boolean;
  disableCloseOnClick?: boolean;
  onClick?: () => void;
}

export const ActionMenuItem = forwardRef<
  HTMLButtonElement,
  ActionMenuItemProps
>(function ActionMenuItem(
  {
    label,
    variant = "standard",
    icon,
    iconRight,
    rightText,
    disabled,
    onClick,
    children,
    disableCloseOnClick,
  },
  ref
) {
  const { close } = useContext(ActionMenuContext);

  const onClickHandler = useCallback(() => {
    if (close && !disableCloseOnClick) {
      close();
    }
    if (onClick) {
      onClick();
    }
  }, [onClick, close, disableCloseOnClick]);

  return (
    <button
      className={cx(styles.Item, styles[variant])}
      onClick={disabled ? undefined : onClickHandler}
      disabled={disabled}
      ref={ref}
    >
      <Row
        width={"100%"}
        indent={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Row alignItems={"center"}>
          {icon && (
            <>
              <Icon
                className={styles.ItemIcon}
                icon={icon}
                fixedWidth
                size={16}
              />
              <Space />
            </>
          )}
          <Text className={styles.ItemLabel} whiteSpace={"nowrap"}>
            {label}
          </Text>
        </Row>
        {rightText && (
          <Text
            className={styles.ItemText}
            size={"small"}
            whiteSpace={"nowrap"}
          >
            {rightText}
          </Text>
        )}
        {children && (
          <>
            <Space />
            {children}
          </>
        )}
        {iconRight && (
          <>
            <Space />
            <Icon className={styles.ItemIcon} icon={iconRight} size={14} />
          </>
        )}
      </Row>
    </button>
  );
});
