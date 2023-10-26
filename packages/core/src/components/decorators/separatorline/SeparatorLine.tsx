import styled from "@emotion/styled";
import { Property } from "csstype";
import * as React from "react";
import { forwardRef } from "react";
import { cssColor } from "@stenajs-webui/theme";

export interface SeparatorLineProps {
  color?: Property.Color;
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
  flex: none;
  background-color: ${(props) => props.color};
  height: ${(props) =>
    props.vertical ? props.size || "100%" : props.width || "1px"};
  width: ${(props) =>
    props.vertical ? props.width || "1px" : props.size || "100%"};
`;

export const SeparatorLine = forwardRef<HTMLHRElement, SeparatorLineProps>(
  (
    {
      color = cssColor("--lhds-color-ui-300"),
      size = "100%",
      width = "1px",
      vertical = false,
    },
    ref
  ) => {
    return (
      <SeparatorLineComponent
        aria-hidden={true}
        color={color}
        size={size}
        width={width}
        vertical={vertical}
        ref={ref}
      />
    );
  }
);
