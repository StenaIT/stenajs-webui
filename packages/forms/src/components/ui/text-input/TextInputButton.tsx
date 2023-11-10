import * as React from "react";
import styles from "./TextInputButton.module.css";
import { ButtonElementProps } from "@stenajs-webui/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  Icon,
  MediumIcon,
  stenaCheck,
  stenaExclamationTriangle,
  stenaInfoCircle,
} from "@stenajs-webui/elements";
import cx from "classnames";
import { forwardRef } from "react";

export type TextInputButtonVariant = "normal" | "error" | "warning" | "success";

export interface TextInputButtonProps extends ButtonElementProps {
  variant?: TextInputButtonVariant;
  icon?: IconDefinition;
  spin?: boolean;
}

const variantToIcon: Record<TextInputButtonVariant, MediumIcon> = {
  normal: stenaInfoCircle,
  error: stenaExclamationTriangle,
  warning: stenaExclamationTriangle,
  success: stenaCheck,
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
    ...buttonProps
  },
  ref
) {
  return (
    <button
      {...buttonProps}
      ref={ref}
      className={cx(styles.textInputButton, styles[variant], className)}
    >
      <Icon icon={icon} size={20} className={styles.icon} spin={spin} />
    </button>
  );
});
