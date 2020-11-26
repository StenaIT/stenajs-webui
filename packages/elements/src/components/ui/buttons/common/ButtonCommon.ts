import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ReactNode } from "react";

export type ButtonSize = "medium" | "small" | "large";
export type ButtonVariant = "normal" | "danger" | "success";

export interface CommonButtonProps {
  /** The text on the button. */
  label?: string;
  /** The variant to use. */
  variant?: ButtonVariant;
  /** The content to show when loading. */
  loadingLabel?: string;
  /** The size of the button, can be 'small', 'normal' or 'large' */
  size?: ButtonSize;
  /** Render loading spinner instead of button. */
  loading?: boolean;
  /** Render success check icon instead of button. */
  success?: boolean;
  /** The content to show on success. */
  successLabel?: string;
  /** FontAwesome icon to place to the left of the text. */
  leftIcon?: IconDefinition;
  /** React element to place to the left of the text. */
  left?: ReactNode;
  /** FontAwesome icon to place to the right of the text. */
  rightIcon?: IconDefinition;
  /** React element to place to the right of the text. */
  right?: ReactNode;
}
