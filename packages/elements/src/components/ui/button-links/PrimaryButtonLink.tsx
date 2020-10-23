import * as React from "react";
import cx from "classnames";
import styles from "../buttons/Button.module.css";
import { AnchorElementProps } from "@stenajs-webui/core";
import { CommonButtonProps } from "../buttons/common/ButtonCommon";
import { getButtonLabel } from "../buttons/common/ButtonLabelFactory";
import { ButtonContent } from "../buttons/common/ButtonContent";

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
    <a ref={innerRef} className={styles.buttonLink} {...anchorProps}>
      <div
        className={cx(
          styles.button,
          styles[size],
          styles[variant],
          !hasLabel && styles.iconButton,
          className
        )}
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
      </div>
    </a>
  );
};
