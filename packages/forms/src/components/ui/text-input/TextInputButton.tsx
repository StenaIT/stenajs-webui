import * as React from "react";
import styles from "./TextInputButton.module.css";
import { ButtonElementProps } from "@stenajs-webui/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Icon } from "@stenajs-webui/elements";
import cx from "classnames";

export type TextInputButtonVariant = "normal" | "danger";

export interface TextInputButtonProps extends ButtonElementProps {
  variant?: TextInputButtonVariant;
  icon: IconDefinition;
}

export const TextInputButton: React.FC<TextInputButtonProps> = ({
  variant = "normal",
  icon,
  className,
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      className={cx(styles.textInputButton, styles[variant], className)}
    >
      <Icon icon={icon} size={20} className={styles.icon} />
    </button>
  );
};
