import { Indent, Row } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import cx from "classnames";
import styles from "./NavBar.module.css";
import {
  NavBarSideMenuButton,
  SidebarMenuButtonProps,
} from "./NavBarSideMenuButton";

export type NavBarVariant = "compact" | "standard" | "relaxed";

export interface NavBarProps {
  className?: string;
  showMenuButton?: boolean;
  onClickMenuButton?: SidebarMenuButtonProps["onClick"];
  right?: ReactNode;
  center?: ReactNode;
  left?: ReactNode;
  variant?: NavBarVariant;
  children?: ReactNode;
}

export const NavBar: React.FC<NavBarProps> = ({
  left,
  className,
  showMenuButton = false,
  children,
  right,
  center,
  onClickMenuButton,
}) => {
  const currentFlex = center ? 1 : undefined;
  return (
    <Row
      justifyContent={"space-between"}
      className={cx(styles.navBar, className)}
    >
      <Row
        flex={currentFlex}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <Row width={"86px"} alignItems={"center"}>
          <Indent />
          {showMenuButton && (
            <NavBarSideMenuButton onClick={onClickMenuButton} />
          )}
        </Row>

        {left && (
          <>
            {left}
            <Indent num={2} />
          </>
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
      <Row justifyContent={"flex-end"} alignItems={"center"} flex={currentFlex}>
        {right}
        <Indent num={2} />
      </Row>
    </Row>
  );
};
