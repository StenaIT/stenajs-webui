import styled from "@emotion/styled";
import { ColorProperty } from "csstype";
import * as React from "react";
import { cssColor } from "../../../styling/util/CssColor";

export interface SeparatorLineProps {
  color?: ColorProperty;
  vertical?: boolean;
  size?: string;
  width?: string;
}

interface SeparatorLineComponentProps {
  color: string;
  vertical?: boolean;
  size?: string;
  width?: string;
}

const SeparatorLineComponent = styled.hr<SeparatorLineComponentProps>`
  display: flex;
  border: 0;
  margin: 0;
  background-color: ${(props) => props.color};
  height: ${(props) =>
    props.vertical ? props.size || "100%" : props.width || "1px"};
  width: ${(props) =>
    props.vertical ? props.width || "1px" : props.size || "100%"};
`;

export const SeparatorLine: React.FC<SeparatorLineProps> = ({
  color = cssColor("--lhds-color-ui-300"),
  ...props
}) => {
  return <SeparatorLineComponent color={color} {...props} />;
};
