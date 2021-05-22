import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { AnchorElementProps, Row, Space, Text } from "@stenajs-webui/core";
import * as React from "react";
import { forwardRef, useCallback, useContext } from "react";
import { Icon } from "../icon/Icon";
import { ActionMenuContext } from "./ActionMenuContext";
import { ActionMenuItemProps, ActionMenuItemVariant } from "./ActionMenuItem";
import cx from "classnames";
import { useForwardedRef } from "@stenajs-webui/core";

import styles from "./ActionMenu.module.css";

export interface ActionMenuLinkProps extends AnchorElementProps {
  label: string;
  rightText?: string;
  variant?: ActionMenuItemVariant;
  icon?: IconDefinition;
  iconRight?: IconDefinition;
  disabled?: boolean;
  disableCloseOnClick?: boolean;
  onClick?: () => void;
}

export const ActionMenuLink = forwardRef<
  HTMLAnchorElement,
  ActionMenuLinkProps
>(function ActionMenuLink(
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
    href,
    ...anchorProps
  },
  ref: React.Ref<HTMLAnchorElement>
) {
  const { close } = useContext(ActionMenuContext);
  const innerRef = useForwardedRef<HTMLAnchorElement>(ref);

  const onClickHandler = useCallback(() => {
    if (close && !disableCloseOnClick) {
      close();
    }
    if (onClick) {
      onClick();
    }
  }, [onClick, close, disableCloseOnClick]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === " ") {
      event.preventDefault();
      innerRef?.current.click();
    }
  };

  return (
    <a
      className={cx(styles.Item, styles[variant])}
      onClick={disabled ? undefined : onClickHandler}
      onKeyDown={onKeyDown}
      aria-disabled={disabled}
      href={disabled ? undefined : href}
      ref={innerRef}
      {...anchorProps}
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
    </a>
  );
});
