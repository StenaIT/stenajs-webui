import { ButtonElementProps } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import { forwardRef } from "react";
import styles from "./Button.module.css";
import {
  CommonButtonProps,
  getIconSizeFromButtonSize,
} from "./common/ButtonCommon";
import { getButtonLabel } from "./common/ButtonLabelFactory";
import { ButtonContent } from "./common/ButtonContent";
import styled from "@emotion/styled";
import { width, WidthProps } from "styled-system";

export interface PrimaryButtonProps
  extends CommonButtonProps,
    ButtonElementProps,
    WidthProps {}

const Button = styled.button(width);

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  function PrimaryButton(
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

    return (
      <Button
        ref={ref}
        onClick={disabled || success || loading ? undefined : onClick}
        className={cx(
          styles.button,
          styles[size],
          styles[variant],
          !hasLabel && styles.iconButton,
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
          iconSize={getIconSizeFromButtonSize(size, hasLabel)}
          rightIcon={rightIcon}
          label={buttonLabel}
          iconClassName={iconClassName}
          labelClassName={labelClassName}
          spinnerClassName={spinnerClassName}
          leftWrapperClassName={leftWrapperClassName}
          rightWrapperClassName={rightWrapperClassName}
        />
      </Button>
    );
  }
);
