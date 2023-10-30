import { ButtonElementProps } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import { forwardRef } from "react";
import buttonBaseStyles from "./BaseButton.module.css";
import { CommonButtonProps } from "./ButtonCommon";
import { getButtonLabel } from "./ButtonLabelFactory";
import { ButtonContent } from "./ButtonContent";

export interface BaseButtonProps
  extends CommonButtonProps,
    ButtonElementProps {}

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  function BaseButton(
    {
      label,
      className,
      size = "medium",
      loadingLabel,
      loading = false,
      success = false,
      successLabel,
      leftIcon,
      left,
      rightIcon,
      right,
      variant = "normal",
      disabled,
      onClick,
      iconClassName,
      labelClassName,
      spinnerClassName,
      leftWrapperClassName,
      rightWrapperClassName,
      responsiveIconOnly,
      ...buttonProps
    },
    ref
  ) {
    const buttonLabel = getButtonLabel(
      label,
      success,
      successLabel,
      loading,
      loadingLabel
    );

    const hasLabel = Boolean(
      (label && !success && !loading) ||
        (success && successLabel) ||
        (loading && loadingLabel)
    );

    const labelOnly = hasLabel && !left && !leftIcon && !right && !rightIcon;
    const iconOnly = leftIcon && !hasLabel && !left && !right && !rightIcon;

    return (
      <button
        ref={ref}
        onClick={disabled || success || loading ? undefined : onClick}
        className={cx(
          buttonBaseStyles.button,
          buttonBaseStyles[size],
          iconOnly && buttonBaseStyles.iconOnly,
          labelOnly && buttonBaseStyles.labelOnly,
          className
        )}
        disabled={disabled}
        {...buttonProps}
      >
        <ButtonContent
          success={success}
          loading={loading}
          leftIcon={leftIcon}
          left={left}
          right={right}
          rightIcon={rightIcon}
          label={buttonLabel}
          iconClassName={iconClassName}
          labelClassName={labelClassName}
          spinnerClassName={spinnerClassName}
          leftWrapperClassName={leftWrapperClassName}
          rightWrapperClassName={rightWrapperClassName}
          size={size}
          responsiveIconOnly={responsiveIconOnly}
        />
      </button>
    );
  }
);
