import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonProps } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import { ReactNode } from "react";
import { InputSpinner } from "../spinner/InputSpinner";
import styles from "./PrimaryButton.module.css";

export type ButtonSize = "normal" | "small" | "large";
export type ButtonVariant = "normal" | "danger" | "success";

export interface PrimaryButtonProps extends ButtonProps {
  /** The text on the button. */
  label?: React.ReactNode;
  /** The variant to use. */
  variant?: ButtonVariant;
  /** The content to show when loading. */
  loadingLabel?: React.ReactNode;
  /** The size of the button, can be 'small', 'normal' or 'large' */
  size?: ButtonSize;
  /** Render loading spinner instead of button. */
  loading?: boolean;
  /** Render success check icon instead of button. */
  success?: boolean;
  /** The content to show on success. */
  successLabel?: React.ReactNode;
  /** Disables the button. Changes to disabled color and clicks are disabled. */
  disabled?: boolean;
  /** onClick callback, called when button is clicked. */
  onClick?: () => void;
  /** FontAwesome icon to place to the left of the text. */
  leftIcon?: IconDefinition;
  /** React element to place to the left of the text. */
  left?: ReactNode;
  /** FontAwesome icon to place to the right of the text. */
  rightIcon?: IconDefinition;
  /** React element to place to the right of the text. */
  right?: ReactNode;
}

const getButtonLabel = (
  label: React.ReactNode | undefined,
  success: boolean,
  successLabel: React.ReactNode | undefined,
  loading: boolean,
  loadingLabel: React.ReactNode | undefined
): React.ReactNode | null => {
  if (success) {
    return successLabel || null;
  } else if (loading) {
    return loadingLabel || null;
  } else {
    return label || null;
  }
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  className,
  size = "normal",
  loadingLabel,
  loading = false,
  success = false,
  successLabel,
  disabled,
  leftIcon,
  left,
  rightIcon,
  right,
  onClick,
  innerRef,
  variant = "normal",
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
      {success ? (
        <FontAwesomeIcon icon={faCheck} className={styles.iconLeft} />
      ) : loading ? (
        <div className={styles.iconLeft}>
          <InputSpinner size={"100%"} />
        </div>
      ) : left ? (
        left
      ) : leftIcon ? (
        <FontAwesomeIcon icon={leftIcon} className={styles.iconLeft} />
      ) : null}

      {buttonLabel}
      {right ? (
        right
      ) : rightIcon ? (
        <FontAwesomeIcon icon={rightIcon} className={styles.iconRight} />
      ) : null}
    </button>
  );
};
