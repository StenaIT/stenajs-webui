import * as React from "react";
import { TextInput, TextInputProps } from "@stenajs-webui/forms";
import cx from "classnames";
import styles from "./NavBarSearchField.module.css";
import { ButtonElementProps } from "@stenajs-webui/core";
import { stenaTimes, TextInputButton } from "@stenajs-webui/elements";

export interface NavBarSearchFieldProps extends TextInputProps {
  showClearButton?: boolean;
  onClickClearButton?: ButtonElementProps["onClick"];
}

export const NavBarSearchField: React.FC<NavBarSearchFieldProps> = ({
  placeholder = "Search",
  className,
  wrapperClassName,
  showClearButton,
  onClickClearButton,
  value,
  ...textInputProps
}) => {
  return (
    <TextInput
      wrapperClassName={cx(
        styles.navBarSearchFieldWrapper,
        showClearButton ? styles.withButton : undefined,
        wrapperClassName,
      )}
      className={cx(styles.navBarSearchFieldInput, className)}
      placeholder={placeholder}
      value={value}
      buttonRight={
        value && showClearButton ? (
          <TextInputButton
            className={styles.clearButton}
            icon={stenaTimes}
            variant={"error"}
            onClick={onClickClearButton}
          />
        ) : undefined
      }
      {...textInputProps}
    />
  );
};
