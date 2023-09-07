import { Box, ButtonElementProps, Indent, Row } from "@stenajs-webui/core";
import * as React from "react";
import { CSSProperties, ReactNode } from "react";
import { ButtonContent, ButtonContentProps } from "@stenajs-webui/elements";
import contentStyles from "./SidebarMenuContent.module.css";
import cx from "classnames";

export type RenderLinkProps = ButtonElementProps & { activeClassName: string };

export interface SidebarMenuLinkProps
  extends ButtonElementProps,
    Pick<
      ButtonContentProps,
      | "label"
      | "loading"
      | "left"
      | "leftIcon"
      | "right"
      | "rightIcon"
      | "success"
    > {
  renderLink?: SidebarLinkRenderer;
  width?: CSSProperties["width"];
  selected?: boolean;
}

export type SidebarLinkRenderer = (props: RenderLinkProps) => ReactNode;

export const defaultRenderLink: SidebarLinkRenderer = ({
  activeClassName,
  ...props
}) => {
  return <button {...props} />;
};

export const SidebarMenuLink: React.FC<SidebarMenuLinkProps> = ({
  className,
  children,
  selected,
  label,
  loading,
  left,
  leftIcon,
  right,
  rightIcon,
  success,
  width,
  renderLink = defaultRenderLink,
  style,
  ...buttonProps
}) => {
  const hasContentLeft = left || leftIcon || loading || success;

  const innerClassName = cx(
    contentStyles.button,
    selected ? contentStyles.selected : undefined,
    className
  );

  const innerStyle = {
    ...style,
    width,
    height: "var(--swui-sidebar-menu-item-height)",
  };

  const innerChildren = (
    <Row spacing={1} flex={1} alignItems={"center"}>
      <Indent num={hasContentLeft ? 0.5 : 1} />
      <ButtonContent
        label={label}
        loading={loading}
        left={left}
        leftIcon={leftIcon}
        right={right}
        rightIcon={rightIcon}
        success={success}
        labelClassName={contentStyles.label}
        spinnerClassName={contentStyles.spinner}
        iconClassName={cx(contentStyles.icon)}
        leftWrapperClassName={contentStyles.leftWrapper}
      />
    </Row>
  );

  return (
    <Box width={"100%"}>
      <Box width={"100%"} borderRadius={"99rem"} overflow={"hidden"}>
        {renderLink({
          ...buttonProps,
          activeClassName: contentStyles.selected,
          className: innerClassName,
          children: innerChildren,
          style: innerStyle,
        })}
      </Box>
    </Box>
  );
};
