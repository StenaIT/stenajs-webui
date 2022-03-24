import { ClickableProps, Indent, Row } from "@stenajs-webui/core";
import * as React from "react";
import { ButtonContent, ButtonContentProps } from "@stenajs-webui/elements";
import contentStyles from "./SidebarMenuContent.module.css";
import cx from "classnames";

export interface SidebarMenuLinkProps
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
    <button
      className={cx(
        contentStyles.button,
        selected ? contentStyles.selected : undefined
      )}
      {...clickableProps}
    >
      <Row
        spacing={1}
        flex={1}
        alignItems={"center"}
        height={"var(--swui-sidebar-menu-item-height)"}
      >
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
          iconClassName={cx(contentStyles.icon, "fa-fw")}
          leftWrapperClassName={contentStyles.leftWrapper}
        />
      </Row>
    </button>
  );
};
