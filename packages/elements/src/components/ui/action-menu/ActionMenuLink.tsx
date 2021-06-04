import { AnchorElementProps, Row } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import { forwardRef } from "react";
import { ActionMenuItemVariant } from "./ActionMenuItem";
import styles from "./ActionMenuItem.module.css";
import {
  ButtonContent,
  ButtonContentProps,
} from "../buttons/common/ButtonContent";
import { useActionMenuLogic } from "./UseActionMenuLogic";

export interface ActionMenuLinkProps
  extends AnchorElementProps,
    ButtonContentProps {
  variant?: ActionMenuItemVariant;
  disabled?: boolean;
  disableCloseOnClick?: boolean;
}

export const ActionMenuLink = forwardRef<
  HTMLAnchorElement,
  ActionMenuLinkProps
>(function ActionMenuLink(
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
    disabled,
    href,
    ...props
  },
  ref: React.Ref<HTMLAnchorElement>
) {
  const { onClickHandler, onKeyDown, innerRef } = useActionMenuLogic(
    props,
    ref
  );

  return (
    <a
      className={cx(styles.actionMenuItem, styles[variant], className)}
      onClick={disabled ? undefined : onClickHandler}
      onKeyDown={onKeyDown}
      aria-disabled={disabled}
      href={disabled ? undefined : href}
      ref={innerRef}
      {...props}
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
    </a>
  );
});
