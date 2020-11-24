import { Clickable, ClickableProps, Indent, Row } from "@stenajs-webui/core";
import * as React from "react";
import { ButtonContent, ButtonContentProps } from "@stenajs-webui/elements";
import contentStyles from "./SidebarMenuContent.module.css";

interface SidebarMenuLinkProps
  extends ClickableProps,
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
  selected?: boolean;
  indent?: boolean;
}

const selectedBorder = "4px solid var(--swui-sidebar-menu-item-selected)";

export const SidebarMenuLink: React.FC<SidebarMenuLinkProps> = ({
  className,
  children,
  selected,
  indent,
  label,
  loading,
  left,
  leftIcon,
  right,
  rightIcon,
  success,
  ...clickableProps
}) => {
  const hasContentLeft = left || leftIcon || loading || success;
  return (
    <Clickable
      background={"var(--swui-sidebar-menu-background-color)"}
      hoverBackground={"var(--swui-sidebar-menu-background-color-hover)"}
      style={{ borderRight: selected ? selectedBorder : undefined }}
      {...clickableProps}
    >
      <Row spacing={1} flex={1} alignItems={"center"} height={"40px"}>
        {!hasContentLeft && <Indent />}
        {indent && <Indent num={3.5} />}
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
          iconClassName={contentStyles.icon}
          leftWrapperClassName={contentStyles.leftWrapper}
        />
      </Row>
    </Clickable>
  );
};
