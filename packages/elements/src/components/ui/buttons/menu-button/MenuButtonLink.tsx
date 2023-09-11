import * as React from "react";
import { forwardRef } from "react";
import { AnchorElementProps, Box, Row } from "@stenajs-webui/core";
import cx from "classnames";
import styles from "./MenuButton.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { MenuButtonContent } from "./MenuButtonContent";

export type MenuButtonVariant = "standard" | "danger";

export interface MenuButtonLinkProps extends AnchorElementProps {
  label: string;
  leftIcon?: IconDefinition;
  variant?: MenuButtonVariant;
  disabled?: boolean;
}

export const MenuButtonLink = forwardRef<
  HTMLAnchorElement,
  MenuButtonLinkProps
>(function (
  {
    label,
    className,
    leftIcon,
    children,
    disabled,
    variant = "standard",
    href,
    ...linkProps
  }: MenuButtonLinkProps,
  ref
) {
  return (
    <Box
      className={cx(
        styles.menuButton,
        disabled && styles.disabled,
        styles[variant]
      )}
    >
      <Box
        width={"100%"}
        borderRadius={"99rem"}
        overflow={"hidden"}
        justifyContent={"space-between"}
      >
        <a
          className={cx(styles.button, styles.buttonLink, className)}
          href={disabled ? undefined : href}
          ref={ref}
          {...linkProps}
        >
          <Row justifyContent={"space-between"} indent={2}>
            <MenuButtonContent label={label} leftIcon={leftIcon} />
          </Row>
        </a>
      </Box>
    </Box>
  );
});
