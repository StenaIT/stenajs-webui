import * as React from "react";
import { TextInput, TextInputProps } from "@stenajs-webui/forms";
import { Clickable } from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { cssColor } from "@stenajs-webui/theme";
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
      wrapperClassName={cx(
        styles.navBarSearchField,
        styles[variant],
        className
      )}
      placeholder={placeholder}
      contentRight={
        <Clickable>
          <Icon icon={faSearch} color={cssColor("--lhds-color-ui-50")} />
        </Clickable>
      }
      {...textInputProps}
    />
  );
};
