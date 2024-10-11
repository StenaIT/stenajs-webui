import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { ReactNode } from "react";
import cx from "classnames";
import { InputSpinner } from "../../spinner/InputSpinner";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "./ButtonContent.module.css";
import { stenaCheck } from "../../../../icons/generated/CommonIcons";
import { ButtonSize } from "./ButtonCommon";
import { Space } from "@stenajs-webui/core";

export interface ButtonContentProps {
  label?: string;
  loading?: boolean;
  left?: ReactNode;
  leftIcon?: IconDefinition;
  right?: ReactNode;
  rightIcon?: IconDefinition;
  success?: boolean;
  iconClassName?: string;
  labelClassName?: string;
  spinnerClassName?: string;
  leftWrapperClassName?: string;
  rightWrapperClassName?: string;
  size?: ButtonSize;
  responsiveIconOnly?: boolean;
}

export const ButtonContent: React.FC<ButtonContentProps> = ({
  success,
  loading,
  leftIcon,
  left,
  right,
  rightIcon,
  label,
  iconClassName,
  labelClassName,
  spinnerClassName,
  leftWrapperClassName,
  rightWrapperClassName,
  size = "medium",
  responsiveIconOnly = false,
}) => {
  const leftContent = (success || loading || leftIcon || left) && (
    <div
      className={cx(
        styles.leftWrapper,
        styles[size],
        leftWrapperClassName,
        responsiveIconOnly && styles.responsiveIconOnly,
      )}
    >
      {success ? (
        <FontAwesomeIcon
          icon={stenaCheck}
          className={cx(styles.iconLeft, iconClassName)}
        />
      ) : loading ? (
        <div
          className={cx(styles.iconLeft, styles.spinnerLeft, spinnerClassName)}
        >
          <InputSpinner />
        </div>
      ) : left ? (
        left
      ) : leftIcon ? (
        <FontAwesomeIcon
          icon={leftIcon}
          className={cx(styles.iconLeft, iconClassName)}
        />
      ) : null}
    </div>
  );

  const rightContent = (right || rightIcon) && (
    <div
      className={cx(
        styles.rightWrapper,
        styles[size],
        rightWrapperClassName,
        responsiveIconOnly && styles.responsiveIconOnly,
      )}
    >
      {right ? (
        right
      ) : rightIcon ? (
        <FontAwesomeIcon
          icon={rightIcon}
          className={cx(styles.iconRight, iconClassName)}
        />
      ) : null}
    </div>
  );

  return (
    <div className={styles.buttonContent}>
      {leftContent}
      {label ? <Space /> : null}
      {label && (
        <span
          className={cx(
            styles.label,
            labelClassName,
            responsiveIconOnly && styles.responsiveIconOnly,
          )}
        >
          {label}
        </span>
      )}
      {label ? <Space /> : null}
      {rightContent}
    </div>
  );
};
