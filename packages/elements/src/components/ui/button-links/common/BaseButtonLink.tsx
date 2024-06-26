import * as React from "react";
import { forwardRef } from "react";
import cx from "classnames";
import baseButtonStyles from "../../buttons/common/BaseButton.module.css";
import buttonLinkStyles from "../ButtonLink.module.css";
import { AnchorElementProps } from "@stenajs-webui/core";
import { CommonButtonProps } from "../../buttons/common/ButtonCommon";
import { getButtonLabel } from "../../buttons/common/ButtonLabelFactory";
import { ButtonContent } from "../../buttons/common/ButtonContent";
import buttonBaseStyles from "../../buttons/common/BaseButton.module.css";

export interface BaseButtonLinkProps
  extends CommonButtonProps,
    AnchorElementProps {}

export const BaseButtonLink = forwardRef<
  HTMLAnchorElement,
  BaseButtonLinkProps
>(function BaseButtonLink(
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
    responsiveIconOnly,
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

  const labelOnly = hasLabel && !left && !leftIcon && !right && !rightIcon;
  const iconOnly = leftIcon && !hasLabel && !left && !right && !rightIcon;

  return (
    <a
      ref={ref}
      className={cx(
        buttonLinkStyles.buttonLink,
        baseButtonStyles.button,
        baseButtonStyles[size],
        iconOnly && buttonBaseStyles.iconOnly,
        labelOnly && buttonBaseStyles.labelOnly,
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
        responsiveIconOnly={responsiveIconOnly}
      />
    </a>
  );
});
