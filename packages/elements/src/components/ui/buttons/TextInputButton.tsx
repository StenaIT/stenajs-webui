import * as React from "react";
import { forwardRef, MouseEventHandler } from "react";
import styles from "./TextInputButton.module.css";
import baseButtonStyles from "./common/BaseButton.module.css";
import { ButtonElementProps } from "@stenajs-webui/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import cx from "classnames";
import { MediumIcon } from "../../../icons/IconSizes";
import {
  stenaCheck,
  stenaExclamationTriangle,
  stenaInfoCircle,
} from "../../../icons/generated/CommonIcons";
import { Icon } from "../icon/Icon";

export type TextInputButtonVariant =
  | "normal"
  | "error"
  | "warning"
  | "success"
  | "passive";
export type TextInputButtonSize = "medium" | "small";

export interface TextInputButtonProps extends ButtonElementProps {
  variant?: TextInputButtonVariant;
  icon?: IconDefinition;
  spin?: boolean;
  size?: TextInputButtonSize;
}

const variantToIcon: Record<TextInputButtonVariant, MediumIcon> = {
  normal: stenaInfoCircle,
  error: stenaExclamationTriangle,
  warning: stenaExclamationTriangle,
  success: stenaCheck,
  passive: stenaInfoCircle,
};

export const TextInputButton = forwardRef<
  HTMLButtonElement,
  TextInputButtonProps
>(function TextInputButton(
  {
    variant = "normal",
    icon = variantToIcon[variant],
    className,
    spin = false,
    size = "medium",
    onClick,
    ...buttonProps
  },
  ref
) {
  const onClickHandler: MouseEventHandler<HTMLButtonElement> = (ev) => {
    ev.stopPropagation();
    onClick?.(ev);
  };

  return (
    <button
      {...buttonProps}
      onClick={onClickHandler}
      ref={ref}
      className={cx(
        baseButtonStyles.button,
        styles.textInputButton,
        baseButtonStyles[size],
        styles[variant],
        className
      )}
    >
      <Icon
        icon={icon}
        size={"var(--current-icon-height)"}
        className={styles.icon}
        spin={spin}
      />
    </button>
  );
});
