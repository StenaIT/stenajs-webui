import { Indent, Row } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import cx from "classnames";
import styles from "./NavBar.module.css";
import {
  NavBarSideMenuButton,
  SidebarMenuButtonProps,
} from "./NavBarSideMenuButton";
import { NavBarVariantContext } from "./NavBarVariantContext";

export interface NavBarProps {
  variant?: NavBarVariant;
  className?: string;
  showMenuButton?: boolean;
  onClickMenuButton?: SidebarMenuButtonProps["onClick"];
  right?: ReactNode;
  center?: ReactNode;
  left?: ReactNode;
  height?: number | string;
}

export type NavBarVariant = "standard" | "dark";

export const NavBar: React.FC<NavBarProps> = ({
  variant = "standard",
  left,
  className,
  showMenuButton = false,
  children,
  right,
  center,
  height = "64px",
  onClickMenuButton,
}) => {
  return (
    <NavBarVariantContext.Provider value={variant}>
      <Row
        height={height}
        className={cx(styles.navBar, styles[variant], className)}
      >
        {showMenuButton && (
          <NavBarSideMenuButton variant={variant} onClick={onClickMenuButton} />
        )}
        {left && (
          <>
            <Indent num={2} />
            {left}
          </>
        )}
        <Indent num={1.5} />
        <Row justifyContent={"center"} alignItems={"center"} flex={1}>
          <Row style={{ marginRight: "auto" }} alignItems={"center"}>
            {React.Children.map(children, (child) => (
              <Indent num={1}>{child}</Indent>
            ))}
          </Row>
        </Row>
        {center && (
          <Row justifyContent={"center"} alignItems={"center"} flex={1}>
            {center}
          </Row>
        )}
        <Row justifyContent={"center"} alignItems={"center"} flex={1}>
          <Row style={{ marginLeft: "auto" }}>{right}</Row>
        </Row>
        <Indent num={3} />
      </Row>
    </NavBarVariantContext.Provider>
  );
};
