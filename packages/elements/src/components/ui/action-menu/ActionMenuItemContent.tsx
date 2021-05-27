import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Box, Row, Space, Text } from "@stenajs-webui/core";
import * as React from "react";
import { forwardRef, PropsWithChildren } from "react";
import { Icon } from "../icon/Icon";
import cx from "classnames";
import { InputSpinner } from "../spinner/InputSpinner";
import { useFocusManager } from "@react-aria/focus";

import styles from "./ActionMenuItem.module.css";

export type ActionMenuItemNoButtonVariant = "standard" | "danger";

export interface ActionMenuItemNoButtonProps {
  label: string;
  variant?: ActionMenuItemNoButtonVariant;
  rightText?: string;
  icon?: IconDefinition;
  iconRight?: IconDefinition;
  disabled?: boolean;
  loading?: boolean;
}

export const ActionMenuItemContent = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ActionMenuItemNoButtonProps>
>(function ActionMenuItemNoButton(
  {
    label,
    variant = "standard",
    icon,
    iconRight,
    rightText,
    disabled,
    children,
    loading,
    ...divProps
  },
  ref
) {
  const focusManager = useFocusManager();
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
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
    <div
      className={cx(
        styles.actionMenuItem,
        styles.ItemNoButton,
        styles[variant]
      )}
      onKeyDown={onKeyDown}
      aria-disabled={disabled}
      ref={ref}
      {...divProps}
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
    </div>
  );
});
