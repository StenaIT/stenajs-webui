import { ButtonElementProps, Row } from "@stenajs-webui/core";
import * as React from "react";
import { forwardRef } from "react";
import cx from "classnames";

import styles from "./ActionMenuItem.module.css";
import {
  ButtonContent,
  ButtonContentProps,
} from "../buttons/common/ButtonContent";
import { useActionMenuLogic } from "./UseActionMenuLogic";

export type ActionMenuItemVariant = "standard" | "danger" | "success";

export interface ActionMenuItemProps
  extends ButtonElementProps,
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
    ...props
  },
  ref
) {
  const { onClickHandler, onKeyDown, innerRef } = useActionMenuLogic(
    props,
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
      <Row
        alignItems={"center"}
        width={"100%"}
        indent={2}
        className={styles.actionMenuItemInnerContent}
      >
        <ButtonContent
          success={success}
          loading={loading}
          leftIcon={leftIcon}
          left={left}
          right={right}
          rightIcon={rightIcon}
          label={label}
          labelClassName={styles.actionMenuItemLabel}
          iconClassName={styles.actionMenuItemIcon}
          leftWrapperClassName={cx({
            [styles.actionMenuItemIconWrapper]: success || loading || leftIcon,
          })}
        />
      </Row>
    </button>
  );
});
