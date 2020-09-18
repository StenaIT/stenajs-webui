import { Indent, Row } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";

export interface NavBarProps {
  right?: ReactNode;
  center?: ReactNode;
  height?: number | string;
}

export const NavBar: React.FC<NavBarProps> = ({
  children,
  right,
  center,
  height = "50px",
}) => {
  return (
    <Row
      height={height}
      background={
        "var(--swui-navbar-background-color, var(--lhds-color-blue-800))"
      }
      indent={3}
    >
      <Row justifyContent={"center"} alignItems={"center"} flex={1}>
        <Row style={{ marginRight: "auto" }} alignItems={"center"}>
          {React.Children.map(children, (child) => (
            <Indent num={0.5}>{child}</Indent>
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
    </Row>
  );
};
