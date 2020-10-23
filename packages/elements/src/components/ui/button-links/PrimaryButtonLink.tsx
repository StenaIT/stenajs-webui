import * as React from "react";
import cx from "classnames";
import styles from "../buttons/Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { InputSpinner } from "../spinner/InputSpinner";
import { AnchorElementProps } from "@stenajs-webui/core";
import { CommonButtonProps } from "../buttons/ButtonCommon";
import { getButtonLabel } from "../buttons/util/ButtonLabelFactory";

export interface PrimaryButtonLinkProps
  extends CommonButtonProps,
    AnchorElementProps {}

export const PrimaryButtonLink: React.FC<PrimaryButtonLinkProps> = ({
  label,
  className,
  size = "normal",
  loadingLabel,
  loading = false,
  success = false,
  successLabel,
  leftIcon,
  left,
  rightIcon,
  right,
  variant = "normal",
  innerRef,
  ...anchorProps
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
    <a
      ref={innerRef}
      className={cx(
        styles.button,
        styles[size],
        styles[variant],
        !hasLabel && styles.iconButton,
        className
      )}
      {...anchorProps}
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
    </a>
  );
};
