import { ButtonElementProps } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import styles from "./Button.module.css";
import { CommonButtonProps } from "./common/ButtonCommon";
import { getButtonLabel } from "./common/ButtonLabelFactory";
import { ButtonContent } from "./common/ButtonContent";

export interface PrimaryButtonProps
  extends CommonButtonProps,
    ButtonElementProps {}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
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
  innerRef,
  ...buttonProps
}) => {
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
    <button
      ref={innerRef}
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
        rightIcon={rightIcon}
        label={buttonLabel}
      />
    </button>
  );
};
