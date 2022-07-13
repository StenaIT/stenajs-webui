import { ButtonElementProps } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import { forwardRef } from "react";
import styles from "./Button.module.css";
import { CommonButtonProps } from "./common/ButtonCommon";
import { getButtonLabel } from "./common/ButtonLabelFactory";
import { ButtonContent } from "./common/ButtonContent";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { width, WidthProps } from "styled-system";
import contentStyles from "./common/ButtonContent.module.css";

export interface PrimaryButtonProps
  extends CommonButtonProps,
    ButtonElementProps,
    WidthProps {}

const iconButtonStyles = css`
  padding: var(--swui-button-padding-vertical);
  color: var(--current-icon-color);
  flex: none;

  border-radius: var(--swui-button-border-radius-icon-only);

  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  display: flex;

  &.small {
    width: 24px;
    height: 24px;
  }

  &.large {
    width: 40px;
    height: 40px;
    --current-icon-height: var(--swui-button-icon-height-large);
  }
`;

const Button = styled.button<{ showLabelBreakpoint?: string }>`
  ${width}

  ${({ showLabelBreakpoint }) =>
    showLabelBreakpoint &&
    css`
      ${iconButtonStyles}

      .${contentStyles.label} {
        display: none;
      }

      @media screen and (min-width: ${showLabelBreakpoint}) {
        padding: var(--swui-button-padding-vertical) var(--swui-button-padding-horizontal);
        color: var(--current-text-color);
        flex: initial;

        border-radius: var(--swui-button-border-radius);

        width: auto;
        height: auto;
        justify-content: center;
        align-items: center;
        display: inline-flex;

        &.small {
          width: auto;
          height: auto;
        }

        &.large {
          width: auto;
          height: auto;
          --current-icon-height: var(--swui-button-icon-height);
        }

        .${contentStyles.label} {
          display: inline;
        }
    `}
`;

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
      showLabelBreakpoint,
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
        showLabelBreakpoint={showLabelBreakpoint}
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
        />
      </Button>
    );
  }
);
