import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Row, Space, Text, Box } from "@stenajs-webui/core";
import * as React from "react";
import { forwardRef, useCallback, useContext } from "react";
import { Icon } from "../icon/Icon";
import { ActionMenuContext } from "./ActionMenuContext";
import cx from "classnames";
import { InputSpinner } from "../spinner/InputSpinner";
import { useFocusManager } from "@react-aria/focus";

import styles from "./ActionMenu.module.css";

export type ActionMenuItemVariant = "standard" | "danger";

export interface ActionMenuItemProps {
  id?: string;
  label: string;
  variant?: ActionMenuItemVariant;
  rightText?: string;
  icon?: IconDefinition;
  iconRight?: IconDefinition;
  disabled?: boolean;
  disableCloseOnClick?: boolean;
  loading?: boolean;
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
    loading,
    id,
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

  const focusManager = useFocusManager();
  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
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
    }
  };

  return (
    <button
      id={id}
      className={cx(styles.Item, styles[variant])}
      onKeyDown={onKeyDown}
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
          {loading ? (
            <>
              <Box width={20} alignItems={"center"}>
                <InputSpinner />
              </Box>
              <Space />
            </>
          ) : (
            icon && (
              <>
                <Icon
                  className={styles.ItemIcon}
                  icon={icon}
                  fixedWidth
                  size={16}
                />
                <Space />
              </>
            )
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
