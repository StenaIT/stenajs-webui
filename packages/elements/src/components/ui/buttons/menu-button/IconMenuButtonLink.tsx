import * as React from "react";
import { forwardRef } from "react";
import { AnchorElementProps, Box, Row } from "@stenajs-webui/core";
import cx from "classnames";
import styles from "./MenuButton.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { MenuButtonVariant } from "./MenuButton";
import { Icon } from "../../icon/Icon";
import { MenuButtonLinkRenderer } from "./MenuButtonLink";

export type IconMenuButtonLinkProps =
  | IconMenuButtonLinkNotSelectedProps
  | IconMenuButtonLinkWithSelectedProps
  | IconMenuButtonLinkWithRenderLinkProps;

interface IconMenuButtonCommonProps extends AnchorElementProps {
  icon: IconDefinition;
  variant?: MenuButtonVariant;
  disabled?: boolean;
}

export interface IconMenuButtonLinkNotSelectedProps
  extends IconMenuButtonCommonProps {
  renderLink?: never;
  selected?: never;
}

export interface IconMenuButtonLinkWithSelectedProps
  extends IconMenuButtonCommonProps {
  renderLink?: never;
  selected?: boolean;
}

export interface IconMenuButtonLinkWithRenderLinkProps
  extends IconMenuButtonCommonProps {
  renderLink?: MenuButtonLinkRenderer;
  selected?: never;
}

export const IconMenuButtonLink = forwardRef<
  HTMLAnchorElement,
  IconMenuButtonLinkProps
>(function (
  { className, icon, disabled, variant = "standard", href, ...linkProps },
  ref,
) {
  const innerChildren = (
    <Row justifyContent={"center"} indent={1}>
      <Box alignItems={"center"} justifyContent={"center"} width={"20px"}>
        <Icon
          icon={icon}
          size={20}
          color={"var(--current-text-color)"}
          data-hover={true}
        />
      </Box>
    </Row>
  );

  const renderLinkProps = "renderLink" in linkProps ? linkProps : undefined;
  const noRenderLinkProps = "selected" in linkProps ? linkProps : undefined;

  const linkClassName = cx(
    styles.button,
    styles.buttonLink,
    disabled && styles.disabled,
    noRenderLinkProps?.selected && styles.selected,
    styles.iconOnly,
    styles[variant],
    className,
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
    styles.selected,
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
    <Box
      className={cx(styles.menuButton)}
      width={"100%"}
      borderRadius={"99rem"}
      overflow={"hidden"}
      justifyContent={"space-between"}
    >
      {link}
    </Box>
  );
});
