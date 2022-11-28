import { ButtonElementProps } from "@stenajs-webui/core";
import * as React from "react";
import { forwardRef } from "react";
import cx from "classnames";

import styles from "./ActionMenuItem.module.css";
import { ButtonContentProps } from "../buttons/common/ButtonContent";
import { useActionMenuLogic } from "./UseActionMenuLogic";
import { ActionMenuCommonContent } from "./ActionMenuCommonContent";

export type ActionMenuItemVariant = "standard" | "danger" | "success";

export interface ActionMenuItemProps
  extends Omit<ButtonElementProps, "children">,
    ButtonContentProps {
  variant?: ActionMenuItemVariant;
  disableCloseOnClick?: boolean;
}

export const ActionMenuItem = forwardRef<
  HTMLButtonElement,
  ActionMenuItemProps
>(function ActionMenuItem(
  {
    success,
    loading,
    leftIcon,
    left,
    right,
    rightIcon,
    label,
    iconClassName,
    labelClassName,
    spinnerClassName,
    leftWrapperClassName,
    variant = "standard",
    className,
    onClick,
    disableCloseOnClick,
    ...props
  },
  ref
) {
  const { onClickHandler, onKeyDown, innerRef } = useActionMenuLogic(
    { disableCloseOnClick, onClick },
    ref
  );

  return (
    <button
      {...props}
      className={cx(styles.actionMenuItem, styles[variant], className)}
      onKeyDown={onKeyDown}
      onClick={props.disabled ? undefined : onClickHandler}
      ref={innerRef}
    >
      <ActionMenuCommonContent
        success={success}
        loading={loading}
        leftIcon={leftIcon}
        left={left}
        right={right}
        rightIcon={rightIcon}
        label={label}
      />
    </button>
  );
});
