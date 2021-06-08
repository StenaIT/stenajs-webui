import { AnchorElementProps } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import { forwardRef } from "react";
import { ActionMenuItemVariant } from "./ActionMenuItem";
import styles from "./ActionMenuItem.module.css";
import { ButtonContentProps } from "../buttons/common/ButtonContent";
import { useActionMenuLogic } from "./UseActionMenuLogic";
import { ActionMenuCommonContent } from "./ActionMenuCommonContent";

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
      {...props}
      className={cx(styles.actionMenuItem, styles[variant], className)}
      onClick={disabled ? undefined : onClickHandler}
      onKeyDown={onKeyDown}
      aria-disabled={disabled}
      href={disabled ? undefined : href}
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
    </a>
  );
});
