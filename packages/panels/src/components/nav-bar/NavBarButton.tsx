import { FlatButton, FlatButtonProps } from "@stenajs-webui/elements";
import * as React from "react";
import cx from "classnames";
import styles from "./NavBarButton.module.css";
import { useNavBarVariant } from "./NavBarVariantContext";

export interface NavBarButtonProps extends FlatButtonProps {
  selected?: boolean;
}

export const NavBarButton: React.FC<NavBarButtonProps> = ({
  selected,
  className,
  ...buttonProps
}) => {
  const variant = useNavBarVariant();
  return (
    <FlatButton
      {...buttonProps}
      className={cx(
        styles.navBarButton,
        styles[variant],
        selected && styles.selected,
        className
      )}
    />
  );
};
