import * as React from "react";
import { forwardRef } from "react";
import cx from "classnames";
import styles from "../buttons/Button.module.css";
import buttonLinkStyles from "./ButtonLink.module.css";
import { AnchorElementProps } from "@stenajs-webui/core";
import { ButtonSize, CommonButtonProps } from "../buttons/common/ButtonCommon";
import { getButtonLabel } from "../buttons/common/ButtonLabelFactory";
import { ButtonContent } from "../buttons/common/ButtonContent";

export interface PrimaryButtonLinkProps
  extends CommonButtonProps,
    AnchorElementProps {}

export const PrimaryButtonLink = forwardRef<
  HTMLAnchorElement,
  PrimaryButtonLinkProps
>(function PrimaryButtonLink(
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
    ...anchorProps
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

  const getIconSizeFromButtonSize = (): ButtonSize => {
    return size === "large" ? (hasLabel ? "medium" : "large") : size;
  };

  return (
    <a
      ref={ref}
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
        iconSize={getIconSizeFromButtonSize()}
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
});
