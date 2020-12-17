import * as React from "react";
import { TextInput, TextInputProps } from "@stenajs-webui/forms";
import { Clickable } from "@stenajs-webui/core";
import { Icon, stenaSearch } from "@stenajs-webui/elements";
import cx from "classnames";
import styles from "./NavBarSearchField.module.css";
import { useNavBarVariant } from "./NavBarVariantContext";

interface NavBarSearchFieldProps extends TextInputProps {}

export const NavBarSearchField: React.FC<NavBarSearchFieldProps> = ({
  placeholder = "Search...",
  className,
  ...textInputProps
}) => {
  const variant = useNavBarVariant();
  return (
    <TextInput
      className={cx(styles.navBarSearchField, styles[variant], className)}
      placeholder={placeholder}
      contentRight={
        <Clickable>
          <Icon icon={stenaSearch} />
        </Clickable>
      }
      {...textInputProps}
    />
  );
};
