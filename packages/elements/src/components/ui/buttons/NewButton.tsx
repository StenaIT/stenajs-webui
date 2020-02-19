import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonProps } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import { MouseEventHandler, ReactNode } from "react";
import { InputSpinner } from "../../..";
import styles from "./NewButton.module.css";

export type ButtonSize = "normal" | "small" | "large";

export interface NewButtonProps extends ButtonProps {
  label?: string;
  loadingLabel?: string;
  className?: string;
  size?: ButtonSize;
  loading?: boolean;
  success?: boolean;
  successLabel?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  leftIcon?: IconDefinition;
  left?: ReactNode;
  rightIcon?: IconDefinition;
  right?: ReactNode;
}

const getButtonLabel = (
  label: string | undefined,
  success: boolean,
  successLabel: string | undefined,
  loading: boolean,
  loadingLabel: string | undefined
): string | null => {
  if (success) {
    return successLabel || null;
  } else if (loading) {
    return loadingLabel || null;
  } else {
    return label || null;
  }
};

export const NewButton: React.FC<NewButtonProps> = ({
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
  ...buttonProps
}) => {
  const buttonLabel = getButtonLabel(
    label,
    success,
    successLabel,
    loading,
    loadingLabel
  );
  return (
    <button
      ref={innerRef}
      onClick={disabled || success || loading ? undefined : onClick}
      className={cx(
        styles.button,
        styles[size],
        !label && styles.iconButton,
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

      {buttonLabel && <span>{buttonLabel}</span>}
      {right ? (
        right
      ) : rightIcon ? (
        <FontAwesomeIcon icon={rightIcon} className={styles.iconRight} />
      ) : null}
    </button>
  );
};
