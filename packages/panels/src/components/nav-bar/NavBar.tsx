import { Indent, Row } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import cx from "classnames";
import styles from "./NavBar.module.css";
import { HamburgerMenuButton } from "./HamburgerMenuButton";

export interface NavBarProps {
  variant?: NavBarVariant;
  className?: string;
  hamburgerMenu?: boolean;
  right?: ReactNode;
  center?: ReactNode;
  logoOrAppName?: ReactNode;
  height?: number | string;
}
export type NavBarVariant = "standard" | "dark";

export const NavBar: React.FC<NavBarProps> = ({
  variant = "standard",
  logoOrAppName,
  className,
  hamburgerMenu = false,
  children,
  right,
  center,
  height = "64px",
}) => {
  return (
    <Row
      height={height}
      className={cx(styles.navBar, styles[variant], styles.standard, className)}
    >
      {hamburgerMenu && <HamburgerMenuButton variant={variant} />}
      {logoOrAppName && (
        <>
          <Indent num={2} />
          {logoOrAppName}
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
  );
};
