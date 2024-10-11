import { ButtonElementProps } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import { forwardRef, MouseEventHandler } from "react";
import buttonBaseStyles from "./BaseButton.module.css";
import { CommonButtonProps } from "./ButtonCommon";
import { getButtonLabel } from "./ButtonLabelFactory";
import { ButtonContent } from "./ButtonContent";

export interface BaseButtonProps extends CommonButtonProps, ButtonElementProps {
  forceRound?: boolean;
}

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
      disabled,
      onClick,
      iconClassName,
      labelClassName,
      spinnerClassName,
      leftWrapperClassName,
      rightWrapperClassName,
      responsiveIconOnly,
      forceRound,
      ...buttonProps
    },
    ref,
  ) {
    const buttonLabel = getButtonLabel(
      label,
      success,
      successLabel,
      loading,
      loadingLabel,
    );

    const hasLabel = Boolean(
      (label && !success && !loading) ||
        (success && successLabel) ||
        (loading && loadingLabel),
    );

    const leftIconOnly = leftIcon && !hasLabel && !left && !right && !rightIcon;
    const rightIconOnly =
      rightIcon && !hasLabel && !left && !right && !leftIcon;
    const loadingOnly = loading && !loadingLabel;
    const successIconOnly = success && !successLabel;

    const isRound =
      forceRound ||
      leftIconOnly ||
      rightIconOnly ||
      loadingOnly ||
      successIconOnly;

    const onClickHandler: MouseEventHandler<HTMLButtonElement> = (ev) => {
      if (onClick) {
        ev.stopPropagation();
        ev.preventDefault();
        if (disabled || success || loading) {
          return;
        }
        onClick(ev);
      }
    };

    return (
      <button
        ref={ref}
        onClick={onClickHandler}
        className={cx(
          buttonBaseStyles.button,
          buttonBaseStyles[size],
          isRound && buttonBaseStyles.roundButton,
          className,
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
  },
);
