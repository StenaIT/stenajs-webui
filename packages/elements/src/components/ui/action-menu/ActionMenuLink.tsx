import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useFocusManager } from "@react-aria/focus";
import {
  AnchorElementProps,
  Row,
  Space,
  Text,
  useForwardedRef,
} from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import { forwardRef, MouseEventHandler, useCallback, useContext } from "react";
import { Icon } from "../icon/Icon";
import { ActionMenuContext } from "./ActionMenuContext";
import { ActionMenuItemVariant } from "./ActionMenuItem";
import styles from "./ActionMenuItem.module.css";

export interface ActionMenuLinkProps extends AnchorElementProps {
  label: string;
  rightText?: string;
  variant?: ActionMenuItemVariant;
  icon?: IconDefinition;
  iconRight?: IconDefinition;
  disabled?: boolean;
  disableCloseOnClick?: boolean;
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
  const innerRef = useForwardedRef<HTMLAnchorElement | null>(ref);

  const onClickHandler = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    (ev) => {
      if (close && !disableCloseOnClick) {
        close();
      }
      if (onClick) {
        onClick(ev);
      }
    },
    [onClick, close, disableCloseOnClick]
  );

  const focusManager = useFocusManager();
  const onKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        focusManager.focusNext({ wrap: true });
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        focusManager.focusPrevious({ wrap: true });
        break;
      case " ":
        event.preventDefault();
        innerRef.current?.click();
    }
  };

  return (
    <a
      className={cx(styles.actionMenuItem, styles[variant])}
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
                className={styles.actionMenuItemIcon}
                icon={icon}
                fixedWidth
                size={16}
              />
              <Space />
            </>
          )}
          <Text className={styles.actionMenuItemLabel} whiteSpace={"nowrap"}>
            {label}
          </Text>
        </Row>
        {rightText && (
          <Text
            className={styles.actionMenuItemText}
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
            <Icon
              className={styles.actionMenuItemIcon}
              icon={iconRight}
              size={14}
            />
          </>
        )}
      </Row>
    </a>
  );
});
