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

export type NavBarVariant = "light" | "dark";

export const NavBar: React.FC<NavBarProps> = ({
  variant = "light",
  left,
  className,
  showMenuButton = false,
  children,
  right,
  center,
  height = "64px",
  onClickMenuButton,
}) => {
  const currentFlex = center ? 1 : undefined;
  return (
    <NavBarVariantContext.Provider value={variant}>
      <Row
        height={height}
        minHeight={height}
        justifyContent={"space-between"}
        className={cx(styles.navBar, styles[variant], className)}
      >
        <Row
          flex={currentFlex}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          {showMenuButton ? (
            <>
              <NavBarSideMenuButton
                variant={variant}
                onClick={onClickMenuButton}
              />
              <Indent />
            </>
          ) : (
            <Indent num={2} />
          )}
          {left ? (
            <>
              {left}
              <Indent num={2} />
            </>
          ) : (
            <Indent num={2} />
          )}
          {children && (
            <>
              <Row justifyContent={"center"} alignItems={"center"}>
                {React.Children.map(children, (child, index) => (
                  <>
                    {index > 0 && <Indent />}
                    {child}
                  </>
                ))}
              </Row>
            </>
          )}
        </Row>
        {center && (
          <Row justifyContent={"center"} alignItems={"center"}>
            {center}
          </Row>
        )}
        <Row
          justifyContent={"flex-end"}
          alignItems={"center"}
          flex={currentFlex}
        >
          {right}
          <Indent num={2} />
        </Row>
      </Row>
    </NavBarVariantContext.Provider>
  );
};
