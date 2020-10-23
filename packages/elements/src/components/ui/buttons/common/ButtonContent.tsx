import * as React from "react";
import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import styles from "../Button.module.css";
import cx from "classnames";
import { InputSpinner } from "../../spinner/InputSpinner";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface ButtonContentProps {
  label?: string;
  loading?: boolean;
  left?: ReactNode;
  leftIcon?: IconDefinition;
  right?: ReactNode;
  rightIcon?: IconDefinition;
  success?: boolean;
}

export const ButtonContent: React.FC<ButtonContentProps> = ({
  success,
  loading,
  leftIcon,
  left,
  right,
  rightIcon,
  label,
}) => {
  return (
    <>
      {success ? (
        <FontAwesomeIcon icon={faCheck} className={styles.iconLeft} />
      ) : loading ? (
        <div className={cx(styles.iconLeft, styles.spinnerLeft)}>
          <InputSpinner />
        </div>
      ) : left ? (
        left
      ) : leftIcon ? (
        <FontAwesomeIcon icon={leftIcon} className={styles.iconLeft} />
      ) : null}

      {label && <span>{label}</span>}

      {right ? (
        right
      ) : rightIcon ? (
        <FontAwesomeIcon icon={rightIcon} className={styles.iconRight} />
      ) : null}
    </>
  );
};
