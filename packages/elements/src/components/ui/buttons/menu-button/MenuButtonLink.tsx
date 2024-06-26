import * as React from "react";
import { forwardRef, ReactNode } from "react";
import { AnchorElementProps, Box } from "@stenajs-webui/core";
import cx from "classnames";
import styles from "./MenuButton.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { MenuButtonContent } from "./internal/MenuButtonContent";
import { MenuButtonVariant } from "./MenuButton";

export type MenuButtonLinkRenderer = (
  anchorProps: AnchorElementProps,
  activeClassName: string
) => ReactNode;

export type MenuButtonLinkProps =
  | MenuButtonLinkNotSelectedProps
  | MenuButtonLinkWithSelectedProps
  | MenuButtonLinkWithRenderLinkProps;

interface MenuButtonCommonProps extends AnchorElementProps {
  label: string;
  leftIcon?: IconDefinition;
  variant?: MenuButtonVariant;
  disabled?: boolean;
}

export interface MenuButtonLinkNotSelectedProps extends MenuButtonCommonProps {
  renderLink?: never;
  selected?: never;
}

export interface MenuButtonLinkWithSelectedProps extends MenuButtonCommonProps {
  renderLink?: never;
  selected?: boolean;
}

export interface MenuButtonLinkWithRenderLinkProps
  extends MenuButtonCommonProps {
  renderLink?: MenuButtonLinkRenderer;
  selected?: never;
}

export const MenuButtonLink = forwardRef<
  HTMLAnchorElement,
  MenuButtonLinkProps
>(function (
  {
    label,
    className,
    leftIcon,
    disabled,
    variant = "standard",
    href,
    ...linkProps
  },
  ref
) {
  const innerChildren = <MenuButtonContent label={label} leftIcon={leftIcon} />;

  const renderLinkProps = "renderLink" in linkProps ? linkProps : undefined;
  const noRenderLinkProps = "selected" in linkProps ? linkProps : undefined;

  const linkClassName = cx(
    styles.button,
    styles.buttonLink,
    label ? styles.hasLabel : undefined,
    disabled && styles.disabled,
    noRenderLinkProps?.selected && styles.selected,
    styles[variant],
    className
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { renderLink, selected, ...anchorProps } = linkProps;

  const link = renderLinkProps?.renderLink?.(
    {
      ...anchorProps,
      className: linkClassName,
      href: disabled ? undefined : href,
      children: innerChildren,
    },
    styles.selected
  ) ?? (
    <a
      className={linkClassName}
      href={disabled ? undefined : href}
      ref={ref}
      {...anchorProps}
    >
      {innerChildren}
    </a>
  );

  return (
    <Box className={cx(styles.menuButton)} width={"100%"}>
      {link}
    </Box>
  );
});
