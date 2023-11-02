import * as React from "react";
import {
  TextInput,
  TextInputButton,
  TextInputProps,
} from "@stenajs-webui/forms";
import cx from "classnames";
import styles from "./NavBarSearchField.module.css";
import { ButtonElementProps } from "@stenajs-webui/core";
import { stenaTimes } from "@stenajs-webui/elements";

interface NavBarSearchFieldProps extends TextInputProps {
  showClearButton?: boolean;
  onClickClearButton?: ButtonElementProps["onClick"];
}

export const NavBarSearchField: React.FC<NavBarSearchFieldProps> = ({
  placeholder = "Search",
  className,
  wrapperClassName,
  showClearButton,
  onClickClearButton,
  ...textInputProps
}) => {
  return (
    <TextInput
      wrapperClassName={cx(
        styles.navBarSearchField,
        showClearButton ? styles.withButton : undefined,
        wrapperClassName
      )}
      className={cx(styles.navBarSearchFieldInput, className)}
      placeholder={placeholder}
      buttonRight={
        showClearButton ? (
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
