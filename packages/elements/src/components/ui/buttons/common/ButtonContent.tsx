import * as React from "react";
import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import { InputSpinner } from "../../spinner/InputSpinner";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "./ButtonContent.module.css";
import { stenaCheck } from "../../../../icons/ui/IconsUi";

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
}) => {
  return (
    <>
      {(success || loading || leftIcon || left) && (
        <div className={cx(styles.leftWrapper, leftWrapperClassName)}>
          {success ? (
            <FontAwesomeIcon
              icon={stenaCheck}
              className={cx(styles.iconLeft, iconClassName)}
            />
          ) : loading ? (
            <div
              className={cx(
                styles.iconLeft,
                styles.spinnerLeft,
                spinnerClassName
              )}
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
      )}

      {label && (
        <span className={cx(styles.label, labelClassName)}>{label}</span>
      )}

      {(right || rightIcon) && (
        <div className={cx(styles.rightWrapper, rightWrapperClassName)}>
          {right ? (
            right
          ) : rightIcon ? (
            <FontAwesomeIcon
              icon={rightIcon}
              className={cx(styles.iconRight, iconClassName)}
            />
          ) : null}
        </div>
      )}
    </>
  );
};
