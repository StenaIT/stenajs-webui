import * as React from "react";
import cx from "classnames";
import styles from "../buttons/Button.module.css";
import buttonLinkStyles from "./ButtonLink.module.css";
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
        buttonLinkStyles.buttonLink,
        styles.button,
        styles[size],
        styles[variant],
        !hasLabel && styles.iconButton,
        className
      )}
      {...anchorProps}
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
    </a>
  );
};
