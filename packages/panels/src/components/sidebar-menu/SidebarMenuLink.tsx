import { ButtonElementProps, Indent, Row } from "@stenajs-webui/core";
import * as React from "react";
import { CSSProperties } from "react";
import { ButtonContent, ButtonContentProps } from "@stenajs-webui/elements";
import contentStyles from "./SidebarMenuContent.module.css";
import cx from "classnames";

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
  width?: CSSProperties["width"];
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
  width,
  ...clickableProps
}) => {
  const hasContentLeft = left || leftIcon || loading || success;
  return (
    <button
      className={cx(
        contentStyles.button,
        selected ? contentStyles.selected : undefined
      )}
      style={{ width, height: "var(--swui-sidebar-menu-item-height)" }}
      {...clickableProps}
    >
      <Row spacing={1} flex={1} alignItems={"center"}>
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
          iconClassName={cx(contentStyles.icon)}
          leftWrapperClassName={contentStyles.leftWrapper}
        />
      </Row>
    </button>
  );
};
